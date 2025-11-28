import { Package, ScrollText, ShoppingBag } from "lucide-react";

import type { LucideIcon } from "lucide-react";

export interface MenuItem {
  key: string;
  title: string;
  url: string;
  icon: LucideIcon;
  children: MenuItem[];
}

export interface MenuGroup {
  menuLabel: string;
  menuItems: MenuItem[];
}

export const MENU_ITEMS: MenuGroup[] = [
  {
    menuLabel: "Home",
    menuItems: [
      {
        key: "products",
        title: "Products",
        url: "/products",
        icon: Package,
        children: [],
      },
      {
        key: "orders",
        title: "Orders",
        url: "/orders",
        icon: ShoppingBag,
        children: [],
      },
      {
        key: "rich-text-editor",
        title: "Rich Text Editor",
        url: "/rich-text-editor",
        icon: ScrollText,
        children: [],
      },
    ],
  },
];
