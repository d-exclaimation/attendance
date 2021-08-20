//
//  Try.ts
//  server
//
//  Created by d-exclaimation on 23:19.
//

/**
 * Try wrapper to safely handle error
 */
export type Try<T> =
  | { type: "ok"; data: T }
  | { type: "error"; error: unknown };

/**
 * Create a new "ok" Try
 * @param data Successful data.
 * @returns Try of the same type of data.
 */
export function Ok<T>(data: T): Try<T> {
  return {
    type: "ok",
    data,
  };
}

/**
 * Create a new "error" Try.
 * @param error Any error type.
 * @returns Try of any type.
 */
export function Failure<T>(error: unknown): Try<T> {
  return {
    type: "error",
    error,
  };
}
