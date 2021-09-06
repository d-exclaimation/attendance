//
//  MainScreen.tsx
//  web
//
//  Created by d-exclaimation on 08:17.
//

import React from "react";
import LoadingScreen from "./LoadingScreen";

const MainScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center text-indigo-500">
      <div className="_flash-card">
        <div className="text-2xl md:text-4xl font-mono m-2 mb-4 animate-pulse">
          Attendance
        </div>
      </div>
      <LoadingScreen />
    </div>
  );
};

export default MainScreen;
