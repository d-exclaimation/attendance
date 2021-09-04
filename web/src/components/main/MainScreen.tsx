//
//  MainScreen.tsx
//  web
//
//  Created by d-exclaimation on 08:17.
//

import React, { useContext } from "react";
import { AuthContext } from "../../hooks/auth/useAuth";
import LoadingScreen from "./LoadingScreen";

const MainScreen: React.FC = () => {
  const { loading, user } = useContext(AuthContext);

  return (
    <div className="flex flex-col items-center text-indigo-500">
      <div className="_flash-card">
        <div className="text-2xl md:text-4xl font-mono m-2 mb-4 animate-pulse">
          Attendance
        </div>
      </div>
      <LoadingScreen isLoading={loading} isLoggedIn={!!user} />
    </div>
  );
};

export default MainScreen;
