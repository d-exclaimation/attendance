//
//  context.ts
//  server
//
//  Created by d-exclaimation on 09:56.
//
import { PrismaClient } from "@prisma/client";
import { attendanceLoader, userLoader } from "./loader";

export interface Context {
  attendanceLoader: ReturnType<typeof attendanceLoader>;
  userLoader: ReturnType<typeof userLoader>;
  db: PrismaClient;
}
