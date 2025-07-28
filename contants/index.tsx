import { LinkItem } from "@/types";
import dashboardIcon from "@/public/icons/dashboard.png";
import pondsIcon from "@/public/icons/ponds.png";
import batchIcon from "@/public/icons/batch.png";
import harvestIcon from "@/public/icons/harvest.png";
import inventoryIcon from "@/public/icons/inventory.png";
import settingsIcon from "@/public/icons/settings.png";

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

export const links: LinkItem[] = [
  {
    id: 1,
    title: "Dashboard",
    icon: dashboardIcon,
    link: "/account",
  },
  {
    id: 2,
    title: "Batch",
    icon: batchIcon,
    link: "/account/batch",
  },
  {
    id: 3,
    title: "Ponds",
    icon: pondsIcon,
    link: "/account/ponds",
  },
  {
    id: 4,
    title: "Inventory",
    icon: inventoryIcon,
    link: "/account/inventory",
  },
  {
    id: 5,
    title: "Harvest",
    icon: harvestIcon,
    link: "/account/harvest",
  },
  {
    id: 6,
    title: "Settings",
    icon: settingsIcon,
    link: "/account/settings",
  },
  // {
  //   id: 6,
  //   title: "Support",
  //   icon: settingsIcon,
  //   link: "/account/support",
  // },
];
