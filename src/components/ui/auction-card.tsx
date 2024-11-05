"use client";

import { TrendingUp, Clock, Coins, Package } from "lucide-react";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  LineChart,
  Line,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig } from "@/components/ui/chart";
import { Address } from "viem";
import { useFetchAuctionPriceIntervals } from "@/hooks/useFetchAuctionPriceIntervals";
import { useAccount } from "wagmi";
import { useCheckAuctionOwner } from "@/hooks/useCheckAuctionOwner";
import StartAuctionButton from "./start-auction-button";
import EndAuctionButton from "./end-auction-button";
import PauseAuctionButton from "./pause-auction-button";
import UnpauseAuctionButton from "./unpause-auction-button";
import BidButton from "./bid-button";
import WithdrawEthButton from "./withdraw-eth-button";
import { useFetchAuctionStatus } from "@/hooks/useFetchAuctionStatus";

interface AuctionCardProps {
  address: Address;
}

const chartConfig = {
  price: {
    label: "Price (ETH)",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function AuctionCard({ address }: AuctionCardProps) {
  const account = useAccount();
  const priceIntervals = useFetchAuctionPriceIntervals(address);
  const auctionStatus = useFetchAuctionStatus(address);
  const isOwner = useCheckAuctionOwner(address, account.address as Address);

  const formattedData =
    priceIntervals?.map((interval) => ({
      minute: interval.minute,
      price: Number((Number(interval.price) / 1e18).toFixed(10)),
    })) ?? [];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background/80 backdrop-blur-sm border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium">
            Price: {payload[0].value.toFixed(18)} ETH
          </p>
          <p className="text-sm text-muted-foreground">
            Time: {payload[0].payload.minute}m
          </p>
        </div>
      );
    }
    return null;
  };

  const getAuctionStatusBadge = () => {
    if (!auctionStatus) return null;

    if (auctionStatus.isEnded) {
      return (
        <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
          Ended
        </span>
      );
    }
    if (!auctionStatus.isStarted) {
      return (
        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
          Not Started
        </span>
      );
    }
    return (
      <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
        Active
      </span>
    );
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Auction Price Chart
            </CardTitle>
            {getAuctionStatusBadge()}
          </div>
          <CardDescription>Showing price decay over time</CardDescription>
        </div>
        {isOwner && (
          <WithdrawEthButton
            contractAddress={address}
            walletAddress={account.address as Address}
          />
        )}
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="flex items-center gap-2 bg-slate-100 p-3 rounded-lg">
            <Coins className="h-4 w-4 text-slate-600 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-sm text-slate-600">Current Price</p>
              <p className="font-medium truncate">
                {auctionStatus
                  ? Number(auctionStatus.currentTokenPrice) / 1e18
                  : 0}{" "}
                ETH
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-slate-100 p-3 rounded-lg">
            <Package className="h-4 w-4 text-slate-600 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-sm text-slate-600">Remaining Tokens</p>
              <p className="font-medium truncate">
                {auctionStatus ? Number(auctionStatus.remainingTokens) : 0}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-slate-100 p-3 rounded-lg">
            <Clock className="h-4 w-4 text-slate-600 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-sm text-slate-600">Time Remaining</p>
              <p className="font-medium truncate">
                {auctionStatus ? Number(auctionStatus.timeRemaining) : 0}s
              </p>
            </div>
          </div>
        </div>
        <div className="w-full h-[310px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={formattedData}
              margin={{
                top: 20,
                right: 10,
                left: 10,
                bottom: 20,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                opacity={0.2}
              />
              <XAxis
                dataKey="minute"
                tickLine={false}
                axisLine={false}
                tickMargin={12}
                tickFormatter={(value) => `${value}m`}
                stroke="hsl(var(--muted-foreground))"
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={12}
                tickFormatter={(value) => `${value.toFixed(3)}`}
                stroke="hsl(var(--muted-foreground))"
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{
                  stroke: "hsl(var(--muted-foreground))",
                  strokeWidth: 1,
                  strokeDasharray: "3 3",
                }}
              />
              <Line
                dataKey="price"
                type="monotone"
                stroke="hsl(var(--chart-1))"
                strokeWidth={2.5}
                dot={{ fill: "hsl(var(--chart-1))", strokeWidth: 2 }}
                activeDot={{ r: 6, fill: "hsl(var(--chart-1))" }}
                animationDuration={1000}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              <TrendingUp className="h-4 w-4" />
              Price decay over{" "}
              {formattedData.length > 0
                ? formattedData[formattedData.length - 1].minute
                : 0}{" "}
              minutes
            </div>
          </div>
        </div>
        {isOwner && (
          <div className="flex flex-wrap justify-center gap-3 w-full border-t pt-4">
            {!auctionStatus?.isStarted && !auctionStatus?.isEnded && (
              <StartAuctionButton
                contractAddress={address}
                walletAddress={account.address as Address}
              />
            )}
            {auctionStatus?.isStarted && !auctionStatus?.isEnded && (
              <>
                <EndAuctionButton
                  contractAddress={address}
                  walletAddress={account.address as Address}
                />
                <PauseAuctionButton
                  contractAddress={address}
                  walletAddress={account.address as Address}
                />
                <UnpauseAuctionButton
                  contractAddress={address}
                  walletAddress={account.address as Address}
                />
              </>
            )}
          </div>
        )}
        {!isOwner && auctionStatus?.isStarted && !auctionStatus?.isEnded && (
          <div className="flex flex-wrap justify-center gap-3 w-full border-t pt-4">
            <BidButton
              contractAddress={address}
              walletAddress={account.address as Address}
            />
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
