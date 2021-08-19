//
//  FailedResult.ts
//  server
//
//  Created by d-exclaimation on 16:03.
//

import { objectType } from "nexus";

export const UserAlreadyExist = objectType({
  name: "UserAlreadyExist",
  description: "Result for indicating that user already exists",
  definition(t) {
    t.nonNull.string("username");
  },
});

export const InvalidCredentials = objectType({
  name: "InvalidCredentials",
  description: "Result for indicating that the credentials are invalid",
  definition(t) {
    t.nonNull.string("password");
  },
});

export const UserNotFound = objectType({
  name: "UserNotFound",
  description:
    "Result for indicating that no user of that credentials is found",
  definition(t) {
    t.nonNull.string("username");
  },
});
