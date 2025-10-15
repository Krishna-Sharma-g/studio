
"use client";

import * as React from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import {
  Home,
  Scan,
  Gift,
  User,
  History,
  ListTodo
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const navItems = [
  { href: "/dashboard", icon: Home, label: "Home" },
  { href: "/requests", icon: ListTodo, label: "Requests" },
  { href: "#", icon: Scan, label: "Scan To Pay" },
  { href: "/history", icon: History, label: "History" },
  { href: "/profile", icon: User, label: "Profile" },
];

export function UserDashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    
    const navLinks = navItems.map(item => {
        const url = new URL(item.href, "http://localhost");
        searchParams.forEach((value, key) => {
            url.searchParams.append(key, value);
        })
        return {
            ...item,
            hrefWithParams: `${url.pathname}${url.search}`
        }
    });

    return (
     <div className="flex h-screen w-full flex-col bg-background">
      <main className="flex-1 overflow-y-auto p-4">{children}</main>
      <nav className="sticky bottom-0 border-t bg-card">
        <div className="mx-auto grid h-16 max-w-md grid-cols-5 items-center px-2 text-sm font-medium">
          {navLinks.map((item) => {
            const isScanButton = item.label === "Scan To Pay";
            if (isScanButton) {
              return (
                 <div key={item.label} className="flex justify-center">
                    <Link
                    href={item.hrefWithParams}
                    className={cn(
                        "flex h-16 w-16 -translate-y-4 flex-col items-center justify-center rounded-full border-4 border-background bg-primary text-center text-xs font-medium leading-tight text-primary-foreground shadow-lg transition-transform hover:scale-105",
                    )}
                    >
                    <span>Scan<br/>to Pay</span>
                    </Link>
                </div>
              )
            }
            return (
                <Link
                key={item.label}
                href={item.hrefWithParams}
                className={cn(
                    "flex flex-col items-center justify-center gap-1 rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
                    pathname === item.href && "text-primary"
                )}
                >
                <item.icon className="h-5 w-5" />
                <span className="text-xs">{item.label}</span>
                </Link>
            )
        })}
        </div>
      </nav>
    </div>
  );
}
