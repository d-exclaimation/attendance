//
//  index.ts
//  server
//
//  Created by d-exclaimation on 8:17 AM.
//  Copyright © 2021 d-exclaimation. All rights reserved.
//
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { PrismaClient } from "@prisma/client";
import { json } from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import depthLimit from "graphql-depth-limit";
import { createServer } from "http";
import { __port__ } from "./constant/environment";
import { Context } from "./context";
import { applyMiddleware } from "./middlewares/applyMiddleware";
import { schema } from "./schema";
import { AllowIntrospection } from "./utils/validationRules/AllowIntrospection";

async function main() {
  const prisma = new PrismaClient({
    log: ["query"],
  });
  const app = express();
  const httpServer = createServer(app);

  app.set("proxy", 1);
  app.use(cookieParser());
  app.get("/", (_, res) => {
    res.redirect(301, "https://att-zentax.netlify.app");
  });

  const server = new ApolloServer<Context>({
    schema,
    introspection: true,
    validationRules: [depthLimit(3)],
    plugins: [
      AllowIntrospection,
      {
        async serverWillStart() {
          await prisma.$connect();
          return {
            async serverWillStop() {
              await prisma.$disconnect();
            },
          };
        },
      },
    ],
  });

  // This part will apply GraphQL on the request,
  // any middleware that require data directly from request needed to assign before this line
  await server.start();

  app.use(
    cors({
      credentials: true,
      origin: [
        "https://studio.apollographql.com",
        "http://localhost:3000",
        "z-attendance.netlify.app",
        "http://att-zentax.netlify.app",
        "att-zentax.netlify.app",
        "https://att-zentax.netlify.app",
      ],
      allowedHeaders: [
        "Authorization",
        "Content-Type",
        "Proxy-Authorization",
        "Sec-WebSocket-Protocol",
        "User-Agent",
        "X-Requested-With",
        "apollographql-client-name",
        "apollographql-client-version",

        // Custom headers allowed through cors
        "Intro-Key",
      ],
    }),
    json(),
    expressMiddleware(server, {
      context: async (ctx): Promise<Context> => applyMiddleware(ctx, prisma),
    })
  );

  httpServer.listen(__port__, () => {
    console.log(`Server starting at http://localhost:${__port__}`);
  });
}

main().catch(console.error);
