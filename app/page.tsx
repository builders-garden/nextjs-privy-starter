"use client";

import Header from "@/components/Header";
import Tabs from "@/components/Tabs";
import { usePrivy } from "@privy-io/react-auth";

export default function Home() {
  const { authenticated } = usePrivy();

  return (
    <div className="min-h-screen min-w-screen">
      <div className="flex flex-col lg:flex-row h-screen text-black">
        <div className="flex-1 bg-gray-50 p-6 lg:p-12">
          <Header />
        </div>
        <div className="flex-1 bg-white h-full p-6 lg:p-12 flex flex-col items-center justify-center w-full space-y-4">
          {!authenticated && <div className="w-full lg:w-1/2"></div>}
          {authenticated && <Tabs />}
        </div>
      </div>
    </div>
  );
}
