import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SetupFormProvider } from "@/components/forms/SetupFormContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Forest",
  description: "meetings or something",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SetupFormProvider>
          {children}
        </SetupFormProvider>
      </body>
    </html>
  );
}
