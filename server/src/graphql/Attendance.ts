//
//  Attendance.ts
//  server
//
//  Created by d-exclaimation on 09:41.
//
import { extendType, intArg, nonNull, objectType } from "nexus";
import { attendanceHistory } from "../database/queries";
import { isAdmin } from "./../utils/auth";
import { isAuth } from "./../utils/isAuth";

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

/** Attendance query */
export const AttendanceQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("history", {
      type: "Attendance",
      args: { last: nonNull(intArg()) },
      authorize: isAuth,
      resolve: async (_s, { last }, { db, session }) => {
        const uid = session?.id;
        if (!uid || isAdmin(uid)) throw Error("Admin has no attendance");
        const limit = Math.min(last, 10);
        const res = await attendanceHistory(db, uid, limit);
        switch (res.type) {
          case "ok":
            return res.data.map(({ entryAt, leaveAt, ...rest }) => ({
              ...rest,
              entryAt: entryAt.toISOString(),
              leaveAt: leaveAt?.toISOString(),
            }));
          default:
            return [];
        }
      },
    });

    t.field("state", {
      type: "Attendance",
      authorize: isAuth,
      resolve: async (_s, _a, { db, session }) => {
        const uid = session?.id;
        if (!uid || isAdmin(uid)) return null;

        try {
          const [data] = await db.attendance.findMany({
            where: { userId: uid },
            orderBy: { entryAt: "desc" },
            take: 1,
          });

          return {
            ...data,
            entryAt: data.entryAt.toISOString(),
            leaveAt: data.leaveAt?.toISOString(),
          };
        } catch (_) {
          return null;
        }
      },
    });
  },
});
