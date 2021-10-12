//
//  useToast.ts
//  web
//
//  Created by d-exclaimation on 16:48.
//
import { useCallback, useState } from "react";
import { Toast } from "../../interfaces/Toast";
import { WithID } from "./../../interfaces/utilities";

/**
 * A hook for handling toast related configurations.
 *
 * ---
 * ```tsx
 * const App: React.FC = () => {
 *   const {toast, ...toastOptions} = useToast();
 *
 *   return (<div>
 *     ...
 *     <MagicToast {...toastOptions}/>
 *   </div>);
 * }
 * ```
 *
 * @returns A set of options to configure a working MagicToast
 */
export function useToast() {
  const [flags, setFlags] = useState<Array<WithID<Toast>>>([]);

  const toast = useCallback(
    (newFlag: Toast) =>
      setFlags((prev) => {
        const id = new Date().toISOString() + `${Math.random().toFixed(4)}`;
        const newFlags = prev.slice();
        newFlags.splice(0, 0, { ...newFlag, id });

        return newFlags;
      }),
    [setFlags]
  );

  type OnDismiss = (id: string | number, analyticsEvent: any) => void;

  const onDismissed = useCallback<OnDismiss>(
    (id) => {
      setFlags((prev) =>
        prev.filter(({ id: tid }) => typeof id === "string" && tid !== id)
      );
    },
    [setFlags]
  );

  return {
    toast,
    onDismissed,
    flags,
  };
}
