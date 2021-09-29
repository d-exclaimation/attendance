//
//  Attendance.ts
//  server
//
//  Created by d-exclaimation on 09:41.
//
import { objectType } from "nexus";
import { convertDate } from "../../models/converters";

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
    t.nonNull.string("workHours", {
      resolve: (data, _a, _c) => {
        const entryAt = new Date(data.entryAt);
        const leaveAt = data?.leaveAt ? new Date(data?.leaveAt) : null;
        if (!leaveAt) return "Not yet leave work";
        return convertDate(entryAt, leaveAt);
      },
    });
    t.nonNull.boolean("isCompleted", {
      resolve: ({ leaveAt }, _a, _c) => !!leaveAt,
    });
  },
});
