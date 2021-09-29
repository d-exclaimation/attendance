//
//  mutations.ts
//  server
//
//  Created by d-exclaimation on 23:14.
//
import { Attendance, PrismaClient, User } from "@prisma/client";
import { Failure, Ok, Try } from "../models/Try";
import { Session } from "./../context";

/**
 * Sign Up a new user but return a error safe result.
 * @param db Database client.
 * @param input Required input
 * @returns A new error handled user
 */
export async function signUp(
  db: PrismaClient,
  input: { name: string }
): Promise<Try<User>> {
  try {
    const res = await db.user.create({
      data: input,
    });

    return Ok(res);
  } catch (e: unknown) {
    return Failure(e);
  }
}

/**
 * Create a new attendance record.
 * @param db Database client.
 * @param uid User ID.
 * @returns A Try of Attendance
 */
export async function clockIn(
  db: PrismaClient,
  uid: string
): Promise<Try<Attendance>> {
  try {
    const res = await db.attendance.create({
      data: {
        userId: uid,
      },
    });
    return Ok(res);
  } catch (e) {
    return Failure(e);
  }
}

/**
 * Clock out and update an attendance.
 * @param db Database client
 * @param id attendance id
 * @param uid user id
 * @param session user session
 * @returns CLock out result
 */
export async function clockOut(
  db: PrismaClient,
  id: string,
  uid: string,
  session: Session
): Promise<Try<Attendance>> {
  try {
    const record = await db.attendance.findFirst({
      where: { id },
    });
    if (record?.userId !== uid)
      return Failure({ username: session?.name ?? "Tanpa Nama" });

    if (!record || record.leaveAt !== null)
      return Failure({ message: "Belum masuk jam kerja" });

    const data = await db.attendance.update({
      where: { id: record.id },
      data: {
        leaveAt: new Date(),
      },
    });

    return Ok(data);
  } catch (e) {
    return Failure({ message: "Belum masuk jam kerja" });
  }
}
