import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import AuthNavbar from "@/components/AuthNavbar";
import AuthWrapper from "./AuthWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Transcribai",
  description: "Transcribe audio files and video to text",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthWrapper inter={inter}>{children}</AuthWrapper>;
}
