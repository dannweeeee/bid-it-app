import PageContainer from "@/components/ui/page-container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="pt-24">
      <PageContainer scrollable={true}>
        <div className="space-y-2">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">
              Dutch Auction for Token ICOs
            </h2>
            <Button className="py-2 px-5 bg-black text-white font-light rounded-xl hover:bg-black/70 hover:scale-105 transition ease-in-out disabled:bg-black-opacity-30">
              Create Auction
            </Button>
          </div>
          <Tabs defaultValue="dashboard" className="space-y-4">
            <TabsList>
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>
            <TabsContent value="dashboard" className="space-y-4">
              Dashboard
            </TabsContent>
            <TabsContent value="profile" className="space-y-4">
              Profile
            </TabsContent>
          </Tabs>
        </div>
      </PageContainer>
    </main>
  );
}
