"use client";

import { useConvexAuth, usePaginatedQuery } from "convex/react";
import CoverImageModal from "./components/Modal";

import { api } from "../../convex/_generated/api";

import { Button, Spinner } from "@nextui-org/react";

import { DocumentList } from "./components/DocumentList";
import { useCallback, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import AddNewPost from "./components/AddNewPost";
import Image from "next/image";
import { useCoverImage } from "./hooks/upload-image-cover";
import { SignInButton, UserButton } from "@clerk/nextjs";

export default function Home() {
  const { ref, inView } = useInView();
  const coverImage = useCoverImage();

  const { isAuthenticated } = useConvexAuth();

  const { results, status, loadMore, isLoading } = usePaginatedQuery(
    api.documents.allPosts,
    {},
    { initialNumItems: 4 }
  );

  useEffect(() => {
    if (inView && status !== "Exhausted" && !isLoading) {
      loadMore(4);
    }
  }, [inView, status]);

  if (isAuthenticated && !isLoading) {
    return (
      <>
        <main className="px-2 py-4 bg-white dark:bg-cyan-800 min-h-screen">
          {results.length > 0 && !isLoading ? (
            <div className="grid grid-flow-row-dense grid-cols-1  sm:grid-cols-3 md:grid-cols-4  xl:grid-cols-6  gap-2">
              <DocumentList results={results}></DocumentList>
            </div>
          ) : (
            !isLoading && (
              <div className="flex flex-col items-center w-full justify-center space-y-2 cursor-pointer h-screen mx-auto">
                <p>No Post yet, be the first one!</p>
                <Button color="success">create first Post</Button>
              </div>
            )
          )}

          <CoverImageModal></CoverImageModal>

          {status !== "Exhausted" && (
            <div ref={ref} className="flex items-center justify-center p-2">
              <Spinner></Spinner>
            </div>
          )}

          <AddNewPost></AddNewPost>
        </main>
      </>
    );
  }
  if (!isAuthenticated && !isLoading) {
    return (
      <div className="flex flex-col space-x-3 p-4 justify-center items-center mt-4 h-screen mx-auto">
        <SignInButton mode="modal">
          <Button variant="bordered" color="success" size="lg">
            sign In
          </Button>
        </SignInButton>
      </div>
    );
  }
}
