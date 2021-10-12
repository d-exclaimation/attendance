//
//  fetcher.ts
//  web
//
//  Created by d-exclaimation on 05:25.
//

import { AuthStore } from "./../../auth/AuthStore";

/**
 * Make a header object given the AuthStore
 * @returns A header object if token exist
 */
function makeAuth(): object {
  const token = AuthStore.shared.token;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export function gqlFetcher<TData, TVariables>(
  query: string,
  variables?: TVariables
) {
  return async (): Promise<TData> => {
    const res = await fetch("http://localhost:4000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...makeAuth(),
      },
      body: JSON.stringify({ query, variables }),
      credentials: "include",
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  };
}
