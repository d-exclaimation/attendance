//
//  isAuth.ts
//  server
//
//  Created by d-exclaimation on 00:32.
//

import { Context } from "../context";
import { isAdmin } from "./auth";

export const isAuth = <TRoot, TArgs>(
  _s: TRoot,
  _a: TArgs,
  { session }: Context
): boolean => !!session;

export const isAuthAdmin = <TRoot, TArgs>(
  _s: TRoot,
  _a: TArgs,
  { session }: Context
): boolean => !!session && isAdmin(session.id);
