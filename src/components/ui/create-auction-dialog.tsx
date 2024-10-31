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

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";

const createAuctionSchema = z.object({
  _name: z.string().min(1, {
    message: "Token name is required.",
  }),
  _symbol: z.string().min(1, {
    message: "Token symbol is required.",
  }),
  _totalSupply: z.number().min(1, {
    message: "Total supply is required.",
  }),
  _initialPrice: z.number().min(1, {
    message: "Initial price is required.",
  }),
  _reservePrice: z.number().min(1, {
    message: "Reserve price is required.",
  }),
  _minimumBid: z.number().min(1, {
    message: "Minimum bid is required.",
  }),
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

  const onSubmit = (data: z.infer<typeof createAuctionSchema>) => {
    console.log(data);
  };

  return (
    <Dialog>
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
            Enter the details of the auction you want to create.
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
                          {...field}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value === ""
                                ? undefined
                                : Number(e.target.value)
                            )
                          }
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
                          placeholder="0.1"
                          className="rounded-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          {...field}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value === ""
                                ? undefined
                                : Number(e.target.value)
                            )
                          }
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
                          placeholder="0.05"
                          className="rounded-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          {...field}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value === ""
                                ? undefined
                                : Number(e.target.value)
                            )
                          }
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
                          placeholder="0.01"
                          className="rounded-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          {...field}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value === ""
                                ? undefined
                                : Number(e.target.value)
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                className="w-full bg-black hover:bg-black/80 text-white rounded-lg py-2"
              >
                Create Auction
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
