"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LandingPage from "./landing2/page";

export default function Home() {
  // const router = useRouter();

  // useEffect(() => {
  //   router.push("/login");
  // }, []);

  // return null;

  return <LandingPage />;
}
