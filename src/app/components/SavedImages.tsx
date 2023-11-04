import { BookmarkIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import React from "react";

export default function SavedImages() {
  return (
    <Link href={"/bookmarks"}>
      <BookmarkIcon className="h-8 w-8 text-white cursor-pointer"></BookmarkIcon>
    </Link>
  );
}
