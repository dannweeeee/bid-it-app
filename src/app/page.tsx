"use client";

import PageContainer from "@/components/ui/page-container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateAuctionDialog } from "@/components/ui/create-auction-dialog";
import LiveAuctions from "@/components/layout/live-auctions";
import CompletedAuctions from "@/components/layout/completed-auctions";

export default function Home() {
  return (
    <main className="pt-24">
      <PageContainer scrollable={true}>
        <div className="space-y-2">
          <Tabs defaultValue="live-auctions" className="space-y-4">
            <div className="flex items-center justify-between space-y-2">
              <TabsList>
                <TabsTrigger value="live-auctions">Live Auctions</TabsTrigger>
                <TabsTrigger value="completed-auctions">
                  Completed Auctions
                </TabsTrigger>
              </TabsList>
              <CreateAuctionDialog />
            </div>
            <TabsContent value="live-auctions" className="space-y-4">
              <LiveAuctions />
            </TabsContent>
            <TabsContent value="completed-auctions" className="space-y-4">
              <CompletedAuctions />
            </TabsContent>
          </Tabs>
        </div>
      </PageContainer>
    </main>
  );
}
