import { ReactNode } from "react";

import Sidebar from "@/components/Sidebar";
import OrgSidebar from "@/components/OrgSidebar";
import Navbar from "@/components/Navbar";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="h-full">
      <Sidebar />
      <div className="h-full ml-sidebar">
        <div className="h-full flex gap-3">
          <OrgSidebar />
          <div className="flex-1">
            <Navbar />
            {children}
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;
