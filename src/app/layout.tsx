import type { Metadata } from "next";
import "./globals.css";

import { Geist, Geist_Mono } from "next/font/google";
import AuthenticatorWrapper from "../components/AuthenticatorWrapper";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ground Transport Concierge",
  description: "Amplify Data with Next.js App Router",
};

export default async function RootLayout({
  
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body
        className={`${geistMono.variable} ${geistSans.variable}`}
      >        <AuthenticatorWrapper>
        {children}
        <Footer />
        </AuthenticatorWrapper>
      </body>
    </html>
  );
}
