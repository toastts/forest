import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
/*
const font = Font({
  src: "./fonts/Inter-Regular.ttf",
  weight: "400",
  style: "normal",
});

*/ 

export const metadata: Metadata = {
  title: "Forest",
  description: "Smokin hella tree lmao",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex min-h-screen`}>
        <aside className="w-1/4 bg-gray-800 text-white p-4">
          {/* Left Sidebar Content */}
        </aside>
        <main className="flex-1 p-4">
          {children}
        </main>
        <aside className="w-1/4 bg-gray-800 text-white p-4">
          {/* Right Sidebar Content */}
        </aside>
      </body>
    </html>
  );
}