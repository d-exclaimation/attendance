//
//  MainScreen.tsx
//  web
//
//  Created by d-exclaimation on 08:17.
//

import React from "react";
import LoadingScreen from "./LoadingScreen";

/**
 * Paint the main welcome screen to either redirect or give options login or sign up.
 * @returns Welcome screen
 */
const MainScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center text-blue-500">
      <div className="_flash-card">
        <img
          src="/zentax.jpeg"
          alt="Welcome"
          className="animate-pulse mb-4 m-2 w-56 md:w-72 lg:w-96"
        />
      </div>
      <LoadingScreen />
    </div>
  );
};

export default MainScreen;
