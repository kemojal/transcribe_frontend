import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Sidebar from "../components/Sidebar";
import AuthNavbar from "../components/AuthNavbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Transcriber",
  description: "Transcribe audio files and video to text",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      <AuthNavbar />
      <div className="flex flex-1 mt-0">
        <Sidebar />
        <main className={`flex-1 p-6 ${inter.className}`}>{children}</main>
      </div>
    </div>
  );
}
