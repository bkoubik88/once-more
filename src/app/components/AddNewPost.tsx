"use client";
import * as React from "react";

import { useCoverImage } from "../hooks/upload-image-cover";
import { CameraIcon } from "@heroicons/react/24/outline";
import { useConvexAuth } from "convex/react";

export default function AddNewPost() {
  const coverImage = useCoverImage();
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isAuthenticated && !isLoading) {
    return (
      <div className="fixed bottom-2 right-2 bg-fuchsia-500 h-[60px] w-[60px] rounded-full items-center justify-center flex cursor-pointer shadow-md">
        <CameraIcon
          onClick={coverImage.onOpen}
          className="h-9 w-9  p-1 text-white"
        ></CameraIcon>
      </div>
    );
  }
}
