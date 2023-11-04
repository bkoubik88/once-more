import { Input } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

export default function Logo() {
  return (
    <Link href={"/"} scroll={false}>
      <p className="font-semibold text-[1.5em] text-white">
        Kou
        <span className="font-thin text-green-300">picz</span>
      </p>
    </Link>
  );
}
