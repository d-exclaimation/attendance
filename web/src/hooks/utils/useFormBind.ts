//
//  useFormBind.ts
//  web
//
//  Created by d-exclaimation on 10:46.
//
import { useCallback, useEffect, useReducer, useRef } from "react";
import { useToggle } from "./useToggle";

type FormActions =
  | { type: "bind"; payload: React.ChangeEvent<HTMLInputElement> }
  | { type: "reset"; def?: string }
  | { type: "clear" }
  | { type: "ignore" };

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

type FormListener = (state: string) => void | Promise<void>;

type FormBindOptions = {
  effects?: Array<FormListener>;
  defaultValue?: string;
};

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

  const bind = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: "bind", payload: e });
    },
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

export function usePassBind(opt?: FormBindOptions) {
  const { is, toggler } = useToggle(true);
  const formBind = useFormBind(opt);

  return {
    toggler,
    ...formBind,
    is,
  };
}
