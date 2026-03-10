import type { Metadata } from "next";
import {
  Montserrat,
  Noto_Sans_JP,
  Zen_Kaku_Gothic_New,
} from "next/font/google";
import "./globals.css";
import Nav from "@/features/nav/Nav";
import InitialLoading from "@/features/loading/InitialLoading";
import LenisProvider from "@/lib/LenisProvider";

const zenKakuGothicNew = Zen_Kaku_Gothic_New({
  variable: "--font-zen-kaku-gothic-new",
  subsets: ["latin"],
  weight: ["400"],
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Wood Cafe Moku.",
  description: "Wood Cafe Moku. is a cafe that serves coffee and other drinks.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${zenKakuGothicNew.variable} ${notoSansJP.variable} ${montserrat.variable} antialiased`}
      >
        <InitialLoading />
        <Nav />
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
