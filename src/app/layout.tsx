import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import type { Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: "AquaTrack",
  icons: "/white-logo.svg",
  description: "Revolutionize your Catfish Farming Experience with AquaTrack",
  openGraph: {
    type: "website",
    url: "https://www.aquatrackinc.com",
    title: "AquaTrack",
    description: "Revolutionize your Catfish Farming Experience with AquaTrack",
    images: [
      {
        url: "https://res.cloudinary.com/calebcloud/image/upload/v1710679187/seo-card1.png",
        type: "image/jpg",
        width: 1200,
        height: 630,
        alt: "EMM",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AquaTrack",
    description: "Revolutionize your Catfish Farming Experience with AquaTrack",
    images: [
      {
        url: "https://res.cloudinary.com/calebcloud/image/upload/v1710679187/seo-card1.png",
        type: "image/jpg",
        width: 1200,
        height: 630,
        alt: "EMM",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <main>
          <Analytics />
          {children}
          <Toaster position="top-center" reverseOrder={false} />
        </main>
      </body>
    </html>
  );
}
