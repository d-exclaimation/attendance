//
//  Attendance.ts
//  server
//
//  Created by d-exclaimation on 09:41.
//
import { objectType } from "nexus";

export const Attendance = objectType({
  name: "Attendance",
  definition(t) {
    t.nonNull.id("id");
    t.nonNull.string("userId");
    t.nonNull.string("entryAt");
    t.string("leaveAt");
    t.nonNull.field("user", {
      type: "User",
      resolve: ({ userId }, _args, { userLoader }) => userLoader.load(userId),
    });
  },
});
