//
//  useAuth.ts
//  web
//
//  Created by d-exclaimation on 01:23.
//

import { createContext, useCallback, useEffect, useState } from "react";
import { AuthStore } from "../../auth/AuthStore";
import {
  Maybe,
  useCheckLoginQuery,
  useRefreshMutation,
} from "../../graphql/core";

type Auth = {
  loading: boolean;
  user:
    | Maybe<{
        __typename: "User";
        id: string;
        name: string;
      }>
    | undefined;
  updateAuth: (expireAt: string) => void;
};

const empty: Auth = {
  loading: false,
  user: undefined,
  updateAuth: () => {},
};

export const AuthContext = createContext(empty);

export function useAuth(): Auth {
  const [inProgress, setProgress] = useState(true);
  const [, mutate] = useRefreshMutation();
  const [{ fetching, data }, getUser] = useCheckLoginQuery({
    pause: true,
    requestPolicy: "network-only",
  });

  const updateAuth = useCallback((expireAt: string) => {
    try {
      const expiration = new Date(expireAt);
      const diff = expiration.getTime() - new Date().getTime();
      setTimeout(async () => await refresh(), diff);
    } catch (_) {}
  }, []);

  async function refresh() {
    const res = await mutate();
    if (!res.data || res.error) return;

    const val = res.data.refresh;

    switch (val.__typename) {
      case "AccessCredentials":
        const { expireAt, token } = val;
        AuthStore.shared.setAuth({ expireAt, token });
        updateAuth(expireAt);
        break;
      default:
        break;
    }
    setProgress(false);
    getUser();
  }

  useEffect(() => {
    refresh().catch(console.error);
    /* eslint-disable */
  }, []);

  return {
    loading: inProgress || fetching,
    user: data?.me,
    updateAuth,
  };
}
