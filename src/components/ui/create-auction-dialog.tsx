import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PacmanLoader } from "react-spinners";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import {
  AUCTIONEER_CONTRACT_ADDRESS,
  LINK_CONTRACT_ADDRESS,
  SEPOLIA_CHAIN_ID,
} from "@/lib/constants";
import AuctioneerAbi from "@/abis/AuctioneerAbi";
import LinkTokenAbi from "@/abis/LinkTokenAbi";
import { useToast } from "@/hooks/useToast";
import { useState } from "react";

import { type Config } from "wagmi";
import { writeContract, waitForTransactionReceipt } from "wagmi/actions";
import { wagmiAdapter } from "@/config";
import { auctionCreatedEventResponseSelector } from "@/scripts/create-auction-script";

const createAuctionSchema = z.object({
  _name: z.string().min(1, {
    message: "Token name is required.",
  }),
  _symbol: z.string().min(1, {
    message: "Token symbol is required.",
  }),
  _totalSupply: z.coerce.number().positive({
    message: "Total supply is required.",
  }),
  _initialPrice: z.coerce.number().positive({
    message: "Initial price is required.",
  }),
  _reservePrice: z.coerce.number().positive({
    message: "Reserve price is required.",
  }),
  _minimumBid: z.coerce
    .number()
    .positive({
      message: "Minimum bid is required.",
    })
    .refine((val) => {
      return (data: { _reservePrice: number }) => val <= data._reservePrice;
    }, "Minimum bid must be less than or equal to reserve price")
    .refine((val) => {
      return (data: { _initialPrice: number; _reservePrice: number }) =>
        data._initialPrice > data._reservePrice;
    }, "Initial price must be greater than reserve price"),
});

export function CreateAuctionDialog() {
  const auctionForm = useForm<z.infer<typeof createAuctionSchema>>({
    resolver: zodResolver(createAuctionSchema),
    defaultValues: {
      _name: "",
      _symbol: "",
      _totalSupply: undefined,
      _initialPrice: undefined,
      _reservePrice: undefined,
      _minimumBid: undefined,
    },
  });

  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const config = wagmiAdapter.wagmiConfig as Config;

  const onSubmit = async (data: z.infer<typeof createAuctionSchema>) => {
    try {
      setLoading(true);

      // First approve LINK tokens
      const approveTx = await writeContract(config, {
        address: LINK_CONTRACT_ADDRESS,
        abi: LinkTokenAbi,
        functionName: "approve",
        args: [
          AUCTIONEER_CONTRACT_ADDRESS,
          BigInt("5000000000000000000"), // 5 LINK
        ],
        chainId: SEPOLIA_CHAIN_ID,
      });

      await waitForTransactionReceipt(config, { hash: approveTx });

      // Then create auction
      const createAuctionTx = await writeContract(config, {
        address: AUCTIONEER_CONTRACT_ADDRESS,
        abi: AuctioneerAbi,
        functionName: "createAuction",
        args: [
          data._name,
          data._symbol,
          BigInt(data._totalSupply),
          BigInt(data._initialPrice * 1e18),
          BigInt(data._reservePrice * 1e18),
          BigInt(data._minimumBid * 1e18),
        ],
      });

      console.log(createAuctionTx);
      const receipt = await waitForTransactionReceipt(config, {
        hash: createAuctionTx,
      });
      const auctionCreatedEvent = auctionCreatedEventResponseSelector(receipt);

      if (auctionCreatedEvent) {
        console.log(
          "Auction created at address:",
          auctionCreatedEvent.auctionAddress
        );
        console.log("Token name:", auctionCreatedEvent.name);
        console.log("Token symbol:", auctionCreatedEvent.symbol);
        console.log("Upkeep ID:", auctionCreatedEvent.upkeepId.toString());
      }

      toast({
        variant: "default",
        title: "Success!",
        description: "Auction created successfully.",
      });

      setOpen(false);
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Error!",
        description:
          error instanceof Error
            ? error.message
            : "Invalid parameters. Make sure initial price is greater than reserve price and minimum bid is less than or equal to reserve price.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="py-2 px-5 bg-black text-white font-light rounded-xl hover:bg-black/70 hover:text-white hover:scale-105 transition ease-in-out disabled:bg-black-opacity-30"
          variant="outline"
        >
          Create Auction
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Create Auction
          </DialogTitle>
          <DialogDescription className="text-gray-500">
            Enter the details of the auction you want to create. <br />
            Creating an auction will mint the token and initialise the auction.
          </DialogDescription>
        </DialogHeader>
        <Form {...auctionForm}>
          <form
            onSubmit={auctionForm.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <FormField
                  control={auctionForm.control}
                  name="_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Token Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Goatseus Maximus"
                          className="rounded-lg"
                          disabled={loading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={auctionForm.control}
                  name="_symbol"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Token Symbol
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="GOAT"
                          className="rounded-lg"
                          disabled={loading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={auctionForm.control}
                  name="_totalSupply"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Total Supply
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="1000000"
                          className="rounded-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          disabled={loading}
                          {...field}
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-6">
                <FormField
                  control={auctionForm.control}
                  name="_initialPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Initial Price (ETH)
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.000000000000000001"
                          placeholder="0.1"
                          className="rounded-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          disabled={loading}
                          {...field}
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={auctionForm.control}
                  name="_reservePrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Reserve Price (ETH)
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.000000000000000001"
                          placeholder="0.05"
                          className="rounded-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          disabled={loading}
                          {...field}
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={auctionForm.control}
                  name="_minimumBid"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Minimum Bid (ETH)
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.000000000000000001"
                          placeholder="0.01"
                          className="rounded-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          disabled={loading}
                          {...field}
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                      </FormControl>
                      <FormMessage />
                      <p className="text-xs text-gray-500">
                        Must be greater than or equal to reserve price
                      </p>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                className="w-full bg-black hover:bg-black/80 text-white rounded-lg py-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    Creating Auction
                    <PacmanLoader size={10} color="#FFFFFF" />
                  </>
                ) : (
                  "Create Auction"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
