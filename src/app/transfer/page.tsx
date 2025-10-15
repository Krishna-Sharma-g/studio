
"use client";

import { useState } from "react";
import { ArrowRightLeft as TransferIcon, CheckCircle } from "lucide-react";
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
import { banks } from "@/lib/data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PinInput } from "@/components/ui/pin-input";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function TransferPage() {
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccessDialog(true);
  };

  return (
    <UserDashboardLayout>
      <div className="flex justify-center">
        <Card className="w-full max-w-2xl shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Transfer Funds</CardTitle>
            <CardDescription>
              Securely move money using UPI or a bank transfer.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="upi">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="upi">UPI ID</TabsTrigger>
                <TabsTrigger value="bank">Bank Transfer</TabsTrigger>
              </TabsList>
              <TabsContent value="upi">
                <form className="grid gap-6 pt-4" onSubmit={handleSubmit}>
                  <div className="grid gap-2">
                    <Label htmlFor="upi-id">Enter UPI ID</Label>
                    <Input id="upi-id" placeholder="name@bank" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="upi-amount">Amount (₹)</Label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">₹</span>
                      <Input id="upi-amount" type="number" placeholder="0.00" className="pl-7"/>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="upi-memo">Description (Optional)</Label>
                    <Textarea id="upi-memo" placeholder="Enter a brief description" />
                  </div>
                   <div className="grid gap-2">
                      <Label htmlFor="upi-pin">Enter 4-Digit PIN</Label>
                      <PinInput />
                    </div>
                  <div className="flex justify-end">
                    <Button type="submit">
                      <TransferIcon className="mr-2 h-4 w-4" />
                      Send via UPI
                    </Button>
                  </div>
                </form>
              </TabsContent>
              <TabsContent value="bank">
                 <form className="grid gap-6 pt-4" onSubmit={handleSubmit}>
                    <div className="grid gap-2">
                      <Label htmlFor="account-number">Enter Account Number</Label>
                      <Input id="account-number" placeholder="1234567890" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="bank-name">Bank</Label>
                       <Select>
                        <SelectTrigger id="bank-name">
                          <SelectValue placeholder="Select a bank" />
                        </SelectTrigger>
                        <SelectContent>
                          {banks.map((bank) => (
                            <SelectItem key={bank.id} value={bank.name}>
                              {bank.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="bank-amount">Amount (₹)</Label>
                        <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">₹</span>
                        <Input id="bank-amount" type="number" placeholder="0.00" className="pl-7"/>
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="bank-memo">Description (Optional)</Label>
                        <Textarea id="bank-memo" placeholder="Enter a brief description" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="bank-pin">Enter 4-Digit PIN</Label>
                      <PinInput />
                    </div>
                    <div className="flex justify-end">
                        <Button type="submit">
                        <TransferIcon className="mr-2 h-4 w-4" />
                        Send via Bank Transfer
                        </Button>
                    </div>
                 </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex flex-col items-center text-center">
               <CheckCircle className="h-20 w-20 text-green-500 mb-4" />
              <AlertDialogTitle className="text-2xl font-headline">Successful</AlertDialogTitle>
              <AlertDialogDescription>
                Your fund transfer has been completed successfully.
              </AlertDialogDescription>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-center">
             <Button onClick={() => setShowSuccessDialog(false)}>
              Done
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </UserDashboardLayout>
  );
}
