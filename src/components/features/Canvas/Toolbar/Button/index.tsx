import { LucideIcon } from "lucide-react";

interface IProps {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  isActive?: boolean;
}

const ToolbarButton = (props: IProps) => {
  const { label, icon, onClick, isActive } = props;

  return <div>ToolbarButton</div>;
};

export default ToolbarButton;
