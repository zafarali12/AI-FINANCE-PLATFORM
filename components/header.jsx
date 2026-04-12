"use client";

import React from "react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { Button } from "./ui/button";
import { LayoutDashboard, PenBox } from "lucide-react";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import ChatButton from "./chat-button";

const Header = () => {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";

  return (
    <header className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-800">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={"/logo.png"}
            alt="Welth Logo"
            width={200}
            height={60}
            className="h-12 w-auto object-contain"
          />
        </Link>

        {/* Navigation Links - Different for signed in/out users */}
        <div className="hidden md:flex items-center space-x-8">
          <SignedOut>
            <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
              Features
            </a>
            <a
              href="#testimonials"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
            >
              Testimonials
            </a>
          </SignedOut>
        </div>

        <div className="flex items-center gap-4">
          <SignedIn>
            <Link
              href="/dashboard"
              className={`flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium ${
                !isLandingPage ? "hidden sm:flex" : ""
              }`}
            >
              <LayoutDashboard className="h-5 w-5" />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>

            <ChatButton />

            <Link href="/transaction/create">
              <Button className="flex items-center gap-2">
                <PenBox className="h-4 w-4" />
                <span className="hidden sm:inline">Add Transaction</span>
              </Button>
            </Link>
          </SignedIn>

          <SignedOut>
            <SignInButton forceRedirectUrl="/dashboard">
              <Button variant="outline">Sign In</Button>
            </SignInButton>
          </SignedOut>

          <ThemeToggle />
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Header;
