import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Maybe, useCheckLoginQuery, useRefreshMutation } from "../graphql/core";
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

/**
 * Provide Logic and functionality to a Auth Context.
 * @returns Authorization related data that are binded to a state and refs.
 */
export function useAuthProvider(): Auth {
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
        if (cronRef.current) clearTimeout(cronRef.current as any);

        const expiration = new Date(expireAt);
        const diff = expiration.getTime() - new Date().getTime();

        // Store value in the store
        AuthStore.shared.setAuth({ expireAt, token });
        getUser();
        setProgress(false);

        // Register a background / cron job to invalidate the token.
        cronRef.current = setTimeout(async () => {
          await refresh();
        }, diff);
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
    refresh();
    /* eslint-disable */
  }, []);

  return {
    loading: inProgress || fetching,
    user: data?.me,
    updateAuth,
    isAdmin: (data?.me?.name.toLowerCase() ?? "not Admin") === "admin",
  };
}

/** Access Auth Context */
export function useAuth(): Auth {
  return useContext(AuthContext);
}
