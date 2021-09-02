//
//  MainScreen.tsx
//  web
//
//  Created by d-exclaimation on 08:17.
//

import React, { useEffect } from "react";
import { useToggle } from "../../hooks/utils/useToggle";
import LoadingScreen from "./LoadingScreen";

const MainScreen: React.FC = () => {
  const { is, toggler } = useToggle(true);
  useEffect(() => {
    setTimeout(() => toggler(false), 1000);
  }, [toggler]);
  return (
    <div className="flex flex-col items-center text-indigo-500">
      <div className="text-2xl md:text-4xl font-mono m-2 animate-pulse">
        Attendance
      </div>
      <LoadingScreen isLoading={is} isLoggedIn />
    </div>
  );
};

export default MainScreen;
