"use client";

import {
  OrganizationSwitcher,
  UserButton,
  useOrganization,
} from "@clerk/nextjs";

import { NavbarSearch } from "./Search";
import InviteButton from "./InviteButton";

const Navbar = () => {
  const { organization } = useOrganization();

  return (
    <nav className="flex items-center gap-4 p-3">
      <div className="hidden lg:flex lg:flex-1">
        <NavbarSearch />
      </div>
      <div className="block lg:hidden flex-1">
        <OrganizationSwitcher
          hidePersonal
          appearance={{
            elements: {
              rootBox: {
                width: "100%",
                height: "38px",
                maxWidth: "376px",
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
              organizationPreviewAvatarBox: {
                width: "24px",
                height: "24px",
              },
            },
          }}
        />
      </div>
      {organization ? <InviteButton /> : null}
      <div className="hidden md:block">
        <UserButton />
      </div>
    </nav>
  );
};

export default Navbar;
