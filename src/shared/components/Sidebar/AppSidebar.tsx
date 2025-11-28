import { ReactNode } from "react";
import { MenuGroup } from "../../constants/menu-items";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import Link from "next/link";

interface AppSidebarProps {
  sidebarHeader: ReactNode;
  sidebarFooter: ReactNode;
  menuItems: MenuGroup[];
}

export function AppSidebar({
  sidebarHeader,
  menuItems,
  sidebarFooter,
}: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader className="px-4">{sidebarHeader}</SidebarHeader>
      <SidebarContent>
        {menuItems.map((item, index) => (
          <SidebarGroup key={index}>
            <SidebarGroupLabel>{item.menuLabel}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.menuItems.map((menu, index) => (
                  <SidebarMenuItem
                    key={index}
                    className="hover:bg-red-200 rounded-lg"
                  >
                    <SidebarMenuButton asChild>
                      <Link href={menu.url}>
                        <menu.icon />
                        <span>{menu.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="px-4">{sidebarFooter}</SidebarFooter>
    </Sidebar>
  );
}
