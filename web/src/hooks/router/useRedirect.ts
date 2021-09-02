//
//  useRedirect.ts
//  web
//
//  Created by d-exclaimation on 08:08.
//
import { useCallback } from "react";
import { useHistory } from "react-router-dom";

export function useRedirect() {
  const h = useHistory();
  const redirect = useCallback(
    (location: string): void => {
      setTimeout(() => h.push(location), 0);
    },
    [h]
  );
  return redirect;
}
