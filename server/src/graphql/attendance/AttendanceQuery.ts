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
  monthlyAttendance,
} from "../../database/queries";
import { convertAttendance } from "../../models/converters";
import { isAdmin } from "../../utils/auth";
import { isAuth } from "../../utils/isAuth";
import { isAuthAdmin } from "./../../utils/isAuth";

/**
 * Attendance query
 */
export const AttendanceQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("recorded", {
      type: "Attendance",
      deprecation: "Use 'monthly' instead to filter by month instead by count",
      description: "Get last records for all users",
      args: { last: nonNull(intArg()) },
      authorize: isAuthAdmin,
      /**
       * All record query (Most recent to limit)
       * @returns List of recent Attendance
       */
      resolve: async (_s, { last }, { db, session }) => {
        const uid = session?.id;
        if (!uid || !isAdmin(uid)) throw Error("Shouldn't happen");
        const res = await allAttendance(db, last);
        return res.map(convertAttendance);
      },
    });

    t.nonNull.list.nonNull.field("monthly", {
      type: "Attendance",
      description: "Get last records for all users this month",
      authorize: isAuthAdmin,
      args: {
        offset: nonNull(intArg({ default: 0 })),
      },
      /**
       * All record query (Most recent to this month by an offset)
       * @returns List of recent Attendance
       */
      resolve: async (_s, { offset }, { db, session }) => {
        const uid = session?.id;
        if (!uid || !isAdmin(uid)) throw Error("Shouldn't happen");
        const res = await monthlyAttendance(db, offset);
        return res.map(convertAttendance);
      },
    });

    t.nonNull.list.nonNull.field("history", {
      type: "Attendance",
      description: "Get last x attendance records",
      args: { last: nonNull(intArg()) },
      authorize: isAuth,
      /**
       * History query (Most recent records)
       * @returns List of recent Attendance for a specific user
       */
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
      /**
       * Get the current state of the user
       * @returns The last attendance if any
       */
      resolve: async (_s, _a, { db, session }) => {
        const uid = session?.id;
        if (!uid || isAdmin(uid)) return null;

        const res = await attendanceState(db, uid);
        return !!res ? convertAttendance(res) : null;
      },
    });
  },
});
