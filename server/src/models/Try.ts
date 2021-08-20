//
//  Try.ts
//  server
//
//  Created by d-exclaimation on 23:19.
//

export type Try<T> =
  | { type: "ok"; data: T }
  | { type: "error"; error: unknown };

export function Ok<T>(data: T): Try<T> {
  return {
    type: "ok",
    data,
  };
}

export function Failure<T>(error: unknown): Try<T> {
  return {
    type: "error",
    error,
  };
}

type ResultMatcher<T, K> = {
  success: (data: T) => K;
  failure: (err: unknown) => K;
};

export function matchTry<T, R>(
  t: Try<T>,
  { success, failure }: ResultMatcher<T, R>
): R {
  switch (t.type) {
    case "ok":
      return success(t.data);
    case "error":
      return failure(t.error);
    default:
      return failure(new Error("Nothing"));
  }
}
