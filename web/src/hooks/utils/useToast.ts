//
//  useToast.ts
//  web
//
//  Created by d-exclaimation on 16:48.
//

import { useState } from "react";
import { Toast } from "../../interfaces/Toast";

type ToastID = Toast & { id: string };

export function useToast() {
  const [flags, setFlags] = useState<ToastID[]>([]);

  const toast = (newFlag: Toast) => {
    const id = new Date().toISOString() + `${Math.random().toFixed(4)}`;
    const newFlags = flags.slice();
    newFlags.splice(0, 0, { ...newFlag, id });

    setFlags(newFlags);
  };

  const onDismissed: (id: string | number, analyticsEvent: any) => void =
    () => {
      setFlags(flags.slice(1));
    };

  return {
    toast,
    onDismissed,
    flags,
  };
}
