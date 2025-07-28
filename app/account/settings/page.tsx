"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SettingsForm from "@/components/SettingsForm";
import { useGetCurrentUserQuery } from "@/redux/services/userApiSlice";
import NavHeader from "@/components/NavHeader";
import TeamMembers from "@/components/TeamMembers";
import Farms from "@/components/Farms";
import Billings from "@/components/Billings";
import { useGetBuillingRecordsQuery } from "@/redux/services/subApiSlice";

const SettingsPage = () => {
  const { refetch, data } = useGetCurrentUserQuery(null);
  const { data: billingData } = useGetBuillingRecordsQuery(null);
  return (
    <>
      <NavHeader />
      <main className="w-11/12 mx-auto mt-10 ">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full lg:grid-cols-4 grid-cols-4 lg:gap-x-8 gap-x-10 lg:w-6/12">
            <TabsTrigger
              value="profile"
              className="bg-transparent font-normal data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:text-[--primary] data-[state=active]:font-bold data-[state=active]:rounded-none data-[state=active]:border-b-4 data-[state=active]:border-[--primary] data-[state=active]:pb-2 lg:text-base text-sm lg:data-[state=active]:text-base data-[state=active]:text-sm">
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="account"
              className="bg-transparent font-normal data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:text-[--primary] data-[state=active]:font-bold data-[state=active]:rounded-none data-[state=active]:border-b-4 data-[state=active]:border-[--primary] data-[state=active]:pb-2 lg:text-base text-sm lg:data-[state=active]:text-base data-[state=active]:text-sm">
              Account
            </TabsTrigger>
            <TabsTrigger
              value="farms"
              className="bg-transparent font-normal data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:text-[--primary] data-[state=active]:font-bold data-[state=active]:rounded-none data-[state=active]:border-b-4 data-[state=active]:border-[--primary] data-[state=active]:pb-2 lg:text-base text-sm lg:data-[state=active]:text-base data-[state=active]:text-sm">
              Farms
            </TabsTrigger>
            <TabsTrigger
              value="billing"
              className="bg-transparent font-normal data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:text-[--primary] data-[state=active]:font-bold data-[state=active]:rounded-none data-[state=active]:border-b-4 data-[state=active]:border-[--primary] data-[state=active]:pb-2 lg:text-base text-sm lg:data-[state=active]:text-base data-[state=active]:text-sm">
              Billing
            </TabsTrigger>
          </TabsList>
          <TabsContent value="profile" className="pt-8">
            {data?.data && <SettingsForm data={data?.data} refetch={refetch} />}
          </TabsContent>
          <TabsContent value="account">
            <TeamMembers />
          </TabsContent>
          <TabsContent value="farms">
            <h1 className="font-bold text-[--primary] mt-10 lg:text-xl text-lg ">
              Farms
            </h1>
            <Farms />
          </TabsContent>
          <TabsContent value="billing">
            <Billings data={billingData} />
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
};

export default SettingsPage;
