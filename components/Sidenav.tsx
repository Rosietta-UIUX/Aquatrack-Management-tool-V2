"use client";
import Link from "next/link";
import Logo from "@/public/logo.png";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { links } from "@/contants";
import LogoutModal from "./LogoutModal";
import { useState } from "react";
import logoutImg from "@/public/logout.png";
import { FaCloudArrowDown } from "react-icons/fa6";
import SubscriptionModal from "./SubscriptionModal";
import useCheckSubscriptionStatus from "@/hooks/useSubscriptionStatus";

export function Sidenav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openSub, setOpenSub] = useState(false);
  const { active_subscription } = useCheckSubscriptionStatus();

  return (
    <div
      className={`h-screen overflow-y-auto lg:w-[18rem] bg-white  shadow-sm transform translate-x-[-100%] lg:translate-x-0 lg:relative absolute left-0 transition ease-in-out duration-100`}>
      <div className="p-6">
        <Image src={Logo} width="140" alt="Logo" className="" />
      </div>
      <LogoutModal open={open} setOpen={setOpen} />

      <nav className="mt-2 space-y-1 pb-10">
        {links?.map((data) => (
          <Link
            key={data?.id}
            href={data?.link}
            className={`flex text-base items-center hover:font-semibold space-x-2 text-[--secondary] hover:bg-[#0181ea15] py-3 pl-4 transition-all ${
              pathname === data?.link
                ? `bg-[#0181ea15] font-semibold border-[--secondary] border-l-8`
                : ``
            }`}>
            <Image
              src={data?.icon}
              alt={data?.title}
              layout="fixed"
              width="20"
              height="20"
            />
            <p>{data?.title}</p>
          </Link>
        ))}
        {active_subscription && (
          <div
            className={` ${
              active_subscription ? "flex" : "hidden"
            } px-4 pt-10`}>
            <SubscriptionModal open={openSub} setOpen={setOpenSub} />
            <div className="subscription space-y-2 bg-[--primary] py-3 px-4 rounded-lg text-white relative ">
              <Image
                src={logoutImg}
                alt="log out"
                width={80}
                height={80}
                layout="fixed"
                className="mx-auto absolute top-[-2.5rem] right-0"
              />
              <h2 className="font-bold text-lg">GO PRO</h2>
              <p className="text-sm font-normal">
                Gain access to all our premuim features
              </p>
              <Button
                onClick={() => setOpenSub(true)}
                className="w-full text-[--primary] font-semibold px-4 py-4 bg-white hover:bg-blue-200 flex items-center text-sm">
                Upgrade <FaCloudArrowDown className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
