"use client";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";
import logoutIcon from "@/public/icons/logout.png";
import { Button } from "./ui/button";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { links } from "@/contants";
import { IoIosMenu, IoMdClose } from "react-icons/io";
import { Dialog } from "@headlessui/react";
import logoImg from "@/public/logo.png";
import Link from "next/link";
import AddFarmModal from "./AddFarmModal";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { useGetAllFarmsQuery } from "@/redux/services/farmApiSlice";
import useDefaultFarmId from "@/hooks/useDefaultFarmId";
import { GiCirclingFish } from "react-icons/gi";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import LogoutModal from "./LogoutModal";
import { Notification } from "./Notification";
import { useGetNotificationsQuery } from "@/redux/services/notificationApiSlice";
import fetchToken from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useGetCurrentUserQuery } from "@/redux/services/userApiSlice";

const NavHeader = () => {
  const { data: user } = useGetCurrentUserQuery(null);
  const { push } = useRouter();
  const { data } = useGetAllFarmsQuery(null);
  const { data: notification } = useGetNotificationsQuery(null);
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openLog, setOpenLog] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { handleFarmClick, defaultFarmId } = useDefaultFarmId();

  const userdata = user?.data;

  useEffect(() => {
    isAuth();
  }, []);

  const isAuth = async () => {
    try {
      const token = await fetchToken();
      if (!token?.data?.token) {
        push("/");
      }
    } catch (error: any) {
      if (error?.response?.status == "401") {
        push("/");
      }
    }
  };

  return (
    <nav className="bg-white w-full lg:h-[10vh] h-[8vh] flex items-center justify-center">
      <AddFarmModal open={open} setOpen={setOpen} />
      <LogoutModal open={openLog} setOpen={setOpenLog} />
      <div className="flex items-center justify-between w-11/12 mx-auto">
        <IoIosMenu
          className="text-[--primary] h-8 w-8 lg:hidden"
          onClick={() => setMobileMenuOpen(true)}
          aria-hidden="true"
        />
        <div className=" lg:flex hidden">
          {links?.map((data) => {
            if (pathname === data?.link) {
              return (
                <h1
                  key={data?.id}
                  className="font-bold text-xl text-[--primary] ">
                  {data?.title}
                </h1>
              );
            }
          })}
        </div>
        <div className="flex items-center lg:space-x-6 space-x-4">
          <Notification data={notification} />

          <div className="relative inline-block text-left">
            <div>
              {userdata ? (
                <button
                  type="button"
                  className="flex justify-between items-center space-x-3 w-full rounded-md border border-none p-0 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                  id="options-menu"
                  aria-haspopup="true"
                  aria-expanded="true"
                  onClick={() => setToggle(!toggle)}>
                  <Avatar>
                    <AvatarImage src={userdata?.attributes?.profile_photo} />
                    <AvatarFallback>
                      {userdata?.attributes?.first_name[0]}{" "}
                      {userdata?.attributes?.last_name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold text-[--primary] lg:flex hidden ">
                      {userdata?.attributes?.first_name}{" "}
                      {userdata?.attributes?.last_name}
                    </p>
                    <p className="text-sm font-semibold text-[--primary] lg:hidden flex">
                      {userdata?.attributes?.first_name}
                    </p>
                  </div>
                  <IoIosArrowDown className="text-[--primary] " />
                </button>
              ) : (
                <div className="flex items-center space-x-4">
                  <Skeleton className="lg:h-12 lg:w-12 h-8 w-8 rounded-full bg-gray-200" />
                  <div className="space-y-2">
                    <Skeleton className="lg:h-6 h-4 lg:w-[150px] w-[100px] bg-gray-200" />
                  </div>
                </div>
              )}
            </div>

            {toggle && (
              <div
                className="origin-top-right z-50 absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none p-2"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu">
                <div className="p-2" role="none">
                  <div className="px-2 pt-3 w-full space-y-2">
                    <Accordion
                      type="single"
                      collapsible
                      className="w-full border-none underline-none">
                      {data?.data?.organizations?.map(
                        (org: any, index: any) => (
                          <AccordionItem key={org?.id} value={org?.id}>
                            <AccordionTrigger className="h-2 p-0 py-4 bg-gray-100 border-none w-full flex items-center justify-between">
                              <label
                                className={`text-sm p-2 flex items-center cursor-pointer w-full `}>
                                <GiCirclingFish className="text-gray-500 h-4 w-4 mr-2 " />
                                <span className="text-sm font-normal">
                                  {org?.attributes?.organization_name}
                                </span>
                              </label>
                              <IoIosArrowDown />
                            </AccordionTrigger>
                            {org?.farms?.map((farm: any) => (
                              <AccordionContent
                                onClick={() => handleFarmClick(farm?.id)}
                                key={farm?.id}
                                className={` ${
                                  defaultFarmId === farm?.id && `bg-blue-100`
                                } hover:bg-blue-100 rounded-lg px-2 py-2 flex items-center border-none font-medium cursor-pointer`}>
                                <FaArrowAltCircleUp className="text-gray-400 h-3 w-3 mr-2 " />
                                <p className="text-xs">{farm?.name}</p>
                              </AccordionContent>
                            ))}
                          </AccordionItem>
                        )
                      )}
                    </Accordion>
                    {/* <DropdownMenuSeparator /> */}
                    <label
                      onClick={() => setOpen(true)}
                      className="flex items-center font-medium text-sm cursor-pointer ">
                      <FaArrowAltCircleUp className="text-gray-500 h-4 w-4 mr-2 " />
                      Add new farm
                    </label>
                    <DropdownMenuSeparator />
                    <label className="flex items-center text-sm font-medium cursor-pointer ">
                      <FaArrowAltCircleUp className="text-gray-500 h-4 w-4 mr-2 " />
                      Community
                    </label>
                    <DropdownMenuSeparator />
                    <label>
                      <Button
                        onClick={() => setOpenLog(true)}
                        variant="ghost"
                        className="flex w-full items-center justify-between font-bold space-x-2 text-red-500 hover:text-red-500 focus:bg-[#ea1c0115] focus:text-red-500  rounded-xl transition-all">
                        <Image
                          src={logoutIcon}
                          alt="Logout"
                          layout="fixed"
                          width="20"
                          height="20"
                        />
                        <p>Log Out</p>
                      </Button>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

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
              width="150"
              height="150"
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
              <nav className="mt-8 space-y-2">
                {links?.map((data) => (
                  <Link
                    key={data?.id}
                    href={data?.link}
                    onClick={() => setMobileMenuOpen(false)}
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
                  onClick={() => setOpenLog(true)}
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
        </Dialog.Panel>
      </Dialog>
    </nav>
  );
};

export default NavHeader;
