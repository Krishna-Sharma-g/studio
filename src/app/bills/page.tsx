
'use client';

import { useState } from 'react';
import { UserDashboardLayout } from "@/components/layout/user-dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Smartphone, Zap, Flame } from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';

const billOptions = [
  {
    href: "/recharge",
    icon: Smartphone,
    label: "Mobile Recharge",
    description: "Recharge your prepaid mobile number.",
    isExternal: false,
  },
  {
    href: "#",
    icon: Zap,
    label: "Electricity Bill",
    description: "Pay your electricity bill.",
    isExternal: true,
    status: "paid",
  },
  {
    href: "#",
    icon: Flame,
    label: "LPG Gas Cylinder",
    description: "Book and pay for your gas cylinder.",
    isExternal: true,
    status: "pending",
  },
];

export default function BillPaymentPage() {
  const [selectedBill, setSelectedBill] = useState<{label: string, status: string} | null>(null);

  const handleBillClick = (bill: (typeof billOptions)[0]) => {
    if (bill.isExternal && bill.status) {
      setSelectedBill({ label: bill.label, status: bill.status });
    }
  };

  const BillDialogContent = () => (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{selectedBill?.label} Status</DialogTitle>
        <DialogDescription>
          Your current bill status.
        </DialogDescription>
      </DialogHeader>
      <div className="py-4 text-center">
        {selectedBill?.status === 'paid' ? (
            <div className="flex flex-col items-center gap-2">
                <Badge className="bg-green-100 text-green-800 text-lg px-4 py-1">Paid</Badge>
                <p className="text-muted-foreground mt-2">Your {selectedBill.label} bill for this cycle has been paid.</p>
            </div>
        ) : (
             <div className="flex flex-col items-center gap-4">
                <Badge variant="destructive" className="text-lg px-4 py-1">Pending</Badge>
                <p className="text-muted-foreground">Your {selectedBill.label} bill is due.</p>
                <Button>Pay Now</Button>
            </div>
        )}
      </div>
    </DialogContent>
  );


  return (
    <UserDashboardLayout>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Bill Payment</CardTitle>
          <CardDescription>Select a category to pay your bills.</CardDescription>
        </CardHeader>
        <CardContent>
          <Dialog onOpenChange={(isOpen) => !isOpen && setSelectedBill(null)}>
            <div className="space-y-4">
              {billOptions.map((option) => {
                  const content = (
                      <div
                      key={option.label}
                      className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50 cursor-pointer"
                      >
                      <div className="flex items-center gap-4">
                          <option.icon className="h-8 w-8 text-primary" />
                          <div>
                          <p className="font-semibold">{option.label}</p>
                          <p className="text-sm text-muted-foreground">{option.description}</p>
                          </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                  );

                  if (option.isExternal) {
                      return <DialogTrigger asChild key={option.label} onClick={() => handleBillClick(option)}>{content}</DialogTrigger>
                  }

                  return <Link href={option.href} key={option.label}>{content}</Link>
              })}
            </div>
            {selectedBill && <BillDialogContent />}
          </Dialog>
        </CardContent>
      </Card>
    </UserDashboardLayout>
  );
}
