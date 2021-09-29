//
//  Signup.tsx
//  web
//
//  Created by d-exclaimation on 15:28.
//

import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { useRegisterMutation } from "../../graphql/core";
import { useRedirect } from "../../hooks/router/useRedirect";
import { useFormBind, usePassBind } from "../../hooks/utils/useFormBind";
import MagicInput from "../semantic/MagicInput";

const Signup: React.FC = () => {
  const [, mutation] = useRegisterMutation();
  const redirect = useRedirect();
  const { val: name, bind: bName, clear: cName } = useFormBind();
  const { val: pass, bind: bPass, clear: cPass, toggler, is } = usePassBind();
  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const { data, error } = await mutation({
        credential: {
          username: name,
          password: pass,
        },
      });

      const done = () => {
        cName();
        cPass();
      };

      if (error || !data?.signup) {
        // TODO: -- Add pop up
        return console.log(error);
      }

      const res = data.signup;

      switch (res.__typename) {
        case "SignUpSuccess":
          console.table(res);
          const { userInfo } = res;
          done();
          console.table({ ...userInfo });
          redirect("/admin");
          break;
        case "InvalidCredentials":
          // TODO: -- Add pop up
          console.table({ ...res });
          break;
        default:
          // TODO -- Add pop up
          console.table(res);
          break;
      }
    },
    [cName, cPass, redirect, mutation, name, pass]
  );

  return (
    <div className="flex flex-col items-center w-10/12 md:w-6/12 lg:w-4/12 justify-center _card">
      <div className="font-mono text-xl md:text-3xl mb-3 text-indigo-500 animate-pulse">
        Daftar account
      </div>
      <form className="w-full" onSubmit={onSubmit}>
        <MagicInput type="text" label="Nama" value={name} bind={bName} />
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
            {is ? "lihat" : "tutup"}
          </button>
        </MagicInput>
        <div className="flex flex-row items-center justify-between w-full p-1 mt-2">
          <div className="text-xs">
            Sudah ada account?{" "}
            <Link className="text-indigo-600 hover:text-indigo-400" to="/login">
              Login
            </Link>
          </div>
          <button
            type="submit"
            className="px-4 py-1 text-sm text-indigo-600 rounded hover:bg-indigo-50 hover:bg-opacity-80"
          >
            Kirim
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
