//
//  Content.tsx
//  web
//
//  Created by d-exclaimation on 15:59.
//

import React, { useCallback } from "react";
import { useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import {
  useClockInMutation,
  useClockOutMutation,
  useStatusQuery,
} from "../../graphql/api";
import { useRedirect } from "../../hooks/router/useRedirect";
import { useToast } from "../../hooks/utils/useToast";
import MagicToast from "../semantic/MagicToast";
import ContentInsider from "./ContentInsider";

const Content: React.FC = () => {
  const queryClient = useQueryClient();
  const { loading, isAdmin } = useAuth();
  const redirect = useRedirect();
  const { toast, ...toastProps } = useToast();
  const { isLoading, data } = useStatusQuery(undefined, {
    enabled: !loading,
  });

  const { mutate: clockOut } = useClockOutMutation({
    onSuccess: (res) => {
      switch (res.clockOut.__typename) {
        case "Attendance":
          toast({
            title: "Keluar Success!",
            description: `Anda telah keluar kerja, informasi jam kerja anda telah ter update di database.`,
            status: "success",
          });
          return queryClient.invalidateQueries("Status");
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
    },
  });

  const { mutate: clockIn } = useClockInMutation({
    onSuccess: (res) => {
      if (!res) return;
      switch (res.clockIn.__typename) {
        case "Attendance":
          toast({
            title: "Masuk Success!",
            description: `Anda telah masuk kerja, informasi jam kerja anda telah ter update di database.`,
            status: "success",
          });
          return queryClient.invalidateQueries("Status");
        case "UserNotFound":
          return toast({
            title: "Account tidak ada!!",
            description: `Anda telah mencoba masuk kerja, tetapi account anda belum terdaftar.`,
            status: "failure",
          });
      }
    },
  });

  const clock = useCallback(async () => {
    if (isLoading || !data) return;
    if (!!data.state && !data.state.leaveAt) {
      const id = data.state.id;
      clockOut({ id });
    } else {
      clockIn({});
    }
  }, [clockIn, clockOut, isLoading, data]);

  if (isLoading || !data) {
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
