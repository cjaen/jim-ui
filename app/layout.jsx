"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "./providers";
import MainLayout from "./components/MainLayout";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Gymmy</title>
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff"></meta>
      </head>
      <Providers>
        <body className={inter.className}>
          <MainLayout>{children}</MainLayout>
        </body>
      </Providers>
    </html>
  );
}
