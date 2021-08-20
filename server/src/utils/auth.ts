//
//  auth.ts
//  server
//
//  Created by d-exclaimation on 22:57.
//
import { IncomingHttpHeaders } from "http";
import jwt, { JwtPayload } from "jsonwebtoken";
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
  const expiration = 60 * 60 * 24 * 14;
  const expireAt = new Date(
    new Date().getTime() + 1000 * expiration
  ).toISOString();
  return {
    token: jwt.sign(obj, jwtSecret, {
      expiresIn: expiration,
    }),
    expireAt,
  };
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
