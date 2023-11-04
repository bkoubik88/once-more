import { BookmarkIcon, HeartIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React from "react";

interface IMAGE {
  coverImage: string;
}

export default function SingleItem({ coverImage }: IMAGE) {
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
        <span className="font-semibold ml-2"> 0</span>
        <HeartIcon className="h-10 w-10 p-1 hover:scale-105 cursor-pointer outline-none hover:outline-none"></HeartIcon>
      </div>
      <div className="absolute top-1 left-1 bg-slate-50/30 text-yellow-300 rounded-md flex items-center">
        <BookmarkIcon className="h-10 w-10 p-1 hover:scale-105 cursor-pointer outline-none hover:outline-none"></BookmarkIcon>
      </div>
    </div>
  );
}
