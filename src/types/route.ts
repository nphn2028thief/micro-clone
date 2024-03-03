import { LucideIcon } from "lucide-react";

import { EPath } from "@/constants/path";

export interface IRoute {
  id: number;
  name: string;
  icon: LucideIcon;
  href: EPath;
}
