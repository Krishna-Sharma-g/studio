"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
  navItems: {
    href: string;
    icon: React.ElementType;
    label: string;
  }[];
  userType: "user" | "admin";
}

export function DashboardLayout({ children, navItems, userType }: DashboardLayoutProps) {
  const pathname = usePathname();

  if (userType === 'admin') {
    return (
      <SidebarProvider>
        <Sidebar>
          <SidebarContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    className="font-headline"
                  >
                    <Link href={item.href}>
                      <item.icon />
                      {item.label}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <SidebarInset className="flex flex-col bg-gradient-main">
          {/* Admin header can go here if needed */}
          <main className="flex-1 overflow-auto p-4 sm:p-6">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  // GPay-style layout for regular users
  return (
    <div className="flex h-screen w-full flex-col bg-background">
      <main className="flex-1 overflow-y-auto p-4">{children}</main>
      <nav className="sticky bottom-0 border-t bg-card">
        <div className="mx-auto grid h-16 max-w-md grid-cols-4 items-center px-4 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
                pathname === item.href && "text-primary"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
