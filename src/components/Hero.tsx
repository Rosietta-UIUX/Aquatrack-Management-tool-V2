import React from "react";
import Image from "next/image";
import heroImg from "@/public/icons/greet.png";
import heroWorkImg from "@/public/heroImg.png";
import { Button } from "./ui/button";
import Link from "next/link";
import { greetUser } from "@/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { HiOutlineBellAlert } from "react-icons/hi2";

const Hero = ({ data, messages }: any) => {
  // Greeting user function
  const greeting = greetUser();
  return (
    <section className="lg:w-11/12 w-11/12 mx-auto lg:mb-0 mb-4">
      <div className="flex items-center justify-between lg:mt-0 mt-4">
        <div className="left-side flex lg:space-x-6 space-x-4 bg-white rounded-xl lg:px-8 lg:py-8 p-6 lg:w-9/12 w-full">
          <div>
            <Image
              src={heroImg}
              alt="Greeting Image"
              layout="fixed"
              width="60"
              height="60"
              className="lg:flex hidden"
            />
            <Image
              src={heroImg}
              alt="Greeting Image"
              layout="fixed"
              width="50"
              height="50"
              className="lg:hidden flex"
            />
          </div>
          <div className="content w-full">
            {data?.attributes?.first_name ? (
              <h2 className="text-[--primary] font-bold lg:text-xl text-lg ">
                {greeting}, {data?.attributes?.first_name}
              </h2>
            ) : (
              <h2 className="text-[--primary] font-bold lg:text-xl text-lg flex items-center ">
                {greeting}, <Skeleton className="h-6 w-[50px] bg-gray-200" />
              </h2>
            )}
            <p className="text-gray-500 lg:text-base text-xs lg:mt-2 mt-1">
              Welcome to your AquaTrack dashboard.{" "}
            </p>
            {messages?.length > 0 && (
              <div className="p-6 bg-red-100 rounded-lg m-4 flex items-center space-x-2 w-auto">
                <div>
                  <HiOutlineBellAlert className="h-12 w-12 text-red-500" />
                </div>
                {messages?.map((message: any, index: any) => (
                  <p key={index}>{message}</p>
                ))}
              </div>
            )}
          </div>
        </div>
        <Image
          src={heroWorkImg}
          alt="Greeting Image"
          layout="fixed"
          width="230"
          height="230"
          className="lg:flex hidden"
        />
      </div>
    </section>
  );
};

export default Hero;
