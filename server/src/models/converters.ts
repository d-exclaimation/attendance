//
//  converters.ts
//  server
//
//  Created by d-exclaimation on 16:39.
//

import { Attendance } from "@prisma/client";

/**
 * Convert db type into json parseable one.
 * @param param0 Attendance being converted.
 * @returns A GraphQL parseable ISO String.
 */
export const convertAttendance = ({
  entryAt,
  leaveAt,
  ...rest
}: Attendance) => ({
  ...rest,
  entryAt: entryAt.toISOString(),
  leaveAt: leaveAt?.toISOString(),
});

/** Convert the proper data difference into human readable */
export const convertDate = (entryAt: Date, leaveAt: Date) => {
  const diff = Math.abs(entryAt.getTime() - leaveAt.getTime());
  const diffSeconds = diff / 1000;
  const diffMinutes = diff / (1000 * 60);
  const diffHour = diff / (1000 * 60 * 60);
  if (Math.floor(diffHour) > 0) {
    return `${Math.floor(diffHour)} jam, ${Math.floor(
      diffMinutes % 60
    )} menit, ${Math.floor(diffSeconds % 3600)} detik`;
  } else if (Math.floor(diffMinutes) > 0) {
    return `${Math.floor(diffMinutes)} menit, ${Math.floor(
      diffSeconds % 3600
    )} detik`;
  } else {
    return `${Math.floor(diffSeconds)} detik`;
  }
};
