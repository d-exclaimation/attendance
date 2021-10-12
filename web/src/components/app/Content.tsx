//
//  Content.tsx
//  web
//
//  Created by d-exclaimation on 15:59.
//

import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import {
  useClockInMutation,
  useClockOutMutation,
  useStatusQuery,
} from "../../graphql/core";
import { useRedirect } from "../../hooks/router/useRedirect";
import { useToast } from "../../hooks/utils/useToast";
import MagicToast from "../semantic/MagicToast";
import ContentInsider from "./ContentInsider";

const Content: React.FC = () => {
  const { loading, isAdmin } = useAuth();
  const redirect = useRedirect();
  const [{ fetching, data }, invalidate] = useStatusQuery({
    pause: loading,
    requestPolicy: "network-only",
  });
  const [, clockOut] = useClockOutMutation();
  const [, clockIn] = useClockInMutation();
  const { toast, ...toastProps } = useToast();

  const clock = useCallback(async () => {
    if (fetching || !data) return;

    // Clocked In
    if (!!data.state && !data.state.leaveAt) {
      const id = data.state.id;
      const { data: res } = await clockOut({ id });

      if (!res) return;
      switch (res.clockOut.__typename) {
        case "Attendance":
          toast({
            title: "Keluar Success!",
            description: `Anda telah keluar kerja, informasi jam kerja anda telah ter update di database.`,
            status: "success",
          });
          return invalidate();
        case "NotClockedIn":
          return toast({
            title: "Belum masuk kerja!!",
            description: `Anda telah mencoba keluar kerja, tetapi anda belum masuk jam kerja.`,
            status: "failure",
          });
        case "UserNotFound":
          return toast({
            title: "Account tidak ada!!",
            description: `Anda telah mencoba keluar kerja, tetapi account anda belum terdaftar.`,
            status: "failure",
          });
      }
      // Clocked out
    } else {
      const { data: res } = await clockIn();
      if (!res) return;
      switch (res.clockIn.__typename) {
        case "Attendance":
          toast({
            title: "Masuk Success!",
            description: `Anda telah masuk kerja, informasi jam kerja anda telah ter update di database.`,
            status: "success",
          });
          return invalidate();
        case "UserNotFound":
          return toast({
            title: "Account tidak ada!!",
            description: `Anda telah mencoba masuk kerja, tetapi account anda belum terdaftar.`,
            status: "failure",
          });
      }
    }
  }, [clockIn, clockOut, fetching, data, invalidate, toast]);

  if (fetching || !data) {
    return (
      <div className="flex justify-center items-center mt-3">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-indigo-400"></div>
      </div>
    );
  }

  if (isAdmin) {
    redirect("/admin");
    return null;
  }

  return (
    <>
      <MagicToast {...toastProps} />
      <ContentInsider data={data} clock={clock} />
      <Link
        to="/login"
        className="absolute top-2 right-3 text-xs font-mono font-light text-indigo-600 hover:text-indigo-300"
      >
        Logout
      </Link>
    </>
  );
};

export default Content;
