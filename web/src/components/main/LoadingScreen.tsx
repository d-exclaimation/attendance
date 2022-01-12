//
//  LoadingScreen.tsx
//  web
//
//  Created by d-exclaimation on 07:29.
//

import React, { useCallback } from "react";
import { useAuth } from "../../auth/useAuth";
import { useRedirect } from "../../hooks/router/useRedirect";
import MenuButton from "../semantic/MenuButton";

const LoadingScreen: React.FC = () => {
  const { loading, user, isAdmin } = useAuth();
  const redirect = useRedirect();
  const onClickLogin = useCallback(() => redirect("/login"), [redirect]);
  const onClickSignup = useCallback(() => redirect("/signup"), [redirect]);

  if (loading)
    return (
      <div className="flex justify-center items-center mt-3">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-blue-400"></div>
      </div>
    );

  if (!!user) {
    redirect(isAdmin ? "/admin" : "/app");
    return null;
  }

  return (
    <div className="flex justify-center items-center _pop-up">
      <MenuButton label="Masuk" onClick={onClickLogin} />
      <MenuButton label="Daftar" onClick={onClickSignup} />
    </div>
  );
};

export default LoadingScreen;
