"use client";

import { Flame, Coins, Copy, BadgeCent } from "lucide-react";

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
import WithdrawEthButton from "./withdraw-eth-button";
import { useFetchAuctionStatus } from "@/hooks/useFetchAuctionStatus";
import { useFetchTokenDetails } from "@/hooks/useFetchTokenDetails";
import { Button } from "./button";
import { useFetchTokensSold } from "@/hooks/useFetchTokensSold";
import { useFetchTokensRemaining } from "@/hooks/useFetchTokensRemaining";
import { useFetchFinalPrice } from "@/hooks/useFetchFinalPrice";
import { Skeleton } from "./skeleton";
import { useEffect, useState } from "react";

interface AuctionCardProps {
  address: Address;
}

export function CompletedAuctionCard({ address }: AuctionCardProps) {
  const tokensSold = useFetchTokensSold(address);
  const tokensRemaining = useFetchTokensRemaining(address);
  const finalPrice = useFetchFinalPrice(address);
  const account = useAccount();
  const tokenDetails = useFetchTokenDetails(address);
  const priceIntervals = useFetchAuctionPriceIntervals(address);
  const auctionStatus = useFetchAuctionStatus(address);
  const isOwner = useCheckAuctionOwner(address, account.address as Address);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (
      tokenDetails &&
      priceIntervals &&
      auctionStatus &&
      tokensSold !== undefined &&
      tokensRemaining !== undefined &&
      finalPrice !== undefined
    ) {
      setIsLoading(false);
    }
  }, [
    tokenDetails,
    priceIntervals,
    auctionStatus,
    tokensSold,
    tokensRemaining,
    finalPrice,
  ]);

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getAuctionStatusBadge = () => {
    if (!auctionStatus) return <Skeleton className="h-6 w-20" />;

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

  if (isLoading) {
    return (
      <Card className="hover:shadow-lg transition-shadow duration-200 max-w-full overflow-x-hidden">
        <CardHeader>
          <Skeleton className="h-8 w-3/4 mb-4" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3 mb-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
          <Skeleton className="h-[250px] sm:h-[310px] w-full" />
        </CardContent>
        <CardFooter>
          <Skeleton className="h-10 w-full" />
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 max-w-full overflow-x-hidden">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                {tokenDetails ? (
                  `${tokenDetails.tokenName} (${tokenDetails.tokenSymbol})`
                ) : (
                  <Skeleton className="h-6 w-32" />
                )}
              </CardTitle>
              {getAuctionStatusBadge()}
            </div>
            <CardDescription className="text-xs sm:text-sm space-y-1">
              <div className="flex items-center gap-2">
                <span>
                  Token Address:{" "}
                  {tokenDetails?.tokenAddress ? (
                    truncateAddress(tokenDetails.tokenAddress)
                  ) : (
                    <Skeleton className="h-4 w-24 inline-block" />
                  )}
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
                {tokenDetails ? (
                  `${
                    Number(tokenDetails.tokenTotalSupply) /
                    Math.pow(10, tokenDetails.tokenDecimals)
                  } ${tokenDetails.tokenSymbol}`
                ) : (
                  <Skeleton className="h-4 w-28 inline-block" />
                )}
              </p>
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3 mb-6">
          <div className="flex items-center gap-2 bg-[#EAEAEA] p-2 sm:p-3 rounded-lg">
            <Coins className="h-4 w-4 text-slate-600 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-xs sm:text-sm text-slate-600">Final Price</p>
              {finalPrice !== undefined ? (
                <p className="text-sm sm:text-base font-medium truncate">
                  {(Number(finalPrice) / 1e18).toFixed(10)} ETH
                </p>
              ) : (
                <Skeleton className="h-5 w-24" />
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 bg-[#EAEAEA] p-2 sm:p-3 rounded-lg">
            <BadgeCent className="h-4 w-4 text-slate-600 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-xs sm:text-sm text-slate-600">Tokens Sold</p>
              {tokensSold !== undefined ? (
                <p className="text-sm sm:text-base font-medium truncate">
                  {Number(tokensSold)}
                </p>
              ) : (
                <Skeleton className="h-5 w-24" />
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 bg-[#EAEAEA] p-2 sm:p-3 rounded-lg">
            <Flame className="h-4 w-4 text-slate-600 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-xs sm:text-sm text-slate-600">Tokens Burned</p>
              {tokensRemaining !== undefined ? (
                <p className="text-sm sm:text-base font-medium truncate">
                  {Number(tokensRemaining)}
                </p>
              ) : (
                <Skeleton className="h-5 w-24" />
              )}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-3">
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
