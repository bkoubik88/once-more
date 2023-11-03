"use client";
import Link from "next/link";
import React from "react";
import { useConvexAuth } from "convex/react";
import { ArrowLeftCircleIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { isLoading, isAuthenticated } = useConvexAuth();

  return <div className="p-8">HELLO FROM THE DASHBOARD SITE</div>;
}
