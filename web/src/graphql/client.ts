//
//  client.ts
//  web
//
//  Created by d-exclaimation on 11:02.
//

import { createClient } from "urql";
import { AuthStore } from "./../auth/AuthStore";
import { artifacts } from "./../constant/artifacts";

export const client = createClient({
  url: artifacts.url,
  fetchOptions: () => {
    const auth: object = AuthStore.shared.token
      ? { headers: { Authorization: `Bearer ${AuthStore.shared.token}` } }
      : {};
    return {
      credentials: "include",
      ...auth,
    };
  },
});
