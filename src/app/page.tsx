"use client";

import PageContainer from "@/components/ui/page-container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateAuctionDialog } from "@/components/ui/create-auction-dialog";
import LiveAuctions from "@/components/layout/live-auctions";
import CompletedAuctions from "@/components/layout/completed-auctions";

export default function Home() {
  return (
    <main className="pt-28 min-h-screen">
      <PageContainer scrollable={true}>
        <div className="space-y-2">
          <Tabs defaultValue="live-auctions" className="space-y-4 pt-10">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
              <TabsList className="w-full sm:w-auto">
                <TabsTrigger
                  value="live-auctions"
                  className="flex-1 sm:flex-none"
                >
                  Live Auctions
                </TabsTrigger>
                <TabsTrigger
                  value="completed-auctions"
                  className="flex-1 sm:flex-none"
                >
                  Completed Auctions
                </TabsTrigger>
              </TabsList>
              <div className="hidden sm:flex items-center justify-center w-full sm:w-auto">
                <CreateAuctionDialog />
              </div>
            </div>
            <TabsContent value="live-auctions" className="space-y-4">
              <LiveAuctions />
              <div className="flex sm:hidden items-center justify-center w-full mt-8">
                <CreateAuctionDialog />
              </div>
            </TabsContent>
            <TabsContent value="completed-auctions" className="space-y-4">
              <CompletedAuctions />
              <div className="flex sm:hidden items-center justify-center w-full mt-8">
                <CreateAuctionDialog />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </PageContainer>
    </main>
  );
}
