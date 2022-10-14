//
//  allowIntrospection.ts
//  server
//
//  Created by d-exclaimation on 16:48.
//  Copyright © 2022 d-exclaimation. All rights reserved.
//

import { ApolloServerPlugin } from "apollo-server-plugin-base";
import { __prod__ } from "../../constant/environment";


export const AllowIntrospection: ApolloServerPlugin = {
  requestDidStart: async (ctx) => {
    if (!__prod__ || !ctx.operation) return;

    const isIntrospection = ctx.operation.selectionSet.selections.some(select => {
      if (select.kind !== "Field") return false;

      return select.name.value == "__schema" || select.name.value == "__type";
    });

    if (!isIntrospection) return;

    console.log("Hello!!");

    
  }
};