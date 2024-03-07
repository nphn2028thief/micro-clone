import { CSSProperties, ReactNode } from "react";

import Hint from "@/components/common/Hint";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface IProps {
  label?: string;
  side?: "bottom" | "left" | "top" | "right";
  sideOffset?: number;
  src?: string;
  fallback: ReactNode;
  style?: CSSProperties;
}

const UserAvatar = (props: IProps) => {
  const { label, side = "bottom", sideOffset, src, fallback, style } = props;

  return (
    <Hint label={label || "Anonymous"} side={side} sideOffset={sideOffset}>
      <Avatar style={style} className="h-8 w-8 border-2">
        <AvatarImage src={src} />
        <AvatarFallback className="text-sm font-semibold">
          {fallback}
        </AvatarFallback>
      </Avatar>
    </Hint>
  );
};

export default UserAvatar;
