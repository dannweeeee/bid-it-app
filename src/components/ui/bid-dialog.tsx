import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "./dialog";
import { Button } from "./button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Input } from "./input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/useToast";
import { type Config } from "wagmi";
import { wagmiAdapter } from "@/config";
import { Address, parseEther } from "viem";
import { writeContract, waitForTransactionReceipt } from "wagmi/actions";
import DutchAuctionAbi from "@/abis/DutchAuctionAbi";
import { BASE_SEPOLIA_CHAIN_ID } from "@/lib/constants";
import { PacmanLoader } from "react-spinners";

interface BidDialogProps {
  contractAddress: Address;
  walletAddress: Address;
}

const bidSchema = z.object({
  _ethAmount: z.coerce.number().positive({
    message: "ETH Amount is required.",
  }),
});

const BidDialog = ({ contractAddress, walletAddress }: BidDialogProps) => {
  console.log(contractAddress);
  const bidForm = useForm<z.infer<typeof bidSchema>>({
    resolver: zodResolver(bidSchema),
    defaultValues: {
      _ethAmount: undefined,
    },
  });

  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const config = wagmiAdapter.wagmiConfig as Config;

  const onSubmit = async (data: z.infer<typeof bidSchema>) => {
    setLoading(true);
    try {
      const ethAmount = data._ethAmount;
      console.log(ethAmount);
      const ethInWei = parseEther(ethAmount.toString());
      const bidTx = await writeContract(config, {
        address: contractAddress,
        abi: DutchAuctionAbi,
        functionName: "bid",
        chainId: BASE_SEPOLIA_CHAIN_ID,
        value: BigInt(ethInWei),
      });

      console.log(bidTx);

      await waitForTransactionReceipt(config, {
        hash: bidTx,
      });

      toast({
        title: "Bid submitted successfully",
        description: `You bid for ${data._ethAmount} ETH`,
      });
      setOpen(false);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error submitting bid",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          size="sm"
          className="min-w-[120px] text-white rounded-xl hover:bg-black/70 hover:text-white hover:scale-105 transition ease-in-out disabled:bg-black-opacity-30"
        >
          Place Bid
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Place Bid</DialogTitle>
          <DialogDescription className="text-gray-500">
            Enter the amount of ETH you want to commit to the auction
          </DialogDescription>
        </DialogHeader>
        <Form {...bidForm}>
          <form onSubmit={bidForm.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={bidForm.control}
              name="_ethAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    ETH Amount
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter ETH Amount"
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
            <DialogFooter>
              <Button
                type="submit"
                className="w-full bg-black hover:bg-black/80 text-white rounded-lg py-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    Submitting Bid <PacmanLoader size={10} color="#FFFFFF" />
                  </>
                ) : (
                  "Submit Bid"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default BidDialog;
