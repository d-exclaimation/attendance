//
//  Panel.tsx
//  web
//
//  Created by d-exclaimation on 14:39.
//

import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import { useRedirect } from "../../hooks/router/useRedirect";
import RecordTable from "./RecordTable";

const Panel: React.FC = () => {
  const { isAdmin, loading } = useAuth();
  const redirect = useRedirect();

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-3">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-indigo-400"></div>
      </div>
    );
  }

  if (!isAdmin) {
    redirect("/");
    return null;
  }

  return (
    <div className="flex flex-col items-center w-11/12 justify-center _card">
      <Link
        to="/login"
        className="absolute top-2 right-3 text-xs font-mono font-light text-indigo-600 hover:text-indigo-300"
      >
        Logout
      </Link>
      <div className="font-mono text-xl md:text-3xl mb-3 text-indigo-500 animate-pulse">
        Admin Panel
      </div>
      <RecordTable
        rows={[
          {
            name: "Bob",
            entryAt: new Date(),
          },
          {
            name: "Vincent",
            entryAt: new Date(),
            leaveAt: new Date(),
          },
        ]}
      />
    </div>
  );
};

export default Panel;
