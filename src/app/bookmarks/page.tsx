"use client";
import { useConvexAuth, useQuery } from "convex/react";
import React, { useEffect } from "react";
import { api } from "../../../convex/_generated/api";
import Image from "next/image";
import { useUser } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";

export default function YourBookmars() {
  const likes = useQuery(api.documents.listBookmarkedImages);
  const { isAuthenticated, isLoading } = useConvexAuth();

  const { user } = useUser();

  const navigation = useRouter();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigation.replace("/");
    }
  }, [isAuthenticated, isLoading]);

  if (isAuthenticated && !isLoading && user) {
    return (
      <div className="px-2 py-4 bg-white dark:bg-cyan-800 min-h-screen">
        <p className="w-full flex items-center justify-center my-2">
          Your Bookmarked Posts
        </p>
        <div className="grid grid-flow-row-dense grid-cols-1  sm:grid-cols-3 md:grid-cols-4  xl:grid-cols-6  gap-2">
          {likes?.map((like) => {
            return (
              like.follower?.includes(user.id) && (
                <div
                  key={like._id}
                  className={`${
                    like.width > like.height
                      ? "sm:col-span-2 md:col-span-3"
                      : "col-span-1 row-span-1"
                  }`}
                >
                  <div className="h-[350px] w-auto relative">
                    <Image
                      className="rounded-md"
                      alt="coverImage"
                      src={like.coverImage}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                      quality={75}
                      fill
                      priority
                      style={{ objectFit: "cover" }}
                    ></Image>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    );
  }
}
