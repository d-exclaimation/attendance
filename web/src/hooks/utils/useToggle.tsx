//
//  useToggle.tsx
//  web
//
//  Created by d-exclaimation on 07:39.
//

import { useCallback, useState } from "react";

export function useToggle(def?: boolean) {
  const [state, setState] = useState(def ?? false);
  const toggler = useCallback(
    (override?: boolean) => setState((prev) => override ?? !prev),
    [setState]
  );
  return {
    is: state,
    toggler,
  };
}
