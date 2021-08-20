//
//  auth.ts
//  server
//
//  Created by d-exclaimation on 22:57.
//
import { User } from "@prisma/client";
import { IncomingHttpHeaders } from "http";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Session } from "../context";
import { Failure, Ok, Try } from "../models/Try";
import { artifacts } from "./../constant/artifacts";

/** Check if password is either belonging to a user */
export const isEmployee = (pass: string) => {
  const { password } = artifacts;
  return password == pass;
};

/** Check if password is either belonging to an admin */
export const isAdmin = (pass: string) => {
  const { adminPassword } = artifacts;
  return pass == adminPassword;
};

/** Check if password is either belonging to an admin or a user */
export const isEmployeeOrAdmin = (pass: string) =>
  isEmployee(pass) || isAdmin(pass);

/**
 * Get user from authorization token or return null.
 * @param headers Incoming Request Headers.
 * @returns The user or null.
 */
export const loginContext = async (
  headers: IncomingHttpHeaders
): Promise<Session> => {
  const auth = getAuthorizationKey(headers);
  const notLoggedIn = { login: null, isLogin: false };
  if (!auth) return notLoggedIn;
  // Just in case type casting fails.
  const res = await unsignToken<User>(auth);
  if (!res) return notLoggedIn;

  const login = res.id !== undefined && res.name !== undefined ? res : null;
  return {
    login,
    isLogin: !!login,
  };
};

/**
 * Getting Authorixation Token
 * @param headers Incoming HTTP Header to get Token.
 * @returns Token value.
 */
export const getAuthorizationKey = (headers: IncomingHttpHeaders) => {
  if (!headers.authorization || !headers.authorization.startsWith("Bearer "))
    return null;
  const [_b, auth] = headers.authorization.split(" ");
  return auth;
};

/**
 * Sign any object
 * @param obj Object to be sign with JWT.
 * @returns JWT String.
 */
export const signCredentials = <T extends object>(obj: T) => {
  const { jwtSecret } = artifacts;
  return jwt.sign(obj, jwtSecret);
};

/**
 * Get an object from JWT token.
 * @param token Token value.
 * @returns Parsed Token
 */
export const unsignToken = async <T extends object>(
  token: string
): Promise<T | null> => {
  const { jwtSecret } = artifacts;
  const res: Try<JwtPayload> = await new Promise((resolve) =>
    jwt.verify(token, jwtSecret, (err, result) => {
      if (err || !result) resolve(Failure(err));
      else resolve(Ok(result));
    })
  );

  return res.type == "ok" ? (res.data as T) : null;
};
