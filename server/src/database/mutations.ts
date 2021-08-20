//
//  mutations.ts
//  server
//
//  Created by d-exclaimation on 23:14.
//
import { PrismaClient, User } from "@prisma/client";
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
