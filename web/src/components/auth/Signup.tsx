//
//  Signup.tsx
//  web
//
//  Created by d-exclaimation on 15:28.
//

import { GraphQLError } from "graphql";
import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { useRegisterMutation } from "../../graphql/api";
import { useFormBind, usePassBind } from "../../hooks/utils/useFormBind";
import { useToast } from "../../hooks/utils/useToast";
import MagicInput from "../semantic/MagicInput";
import MagicToast from "../semantic/MagicToast";

const Signup: React.FC = () => {
  const { val: name, bind: bName, clear: cName } = useFormBind();
  const { val: pass, bind: bPass, clear: cPass, toggler, is } = usePassBind();
  const { toast, ...toastProps } = useToast();

  const done = useCallback(() => {
    cName();
    cPass();
  }, [cName, cPass]);

  const { mutate } = useRegisterMutation({
    onSuccess: (data) => {
      if (!data?.signup) {
        return toast({
          title: "Ada gangguan dari server!",
          description: "Mohon di tunggu",
          status: "warning",
        });
      }

      const res = data.signup;

      switch (res.__typename) {
        case "SignUpSuccess":
          const { userInfo } = res;
          toast({
            title: "Account telah terbuat!",
            description: `Account dengan name "${userInfo.name}"`,
            status: "success",
          });
          return done();
        case "InvalidCredentials":
          return toast({
            title: "Tidak ada access!!",
            description: `Password "${res.password}" tidak punya access untuk daftar account.`,
            status: "failure",
          });
        default:
          return toast({
            title: "Duplicate account!!",
            description: `Account dengan nama "${res.username}" sudah ada di database.`,
            status: "failure",
          });
      }
    },
    onError: (error) =>
      toast({
        title: "Ada gangguan dari server!",
        description:
          error instanceof GraphQLError
            ? error.message.toString()
            : "Mohon di tunggu",
        status: "warning",
      }),
  });

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      mutate({
        credential: {
          username: name,
          password: pass,
        },
      });
    },
    [mutate, name, pass]
  );

  return (
    <div className="flex flex-col items-center w-10/12 md:w-6/12 lg:w-4/12 justify-center _card">
      <div className="font-mono text-xl md:text-3xl mb-3 text-blue-500 animate-pulse">
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
            <Link className="text-blue-600 hover:text-blue-400" to="/login">
              Login
            </Link>
          </div>
          <button
            type="submit"
            className="px-4 py-1 text-sm text-blue-600 rounded hover:bg-blue-50 hover:bg-opacity-80"
          >
            Kirim
          </button>
        </div>
      </form>
      <MagicToast {...toastProps} />
    </div>
  );
};

export default Signup;
