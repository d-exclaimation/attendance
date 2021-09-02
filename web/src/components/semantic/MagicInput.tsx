//
//  MagicInput.tsx
//  web
//
//  Created by d-exclaimation on 11:54.
//

import React, { useMemo } from "react";

type Props = {
  type: string;
  value: string;
  label?: string;
  bind: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const MagicInput: React.FC<Props> = ({
  bind,
  label,
  type,
  value,
  children,
}) => {
  const labelName = useMemo(
    () =>
      label ??
      type
        .split("")
        .map((x, i) => (i == 0 ? x.toUpperCase() : x.toLowerCase()))
        .join(""),
    [label, type]
  );
  return (
    <div className="field flex flex-col w-full relative border-dashed border-b-2 border-indigo-500 mt-8 mb-4 mx-auto">
      <input
        type={type}
        className="m-0 w-full text-sm py-1 px-0 outline-none border-none focus:border-transparent overflow-hidden valid z-10"
        value={value}
        placeholder=" "
        onChange={bind}
      />
      <label htmlFor={type} className="text-indigo-700 text-sm absolute label">
        {labelName}
      </label>
      {children}
    </div>
  );
};

export default MagicInput;
