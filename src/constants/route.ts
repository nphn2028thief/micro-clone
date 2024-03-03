import { LayoutDashboard, Star } from "lucide-react";

import { EPath } from "./path";
import { IRoute } from "@/types/route";

export const routes: IRoute[] = [
  {
    id: 1,
    name: "Team boards",
    icon: LayoutDashboard,
    href: EPath.DASHBOARD,
  },
  {
    id: 2,
    name: "Favorite boards",
    icon: Star,
    href: EPath.FAVORITE,
  },
];
