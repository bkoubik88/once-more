"use client";
import Link from "next/link";
import { useConvexAuth, usePaginatedQuery } from "convex/react";
import { Button, Image } from "@nextui-org/react";
import CoverImageModal from "./components/Modal";
import { useCoverImage } from "./hooks/upload-image-cover";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Doc } from "../../convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { Box } from "@mui/material";
import { useUser } from "@clerk/clerk-react";
import { Spinner } from "@nextui-org/react";
import { SignInButton } from "@clerk/nextjs";
import AddNewPost from "./components/AddNewPost";
import { DocumentList } from "./components/DocumentList";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Masonry from "@mui/lab/Masonry";

export default function Home() {
  const { ref, inView } = useInView();

  const { isLoading, isAuthenticated } = useConvexAuth();
  const { results, status, loadMore } = usePaginatedQuery(
    api.documents.allPosts,
    {},
    { initialNumItems: 4 }
  );

  useEffect(() => {
    if (inView && status !== "Exhausted") {
      loadMore(4);
    }
  }, [inView, status]);

  if (!isAuthenticated && !isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <SignInButton mode="modal" />
      </div>
    );
  }

  return (
    <>
      <main className="mx-2 py-4">
        <div className="grid grid-flow-row-dense grid-cols-1  sm:grid-cols-3 md:grid-cols-4  xl:grid-cols-6  gap-2">
          <DocumentList results={results}></DocumentList>
        </div>

        <CoverImageModal></CoverImageModal>

        {status !== "Exhausted" && (
          <div
            ref={ref}
            className="flex items-center w-full justify-center p-2"
          >
            <Spinner></Spinner>
          </div>
        )}
      </main>
    </>
  );
}
