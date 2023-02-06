//
//  applyMiddleware.ts
//  server
//
//  Created by d-exclaimation on 00:41.
//

import { ExpressContextFunctionArgument } from "@apollo/server/express4";
import { PrismaClient } from "@prisma/client";
import { attendanceLoader, userLoader } from "../loader";
import { Context } from "./../context";
import { loginMiddleware } from "./loginMiddleware";

export async function applyMiddleware(
  { req, res }: ExpressContextFunctionArgument,
  prisma: PrismaClient
): Promise<Context> {
  return {
    db: prisma,
    userLoader: userLoader(prisma),
    attendanceLoader: attendanceLoader(prisma),
    req,
    res,
    session: await loginMiddleware(req.headers),
  };
}
