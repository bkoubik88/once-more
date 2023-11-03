"use client";
import React from "react";
import Search from "./Search";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { useConvexAuth } from "convex/react";
import { Button, Spinner } from "@nextui-org/react";
import Toogle from "./components/Toogle";
import { useCoverImage } from "./hooks/upload-image-cover";

export default function Navigation() {
  const { isLoading, isAuthenticated } = useConvexAuth();

  return (
    <header className="sticky top-0 z-50 shadow-md">
      <div className="w-full p-3 bg-cyan-950  flex flex-1 items-center justify-between space-x-3 ">
        <Search></Search>

        <div className="flex space-x-4">
          {!isAuthenticated && isLoading && <Spinner></Spinner>}
          {!isAuthenticated && !isLoading && <SignInButton mode="modal" />}
          {isAuthenticated && !isLoading && (
            <UserButton afterSignOutUrl="/"></UserButton>
          )}
          <Toogle></Toogle>
        </div>
      </div>
    </header>
  );
}
