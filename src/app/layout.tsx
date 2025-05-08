import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import TanstackProvider from "@/tanstack/provider";
import ThemeRegistry from "@/components/ThemeRegistry";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Next.js with TanStack Query and MUI",
  description:
    "A modern Next.js 15 application with TanStack Query and Material UI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <ThemeRegistry>
          <TanstackProvider>{children}</TanstackProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
