//
//  queries.ts
//  server
//
//  Created by d-exclaimation on 01:04.
//
import { Attendance, PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { Failure, Ok, Try } from "../models/Try";

/** Get the most recent history */
export async function attendanceHistory(
  db: PrismaClient,
  uid: string,
  limit: number
): Promise<Try<Attendance[]>> {
  try {
    const res = await db.attendance.findMany({
      where: {
        userId: uid,
      },
      orderBy: {
        entryAt: "desc",
      },
      take: limit,
    });

    return Ok(res);
  } catch (e: unknown) {
    if (e instanceof PrismaClientKnownRequestError) {
      return Failure(e.message);
    }

    return Failure("Unrecognized exception");
  }
}

/** Get the most recent attendance */
export async function allAttendance(
  db: PrismaClient,
  limit: number
): Promise<Attendance[]> {
  try {
    return await db.attendance.findMany({
      orderBy: {
        entryAt: "desc",
      },
      take: limit,
    });
  } catch (_) {
    return [];
  }
}
