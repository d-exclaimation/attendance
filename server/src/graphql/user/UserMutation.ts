//
//  UserMutation.ts
//  server
//
//  Created by d-exclaimation on 21:11.
//

import { extendType, nonNull } from "nexus";
import { signUp } from "../../database/mutations";
import {
  isAdmin,
  isEmployee,
  refreshCredentials,
  setRefreshCookie,
  signCredentials,
} from "../../utils/auth";

/** User section of Mutation */
export const UserMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("login", {
      type: "LoginResult",
      description: "Log-in mutation with credentials",
      args: {
        credential: nonNull("Credentials"),
      },
      resolve: async (_s, { credential }, { db, res }) => {
        const { username, password } = credential;
        const _isEmployee = isEmployee(password);
        const _isAdmin = isAdmin(password);

        if (!_isAdmin && !_isEmployee) return { password };

        if (_isAdmin) {
          const admin = { id: password, name: "admin" };
          setRefreshCookie(res, { tid: password });
          return { user: admin, ...signCredentials(admin) };
        }

        try {
          const user = await db.user.findFirst({ where: { name: username } });
          if (!user) return { username };

          setRefreshCookie(res, { tid: user.id });
          return { user, ...signCredentials(user) };
        } catch (_: unknown) {
          return { username };
        }
      },
    });

    t.nonNull.field("signup", {
      type: "SignUpResult",
      description: "Sign-up mutation with credentials",
      args: {
        credential: nonNull("Credentials"),
      },
      resolve: async (_src, { credential }, { db }) => {
        const { password, username } = credential;
        if (!isAdmin(password)) return { password };
        const res = await signUp(db, { name: username });
        switch (res.type) {
          case "ok":
            return { userInfo: res.data };
          default:
            return { username };
        }
      },
    });

    t.nonNull.field("refresh", {
      type: "RefreshResult",
      description: "Refresh token query",
      resolve: async (_s, _a, { session, db, req }) => {
        const refreshToken = req.cookies.jid;
        if (!refreshToken) {
          return { message: "Cannot find the refresh token" };
        }
        const access = await refreshCredentials(db, refreshToken);
        if (!access) return { username: session?.name ?? "Tanpa Nama" };

        return access;
      },
    });
  },
});
