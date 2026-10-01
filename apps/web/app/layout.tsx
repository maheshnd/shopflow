import type { Metadata } from "next";

import { themeClass } from "@shopflow/ui";
import "@shopflow/ui/global-styles";
import "./globals.css";

import { AppHeader } from "@/features/navigation/components/app-header";
import { QueryProvider } from "@/providers/query-provider";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "ShopFlow",
  description: "Simple shopping. Fast checkout.",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={themeClass}>
      <body>
        <QueryProvider>
          <AppHeader />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
