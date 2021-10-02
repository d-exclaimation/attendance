//
//  ContentInsider.tsx
//  web
//
//  Created by d-exclaimation on 18:15.
//

import React from "react";
import { StatusQuery } from "../../graphql/core";

type Props = {
  data: StatusQuery;
  clock: () => Promise<void>;
};

const ContentInsider: React.FC<Props> = ({ data, clock }: Props) => {
  const isAtWork = data.state ? !data.state.leaveAt : false;

  const entryAt = data.state ? new Date(data.state.entryAt) : null;
  const leaveAt = data.state?.leaveAt ? new Date(data.state.leaveAt) : null;

  const details = isAtWork ? "Keluar kerja?" : "Masuk kerja?";

  const footer = isAtWork
    ? `Masuk kerja dari ${entryAt?.toLocaleString() ?? ""}`
    : leaveAt
    ? `Terakhir keluar kerja pada ${leaveAt.toLocaleString()}`
    : `Belum pernah kerja`;
  return (
    <div className="flex flex-col items-center justify-center w-screen">
      <div
        className={`font-mono text-xl md:text-3xl mb-2 mx-2 text-indigo-500 ${
          isAtWork && "animate-pulse"
        } text-center`}
      >
        {details}
      </div>
      <div
        className={`font-mono text-xs md:text-xl mb-1 mx-2 text-indigo-400 ${
          isAtWork && "animate-pulse"
        } text-center`}
      >
        {footer}
      </div>
      <button
        className="text-8xl md:text-9xl w-52 h-52 md:w-64 md:h-64 m-12  rounded-full select-none shadow-2xl _pressable"
        onClick={clock}
      >
        {isAtWork ? "⏳" : "⌛️"}
      </button>
    </div>
  );
};

export default ContentInsider;
