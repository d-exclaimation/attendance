//
//  mutations.ts
//  server
//
//  Created by d-exclaimation on 23:14.
//
import { PrismaClient, User } from "@prisma/client";
import { Failure, Return, Try } from "../models/Try";

async function signUp(
  db: PrismaClient,
  input: { name: string }
): Promise<Try<User>> {
  try {
    const res = await db.user.create({
      data: input,
    });

    return Return(res);
  } catch (e: unknown) {
    return Failure(e);
  }
}

export const mutations = {
  signUp,
};
