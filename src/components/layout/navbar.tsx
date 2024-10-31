import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import ConnectButton from "../ui/connect-button";

export default function Navbar() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm dark:bg-gray-950/90">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-14 items-center">
          <Link href="/" className="flex items-center" prefetch={false}>
            <Image
              src="/assets/bidit-logo-no-bg.png"
              alt="bidit-icon"
              width={150}
              height={150}
            />
            <span className="sr-only">Bid It</span>
          </Link>
          <nav className="hidden md:flex gap-4">
            <Link
              href="/"
              className="font-semibold flex items-center text-sm transition-colors hover:underline"
              prefetch={false}
            >
              Dashboard
            </Link>
            <span className="text-gray-400">|</span>
            <Link
              href="/create-auction"
              className="font-semibold flex items-center text-sm transition-colors hover:underline"
              prefetch={false}
            >
              Create Auction
            </Link>
            <span className="text-gray-400">|</span>
            <Link
              href="/profile"
              className="font-semibold flex items-center text-sm transition-colors hover:underline"
              prefetch={false}
            >
              Profile
            </Link>
          </nav>
          <div className="flex items-center">
            <ConnectButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
