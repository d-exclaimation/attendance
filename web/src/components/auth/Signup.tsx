//
//  Signup.tsx
//  web
//
//  Created by d-exclaimation on 15:28.
//

import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { useRedirect } from "../../hooks/router/useRedirect";
import { useFormBind, usePassBind } from "../../hooks/utils/useFormBind";
import MagicInput from "../semantic/MagicInput";

const Signup: React.FC = () => {
  const redirect = useRedirect();
  const { val: name, bind: bName, clear: cName } = useFormBind();
  const { val: pass, bind: bPass, clear: cPass, toggler, is } = usePassBind();
  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      cName();
      cPass();
      redirect("/app");
    },
    [cName, cPass, redirect]
  );

  return (
    <div className="flex flex-col items-center w-10/12 md:w-6/12 lg:w-4/12 justify-center card">
      <div className="font-mono text-xl md:text-3xl mb-3 text-indigo-500 animate-pulse">
        Sign up
      </div>
      <form className="w-full" onSubmit={onSubmit}>
        <MagicInput type="text" label="Name" value={name} bind={bName} />
        <MagicInput
          type={is ? "password" : "text"}
          label="Password"
          value={pass}
          bind={bPass}
        >
          <span
            className="toggle-password z-20 text-sm px-2 py-1 rounded bg-gray-100 hover:bg-gray-200"
            onMouseEnter={() => toggler(false)}
            onMouseLeave={() => toggler(true)}
          >
            {is ? "show" : "hide"}
          </span>
        </MagicInput>
        <div className="flex flex-row items-center justify-between w-full p-1 mt-2">
          <div className="text-xs">
            Already have an account?{" "}
            <Link className="text-indigo-600 hover:text-indigo-400" to="/login">
              Login
            </Link>
          </div>
          <button
            type="submit"
            className="px-4 py-1 text-sm text-indigo-600 rounded hover:bg-indigo-50 hover:bg-opacity-80"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
