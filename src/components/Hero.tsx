import React from "react";
import Image from "next/image";
import { Hand } from "lucide-react";
import heroWorkImg from "@/public/heroImg.png";
import { greetUser } from "@/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

const Hero = ({ data, messages }: any) => {
  // Greeting user function
  const greeting = greetUser();
  return (
    <section className="lg:w-11/12 w-11/12 mx-auto lg:mb-0 mb-4">
      <div className="flex items-center justify-between lg:mt-0 mt-4">
        <div className="left-side flex lg:space-x-6 space-x-4 bg-white rounded-2xl shadow-md p-6 lg:w-9/12 w-full hover:shadow-lg transition-shadow">
          <div className="p-3 bg-yellow-100 rounded-full h-fit">
            <Hand className="text-yellow-500" size={24} />
          </div>
          <div className="content w-full">
            {data?.attributes?.first_name ? (
              <h2 className="font-semibold text-2xl">
                {greeting}, {data?.attributes?.first_name}
              </h2>
            ) : (
              <h2 className="font-semibold text-2xl flex items-center">
                {greeting}, <Skeleton className="h-7 w-24 bg-gray-200 ml-2" />
              </h2>
            )}
            <p className="text-gray-500 mt-1">
              Welcome to your AquaTrack dashboard.
            </p>
            {messages?.length > 0 && (
              <Alert className="mt-4 border-red-500 text-red-500">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription>
                  {messages?.map((message: any, index: any) => (
                    <p key={index}>{message}</p>
                  ))}
                </AlertDescription>
              </Alert>
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
