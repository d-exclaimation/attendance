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

export const SignUpSucessType = objectType({
  name: "SignUpSuccess",
  description: "User confirmation for sign up",
  definition(t) {
    t.nonNull.field("userInfo", {
      type: "User",
    });
  },
});

/** Possible Sign Up result handled in a GraphQL Smart manner */
export const SignUpResultType = unionType({
  name: "SignUpResult",
  description: "Result of a sign up mutation",
  definition(t) {
    t.members("SignUpSuccess", "UserAlreadyExist", "InvalidCredentials");
  },
  resolveType: (item) => {
    const __typename =
      "username" in item
        ? "UserAlreadyExist"
        : "password" in item
        ? "InvalidCredentials"
        : "userInfo" in item
        ? "SignUpSuccess"
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

/** No Token found */
export const NoTokenType = objectType({
  name: "NoToken",
  description: "No token found",
  definition(t) {
    t.nonNull.string("message");
  },
});

/** Access token and friends without the user */
export const AccessCredentialsType = objectType({
  name: "AccessCredentials",
  description: "Access token and friends without the user",
  definition(t) {
    t.nonNull.string("token");
    t.nonNull.string("expireAt");
  },
});

/** Refreshing result */
export const RefreshResultType = unionType({
  name: "RefreshResult",
  description: "Result of refreshing a token",
  definition(t) {
    t.members("UserNotFound", "AccessCredentials", "NoToken");
  },
  resolveType: (item) => {
    const __typename =
      "username" in item
        ? "UserNotFound"
        : "message" in item
        ? "NoToken"
        : "token" in item
        ? "AccessCredentials"
        : null;

    if (!__typename) throw new Error("Cannot resolve union type");

    return __typename;
  },
});
