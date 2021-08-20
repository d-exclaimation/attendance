//
//  FailedResult.ts
//  server
//
//  Created by d-exclaimation on 16:03.
//

import { objectType } from "nexus";

/** Indicating user already exist and cannot perform operation */
export const UserAlreadyExistType = objectType({
  name: "UserAlreadyExist",
  description: "Result for indicating that user already exists",
  definition(t) {
    t.nonNull.string("username");
  },
});

/** Identifing that the credentials given are not valid */
export const InvalidCredentialsType = objectType({
  name: "InvalidCredentials",
  description: "Result for indicating that the credentials are invalid",
  definition(t) {
    t.nonNull.string("password");
  },
});

/** Identifying that user is not found in the database */
export const UserNotFoundType = objectType({
  name: "UserNotFound",
  description:
    "Result for indicating that no user of that credentials is found",
  definition(t) {
    t.nonNull.string("username");
  },
});
