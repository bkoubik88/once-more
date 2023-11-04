"use client";
import React from "react";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { useConvexAuth } from "convex/react";
import { Button, Spinner } from "@nextui-org/react";
import Toogle from "./components/Toogle";
import Logo from "./Logo";
import SavedImages from "./components/SavedImages";

export default function Navigation() {
  const { isLoading, isAuthenticated } = useConvexAuth();

  return (
    <header className="sticky top-0 z-50 shadow-md">
      <div className="w-full p-3 bg-cyan-950  flex flex-1 items-center justify-between space-x-3 ">
        <Logo></Logo>
        <div className="flex space-x-4 items-center">
          {!isAuthenticated && isLoading && <Spinner></Spinner>}
          {!isAuthenticated && !isLoading && (
            <SignInButton mode="modal">
              <Button variant="bordered" color="success">
                sign In
              </Button>
            </SignInButton>
          )}
          {isAuthenticated && !isLoading && (
            <UserButton afterSignOutUrl="/"></UserButton>
          )}
          {isAuthenticated && !isLoading && <SavedImages></SavedImages>}
          <Toogle></Toogle>
        </div>
      </div>
    </header>
  );
}
