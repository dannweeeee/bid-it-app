"use client";

import { TrendingUp } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  LineChart,
  Line,
  Tooltip,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Address } from "viem";
import { useFetchAuctionPriceIntervals } from "@/hooks/useFetchAuctionPriceIntervals";

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
  const priceIntervals = useFetchAuctionPriceIntervals(address);
  console.log("PRICE INTERVALS", priceIntervals);

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

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Auction Price Chart
        </CardTitle>
        <CardDescription>Showing price decay over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[310px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={formattedData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
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
        </ChartContainer>
      </CardContent>
      <CardFooter>
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
      </CardFooter>
    </Card>
  );
}
