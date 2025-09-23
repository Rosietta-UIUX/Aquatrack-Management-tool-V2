import {
  LayoutDashboard,
  Boxes,
  Droplets,
  Warehouse,
  Fish,
  Settings,
  Bot,
  Calculator,
  TrendingUp,
} from "lucide-react";

export const navs = [
  {
    id: 1,
    title: "Dashboard",
    link: "/account",
  },
  {
    id: 2,
    title: "About",
    link: "/about",
  },
  {
    id: 3,
    title: "Pricing",
    link: "/pricing",
  },
  {
    id: 4,
    title: "Why Aquatrack",
    link: "/why-aquatrack",
  },
];

export const links = [
  {
    id: 1,
    title: "Dashboard",
    icon: LayoutDashboard,
    link: "/account",
  },
  {
    id: 2,
    title: "Batch",
    icon: Boxes,
    link: "/account/batch",
  },
  {
    id: 3,
    title: "Ponds",
    icon: Droplets,
    link: "/account/ponds",
  },
  {
    id: 4,
    title: "Inventory",
    icon: Warehouse,
    link: "/account/inventory",
  },
  {
    id: 5,
    title: "Harvest",
    icon: Fish,
    link: "/account/harvest",
  },
  {
    id: 6,
    title: "Settings",
    icon: Settings,
    link: "/account/settings",
  },
  {
    id: 7,
    title: "AI Assistant",
    icon: Bot,
    link: "/account/assistant",
  },
  {
    id: 8,
    title: "Analytics",
    icon: Calculator,
    link: "/account/analytics",
  },
];
