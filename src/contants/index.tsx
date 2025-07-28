import { LinkItem } from "@/types";
import dashboardIcon from "@/public/icons/dashboard.png";
import pondsIcon from "@/public/icons/ponds.png";
import batchIcon from "@/public/icons/batch.png";
import harvestIcon from "@/public/icons/harvest.png";
import inventoryIcon from "@/public/icons/inventory.png";
import settingsIcon from "@/public/icons/settings.png";
import { FaRobot } from "react-icons/fa6";
import Image from "next/image";

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

export const links: any[] = [
  {
    id: 1,
    title: "Dashboard",
    icon: () => <Image src={dashboardIcon} alt="Dashboard" width="20" height="20" />,
    link: "/account",
  },
  {
    id: 2,
    title: "Batch",
    icon: () => <Image src={batchIcon} alt="Batch" width="20" height="20" />,
    link: "/account/batch",
  },
  {
    id: 3,
    title: "Ponds",
    icon: () => <Image src={pondsIcon} alt="Ponds" width="20" height="20" />,
    link: "/account/ponds",
  },
  {
    id: 4,
    title: "Inventory",
    icon: () => <Image src={inventoryIcon} alt="Inventory" width="20" height="20" />,
    link: "/account/inventory",
  },
  {
    id: 5,
    title: "Harvest",
    icon: () => <Image src={harvestIcon} alt="Harvest" width="20" height="20" />,
    link: "/account/harvest",
  },
  {
    id: 6,
    title: "Settings",
    icon: () => <Image src={settingsIcon} alt="Settings" width="20" height="20" />,
    link: "/account/settings",
  },
  {
    id: 7,
    title: "AI Assistant",
    icon: FaRobot,
    link: "/account/assistant",
  },
  // {
  //   id: 6,
  //   title: "Support",
  //   icon: settingsIcon,
  //   link: "/account/support",
  // },
];
