//
//  mutations.ts
//  server
//
//  Created by d-exclaimation on 23:14.
//
import { Attendance, PrismaClient, User } from "@prisma/client";
import { Failure, Ok, Try } from "../models/Try";

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
