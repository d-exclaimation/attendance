//
//  schema.ts
//  server
//
//  Created by d-exclaimation on 09:10.
//

import { fieldAuthorizePlugin, makeSchema } from "nexus";
import path from "path/posix";
import { __prod__ } from "./constant/environment";
import * as types from "./graphql";

export const schema = makeSchema({
  types,
  shouldGenerateArtifacts: !__prod__,
  outputs: {
    schema: path.join(__dirname, "generated/schema.graphql"),
    typegen: path.join(__dirname, "generated/types.ts"),
  },
  contextType: {
    module: path.join(__dirname, `./context.ts`),
    export: "Context",
  },
  plugins: [fieldAuthorizePlugin()],
});
