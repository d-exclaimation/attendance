//
//  DownloadDropdown.tsx
//  web
//
//  Created by d-exclaimation on 20:20.
//

import React, { useCallback } from "react";
import { useToggle } from "../../hooks/utils/useToggle";
import { ReactComponent as DownloadIcon } from "./download.svg";

type Props = {
  options: {
    [key: string]: string;
  };
};

const DownloadDropdown: React.FC<Props> = ({ options }) => {
  const { is, toggler } = useToggle();

  const optionButton = useCallback(
    (id: string, key: string, link: string) => (
      <a
        download={`${key}.csv`}
        href={link}
        className="block px-4 py-2 text-sm text-gray-800 border-b hover:bg-gray-200"
        key={id}
        onClick={() => {
          console.log("Done");
          toggler(false);
        }}
      >
        {key
          .split("")
          .map((char, i) => (i === 0 ? char.toUpperCase() : char))
          .join("")}
      </a>
    ),
    [toggler]
  );

  return (
    <div className="relative">
      <button
        className="flex flex-row px-6 py-2 text-left text-xs font-medium rounded-md hover:bg-indigo-50 hover:bg-opacity-80 text-indigo-600 uppercase"
        onClick={() => {
          toggler();
        }}
      >
        <DownloadIcon />
        csv
      </button>
      {is && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-20">
          {Object.entries(options).map(([key, action], index) =>
            optionButton(`${index}`, key, action)
          )}
        </div>
      )}
    </div>
  );
};

export default DownloadDropdown;
