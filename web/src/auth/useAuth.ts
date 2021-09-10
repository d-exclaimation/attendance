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

type UserAccount =
  | Maybe<{ __typename: "User"; id: string; name: string }>
  | undefined;

type Auth = {
  loading: boolean;
  user: UserAccount;
  updateAuth: (expireAt: string, token: string) => void;
  isAdmin: boolean;
};

const empty: Auth = {
  loading: false,
  user: undefined,
  updateAuth: () => {},
  isAdmin: false,
};

export const AuthContext = createContext(empty);

export function useAuthProvider(): Auth {
  const [inProgress, setProgress] = useState(true);
  const [, mutate] = useRefreshMutation();
  const [{ fetching, data }, getUser] = useCheckLoginQuery({
    pause: true,
    requestPolicy: "network-only",
  });

  const cronRef = useRef<NodeJS.Timeout | number | null>(null);
  const triggerRef = useRef<boolean>(false);

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

        cronRef.current = setTimeout(async () => {
          triggerRef.current = false;
          await refresh();
        }, diff);
      } catch (_) {}
    },

    /* eslint-disable */
    [setProgress, getUser]
  );

  async function refresh() {
    if (triggerRef.current) return;
    triggerRef.current = true;

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

export function useAuth(): Auth {
  return useContext(AuthContext);
}
