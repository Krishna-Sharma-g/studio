"use client";

import * as React from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Users, FileText } from "lucide-react";

const navItems = [
  { href: "/admin/dashboard", icon: Users, label: "Customers" },
  { href: "/admin/reports", icon: FileText, label: "Reports" },
];

export function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout navItems={navItems} userType="admin">
      {children}
    </DashboardLayout>
  );
}
