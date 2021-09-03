//
//  client.ts
//  web
//
//  Created by d-exclaimation on 11:02.
//

import { createClient } from "urql";
import { artifacts } from "./../constant/artifacts";

export const client = createClient({
  url: artifacts.url,
  fetchOptions: () => {
    return {
      credentials: "include",
    };
  },
});
