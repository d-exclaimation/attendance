//
//  auth.ts
//  server
//
//  Created by d-exclaimation on 22:57.
//
import { PrismaClient } from "@prisma/client";
import { Response } from "express";
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
  const expiration = 60 * 60;
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

/** Refresh Permission */
type RefreshPermission = {
  tid: string;
};

/** Refresh Cookie with new refresh token */
export const setRefreshCookie = (res: Response, t: RefreshPermission) => {
  const { refreshSecret } = artifacts;
  const expiration = 60 * 60 * 24 * 7;
  const token = jwt.sign(t, refreshSecret, {
    expiresIn: expiration,
  });
  res.cookie("jid", token, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
};

/** Refresh credentials */
export const refreshCredentials = async (
  prisma: PrismaClient,
  token: string
) => {
  const { refreshSecret, adminPassword } = artifacts;
  const res: Try<JwtPayload> = await new Promise((resolve) =>
    jwt.verify(token, refreshSecret, (err, result) => {
      if (err || !result) resolve(Failure(err));
      else resolve(Ok(result));
    })
  );
  if (res.type == "error") return null;
  try {
    const { tid } = res.data as RefreshPermission;
    // For admins
    if (isAdmin(tid)) {
      return signCredentials({ id: adminPassword, name: "admin" });
    }

    const user = await prisma.user.findFirst({ where: { id: tid } });
    if (!user) return null;
    return signCredentials(user);
  } catch (e) {
    return null;
  }
};
