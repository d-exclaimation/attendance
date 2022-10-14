//
//  artifacts.ts
//  server
//
//  Created by d-exclaimation on 22:58.
//

export const artifacts = {
  password: process.env["GLOBAL_PASSWORD"] ?? "this_is_a_password",
  adminPassword: process.env["ADMIN_PASSWORD"] ?? "this_is_admin",
  jwtSecret: process.env["JWT_SECRET"] ?? "aaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  refreshSecret: process.env["REFRESH_SECRET"] ?? "refresh-boy",
  introspectionKey: process.env["INTRO_KEY"] ?? "okboomer"
};
