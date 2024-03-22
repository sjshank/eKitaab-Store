import React, { FC } from "react";
import * as Icons from "@mui/icons-material";

type IconNames = keyof typeof Icons;
type IconProps = {
  iconName: IconNames;
  fontSize: "inherit" | "large" | "medium" | "small";
};

const IconComponent: FC<IconProps> = ({ iconName, fontSize }) => {
  const Icon = Icons[iconName];
  return <>{Icon && <Icon fontSize={fontSize} />}</>;
};

export default IconComponent;
