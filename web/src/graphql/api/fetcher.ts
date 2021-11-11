//
//  fetcher.ts
//  web
//
//  Created by d-exclaimation on 05:25.
//
import { GraphQLError } from "graphql";
import { AuthStore } from "./../../auth/AuthStore";
import { artifacts } from "./../../constant/artifacts";

/**
 * Make a header object given the AuthStore
 * @returns A header object if token exist
 */
function makeAuth(): { [key: string]: string } {
  const token = AuthStore.shared.token;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/**
 * Custom Network Fetcher for GraphQL Request
 * @param query Query string used to send request
 * @param variables Variables attached to the query
 * @returns An async function to return the graphql data or throw an exceptions.
 */
export function gqlFetcher<TData, TVariables>(
  query: string,
  variables?: TVariables
) {
  return async (): Promise<TData> => {
    const res = await fetch(artifacts.url, {
      method: "POST",
      mode: "cors",
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

      throw new GraphQLError(message);
    }

    return json.data;
  };
}
