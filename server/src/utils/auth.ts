//
//  auth.ts
//  server
//
//  Created by d-exclaimation on 22:57.
//

import { artifacts } from "./../constant/artifacts";

export const isEmployee = (pass: string) => {
  const { password } = artifacts;
  return password == pass;
};

export const isAdmin = (pass: string) => {
  const { adminPassword } = artifacts;
  return pass == adminPassword;
};
