//
//  Try.ts
//  server
//
//  Created by d-exclaimation on 23:19.
//

export type Try<T> =
  | { type: "success"; data: T }
  | { type: "failure"; error: unknown };

export function Return<T>(data: T): Try<T> {
  return {
    type: "success",
    data,
  };
}

export function Failure<T>(error: unknown): Try<T> {
  return {
    type: "failure",
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
    case "success":
      return success(t.data);
    case "failure":
      return failure(t.error);
    default:
      return failure(new Error("Nothing"));
  }
}
