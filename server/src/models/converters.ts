//
//  converters.ts
//  server
//
//  Created by d-exclaimation on 16:39.
//

import { Attendance } from "@prisma/client";

export const convertAttendance = ({
  entryAt,
  leaveAt,
  ...rest
}: Attendance) => ({
  ...rest,
  entryAt: entryAt.toISOString(),
  leaveAt: leaveAt?.toISOString(),
});

export const convertDate = (entryAt: Date, leaveAt: Date) => {
  const diff = Math.abs(entryAt.getTime() - leaveAt.getTime());
  const diffSeconds = diff / 1000;
  const diffMinutes = diff / (1000 * 60);
  const diffHour = diff / (1000 * 60 * 60);
  if (Math.floor(diffHour) > 0) {
    return `${Math.floor(diffHour)} hours, ${Math.floor(
      diffMinutes % 60
    )} minutes, ${Math.floor(diffSeconds % 3600)} seconds`;
  } else if (Math.floor(diffMinutes) > 0) {
    return `${Math.floor(diffMinutes)} minutes, ${Math.floor(
      diffSeconds % 3600
    )} seconds`;
  } else {
    return `${Math.floor(diffSeconds)} seconds`;
  }
};
