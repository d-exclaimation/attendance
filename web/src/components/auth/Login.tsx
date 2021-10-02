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
import { useToast } from "../../hooks/utils/useToast";
import MagicInput from "../semantic/MagicInput";
import MagicToast from "../semantic/MagicToast";

const Login: React.FC = () => {
  const { updateAuth } = useAuth();
  const [, mutation] = useLoginMutation();
  const redirect = useRedirect();
  const { val: name, bind: bName, clear: cName } = useFormBind();
  const { val: pass, bind: bPass, clear: cPass, toggler, is } = usePassBind();
  const { toast, ...toastProps } = useToast();

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const { data, error } = await mutation({
        credential: { username: name, password: pass },
      });

      if (!data?.login || error) {
        return toast({
          title: "Ada gangguan dari server!",
          description: error?.message.toString() ?? "Mohon di tunggu",
          status: "warning",
        });
      }

      const done = (username: string) => {
        cName();
        cPass();
        const target = username.toLowerCase() === "admin" ? "/admin" : "/app";
        setTimeout(() => redirect(target), 500);
      };

      const res = data.login;
      switch (res.__typename) {
        case "UserCredentials":
          const { expireAt, token, user } = res;
          toast({
            title: "Selamat datang!!",
            description: `Anda telah masuk account dengan nama ${user.name}`,
            status: "success",
          });
          updateAuth(expireAt, token);
          return done(user.name);
        case "UserNotFound":
          return toast({
            title: "Tidak menemukan account!!",
            description: `Account dengan nama "${res.username}" tidak ada di database.`,
            status: "failure",
          });
        default:
          return toast({
            title: "Tidak ada access!!",
            description: `Password "${res.password}" tidak punya access untuk masuk account.`,
            status: "failure",
          });
      }
    },
    [cName, cPass, redirect, mutation, pass, name, updateAuth, toast]
  );

  return (
    <div className="flex flex-col items-center w-10/12 md:w-6/12 lg:w-4/12 justify-center _card">
      <div className="font-mono text-xl md:text-3xl mb-3 text-indigo-500 animate-pulse">
        Masuk account
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
            Belum punya account?{" "}
            <Link
              className="text-indigo-600 hover:text-indigo-400"
              to="/signup"
            >
              Daftar
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
      <MagicToast {...toastProps} />
    </div>
  );
};

export default Login;
