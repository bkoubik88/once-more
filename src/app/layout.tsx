import type { Metadata } from "next";
import { Acme } from "next/font/google";
import "./globals.css";
import Navigation from "./Navigation";
import ClerkProviderPro from "../../providers/ClerkProviderPro";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { Toaster } from "sonner";

const inter = Acme({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "FindMe",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" sizes="any" />

      <body className={`${inter.className}`}>
        <EdgeStoreProvider>
          <ClerkProviderPro>
            <Navigation></Navigation>
            {children}

            <Toaster position="bottom-center" />
          </ClerkProviderPro>
        </EdgeStoreProvider>
      </body>
    </html>
  );
}
