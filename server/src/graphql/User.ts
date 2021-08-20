//
//  User.ts
//  server
//
//  Created by d-exclaimation on 09:37.
//
import { extendType, nonNull, objectType } from "nexus";
import {
  isAdmin,
  isEmployee,
  isEmployeeOrAdmin,
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
      resolve: async (_source, _arg, { db, session: { isLogin } }) => {
        if (!isLogin) throw new Error("Invalid permission");
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
      resolve: async (_s, _a, { session: { login } }) => {
        try {
          if (!login) return null;
          return login;
        } catch (e: unknown) {
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
      resolve: async (_s, { credential }, {}) => {
        const { username, password } = credential;
        const _isEmployee = isEmployee(password);
        const _isAdmin = isAdmin(password);

        if (!_isAdmin && !_isEmployee) return { password };

        if (_isAdmin) {
          const admin = { id: password, name: "admin" };
          return { user: admin, token: signCredentials(admin) };
        }

        try {
          const user = { id: "ok", name: username };

          // TODO: This should be replaced with fetching data from database and setting the session / JWT Auth
          if (Math.random() < 0.3) throw "Fucked";
          // const user = await db.user.find({
          //   data: {
          //     name: credential.username,
          //   },
          // });
          return { user, token: signCredentials(user) };
        } catch (e: unknown) {
          return {
            username,
          };
        }
      },
    });

    t.nonNull.field("signup", {
      type: "SignUpResult",
      description: "Sign-up mutation with credentials",
      args: {
        credential: nonNull("Credentials"),
      },
      resolve: async (_src, { credential }, {}) => {
        const { password, username } = credential;
        if (!isEmployeeOrAdmin(password)) return { password };
        try {
          const user = { id: "ok", name: username };

          // TODO: Perform mutation on the server and setting the session or JWT Auth
          if (Math.random() < 0.2) throw "This fails boiii";
          // const user = await db.user.create({
          //   data: {
          //     name: credential.username,
          //   },
          // });
          return { user, token: signCredentials(user) };
        } catch (e: unknown) {
          console.log(e);
          return {
            username,
          };
        }
      },
    });
  },
});
