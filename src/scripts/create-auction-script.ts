import { type TransactionReceipt, decodeEventLog } from "viem";
import AuctioneerAbi from "@/abis/AuctioneerAbi";
import { AuctionCreatedEvent } from "@/lib/types";

export const auctionCreatedEventResponseSelector = (
  transactionReceipt: TransactionReceipt | undefined
): AuctionCreatedEvent | null => {
  if (!transactionReceipt?.logs || transactionReceipt.logs.length === 0)
    return null;

  const events = transactionReceipt.logs.map((log) => {
    try {
      return decodeEventLog({
        data: log.data,
        topics: log.topics,
        eventName: "AuctionCreated",
        abi: AuctioneerAbi,
        strict: true,
      });
    } catch (e) {
      console.log("error", e);
      return null;
    }
  });

  const isNonNullable = <T>(value: T | null | undefined): value is T =>
    value != null;
  return (
    (events
      .filter(isNonNullable)
      .find((evt) => evt.eventName === "AuctionCreated")
      ?.args as AuctionCreatedEvent) || null
  );
};
