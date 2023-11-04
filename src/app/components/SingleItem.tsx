"use client";
import {
  BookmarkIcon,
  HeartIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as FilledHeart } from "@heroicons/react/24/solid";
import { BookmarkIcon as FilledBookmark } from "@heroicons/react/24/solid";

import { useConvexAuth, useMutation } from "convex/react";
import Image from "next/image";
import React, { useCallback } from "react";
import { api } from "../../../convex/_generated/api";
import { useUser } from "@clerk/clerk-react";
import { Id } from "../../../convex/_generated/dataModel";
import { Card, Skeleton } from "@nextui-org/react";
import { useEdgeStore } from "@/lib/edgestore";
import { toast } from "sonner";

interface IMAGE {
  coverImage: string;
  documentId: Id<"documents">;
  likesArray: string[];
  followerArray: string[];
  userId: string;
}

export default function SingleItem({
  coverImage,
  documentId,
  likesArray,
  followerArray,
  userId,
}: IMAGE) {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const { edgestore } = useEdgeStore();

  const updateLikes = useMutation(api.documents.updateLikes);
  const updateFollowers = useMutation(api.documents.updateFollower);
  const deleteDocument = useMutation(api.documents.deleteById);

  const { user } = useUser();

  const deletePost = useCallback(async () => {
    await edgestore.publicImages
      .delete({ url: coverImage })
      .then(async () => {
        const promise = deleteDocument({ documentId });

        toast.promise(promise, {
          loading: "Loading...",
          success: () => {
            return "Successfully deleted";
          },
          error: "there was an error while deleting",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [documentId]);

  const updateLikesMutation = useCallback(async () => {
    const arrayClone = likesArray;

    if (!arrayClone.includes(user?.id!)) {
      arrayClone.push(user?.id!);
    } else {
      const findIndexUser = arrayClone.indexOf(user?.id!);

      arrayClone.splice(findIndexUser, 1);
    }

    updateLikes({ id: documentId, likesArray: arrayClone });
  }, [documentId, likesArray, user?.id]);

  const updateFollower = useCallback(async () => {
    const arrayClone = followerArray;

    if (!arrayClone.includes(user?.id!)) {
      arrayClone.push(user?.id!);
    } else {
      const findIndexUser = arrayClone.indexOf(user?.id!);

      arrayClone.splice(findIndexUser, 1);
    }

    updateFollowers({ id: documentId, followerArray: arrayClone });
  }, [documentId, followerArray, user?.id]);

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
        className="rounded-md"
        alt="coverImage"
        src={coverImage}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
        quality={75}
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

      <div className="absolute top-1 left-1 bg-slate-50/30  rounded-md flex items-center">
        {followerArray && followerArray.includes(user?.id!) ? (
          <FilledBookmark
            className="h-10 w-10 p-1 hover:scale-105 cursor-pointer outline-none hover:outline-none text-yellow-500"
            onClick={() => updateFollower()}
          ></FilledBookmark>
        ) : (
          <BookmarkIcon
            className="h-10 w-10 p-1 hover:scale-105 cursor-pointer text-yellow-300 outline-none hover:outline-none"
            onClick={() => updateFollower()}
          ></BookmarkIcon>
        )}
      </div>
      {user?.id === userId && (
        <div className="absolute left-1 bottom-1  rounded-md flex items-center">
          <XCircleIcon
            className="h-10 w-10 p-1 hover:scale-105 cursor-pointer outline-none hover:outline-none text-red-500"
            onClick={deletePost}
          ></XCircleIcon>
        </div>
      )}
    </div>
  );
}
