"use client";
import { SignInButton } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { Button } from "@nextui-org/react";

export default function PageSignIn() {
  const searchParams = useSearchParams();

  const redirectUrl = searchParams.get("redirectUrl");
  return (
    <section className="py-24">
      <div className="container">
        <div className="flex justify-center">
          <SignInButton
            afterSignInUrl={redirectUrl || "/"}
            redirectUrl={redirectUrl || "/"}
          >
            <Button variant="bordered">Anmelden</Button>
          </SignInButton>
        </div>
      </div>
    </section>
  );
}
