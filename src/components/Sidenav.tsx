"use client";
import Link from "next/link";
import Logo from "@/public/logo.png";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { links } from "@/contants";
import LogoutModal from "./LogoutModal";
import { useState } from "react";
import { ChevronFirst, ChevronLast } from "lucide-react";
import SubscriptionModal from "./SubscriptionModal";
import useCheckSubscriptionStatus from "@/hooks/useSubscriptionStatus";

export function Sidenav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openSub, setOpenSub] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const { active_subscription } = useCheckSubscriptionStatus();

  return (
    <aside className="h-screen hidden lg:block">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div
          className={`p-4 pb-2 flex justify-between items-center ${
            expanded ? "flex-row" : "flex-col"
          }`}
        >
          <Image
            src={Logo}
            alt="Logo"
            className={`overflow-hidden transition-all ${
              expanded ? "w-32" : "w-0"
            }`}
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <LogoutModal open={open} setOpen={setOpen} />

        <div className="flex-1 overflow-y-auto">
          <ul className="px-3">
            {links.map((data) => (
              <Link key={data.id} href={data.link}>
                <li
                className={`
                relative flex items-center py-2 px-3 my-1
                font-medium rounded-md cursor-pointer
                transition-colors group
                ${
                  pathname === data.link
                    ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
                    : "hover:bg-indigo-50 text-gray-600"
                }
              `}
              >
                <data.icon className="w-5 h-5" />
                <span
                  className={`overflow-hidden transition-all ${
                    expanded ? "w-40 ml-3" : "w-0"
                  }`}
                >
                  {data.title}
                </span>
                {!expanded && (
                  <div
                    className={`
                    absolute left-full rounded-md px-2 py-1 ml-6
                    bg-indigo-100 text-indigo-800 text-sm
                    invisible opacity-20 -translate-x-3 transition-all
                    group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
                `}
                  >
                    {data.title}
                  </div>
                )}
                </li>
              </Link>
            ))}
          </ul>
        </div>

        {active_subscription && (
          <div className="border-t flex p-3">
            <SubscriptionModal open={openSub} setOpen={setOpenSub} />
            <div
              className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-40 ml-3" : "w-0"}
          `}
            >
              <div className="leading-4">
                <h4 className="font-semibold">GO PRO</h4>
                <span className="text-xs text-gray-600">
                  Upgrade to access all features
                </span>
              </div>
              <Button
                onClick={() => setOpenSub(true)}
                className="bg-indigo-500 text-white"
                size="sm"
              >
                Upgrade
              </Button>
            </div>
          </div>
        )}
      </nav>
    </aside>
  );
}
