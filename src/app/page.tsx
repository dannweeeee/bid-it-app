import PageContainer from "@/components/ui/page-container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Dashboard from "@/components/layout/dashboard";
import Profile from "@/components/layout/profile";

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
              <Button className="py-2 px-5 bg-black text-white font-light rounded-xl hover:bg-black/70 hover:scale-105 transition ease-in-out disabled:bg-black-opacity-30">
                Create Auction
              </Button>
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
