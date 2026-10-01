import type { Metadata } from "next";

import { themeClass } from "@shopflow/ui";
import "@shopflow/ui/global-styles";
import "./globals.css";

import { AppHeader } from "@/features/navigation/components/app-header";
import { QueryProvider } from "@/providers/query-provider";

export const metadata: Metadata = {
  title: "ShopFlow",
  description: "Simple shopping. Fast checkout.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
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
