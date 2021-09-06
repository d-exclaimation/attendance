//
//  Panel.tsx
//  web
//
//  Created by d-exclaimation on 14:39.
//

import React from "react";
import RecordTable from "./RecordTable";

const Panel: React.FC = () => {
  return (
    <div className="flex flex-col items-center w-11/12 justify-center _card">
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
