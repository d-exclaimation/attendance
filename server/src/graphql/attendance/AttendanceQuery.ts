//
//  AttendanceQuery.ts
//  server
//
//  Created by d-exclaimation on 21:05.
//

import { extendType, intArg, nonNull } from "nexus";
import {
  allAttendance,
  attendanceHistory,
  attendanceState,
} from "../../database/queries";
import { convertAttendance } from "../../models/converters";
import { isAdmin } from "../../utils/auth";
import { isAuth } from "../../utils/isAuth";

/** Attendance query */
export const AttendanceQuery = extendType({
  type: "Query",
  definition(t) {
    // All record query (Most recent to limit)
    t.nonNull.list.nonNull.field("recorded", {
      type: "Attendance",
      description: "Get last records for all users",
      args: { last: nonNull(intArg()) },
      authorize: isAuth,
      resolve: async (_s, { last }, { db, session }) => {
        const uid = session?.id;
        if (!uid || !isAdmin(uid)) throw Error("Shouldn't happen");
        const res = await allAttendance(db, last);
        return res.map(convertAttendance);
      },
    });

    // History Query (Most recent records)
    t.nonNull.list.nonNull.field("history", {
      type: "Attendance",
      description: "Get last x attendance records",
      args: { last: nonNull(intArg()) },
      authorize: isAuth,
      resolve: async (_s, { last }, { db, session }) => {
        const uid = session?.id;
        if (!uid || isAdmin(uid)) throw Error("Admin has no attendance");

        // Limit to 10 max
        const limit = Math.min(last, 10);

        const res = await attendanceHistory(db, uid, limit);
        switch (res.type) {
          case "ok":
            return res.data.map(convertAttendance);
          default:
            return [];
        }
      },
    });

    t.field("state", {
      type: "Attendance",
      description: "Get the last record whether it exist or not",
      authorize: isAuth,
      resolve: async (_s, _a, { db, session }) => {
        const uid = session?.id;
        if (!uid || isAdmin(uid)) return null;

        const res = await attendanceState(db, uid);
        return !!res ? convertAttendance(res) : null;
      },
    });
  },
});
