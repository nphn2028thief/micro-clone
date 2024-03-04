import { ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip";

interface IProps {
  label: string;
  side?: "left" | "top" | "right" | "bottom";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  alignOffset?: number;
  children: ReactNode;
}

const Hint = (props: IProps) => {
  const { label, side, align, sideOffset, alignOffset, children } = props;

  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          className="text-white bg-black border-black"
          side={side}
          align={align}
          sideOffset={sideOffset}
          alignOffset={alignOffset}
        >
          <p className="font-semibold capitalize">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Hint;
