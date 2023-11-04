"use client";

import { useConvexAuth, usePaginatedQuery } from "convex/react";
import CoverImageModal from "./components/Modal";

import { api } from "../../convex/_generated/api";

import { Spinner } from "@nextui-org/react";

import { DocumentList } from "./components/DocumentList";
import { useCallback, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import AddNewPost from "./components/AddNewPost";

export default function Home() {
  const { ref, inView } = useInView();

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

  if (isAuthenticated) {
    return (
      <>
        <main className="px-2 py-4 bg-white dark:bg-cyan-800 min-h-screen">
          <div className="grid grid-flow-row-dense grid-cols-1  sm:grid-cols-3 md:grid-cols-4  xl:grid-cols-6  gap-2">
            <DocumentList results={results}></DocumentList>
          </div>

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
}
