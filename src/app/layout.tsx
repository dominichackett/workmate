import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
//import '@coinbase/onchainkit/styles.css'; 

import "../styles/globals.css";

import {WagmiConfig}  from 'wagmi';
import { Providers } from '../providers';
import { cookieToInitialState } from 'wagmi';
import { headers } from 'next/headers';
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  /*const initialState = cookieToInitialState(
    WagmiConfig,
    ( headers()).get('cookie')
  );*/
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          <Providers >{children}</Providers>
      </body>
    </html>
  );
}
