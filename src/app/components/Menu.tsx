"use client";
import {
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  BookmarkIcon,
  HomeIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import React from "react";
import Toogle from "./Toogle";
import SavedImages from "./SavedImages";
import { useConvexAuth } from "convex/react";
import { SignOutButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ChangeLanguage from "./ChangeLanguage";

export default function Menu() {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const { theme, setTheme } = useTheme();

  const navigation = useRouter();

  const navigateTo = (key: React.Key) => {
    switch (key) {
      case "home":
        navigation.replace("/");
        break;
      case "bookmarks":
        navigation.replace("/bookmarks");
        break;
      case "toogle":
        {
          theme === "light" ? setTheme("dark") : setTheme("light");
        }
        break;
      default:
        break;
    }
  };

  if (isAuthenticated && !isLoading) {
    return (
      <Dropdown closeOnSelect={false}>
        <DropdownTrigger>
          <Button isIconOnly className="bg-transparent">
            <Bars3Icon className="text-white"></Bars3Icon>
          </Button>
        </DropdownTrigger>

        <DropdownMenu aria-label="Settings" onAction={(key) => navigateTo(key)}>
          <DropdownItem
            key="home"
            startContent={<HomeIcon className="h-8 w-8" />}
            href="/"
          >
            Home
          </DropdownItem>

          <DropdownItem
            key="bookmarks"
            className="w-full"
            startContent={<BookmarkIcon className="h-8 w-8 " />}
          >
            Bookmarks
          </DropdownItem>

          <DropdownItem
            key="toogle"
            startContent={
              theme === "light" ? (
                <SunIcon className="text-yellow-400 dark:bg-transparent w-8 h-8  bg-transparent" />
              ) : (
                <MoonIcon className="w-8 h-8" />
              )
            }
          >
            Mode
          </DropdownItem>
          <DropdownItem key="language">
            <ChangeLanguage></ChangeLanguage>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}
