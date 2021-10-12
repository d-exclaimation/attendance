//
//  client.ts
//  web
//
//  Created by d-exclaimation on 11:02.
//

import { createClient } from "urql";
import { AuthStore } from "./../auth/AuthStore";
import { artifacts } from "./../constant/artifacts";

/**
 * urql Client using the AuthStore
 */
export const client = createClient({
  url: artifacts.url,
  fetchOptions: () => {
    const auth = makeAuth();
    return {
      credentials: "include",
      ...auth,
    };
  },
});

/**
 * Make a header object given the AuthStore
 * @returns A header object if token exist
 */
function makeAuth(): object {
  const token = AuthStore.shared.token;
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
}
