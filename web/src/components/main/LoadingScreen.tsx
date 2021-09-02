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
  const onClickLogin = useCallback(() => redirect("/login"), [redirect]);
  const onClickSignup = useCallback(() => redirect("/signup"), [redirect]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center mt-3">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-indigo-400"></div>
      </div>
    );

  if (isLoggedIn) {
    redirect("/");
  }

  return (
    <div className="flex justify-center items-center pop-up">
      <MenuButton label="Login" onClick={onClickLogin} />
      <MenuButton label="Sign up" onClick={onClickSignup} />
    </div>
  );
};

export default LoadingScreen;
