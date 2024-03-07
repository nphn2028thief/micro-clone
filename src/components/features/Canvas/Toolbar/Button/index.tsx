"use client";

import { LucideIcon } from "lucide-react";

import Hint from "@/components/common/Hint";
import { Button } from "@/components/ui/button";

interface IProps {
  label: string;
  icon: LucideIcon;
  isActive?: boolean;
  disabled?: boolean;
  onClick: () => void;
}

const ToolbarButton = (props: IProps) => {
  const { label, icon: Icon, isActive, disabled, onClick } = props;

  return (
    <Hint label={label} side="right" sideOffset={14}>
      <Button
        size="icon"
        variant={isActive ? "boardActive" : "board"}
        disabled={disabled}
        onClick={onClick}
      >
        <Icon />
      </Button>
    </Hint>
  );
};

export default ToolbarButton;
