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
    t.nonNull.list.nonNull.field("attendances", {
      type: "Attendance",
      resolve: async ({ id }, _args, { db, attendanceLoader }) => {
        const res = await attendanceLoader.load(id);
        return res.map((res) => ({
          ...res,
          entryAt: res.entryAt.toISOString(),
          leaveAt: res.leaveAt?.toISOString() as string | null | undefined,
        }));
      },
    });
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
