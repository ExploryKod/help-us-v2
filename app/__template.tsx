"use client";

import { useState } from "react";
import Header from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import { useSession } from "next-auth/react";
import SideNav from "@/components/layouts/sidebar/Sidenav";

export default function Template({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark min-h-screen flex flex-col">
      <div className="flex flex-1">
        <div className="relative flex flex-1 flex-col bg-gradient-to-br from-blue-50 to-purple-50 overflow-y-auto overflow-x-hidden">
          <Header setSidebarOpen={setSidebarOpen} />
          {children}
          <Footer />
        </div>
      </div>
    </div>
  );
}
