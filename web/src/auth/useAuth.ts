//
//  useAuth.ts
//  web
//
//  Created by d-exclaimation on 00:28.
//

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useQueryClient } from "react-query";
import {
  Exact,
  Maybe,
  RefreshMutation,
  useCheckLoginQuery,
  useRefreshMutation,
} from "../graphql/api";
import { AuthStore } from "./AuthStore";

/** User Account GraphQL Object  */
type UserAccount =
  | Maybe<{ __typename: "User"; id: string; name: string }>
  | undefined;

/** Auth Results */
type Auth = {
  loading: boolean;
  user: UserAccount;
  updateAuth: (expireAt: string, token: string) => void;
  isAdmin: boolean;
};

/** Empty Auth object */
const empty: Auth = {
  loading: false,
  user: undefined,
  updateAuth: () => {},
  isAdmin: false,
};

/** Auth React Context */
export const AuthContext = createContext(empty);

type SuccessCallback = (
  data: RefreshMutation,
  variables: Exact<{
    [key: string]: never;
  }>,
  context: unknown
) => void | Promise<unknown>;

/**
 * Provide Logic and functionality to a Auth Context.
 * @returns Authorization related data that are binded to a state and refs.
 */
export function useAuthProvider(): Auth {
  const queryClient = useQueryClient();
  const [inProgress, setProgress] = useState(true);
  const { mutate } = useRefreshMutation({
    onError: () => {
      setProgress(false);
    },
  });
  const { isLoading, data } = useCheckLoginQuery(undefined, {
    enabled: true,
    retryOnMount: true,
    staleTime: 1000 * 60 * 30,
  });

  const cronRef = useRef<NodeJS.Timeout | number | null>(null);

  const updateAuth = useCallback(
    (expireAt: string, token: string) => {
      try {
        if (cronRef.current) clearTimeout(cronRef.current as any);

        const expiration = new Date(expireAt);
        const diff = expiration.getTime() - new Date().getTime();

        // Store value in the store
        AuthStore.shared.setAuth({ expireAt, token });
        setProgress(false);

        // Register a background / cron job to invalidate the token.
        cronRef.current = setTimeout(() => refresh(), diff);
        queryClient.invalidateQueries("CheckLogin");
      } catch (_) {}
    },

    /* eslint-disable */
    [setProgress]
  );

  function refresh() {
    const onSuccess: SuccessCallback = (data) => {
      const val = data.refresh;

      switch (val.__typename) {
        case "AccessCredentials":
          const { expireAt, token } = val;
          updateAuth(expireAt, token);
          break;
        default:
          setProgress(false);
          queryClient.invalidateQueries("CheckLogin");
          break;
      }
    };
    mutate({}, { onSuccess });
  }

  useEffect(() => {
    refresh();
    /* eslint-disable */
  }, []);

  return {
    loading: inProgress || isLoading,
    user: data?.me,
    updateAuth,
    isAdmin: (data?.me?.name.toLowerCase() ?? "not Admin") === "admin",
  };
}

/** Access Auth Context */
export function useAuth(): Auth {
  return useContext(AuthContext);
}
