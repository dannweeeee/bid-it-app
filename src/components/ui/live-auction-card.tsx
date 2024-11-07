"use client";

import { Clock, Coins, Package, Copy } from "lucide-react";
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
import { useFetchTokenDetails } from "@/hooks/useFetchTokenDetails";
import { Button } from "./button";
import { useEffect, useState } from "react";

interface AuctionCardProps {
  address: Address;
}

export function LiveAuctionCard({ address }: AuctionCardProps) {
  const account = useAccount();
  const tokenDetails = useFetchTokenDetails(address);
  const priceIntervals = useFetchAuctionPriceIntervals(address);
  console.log(priceIntervals);
  const auctionStatus = useFetchAuctionStatus(address);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  console.log(auctionStatus);
  const isOwner = useCheckAuctionOwner(address, account.address as Address);

  useEffect(() => {
    if (auctionStatus?.timeRemaining) {
      setTimeRemaining(Number(auctionStatus.timeRemaining));

      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 0) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [auctionStatus?.timeRemaining]);

  const formattedData =
    priceIntervals?.map((interval) => ({
      minute: interval.minute,
      price: Number((Number(interval.price) / 1e18).toFixed(10)),
    })) ?? [];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background/80 backdrop-blur-sm border rounded-lg p-2 shadow-lg text-xs sm:text-sm sm:p-3">
          <p className="font-medium">
            Price: {payload[0].value.toFixed(18)} ETH
          </p>
          <p className="text-muted-foreground">
            Time: {payload[0].payload.minute}m
          </p>
        </div>
      );
    }
    return null;
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getAuctionStatusBadge = () => {
    if (!auctionStatus) return null;

    if (auctionStatus.isEnded) {
      return (
        <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded">
          Ended
        </span>
      );
    }
    if (!auctionStatus.isStarted) {
      return (
        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded">
          Not Started
        </span>
      );
    }
    return (
      <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">
        Active
      </span>
    );
  };

  const formatTimeRemaining = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 max-w-full overflow-x-hidden">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                {tokenDetails?.tokenName} ({tokenDetails?.tokenSymbol})
              </CardTitle>
              {getAuctionStatusBadge()}
            </div>
            <CardDescription className="text-xs sm:text-sm space-y-1">
              <div className="flex items-center gap-2">
                <span>
                  Token Address:{" "}
                  {tokenDetails?.tokenAddress
                    ? truncateAddress(tokenDetails.tokenAddress)
                    : ""}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={() =>
                    tokenDetails?.tokenAddress &&
                    copyToClipboard(tokenDetails.tokenAddress)
                  }
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
              <p>
                Initial Supply:{" "}
                {Number(tokenDetails?.tokenTotalSupply || BigInt(0)) /
                  Math.pow(10, tokenDetails?.tokenDecimals || 18)}{" "}
                {tokenDetails?.tokenSymbol}
              </p>
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3 mb-6">
          <div className="flex items-center gap-2 bg-slate-100 p-2 sm:p-3 rounded-lg">
            <Coins className="h-4 w-4 text-slate-600 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-xs sm:text-sm text-slate-600">Current Price</p>
              <p className="text-sm sm:text-base font-medium truncate">
                {auctionStatus
                  ? (Number(auctionStatus.currentTokenPrice) / 1e18).toFixed(10)
                  : 0}{" "}
                ETH
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-slate-100 p-2 sm:p-3 rounded-lg">
            <Package className="h-4 w-4 text-slate-600 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-xs sm:text-sm text-slate-600">
                Remaining Tokens
              </p>
              <p className="text-sm sm:text-base font-medium truncate">
                {auctionStatus ? Number(auctionStatus.remainingTokens) : 0}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-slate-100 p-2 sm:p-3 rounded-lg">
            <Clock className="h-4 w-4 text-slate-600 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-xs sm:text-sm text-slate-600">
                Time Remaining
              </p>
              <p className="text-sm sm:text-base font-medium truncate">
                {formatTimeRemaining(timeRemaining)}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full h-[250px] sm:h-[310px] -mx-4 sm:mx-0">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={formattedData}
              margin={{
                top: 20,
                right: 20,
                left: 0,
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
                tickMargin={8}
                tickFormatter={(value) => `${value}m`}
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                interval={0}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => `${value.toFixed(3)}`}
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                width={60}
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
                strokeWidth={2}
                dot={{ fill: "hsl(var(--chart-1))", strokeWidth: 2, r: 3 }}
                activeDot={{ r: 5, fill: "hsl(var(--chart-1))" }}
                animationDuration={1000}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-3">
        {isOwner && !auctionStatus?.isStarted && !auctionStatus?.isEnded && (
          <div className="flex flex-wrap justify-center gap-2 w-full border-t pt-3">
            <StartAuctionButton
              contractAddress={address}
              walletAddress={account.address as Address}
            />
          </div>
        )}
        {isOwner && auctionStatus?.isStarted && !auctionStatus?.isEnded && (
          <div className="flex flex-wrap justify-center gap-2 w-full border-t pt-3">
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
          </div>
        )}
        {!isOwner && auctionStatus?.isStarted && !auctionStatus?.isEnded && (
          <div className="flex flex-wrap justify-center gap-2 w-full border-t pt-3">
            <BidButton
              contractAddress={address}
              walletAddress={account.address as Address}
            />
          </div>
        )}
        {isOwner && auctionStatus?.isEnded && (
          <div className="flex-shrink-0">
            <WithdrawEthButton
              contractAddress={address}
              walletAddress={account.address as Address}
            />
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
