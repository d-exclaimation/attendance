//
//  User.ts
//  server
//
//  Created by d-exclaimation on 09:37.
//
import { objectType } from "nexus";

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
