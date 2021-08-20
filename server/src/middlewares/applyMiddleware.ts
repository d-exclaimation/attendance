//
//  applyMiddleware.ts
//  server
//
//  Created by d-exclaimation on 00:41.
//

import { PrismaClient } from "@prisma/client";
import { ExpressContext } from "apollo-server-express";
import { attendanceLoader, userLoader } from "../loader";
import { Context } from "./../context";
import { loginMiddleware } from "./loginMiddleware";

export async function applyMiddleware(
  { req }: ExpressContext,
  prisma: PrismaClient
): Promise<Context> {
  return {
    db: prisma,
    userLoader: userLoader(prisma),
    attendanceLoader: attendanceLoader(prisma),
    req,
    session: await loginMiddleware(req.headers),
  };
}
