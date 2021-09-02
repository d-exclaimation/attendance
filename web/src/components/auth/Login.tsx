//
//  Login.tsx
//  web
//
//  Created by d-exclaimation on 10:39.
//

import React from "react";
import { useFormBind, usePassBind } from "../../hooks/utils/useFormBind";
import MagicInput from "../semantic/MagicInput";

const Login: React.FC = () => {
  const { val: name, bind: bindName } = useFormBind();
  const { val: pass, bind: bindPass, toggler, type, is } = usePassBind();
  return (
    <div className="flex flex-col items-center w-4/12 justify-center">
      <div className="font-mono text-xl md:text-3xl mb-3 text-indigo-500">
        Login
      </div>
      <form className="w-full">
        <MagicInput type="name" value={name} bind={bindName} />
        <MagicInput type={type} label="Password" value={pass} bind={bindPass}>
          <div
            className="toggle-password z-20 text-lg"
            onMouseEnter={() => toggler(false)}
            onMouseLeave={() => toggler(true)}
          >
            {is ? "🔐" : "👁️"}
          </div>
        </MagicInput>
      </form>
    </div>
  );
};

export default Login;
