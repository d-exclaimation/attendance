//
//  context.ts
//  server
//
//  Created by d-exclaimation on 09:56.
//
import { PrismaClient, User } from "@prisma/client";
import { Request, Response } from "express";
import { attendanceLoader, userLoader } from "./loader";

/** GraphQL Context Schema for Nexus can auto infer types */
export interface Context {
  attendanceLoader: ReturnType<typeof attendanceLoader>;
  userLoader: ReturnType<typeof userLoader>;
  db: PrismaClient;
  req: Request;
  res: Response;
  session: Session;
}

export type Session = User | null;
