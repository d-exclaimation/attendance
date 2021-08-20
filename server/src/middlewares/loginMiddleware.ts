//
//  loginMiddleware.ts
//  server
//
//  Created by d-exclaimation on 00:41.
//

import { User } from "@prisma/client";
import { IncomingHttpHeaders } from "http";
import { getAuthorizationKey, unsignToken } from "../utils/auth";
import { Session } from "./../context";

/**
 * Get user from authorization token or return null.
 * @param headers Incoming Request Headers.
 * @returns The user or null.
 */
export const loginMiddleware = async (
  headers: IncomingHttpHeaders
): Promise<Session> => {
  const auth = getAuthorizationKey(headers);
  if (!auth) return null;
  // Just in case type casting fails.
  const res = await unsignToken<User>(auth);
  if (!res) return null;

  const login = res.id !== undefined && res.name !== undefined ? res : null;
  return login;
};
