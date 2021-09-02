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
  effects?: Array<FormListener>;
  defaultValue?: string;
};

export function useFormBind(opt?: FormBindOptions) {
  const { effects: listener, defaultValue } = opt ?? {
    effects: undefined,
    defaultValue: undefined,
  };
  const [state, setState] = useState(defaultValue ?? "");

  const sink = useRef(listener);

  useEffect(() => {
    sink.current?.forEach((list) => list(state));
  }, [state]);

  const bind = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newState = e.target.value;
      setState(newState);
    },
    [setState]
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
  };
}
