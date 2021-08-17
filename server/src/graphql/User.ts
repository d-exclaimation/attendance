//
//  User.ts
//  server
//
//  Created by d-exclaimation on 09:37.
//

import { extendType, objectType } from "nexus";

export const User = objectType({
  name: "User",
  definition(t) {
    t.nonNull.id("id");
    t.nonNull.string("name");
  },
});

export const UserQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("employees", {
      type: "User",
      resolve: async (_source, _arg, { db }) => {
        const res = await db.user.findMany();
        return res.map(({ id, name }) => ({
          id,
          name,
        }));
      },
    });
  },
});
