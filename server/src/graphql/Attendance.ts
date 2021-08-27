//
//  Attendance.ts
//  server
//
//  Created by d-exclaimation on 09:41.
//
import { extendType, idArg, intArg, nonNull, objectType } from "nexus";
import { clockIn } from "../database/mutations";
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
      description: "Get the last record whether it exist or not",
      authorize: isAuth,
      resolve: async (_s, _a, { db, session }) => {
        const uid = session?.id;
        if (!uid || isAdmin(uid)) return null;

        try {
          const res = await db.attendance.findMany({
            where: { userId: uid },
            orderBy: { entryAt: "desc" },
            take: 1,
          });
          const data = res[0];

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

/** Attendance mutation */
export const AttendanceMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("clockIn", {
      type: "ClockIn",
      description:
        "Perform clock in and create a new record (Will not invalidate last un-clocked out record)",
      authorize: isAuth,
      resolve: async (_s, _a, { session, db }) => {
        const uid = session?.id;
        if (!uid || isAdmin(uid))
          return { username: session?.name ?? "Undentified" };

        const res = await clockIn(db, uid);

        switch (res.type) {
          case "ok":
            const { entryAt, leaveAt, ...rest } = res.data;
            return {
              ...rest,
              entryAt: entryAt.toISOString(),
              leaveAt: leaveAt?.toISOString(),
            };
          default:
            return { username: session.name };
        }
      },
    });

    t.nonNull.field("clockOut", {
      type: "ClockOut",
      description: "Perform clock out if possible",
      args: {
        id: nonNull(idArg()),
      },
      authorize: isAuth,
      resolve: async (_s, { id }, { db, session }) => {
        const uid = session?.id;
        if (!uid || isAdmin(uid))
          return { username: session?.name ?? "Undentified" };
        try {
          const record = await db.attendance.findFirst({
            where: { id },
          });
          if (record?.userId !== uid) return { username: session.name };

          if (!record || record.leaveAt !== null)
            return { message: "Not yet clocked in" };

          const { entryAt, leaveAt, ...rest } = await db.attendance.update({
            where: { id: record.id },
            data: {
              leaveAt: new Date(),
            },
          });

          return {
            ...rest,
            entryAt: entryAt.toISOString(),
            leaveAt: leaveAt?.toISOString(),
          };
        } catch (e) {
          return { message: "Not yet clocked in" };
        }
      },
    });
  },
});
