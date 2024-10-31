"use client";

import React from "react";
import { Button } from "./button";
import { modal } from "@/context";
import { ChevronRight } from "lucide-react";

const ConnectButton = () => {
  const handleOpenModal = async () => {
    await modal.open();
  };

  return (
    <div>
      <Button
        className="py-2 px-5 bg-black text-white font-light rounded-xl hover:bg-black-opacity-70 hover:scale-105 transition ease-in-out disabled:bg-black-opacity-30 flex items-center gap-2"
        onClick={() => handleOpenModal()}
      >
        Connect Wallet
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default ConnectButton;
