"use client";

import { Id } from "../../../convex/_generated/dataModel";
import SingleItem from "./SingleItem";

export const DocumentList = ({ results }: { results: any }) => {
  return results?.map(
    ({
      _id,
      coverImage,
      width,
      height,
      likesId,
      follower,
      userId,
    }: {
      _id: string;
      coverImage: string;
      width: number;
      height: number;
      likesId: string[];
      follower: string[];
      userId: string;
    }) => {
      return (
        <div
          key={_id}
          className={`${
            width > height
              ? "sm:col-span-2 md:col-span-3"
              : "col-span-1 row-span-1"
          }`}
        >
          <SingleItem
            userId={userId}
            coverImage={coverImage}
            documentId={_id as Id<"documents">}
            likesArray={likesId}
            followerArray={follower}
          ></SingleItem>
        </div>
      );
    }
  );
};
