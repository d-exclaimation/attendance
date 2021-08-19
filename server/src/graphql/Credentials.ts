//
//  Credentials.ts
//  server
//
//  Created by d-exclaimation on 15:49.
//
import { inputObjectType, unionType } from "nexus";

export const Credentials = inputObjectType({
  name: "Credentials",
  description: "User credentials",
  definition(t) {
    t.nonNull.string("username");
    t.nonNull.string("password");
  },
});

export const SignUpResult = unionType({
  name: "SignUpResult",
  description: "Result of a sign up mutation",
  definition(t) {
    t.members("User", "UserAlreadyExist", "InvalidCredentials");
  },
  resolveType: (item) => {
    const __typename =
      "username" in item
        ? "UserAlreadyExist"
        : "password" in item
        ? "InvalidCredentials"
        : "id" in item
        ? "User"
        : null;

    if (!__typename) throw new Error("Cannot resolve union type");

    return __typename;
  },
});

export const LoginResult = unionType({
  name: "LoginResult",
  description: "Result of a log in mutation",
  definition(t) {
    t.members("User", "UserNotFound", "InvalidCredentials");
  },
  resolveType: (item) => {
    const __typename =
      "username" in item
        ? "UserNotFound"
        : "password" in item
        ? "InvalidCredentials"
        : "id" in item
        ? "User"
        : null;

    if (!__typename) throw new Error("Cannot resolve union type");

    return __typename;
  },
});
