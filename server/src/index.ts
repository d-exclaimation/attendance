//
//  index.ts
//  server
//
//  Created by d-exclaimation on 8:17 AM.
//  Copyright © 2021 d-exclaimation. All rights reserved.
//
import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { createServer } from "http";
import { attendanceLoader, userLoader } from "./loader";
import { schema } from "./schema";

async function main() {
  const prisma = new PrismaClient({
    log: ["query"],
  });
  const app = express();
  const httpServer = createServer(app);

  const server = new ApolloServer({
    schema,
    context: ({}) => ({
      db: prisma,
      userLoader: userLoader(prisma),
      attendanceLoader: attendanceLoader(prisma),
    }),
  });
  await server.start();
  server.applyMiddleware({ app });

  const PORT = 4000;
  httpServer.listen(PORT, () => {
    console.log(`Server starting at http://localhost:${PORT}`);
  });
  prisma.$disconnect();
}

main().catch(console.error);
