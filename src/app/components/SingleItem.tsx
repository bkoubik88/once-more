"use client";
import { BookmarkIcon, HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as FilledHeart } from "@heroicons/react/24/solid";

import { useConvexAuth, useMutation } from "convex/react";
import Image from "next/image";
import React from "react";
import { api } from "../../../convex/_generated/api";
import { useUser } from "@clerk/clerk-react";
import { Id } from "../../../convex/_generated/dataModel";
import { Card, Skeleton } from "@nextui-org/react";

interface IMAGE {
  coverImage: string;
  documentId: Id<"documents">;
  likesArray: string[];
}

export default function SingleItem({
  coverImage,
  documentId,
  likesArray,
}: IMAGE) {
  const { isLoading, isAuthenticated } = useConvexAuth();

  const updateLikes = useMutation(api.documents.updateDocument);
  const { user } = useUser();

  const updateLikesMutation = async () => {
    const arrayClone = likesArray;

    if (!arrayClone.includes(user?.id!)) {
      arrayClone.push(user?.id!);
    } else {
      const findIndexUser = arrayClone.indexOf(user?.id!);

      arrayClone.splice(findIndexUser, 1);
    }

    updateLikes({ id: documentId, likesArray: arrayClone });
  };

  if (!isAuthenticated && isLoading) {
    return (
      <Card className="w-full space-y-5 p-4" radius="lg">
        <Skeleton className="rounded-lg">
          <div className="h-24 rounded-lg bg-default-300"></div>
        </Skeleton>
        <div className="space-y-3">
          <Skeleton className="w-3/5 rounded-lg">
            <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-4/5 rounded-lg">
            <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-2/5 rounded-lg">
            <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
          </Skeleton>
        </div>
      </Card>
    );
  }

  return (
    <div className="h-[350px] w-auto relative">
      <Image
        className=" rounded-md"
        alt="coverImage"
        src={coverImage}
        fill
        priority
        style={{ objectFit: "cover" }}
      ></Image>
      <div className="absolute top-1 right-1 bg-slate-50/50 text-black rounded-md flex items-center">
        {likesArray && (
          <span className="font-semibold ml-2">
            {likesArray.length ? likesArray.length : 0}
          </span>
        )}
        {likesArray && likesArray.includes(user?.id!) ? (
          <FilledHeart
            className="h-10 w-10 p-1 hover:scale-105 cursor-pointer outline-none hover:outline-none text-red-600"
            onClick={() => updateLikesMutation()}
          ></FilledHeart>
        ) : (
          <HeartIcon
            className="h-10 w-10 p-1 hover:scale-105 cursor-pointer outline-none hover:outline-none"
            onClick={() => updateLikesMutation()}
          ></HeartIcon>
        )}
      </div>
      <div className="absolute top-1 left-1 bg-slate-50/30 text-yellow-300 rounded-md flex items-center">
        <BookmarkIcon className="h-10 w-10 p-1 hover:scale-105 cursor-pointer outline-none hover:outline-none"></BookmarkIcon>
      </div>
    </div>
  );
}
