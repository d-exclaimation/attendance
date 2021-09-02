//
//  useFormBind.ts
//  web
//
//  Created by d-exclaimation on 10:46.
//
import { useCallback, useEffect, useRef, useState } from "react";
import { useToggle } from "./useToggle";

type FormListener = (state: string) => void | Promise<void>;

type FormBindOptions = {
  listener?: Array<FormListener>;
  defaultValue?: string;
  reducer?: (state: string) => string;
};

export function useFormBind(opt?: FormBindOptions) {
  const { listener, defaultValue, reducer } = opt ?? {
    listener: undefined,
    defaultValue: undefined,
    reducer: undefined,
  };
  const [state, setState] = useState(defaultValue ?? "");

  const sink = useRef(listener);

  useEffect(() => {
    sink.current?.forEach((list) => list(state));
  }, [state]);

  const bind = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // const newState = !!reducer ? reducer(e.target.value) : e.target.value;
      const newState = e.target.value;
      setState(newState);
    },
    [setState, reducer]
  );

  return {
    val: state,
    bind,
  };
}

export function usePassBind(opt?: FormBindOptions) {
  const { is, toggler } = useToggle(true);
  const formBind = useFormBind(opt);

  return {
    toggler,
    ...formBind,
    is,
    type: is ? "password" : "revealed",
  };
}
