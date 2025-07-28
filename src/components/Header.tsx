"use client";
import { useState } from "react";
import Image from "next/image";
import logoImg from "@/public/logo.png";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { navs } from "@/contants";
import { Button } from "./ui/button";
import { IoIosMenu, IoMdClose } from "react-icons/io";
import { Dialog, Popover } from "@headlessui/react";

const Header = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header>
      <div className="flex items-center justify-between lg:w-10/12 w-10/12 mx-auto lg:h-[14vh] h-[10vh]">
        <div className="left-nav flex items-center justify-between lg:w-auto w-full lg:space-x-8">
          <Link href="/">
            <Image
              src={logoImg}
              alt="Aquatrack"
              width="150"
              height="150"
              className="lg:flex hidden"
            />
            <Image
              src={logoImg}
              alt="Aquatrack"
              width="120"
              height="120"
              className="flex lg:hidden"
            />
          </Link>

          <nav className="nav-links hidden space-x-14 lg:flex items-center">
            {navs?.map((nav) => (
              <Link
                key={nav?.id}
                href={nav?.link}
                className={`${
                  pathname === nav?.link
                    ? "text-[--primary]  font-medium text-base"
                    : " text-base text-gray-500"
                }`}>
                {nav?.title}
              </Link>
            ))}
          </nav>

          <IoIosMenu
            className="text-[--primary] h-8 w-8 lg:hidden"
            onClick={() => setMobileMenuOpen(true)}
            aria-hidden="true"
          />
        </div>
        <Link href="/">
          <Button className="bg-[--primary] lg:flex hidden hover:bg-blue-500 w-[195px] h-[53px] text-white px-8">
            Log In
          </Button>
        </Link>

        {/* Mobile view */}

        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-10" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-gray-100 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between w-11/12 py-6 h-[60px] rounded-2xl mx-auto">
              <Image
                src={logoImg}
                alt="Aquatrack logo"
                width="100"
                height="100"
                layout="fixed"
              />
              <button
                type="button"
                className="-m-2.5 rounded-md border border-[--primary] p-2.5 text-[--primary]"
                onClick={() => setMobileMenuOpen(false)}>
                <span className="sr-only">Close menu</span>
                <IoMdClose className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <nav className="space-y-8 flex flex-col pt-20 w-full pl-8">
                  {navs?.map((nav) => (
                    <Link
                      key={nav?.id}
                      href={nav?.link}
                      className={`${
                        pathname === nav?.link
                          ? "text-[--primary]  font-medium text-base"
                          : " text-base text-gray-500"
                      }`}>
                      {nav?.title}
                    </Link>
                  ))}
                  <div className="mt-8">
                    <Button className="bg-[--primary] hover:bg-blue-500 w-[195px] h-[53px] text-white px-8">
                      Log In
                    </Button>
                  </div>
                </nav>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </div>
    </header>
  );
};

export default Header;
