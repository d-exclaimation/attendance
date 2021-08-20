//
//  Attendance.ts
//  server
//
//  Created by d-exclaimation on 09:41.
//
import { objectType } from "nexus";

/** Attendance record */
export const AttendanceType = objectType({
  name: "Attendance",
  description: "Attendance timestamp for logging work hours",
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
