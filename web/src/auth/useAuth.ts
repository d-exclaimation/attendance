//
//  useAuth.ts
//  web
//
//  Created by d-exclaimation on 01:23.
//

import { createContext, useCallback, useEffect, useRef, useState } from "react";
import { Maybe, useCheckLoginQuery, useRefreshMutation } from "../graphql/core";
import { AuthStore } from "./AuthStore";

type Auth = {
  loading: boolean;
  user:
    | Maybe<{
        __typename: "User";
        id: string;
        name: string;
      }>
    | undefined;
  updateAuth: (expireAt: string, token: string) => void;
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
  const cronRef = useRef<NodeJS.Timeout | number | null>(null);

  const updateAuth = useCallback(
    (expireAt: string, token: string) => {
      try {
        if (cronRef) clearTimeout(cronRef.current as NodeJS.Timeout);

        const expiration = new Date(expireAt);
        const diff = expiration.getTime() - new Date().getTime();

        // Store value in the store
        AuthStore.shared.setAuth({ expireAt, token });
        getUser();
        setProgress(false);

        cronRef.current = setTimeout(async () => await refresh(), diff);
      } catch (_) {}
    },

    /* eslint-disable */
    [setProgress, getUser]
  );

  async function refresh() {
    const res = await mutate();
    if (!res.data || res.error) return;

    const val = res.data.refresh;

    switch (val.__typename) {
      case "AccessCredentials":
        const { expireAt, token } = val;
        updateAuth(expireAt, token);
        break;
      default:
        setProgress(false);
        getUser();
        break;
    }
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
