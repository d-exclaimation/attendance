//
//  context.ts
//  server
//
//  Created by d-exclaimation on 09:56.
//
import { PrismaClient } from "@prisma/client";

export interface Context {
  db: PrismaClient;
}
