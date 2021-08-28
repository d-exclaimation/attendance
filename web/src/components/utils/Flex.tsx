//
//  Flex.tsx
//  web
//
//  Created by d-exclaimation on 22:38.
//

import { css } from "@emotion/react";
import React from "react";

type Alignment = "center" | "flex-start" | "flex-end" | "unset";

type FlexProps = {
  dir: "row" | "column";
  align?: Alignment;
  justify?: Alignment;
};

const Flex: React.FC<FlexProps> = ({ children, align, justify, dir }) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: ${dir};
        align-items: ${align ?? "unset"};
        justify-content: ${justify ?? "unset"};
      `}
    >
      {children}
    </div>
  );
};

export default Flex;
