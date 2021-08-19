//
//  User.ts
//  server
//
//  Created by d-exclaimation on 09:37.
//
import { extendType, nonNull, objectType } from "nexus";

export const UserType = objectType({
  name: "User",
  description: "User object type for each employee signed-in",
  definition(t) {
    t.nonNull.id("id");
    t.nonNull.string("name");
    t.nonNull.list.nonNull.field("attendances", {
      type: "Attendance",
      resolve: async ({ id }, _args, { db, attendanceLoader }) => {
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

export const UserQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("employees", {
      type: "User",
      description: "Gettings all employees",
      resolve: async (_source, _arg, { db }) => {
        const res = await db.user.findMany();
        return res.map(({ id, name }) => ({
          id,
          name,
        }));
      },
    });

    t.nonNull.boolean("me", {
      description: "Me query",
      resolve: async () => true,
    });
  },
});

export const UserMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("login", {
      type: "LoginResult",
      description: "Log-in mutation with credentials",
      args: {
        credential: nonNull("Credentials"),
      },
      resolve: async (_source, { credential }, {}) => {
        try {
          if (credential.password === "exception") throw new Error("OK");
          const user = { id: "ok", name: "Vincent" };
          // const user = await db.user.create({
          //   data: {
          //     name: credential.username,
          //   },
          // });
          return user;
        } catch (e: unknown) {
          return {
            username: credential.username,
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
        try {
          if (credential.password === "exception") throw new Error("OK");
          const user = { id: "ok", name: "Vincent" };
          // const user = await db.user.create({
          //   data: {
          //     name: credential.username,
          //   },
          // });
          return user;
        } catch (e: unknown) {
          return {
            username: credential.username,
          };
        }
      },
    });
  },
});
