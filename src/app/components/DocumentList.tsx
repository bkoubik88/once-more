"use client";

import SingleItem from "./SingleItem";

export const DocumentList = ({ results }: { results: any }) => {
  return results?.map(
    ({
      _id,
      coverImage,
      width,
      height,
    }: {
      _id: string;
      coverImage: string;
      width: number;
      height: number;
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
          <SingleItem coverImage={coverImage}></SingleItem>
        </div>
      );
    }
  );
};
