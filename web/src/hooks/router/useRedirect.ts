//
//  useRedirect.ts
//  web
//
//  Created by d-exclaimation on 08:08.
//
import { useCallback } from "react";
import { useHistory } from "react-router-dom";

/**
 * A wrapper hook for handling redirect
 * in a evene-loop safe way
 * where all async task for the loop finished before redirection.
 *
 * @returns A function to perform thread / async -safe redirection.
 */
export function useRedirect() {
  const h = useHistory();
  const redirect = useCallback<(location: string) => void>(
    (location: string) => setTimeout(() => h.push(location), 0),
    [h]
  );
  return redirect;
}
