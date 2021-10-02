//
//  useToast.ts
//  web
//
//  Created by d-exclaimation on 16:48.
//

import { useState } from "react";
import { Toast } from "../../interfaces/Toast";

export function useToast() {
  const [flags, setFlags] = useState<Toast[]>([]);

  const toast = (newFlag: Toast) => {
    const newFlags = flags.slice();
    newFlags.splice(0, 0, newFlag);

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
