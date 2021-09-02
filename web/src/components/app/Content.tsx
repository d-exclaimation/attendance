//
//  Content.tsx
//  web
//
//  Created by d-exclaimation on 15:59.
//

import React, { useEffect, useState } from "react";
import { useToggle } from "../../hooks/utils/useToggle";

const Content: React.FC = () => {
  const { is, toggler } = useToggle();
  const [workHour, setWork] = useState<string | null>(null);
  const [start, setStart] = useState<Date | null>(null);

  useEffect(() => {
    if (is) setStart(new Date());
    else if (start)
      setWork(((new Date().getTime() - start.getTime()) / 36e5).toFixed(2));

    /* eslint-disable */
  }, [is]);

  const details = is
    ? `You are at work since ${start?.toLocaleTimeString() ?? ""}. Clock out?`
    : workHour
    ? `You are no longer at work. You haved worked for ${workHour} hour.`
    : "You are not at work. Clock in?";

  return (
    <div className="flex flex-col items-center justify-center w-screen">
      <div
        className={`font-mono text-xl md:text-3xl mb-3 mx-2 text-indigo-500 ${
          is && "animate-pulse"
        } text-center`}
      >
        {details}
      </div>
      <button
        className="text-8xl md:text-9xl w-52 h-52 md:w-64 md:h-64 m-12  rounded-full select-none shadow-2xl pressable"
        onClick={() => toggler()}
      >
        {is ? "⏳" : "⌛️"}
      </button>
    </div>
  );
};

export default Content;
