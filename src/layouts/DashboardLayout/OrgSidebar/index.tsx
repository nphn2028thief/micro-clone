"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { OrganizationSwitcher } from "@clerk/nextjs";

import { Button } from "../../../components/ui/button";
import { EPath } from "@/constants/path";
import { routes } from "@/constants/route";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const OrgSidebar = () => {
  const pathname = usePathname();

  return (
    <div className="w-org-sidebar h-full hidden lg:flex flex-col gap-6 p-2">
      <Link href={EPath.DASHBOARD}>
        <div className="flex items-center gap-2 p-2 hover:opacity-75 transition">
          <Image src="/icons/logo.svg" alt="logo" width={60} height={60} />
          <span className={cn("font-semibold text-2xl", poppins.className)}>
            Board
          </span>
        </div>
      </Link>
      <OrganizationSwitcher
        hidePersonal
        appearance={{
          elements: {
            rootBox: {
              width: "100%",
              display: "flex",
            },
            organizationSwitcherTrigger: {
              flex: 1,
              justifyContent: "space-between",
              padding: "6px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              boxShadow: "none !important",
            },
          },
        }}
      />
      <div className="flex flex-col gap-1">
        {routes.map((route) => {
          const Icon = route.icon;

          return (
            <Button
              key={route.id}
              asChild
              variant={pathname === route.href ? "secondary" : "ghost"}
              size="lg"
              className="justify-start gap-2 px-2"
            >
              <Link href={route.href}>
                <Icon className="w-4 h-4" />
                {route.name}
              </Link>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default OrgSidebar;
