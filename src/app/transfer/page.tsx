"use client";

import { ArrowRightLeft as TransferIcon } from "lucide-react";
import { UserDashboardLayout } from "@/components/layout/user-dashboard-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { accounts } from "@/lib/data";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export default function TransferPage() {
  return (
    <UserDashboardLayout>
      <div className="flex justify-center">
        <Card className="w-full max-w-2xl shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Transfer Funds</CardTitle>
            <CardDescription>
              Securely move money between your accounts or to other banks.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="from-account">From Account</Label>
                  <Select defaultValue="acc_1">
                    <SelectTrigger id="from-account">
                      <SelectValue placeholder="Select account" />
                    </SelectTrigger>
                    <SelectContent>
                      {accounts.map((acc) => (
                        <SelectItem key={acc.id} value={acc.id}>
                          <div className="flex flex-col">
                            <span>{acc.type} - {acc.number.slice(-4)}</span>
                            <span className="text-sm text-muted-foreground">{formatCurrency(acc.balance)}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="to-account">To Account</Label>
                  <Select>
                    <SelectTrigger id="to-account">
                      <SelectValue placeholder="Select account" />
                    </SelectTrigger>
                    <SelectContent>
                      {accounts.map((acc) => (
                        <SelectItem key={acc.id} value={acc.id}>
                           <div className="flex flex-col">
                            <span>{acc.type} - {acc.number.slice(-4)}</span>
                            <span className="text-sm text-muted-foreground">{formatCurrency(acc.balance)}</span>
                          </div>
                        </SelectItem>
                      ))}
                      <SelectItem value="other">
                        Other Bank Account
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="amount">Amount</Label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">$</span>
                  <Input id="amount" type="number" placeholder="0.00" className="pl-7"/>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="memo">Memo (Optional)</Label>
                <Textarea id="memo" placeholder="Enter a brief description" />
              </div>
              <div className="flex justify-end">
                <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <TransferIcon className="mr-2 h-4 w-4" />
                  Submit Transfer
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </UserDashboardLayout>
  );
}
