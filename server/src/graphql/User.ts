//
//  User.ts
//  server
//
//  Created by d-exclaimation on 09:37.
//
import { extendType, nonNull, objectType } from "nexus";
import { isAuth } from "../utils/isAuth";
import {
  isAdmin,
  isEmployee,
  isEmployeeOrAdmin,
  setRefreshCookie,
  signCredentials,
} from "./../utils/auth";

/** User schema */
export const UserType = objectType({
  name: "User",
  description: "User object type for each employee signed-in",
  definition(t) {
    t.nonNull.id("id");
    t.nonNull.string("name");
    t.nonNull.list.nonNull.field("attendances", {
      type: "Attendance",
      resolve: async ({ id }, _args, { attendanceLoader }) => {
        const res = await attendanceLoader.load(id);
        return res.map((res) => ({
          ...res,
          entryAt: res.entryAt.toISOString(),
          leaveAt: res.leaveAt?.toISOString() as string | null | undefined,
        }));
      },
    });
  },
});

/** User section of Query */
export const UserQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("employees", {
      type: "User",
      description: "Gettings all employees",
      authorize: isAuth,
      resolve: async (_source, _arg, { db }) => {
        const res = await db.user.findMany();
        return res.map(({ id, name }) => ({
          id,
          name,
        }));
      },
    });

    t.field("me", {
      type: "User",
      description: "Me query",
      resolve: async (_s, _a, { session, db }) => {
        try {
          if (!session) return null;
          if (isAdmin(session.id)) return session;

          return await db.user.findFirst({
            where: { id: session.id },
          });
        } catch (_) {
          return null;
        }
      },
    });
  },
});

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
        if (!isEmployeeOrAdmin(password)) return { password };
        try {
          const user = await db.user.create({ data: { name: username } });
          return { user, ...signCredentials(user) };
        } catch (e: unknown) {
          return { username };
        }
      },
    });
  },
});
