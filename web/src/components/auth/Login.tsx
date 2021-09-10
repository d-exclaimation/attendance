//
//  Login.tsx
//  web
//
//  Created by d-exclaimation on 10:39.
//

import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import { useLoginMutation } from "../../graphql/core";
import { useRedirect } from "../../hooks/router/useRedirect";
import { useFormBind, usePassBind } from "../../hooks/utils/useFormBind";
import MagicInput from "../semantic/MagicInput";

const Login: React.FC = () => {
  const { updateAuth } = useAuth();
  const [, mutation] = useLoginMutation();
  const redirect = useRedirect();
  const { val: name, bind: bName, clear: cName } = useFormBind();
  const { val: pass, bind: bPass, clear: cPass, toggler, is } = usePassBind();

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const { data, error } = await mutation({
        credential: { username: name, password: pass },
      });

      if (!data?.login || error) {
        return console.log(error);
      }

      const done = () => {
        cName();
        cPass();
      };

      const res = data.login;
      switch (res.__typename) {
        case "UserCredentials":
          const { expireAt, token, user } = res;
          updateAuth(expireAt, token);
          done();
          redirect(user.name.toLowerCase() === "admin" ? "/admin" : "/app");
          break;
        case "UserNotFound":
          console.table(res);
          break;
        default:
          console.table(res);
          break;
      }
    },
    [cName, cPass, redirect, mutation, pass, name, updateAuth]
  );

  return (
    <div className="flex flex-col items-center w-10/12 md:w-6/12 lg:w-4/12 justify-center _card">
      <div className="font-mono text-xl md:text-3xl mb-3 text-indigo-500 animate-pulse">
        Login
      </div>
      <form className="w-full" onSubmit={onSubmit}>
        <MagicInput type="text" label="Name" value={name} bind={bName} />
        <MagicInput
          type={is ? "password" : "text"}
          label="Password"
          value={pass}
          bind={bPass}
        >
          <button
            className="toggle-password z-20 text-sm px-2 py-1 rounded bg-gray-100 hover:bg-gray-200"
            onClick={(e) => {
              e.preventDefault();
              toggler();
            }}
          >
            {is ? "show" : "hide"}
          </button>
        </MagicInput>
        <div className="flex flex-row items-center justify-between w-full p-1 mt-2">
          <div className="text-xs">
            Don't have an account?{" "}
            <Link
              className="text-indigo-600 hover:text-indigo-400"
              to="/signup"
            >
              Sign up
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

export default Login;
