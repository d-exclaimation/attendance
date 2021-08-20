//
//  Credentials.ts
//  server
//
//  Created by d-exclaimation on 17:24.
//
import { inputObjectType, objectType, unionType } from "nexus";

/**
 * User inputed Credentials Object
 */
export const CredentialsType = inputObjectType({
  name: "Credentials",
  description: "User credentials",
  definition(t) {
    t.nonNull.string("username");
    t.nonNull.string("password");
  },
});

/**
 * Server credential payload
 */
export const UserCredentialsType = objectType({
  name: "UserCredentials",
  description: "Wrapper for user with jwt",
  definition(t) {
    t.nonNull.field("user", {
      type: "User",
    });

    t.nonNull.string("token");
    t.nonNull.string("expireAt");
  },
});

/** Possible Sign Up result handled in a GraphQL Smart manner */
export const SignUpResultType = unionType({
  name: "SignUpResult",
  description: "Result of a sign up mutation",
  definition(t) {
    t.members("UserCredentials", "UserAlreadyExist", "InvalidCredentials");
  },
  resolveType: (item) => {
    const __typename =
      "username" in item
        ? "UserAlreadyExist"
        : "password" in item
        ? "InvalidCredentials"
        : "token" in item
        ? "UserCredentials"
        : null;

    if (!__typename) throw new Error("Cannot resolve union type");

    return __typename;
  },
});

/** Possible Login Result handled in a GraphQL Smart manner */
export const LoginResultType = unionType({
  name: "LoginResult",
  description: "Result of a log in mutation",
  definition(t) {
    t.members("UserCredentials", "UserNotFound", "InvalidCredentials");
  },
  resolveType: (item) => {
    const __typename =
      "username" in item
        ? "UserNotFound"
        : "password" in item
        ? "InvalidCredentials"
        : "token" in item
        ? "UserCredentials"
        : null;

    if (!__typename) throw new Error("Cannot resolve union type");

    return __typename;
  },
});
