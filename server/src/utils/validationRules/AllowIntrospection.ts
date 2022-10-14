//
//  allowIntrospection.ts
//  server
//
//  Created by d-exclaimation on 16:48.
//  Copyright © 2022 d-exclaimation. All rights reserved.
//

import { ApolloServerPlugin } from "apollo-server-plugin-base";
import { GraphQLError } from "graphql";
import { artifacts } from "../../constant/artifacts";
import { __prod__ } from "../../constant/environment";


export const AllowIntrospection: ApolloServerPlugin = {
  requestDidStart: async (_ctx) => {
    return {
      responseForOperation: async (ctx) => {
        if (!__prod__ || !ctx.operation) return null;

        // Check for introspection
        const isIntrospection = ctx.operation.selectionSet.selections.some(select => {
          if (select.kind !== "Field") return false;

          return select.name.value == "__schema" || select.name.value == "__type";
        });
        
        // Non-introspection is handled by resolver
        if (!isIntrospection || !ctx.request.http) return null;
        
        // Introspection require a key unless in dev
        const key = ctx.request.http.headers.get("Intro-Key");
        if (key === artifacts["introspectionKey"]) return null;
        
        return {
          errors: [
            new GraphQLError(
              'GraphQL introspection is not allowed by Apollo Server, but the query contained __schema or __type. To enable introspection, pass introspection: true to ApolloServer in production',
            )
          ]
        };  
      }
    };

  }
};