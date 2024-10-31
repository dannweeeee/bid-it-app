import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm dark:bg-gray-950/90">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-20 items-center">
          <Link href="/" className="flex items-center" prefetch={false}>
            <Image
              src="/assets/bidit-logo-no-bg.png"
              alt="bidit-icon"
              width={150}
              height={150}
            />
            <span className="sr-only">Bid It</span>
          </Link>
          <div className="flex items-center">
            <w3m-button />
          </div>
        </div>
      </div>
    </nav>
  );
}
