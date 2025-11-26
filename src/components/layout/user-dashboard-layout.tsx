import * as React from "react";
import { UserNavClient } from "@/components/layout/user-nav-client";

export function UserDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full flex-col bg-background">
      <main className="flex-1 overflow-y-auto p-4">{children}</main>
      <React.Suspense fallback={<div />}> 
        <UserNavClient />
      </React.Suspense>
    </div>
  );
}
