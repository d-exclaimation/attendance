//
//  MenuButton.tsx
//  web
//
//  Created by d-exclaimation on 07:19.
//

import React from "react";

type Props = {
  label: string;
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void | Promise<void>;
};

const MenuButton: React.FC<Props> = ({ label, onClick }) => {
  return (
    <button
      className={`
          bg-white 
            hover:bg-opacity-80
            text-indigo-400 
            hover:bg-indigo-50
            p-1
            px-10
            m-2
            md:text-xl
            text-md 
            rounded-lg 
          `}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default MenuButton;
