//
//  Clock.ts
//  server
//
//  Created by d-exclaimation on 02:31.
//

import { objectType, unionType } from "nexus";

/** Clocked in Result cases */
export const ClockInResult = unionType({
  name: "ClockIn",
  description: "Attendance clock in possible outcome",
  definition(t) {
    t.members("Attendance", "UserNotFound");
  },
  resolveType: (given) => ("id" in given ? "Attendance" : "UserNotFound"),
});

/** Clocked out result */
export const ClockOutResult = unionType({
  name: "ClockOut",
  description: "Attendance clock out possible outcome",
  definition(t) {
    t.members("Attendance", "UserNotFound", "NotClockedIn");
  },
  resolveType: (given) =>
    "id" in given
      ? "Attendance"
      : "username" in given
      ? "UserNotFound"
      : "NotClockedIn",
});

/** Not yet clocked in */
export const NotClockedInType = objectType({
  name: "NotClockedIn",
  description: "Not yet clocked in",
  definition(t) {
    t.nonNull.string("message");
  },
});
