"use client";

import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white/50 text-black py-6 font-sans">
      <div className="container mx-auto px-4">
        <div className="text-center mb-4">
          <h2 className="text-xl font-bold text-[#606060] uppercase tracking-wide">
            You like it, you bid it
          </h2>
          <p className="mt-1 text-sm text-[#252A34] font-light">
            Every bid wins!
          </p>
        </div>

        <div className="flex flex-col items-center space-y-4 mb-4">
          <Button
            size="icon"
            className="rounded-full bg-[#797979] hover:bg-[#252a34]"
            onClick={() =>
              window.open("https://github.com/dannweeeee/bid-it-app", "_blank")
            }
          >
            <Github className="w-4 h-4" />
          </Button>
        </div>

        <div className="text-center text-xs text-gray-600">
          <p>© {new Date().getFullYear()} Team Bid It. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
