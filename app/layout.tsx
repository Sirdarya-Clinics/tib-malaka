"use client";

import FooterEng from "@/components/FooterEng";
import HeaderEng from "@/components/HeaderEng";
import ScrollToTop from "@/components/ScrollToTop";
import { Inter } from "next/font/google";
import "node_modules/react-modal-video/css/modal-video.css";
import "../styles/index.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="uz">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />

      <body className={`bg-[#FCFCFC] dark:bg-black ${inter.className}`}>
        <Suspense fallback={<Loader />}>
          <Providers>
            <HeaderEng />
            {children}
            <FooterEng />
            <ScrollToTop />
          </Providers>
        </Suspense>
      </body>
    </html>
  );
}

import { Providers } from "./providers";
import { Suspense } from "react";
import Loader from "@/components/Loader";
