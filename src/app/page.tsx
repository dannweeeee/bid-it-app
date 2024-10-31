import PageContainer from "@/components/ui/page-container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
          </div>
          <Tabs defaultValue="dashboard" className="space-y-4">
            <TabsList>
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="create-auction">Create Auction</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>
            <TabsContent value="dashboard" className="space-y-4">
              Dashboard
            </TabsContent>
            <TabsContent value="create-auction" className="space-y-4">
              Create Auction
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
