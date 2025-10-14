"use client";

import * as React from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import {
  Home,
  Scan,
  Gift,
  User
} from "lucide-react";

const navItems = [
  { href: "/dashboard", icon: Home, label: "Home" },
  { href: "#", icon: Scan, label: "Scan" },
  { href: "#", icon: Gift, label: "Offers" },
  { href: "/profile", icon: User, label: "Profile" },
];

export function UserDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout navItems={navItems} userType="user">
      {children}
    </DashboardLayout>
  );
}
