//
//  environment.ts
//  server
//
//  Created by d-exclaimation on 23:45.
//

export const __env__ = process.env["NODE_ENV"] ?? "development";
export const __prod__ = __env__ === "production";
export const __port__ = (() => {
  const defPort = 4000;
  const res = parseInt(process.env["PORT"] ?? `${defPort}`);
  return isNaN(res) ? 4000 : res;
})();
