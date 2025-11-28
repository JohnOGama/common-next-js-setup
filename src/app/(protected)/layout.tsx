import { AppSidebar } from "@/src/shared/components/Sidebar";
import {
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
} from "@/src/shared/components/ui/sidebar";
import { MENU_ITEMS } from "@/src/shared/constants/menu-items";
import React from "react";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar
        sidebarHeader={<SidebarHeader />}
        menuItems={MENU_ITEMS}
        sidebarFooter={<SidebarFooter />}
      />
      <main className="p-4 w-full">{children}</main>
    </SidebarProvider>
  );
};

export default ProtectedLayout;
