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

const Content: React.FC = () => {
  const { loading } = useAuth();
  const [{ fetching, data }, invalidate] = useStatusQuery({
    pause: loading,
  });
  const [, clockOut] = useClockOutMutation();
  const [, clockIn] = useClockInMutation();

  const clock = useCallback(async () => {
    if (fetching || !data) return;

    if (!!data.state && !data.state.leaveAt) {
      const id = data.state.id;
      const { data: res } = await clockOut({ id });
      if (!res) return;
      switch (res.clockOut.__typename) {
        case "Attendance":
          invalidate();
          break;
        case "NotClockedIn":
          break;
        case "UserNotFound":
          break;
      }
    } else {
      const { data: res } = await clockIn();
      if (!res) return;
      switch (res.clockIn.__typename) {
        case "Attendance":
          invalidate();
          break;
        case "UserNotFound":
          break;
      }
    }
  }, [clockIn, clockOut, fetching, data, invalidate]);

  if (fetching || !data) {
    return (
      <div className="flex justify-center items-center mt-3">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-indigo-400"></div>
      </div>
    );
  }

  const isAtWork = data.state ? !data.state.leaveAt : false;

  const entryAt = data.state ? new Date(data.state.entryAt) : null;
  const leaveAt = data.state?.leaveAt ? new Date(data.state.leaveAt) : null;

  const details = isAtWork
    ? `You are at work since ${entryAt?.toLocaleString() ?? ""}. Clock out?`
    : leaveAt
    ? `You are no longer at work since ${leaveAt.toLocaleString()}.`
    : `You haven't work before.`;

  return (
    <>
      <div className="flex flex-col items-center justify-center w-screen">
        <div
          className={`font-mono text-xl md:text-3xl mb-3 mx-2 text-indigo-500 ${
            isAtWork && "animate-pulse"
          } text-center`}
        >
          {details}
        </div>
        <button
          className="text-8xl md:text-9xl w-52 h-52 md:w-64 md:h-64 m-12  rounded-full select-none shadow-2xl _pressable"
          onClick={clock}
        >
          {isAtWork ? "⏳" : "⌛️"}
        </button>
      </div>
      <Link
        to="/login"
        className="absolute top-2 right-3 text-xs font-mono font-light text-indigo-600 animate-pulse"
      >
        Logout
      </Link>
    </>
  );
};

export default Content;
