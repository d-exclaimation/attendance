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
import { Context } from "./context";
import { attendanceLoader, userLoader } from "./loader";
import { schema } from "./schema";
import { loginContext } from "./utils/auth";

async function main() {
  const prisma = new PrismaClient({
    log: ["query"],
  });
  const app = express();
  const httpServer = createServer(app);

  const server = new ApolloServer({
    schema,
    context: async ({ req }): Promise<Context> => ({
      db: prisma,
      userLoader: userLoader(prisma),
      attendanceLoader: attendanceLoader(prisma),
      req,
      session: await loginContext(req.headers),
    }),
  });

  // This part will apply GraphQL on the request,
  // any middleware that require data directly from request needed to assign before this line
  await server.start();
  server.applyMiddleware({ app });

  // TODO: Set to environment variables
  const PORT = 4000;
  httpServer.listen(PORT, () => {
    console.log(`Server starting at http://localhost:${PORT}`);
  });
  await prisma.$disconnect();
}

main().catch(console.error);
