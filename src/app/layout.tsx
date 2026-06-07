import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.dradityamd.com"),
  title: {
    default:
      "Dr. Aditya Davhale | Consultant Physician & Internal Medicine Specialist | Navi Mumbai",
    template: "%s | Dr. Aditya Davhale",
  },
  description:
    "Dr. Aditya Davhale is a Consultant General Physician & Internal Medicine Specialist in Navi Mumbai, providing evidence-based treatment for diabetes, hypertension, thyroid disorders, and chronic lifestyle diseases.",
  openGraph: {
    type: "website",
    siteName: "Dr. Aditya Davhale",
    locale: "en_IN",
    images: [
      {
        url: "/images/og/default-og.svg",
        width: 1200,
        height: 630,
        alt: "Dr. Aditya Davhale - Consultant Physician & Internal Medicine Specialist",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-white text-medical-900">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
