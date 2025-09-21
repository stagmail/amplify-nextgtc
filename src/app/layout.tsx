import type { Metadata } from "next";
// import "./app.css";
import "./globals.css";
import { Geist } from "next/font/google";

import AuthenticatorWrapper from "../components/AuthenticatorWrapper";
// import "@aws-amplify/ui-react/styles.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "Ground Transport Concierge",
  description: "Amplify Data with Next.js App Router",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={geistSans.className}>
        <AuthenticatorWrapper>
        {children}
        </AuthenticatorWrapper>
      </body>
    </html>
  );
}
