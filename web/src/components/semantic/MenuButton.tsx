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
            text-blue-400 
            hover:bg-blue-50
            p-2
            px-8
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
