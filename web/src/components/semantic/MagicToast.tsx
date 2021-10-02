//
//  MagicFlag.tsx
//  web
//
//  Created by d-exclaimation on 16:03.
//

import { AutoDismissFlag, FlagGroup } from "@atlaskit/flag";
import SuccessIcon from "@atlaskit/icon/glyph/check-circle";
import FailureIcon from "@atlaskit/icon/glyph/cross-circle";
import InfoIcon from "@atlaskit/icon/glyph/info";
import WarningIcon from "@atlaskit/icon/glyph/warning";
import React from "react";
import { Toast } from "../../interfaces/Toast";

type Props = {
  flags: Toast[];
  onDismissed: (id: string | number, analyticsEvent: any) => void;
};

const MagicToast: React.FC<Props> = ({ flags, onDismissed }) => {
  const iconFromStatus = (
    status: "success" | "failure" | "warning" | "info"
  ) => {
    switch (status) {
      case "success":
        return (
          <SuccessIcon primaryColor={"#00be3e"} label={status} size="medium" />
        );
      case "failure":
        return (
          <FailureIcon primaryColor={"#ff000e"} label={status} size="medium" />
        );
      case "warning":
        return (
          <WarningIcon primaryColor={"#ffce00"} label={status} size="medium" />
        );
      case "info":
        return (
          <InfoIcon primaryColor={"#0065ff"} label={status} size="medium" />
        );
    }
  };

  return (
    <FlagGroup onDismissed={onDismissed}>
      {flags.map(({ title, description, status }, flagId) => {
        return (
          <AutoDismissFlag
            id={flagId}
            icon={iconFromStatus(status)}
            key={flagId}
            title={title}
            description={description}
          />
        );
      })}
    </FlagGroup>
  );
};

export default MagicToast;
