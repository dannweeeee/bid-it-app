"use client";

import PageContainer from "@/components/ui/page-container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Dashboard from "@/components/layout/dashboard";
import Profile from "@/components/layout/profile";
import { CreateAuctionDialog } from "@/components/ui/create-auction-dialog";
import { useState } from "react";
import { useAccount } from "wagmi";

export default function Home() {
  return (
    <main className="pt-24">
      <PageContainer scrollable={true}>
        <div className="space-y-2">
          <Tabs defaultValue="dashboard" className="space-y-4">
            <div className="flex items-center justify-between space-y-2">
              <TabsList>
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="profile">Profile</TabsTrigger>
              </TabsList>
              <CreateAuctionDialog />
            </div>
            <TabsContent value="dashboard" className="space-y-4">
              <Dashboard />
            </TabsContent>
            <TabsContent value="profile" className="space-y-4">
              <Profile />
            </TabsContent>
          </Tabs>
        </div>
      </PageContainer>
    </main>
  );
}
