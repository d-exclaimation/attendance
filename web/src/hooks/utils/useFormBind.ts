//
//  useFormBind.ts
//  web
//
//  Created by d-exclaimation on 10:46.
//
import { useCallback, useEffect, useReducer, useRef } from "react";
import { useToggle } from "./useToggle";

/** Form Reducer Actions */
type FormActions =
  | { type: "bind"; payload: React.ChangeEvent<HTMLInputElement> }
  | { type: "reset"; def?: string }
  | { type: "clear" }
  | { type: "ignore" };

/**
 * Form reducer allowing for 4 types state manipulation efficiently.
 * @param state Current state when reducer was called.
 * @param actions Actions being dispatched.
 * @returns A new state of the same type.
 */
function formReducer(state: string, actions: FormActions): string {
  switch (actions.type) {
    case "bind":
      return actions.payload.target.value;
    case "clear":
      return "";
    case "reset":
      return actions.def ?? "";
    case "ignore":
      return state;
  }
}

/** Side effect listener for the given form state */
type FormListener = (state: string) => void | Promise<void>;

/** Form hook options for setting default value and listener / sinks */
type FormBindOptions = {
  effects?: Array<FormListener>;
  defaultValue?: string;
};

/** Type alias for the React <input> onChange event listener */
type OnChange = (
  e: React.ChangeEvent<HTMLInputElement>
) => void | Promise<void>;

/**
 * Form binding hook for input form
 *
 * ---
 * ```tsx
 * const App: React.FC = () => {
 *   const {val, bind} = useFormBind();
 *   return (
 *     <input value={val} onChange={bind} />
 *   );
 * };
 * ```
 *
 * @param opt useForm options for listeners / sinks and default value if any
 * @returns The form state, a binding function, and two utilities actions.
 */
export function useFormBind(opt?: FormBindOptions) {
  const { effects: listener, defaultValue } = opt ?? {
    effects: undefined,
    defaultValue: undefined,
  };
  const [state, dispatch] = useReducer(formReducer, defaultValue ?? "");

  const sink = useRef(listener);

  useEffect(() => {
    sink.current?.forEach((list) => list(state));
  }, [state]);

  const bind = useCallback<OnChange>(
    (e) => dispatch({ type: "bind", payload: e }),
    [dispatch]
  );

  const clear = useCallback(() => dispatch({ type: "clear" }), [dispatch]);
  const reset = useCallback(
    () => dispatch({ type: "reset", def: defaultValue }),
    [dispatch, defaultValue]
  );

  return {
    val: state,
    bind,
    clear,
    reset,
  };
}

/**
 * Form password specific binding hook
 *
 * ---
 * ```tsx
 * const App: React.FC = () => {
 *   const {val, bind, is} = usePassBind();
 *   return (
 *     <input type={is ? "password" : "text"} value={val} onChange={bind} />
 *   );
 * };
 * ```
 *
 * @param opt Form Options
 * @returns The same as FormBind but with a shown toggler
 */
export function usePassBind(opt?: FormBindOptions) {
  const { is, toggler } = useToggle(true);
  const formBind = useFormBind(opt);

  return {
    toggler,
    ...formBind,
    is,
  };
}
