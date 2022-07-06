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

/** Get this month attendance */
export async function monthlyAttendance(
  db: PrismaClient,
  offset: number = 0
): Promise<Attendance[]> {
  const now = new Date();
  const [year, month] = [now.getFullYear(), now.getMonth() + offset];
  const [thisMonth, nextMonth] = [
    new Date(year, month, 1),
    new Date(year, month + 1, 1),
  ];
  try {
    return await db.attendance.findMany({
      orderBy: {
        entryAt: "desc",
      },
      where: {
        entryAt: {
          gte: thisMonth,
          lte: nextMonth,
        },
      },
    });
  } catch (_) {
    return [];
  }
}

/** Get the most recent attendance to know the state */
export async function attendanceState(
  db: PrismaClient,
  uid: string
): Promise<Attendance | null> {
  try {
    const res = await db.attendance.findMany({
      where: { userId: uid },
      orderBy: { entryAt: "desc" },
      take: 1,
    });
    return res[0];
  } catch (_) {
    return null;
  }
}
