//
//  index.ts
//  server
//
//  Created by d-exclaimation on 8:17 AM.
//  Copyright © 2021 d-exclaimation. All rights reserved.
//
import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "apollo-server-express";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { createServer } from "http";
import { __port__, __prod__ } from "./constant/environment";
import { Context } from "./context";
import { applyMiddleware } from "./middlewares/applyMiddleware";
import { schema } from "./schema";
import { refreshCredentials } from "./utils/auth";

async function main() {
  const prisma = new PrismaClient({
    log: ["query"],
  });
  const app = express();
  const httpServer = createServer(app);
  const corsOptions = {
    credentials: true,
    origin: ["https://studio.apollographql.com"],
  };

  app.use(cors(corsOptions));
  app.use(cookieParser());
  app.post("/refresh", async (req, res) => {
    const refreshToken = req.cookies.jid;
    if (!refreshToken) return res.send({ ok: false, access: null });

    const access = await refreshCredentials(prisma, refreshToken);

    res.send({ ok: !!access, access });
  });

  const server = new ApolloServer({
    schema,
    introspection: !__prod__,
    context: async (ctx): Promise<Context> => applyMiddleware(ctx, prisma),
  });

  // This part will apply GraphQL on the request,
  // any middleware that require data directly from request needed to assign before this line
  await server.start();
  server.applyMiddleware({
    app,
    cors: corsOptions,
  });

  httpServer.listen(__port__, () => {
    console.log(`Server starting at http://localhost:${__port__}`);
  });
  await prisma.$disconnect();
}

main().catch(console.error);
