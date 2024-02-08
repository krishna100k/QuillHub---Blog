import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/Components/Footer";
import ReduxProvider from "./ReduxProvider";
import InitialInvoke from "./InitialInvoke/InitialInvoke";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QuillHub",
  description: "Blog App",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  InitialInvoke();
  return (
    <ReduxProvider >
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Footer />
        </body>
    </html>
    </ReduxProvider>
  );
}
