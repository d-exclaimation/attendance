//
//  UserQuery.ts
//  server
//
//  Created by d-exclaimation on 21:12.
//

import { extendType } from "nexus";
import { isAdmin } from "../../utils/auth";
import { isAuthAdmin } from "../../utils/isAuth";

/** User section of Query */
export const UserQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("employees", {
      type: "User",
      description: "Gettings all employees",
      authorize: isAuthAdmin,
      resolve: async (_source, _arg, { db }) => {
        const res = await db.user.findMany();
        return res.map(({ id, name }) => ({
          id,
          name,
        }));
      },
    });

    t.field("me", {
      type: "User",
      description: "Check for user data",
      resolve: async (_s, _a, { session, db }) => {
        try {
          if (!session) return null;
          if (isAdmin(session.id)) return session;

          return await db.user.findFirst({
            where: { id: session.id },
          });
        } catch (_) {
          return null;
        }
      },
    });
  },
});
