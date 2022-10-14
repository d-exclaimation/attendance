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
    // res.redirect(301, "https://google.com");
    res.redirect(301, "https://att-zentax.netlify.app");
  });

  const server = new ApolloServer({
    schema,
    introspection: true,
    context: async (ctx): Promise<Context> => applyMiddleware(ctx, prisma),
    validationRules: [depthLimit(3)],
    plugins: [
        AllowIntrospection
    ]
  });

  // This part will apply GraphQL on the request,
  // any middleware that require data directly from request needed to assign before this line
  await server.start();
  server.applyMiddleware({
    app,
    cors: {
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
      ]
    },
  });

  httpServer.listen(__port__, () => {
    console.log(`Server starting at http://localhost:${__port__}`);
  });
  await prisma.$disconnect();
}

main().catch(console.error);
