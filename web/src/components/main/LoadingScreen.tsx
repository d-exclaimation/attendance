//
//  LoadingScreen.tsx
//  web
//
//  Created by d-exclaimation on 07:29.
//

import React, { useCallback } from "react";
import { useRedirect } from "../../hooks/router/useRedirect";
import MenuButton from "../semantic/MenuButton";

type Props = {
  isLoading: boolean;
  isLoggedIn: boolean;
};

const LoadingScreen: React.FC<Props> = ({ isLoading, isLoggedIn }) => {
  const redirect = useRedirect();
  const timestamp = useCallback(() => {
    const time = new Date().toISOString();
    setTimeout(() => console.table({ time }));
    redirect("/login");
  }, [redirect]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center m-3">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );

  if (isLoggedIn) {
    redirect("/");
  }

  return (
    <div className="flex justify-center items-center pop-up">
      <MenuButton label="Login" onClick={timestamp} />
      <MenuButton label="Sign up" />
    </div>
  );
};

export default LoadingScreen;
