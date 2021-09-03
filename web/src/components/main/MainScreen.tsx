//
//  MainScreen.tsx
//  web
//
//  Created by d-exclaimation on 08:17.
//

import React from "react";
import { useCheckLoginQuery } from "../../graphql/core";
import LoadingScreen from "./LoadingScreen";

const MainScreen: React.FC = () => {
  const [{ fetching, data }] = useCheckLoginQuery({});

  return (
    <div className="flex flex-col items-center text-indigo-500">
      <div className="_flash-card">
        <div className="text-2xl md:text-4xl font-mono m-2 mb-4 animate-pulse">
          Attendance {JSON.stringify(typeof data?.me === typeof 10)}
        </div>
      </div>
      <LoadingScreen isLoading={fetching} isLoggedIn />
    </div>
  );
};

export default MainScreen;
