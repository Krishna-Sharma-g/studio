"use client";

import * as React from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import {
  LayoutDashboard,
  ArrowRightLeft as TransferIcon,
  History,
  User,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/transfer", icon: TransferIcon, label: "Transfers" },
  { href: "/history", icon: History, label: "History" },
  { href: "/profile", icon: User, label: "Profile" },
];

export function UserDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout navItems={navItems} userType="user">
      {children}
    </DashboardLayout>
  );
}
