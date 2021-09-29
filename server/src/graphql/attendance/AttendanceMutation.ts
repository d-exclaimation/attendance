//
//  AttendanceMutation.ts
//  server
//
//  Created by d-exclaimation on 21:07.
//

import { extendType, idArg, nonNull } from "nexus";
import { clockIn, clockOut } from "../../database/mutations";
import { convertAttendance } from "../../models/converters";
import { isAdmin } from "../../utils/auth";
import { isAuth } from "../../utils/isAuth";

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
          return { username: session?.name ?? "Tanpa Nama" };

        const res = await clockIn(db, uid);

        switch (res.type) {
          case "ok":
            return convertAttendance(res.data);
          default:
            return { username: session?.name ?? "Tanpa Nama" };
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
          return { username: session?.name ?? "Tanpa Nama" };

        const res = await clockOut(db, id, uid, session);
        switch (res.type) {
          case "ok":
            return convertAttendance(res.data);
          default:
            const err = res.error as any;
            if ("message" in err) {
              return { message: err["message"] as string };
            } else if ("username" in err) {
              return { username: session?.name ?? "Tanpa Nama" };
            } else {
              return { message: "Belum masuk jam kerja" };
            }
        }
      },
    });
  },
});
