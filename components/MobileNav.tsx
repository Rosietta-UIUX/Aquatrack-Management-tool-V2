"use client";
import Link from "next/link";
import Logo from "@/public/logo.png";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { links } from "@/contants";
import logoutIcon from "@/public/icons/logout.png";

export function MobileNav({ show }: any) {
  const pathname = usePathname();

  return (
    <div className={show && `bg-[#0a0a0ad1] fixed h-screen w-full z-20`}>
      <div
        className={`h-screen lg:w-[18rem] w-[20rem] bg-white  shadow-sm transform lg:translate-x-0 lg:relative absolute left-0 transition ease-in-out duration-100`}>
        <div className="p-6">
          <Image src={Logo} width="180" alt="Logo" className="" />
        </div>

        <nav className="mt-8 space-y-2">
          {links?.map((data) => (
            <Link
              key={data?.id}
              href={data?.link}
              className={`flex items-center hover:font-semibold space-x-2 text-[--primary] hover:bg-[#0181ea15] py-3 pl-4 transition-all ${
                pathname === data?.link
                  ? `bg-[#0181ea15] font-semibold border-[--primary] border-l-8`
                  : ``
              }`}>
              <Image
                src={data?.icon}
                alt={data?.title}
                layout="fixed"
                width="25"
                height="25"
              />
              <p>{data?.title}</p>
            </Link>
          ))}
          <Button
            variant="ghost"
            className="flex w-full items-center justify-start font-bold space-x-2 text-red-500 hover:bg-[#ea1c0115] hover:text-red-500 py-8 pl-4  rounded-xl transition-all">
            <Image
              src={logoutIcon}
              alt="Logout"
              layout="fixed"
              width="25"
              height="25"
            />
            <p>Log Out</p>
          </Button>
        </nav>
      </div>
    </div>
  );
}
