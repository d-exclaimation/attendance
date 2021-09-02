//
//  404.tsx
//  web
//
//  Created by d-exclaimation on 15:07.
//

import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-row">
      <div className="border-r-2 p-3 text-xl font-semibold text-indigo-500 animate-pulse border-gray-300 font-mono">
        404
      </div>
      <div className="flex flex-col items-start justify-center px-3">
        <div className="text-sm font-mono">Not found</div>
        <Link
          to="/"
          className="text-indigo-600 hover:text-indigo-400 text-xs pt-2"
        >
          Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
