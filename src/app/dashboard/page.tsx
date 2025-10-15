'use client';

import { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from 'next/navigation';
import {
  Bot,
  Bell,
  Copy,
  History,
  Send,
  Share2,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { UserDashboardLayout } from "@/components/layout/user-dashboard-layout";
import { user, services, accounts } from "@/lib/data";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';


const QuickAction = ({ icon, label }: { icon: React.ElementType, label: string }) => {
  const Icon = icon;
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <Button
        variant="outline"
        className="h-16 w-16 rounded-full bg-primary/10 text-primary hover:bg-primary/20"
      >
        <Icon className="h-7 w-7" />
      </Button>
      <span className="text-sm font-medium text-foreground">{label}</span>
    </div>
  );
};

const ServiceIcon = ({ service }: { service: { id: string, name: string, icon: React.ElementType } }) => {
  const Icon = service.icon;
  return (
    <Link href="#" key={service.id} className="flex flex-col items-center justify-center gap-2 rounded-lg bg-card p-4 text-center hover:bg-accent">
        <Icon className="h-8 w-8 text-primary" />
      <span className="text-xs font-medium">{service.name}</span>
    </Link>
  );
};


export default function DashboardPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const nameParam = searchParams.get('name');
  const [showBalance, setShowBalance] = useState(false);

  let displayName = user.name;
  if (nameParam) {
    displayName = nameParam.split(' ')[0];
  } else if (email) {
    const emailName = email.split('@')[0];
    displayName = emailName.charAt(0).toUpperCase() + emailName.slice(1);
  }

  const savingsAccount = accounts.find(acc => acc.type === 'Savings');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(amount);
  };


  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  };

  return (
    <UserDashboardLayout>
      <div className="flex h-full flex-col gap-6">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-background">
              <AvatarImage src={user.avatar} alt={displayName} />
              <AvatarFallback>{getInitials(displayName)}</AvatarFallback>
            </Avatar>
            <h1 className="text-lg font-semibold">Hi {displayName}</h1>
          </div>
          <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Bot className="h-6 w-6" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>AI Assistant</DialogTitle>
                  <DialogDescription>
                    Your personal banking assistant. Ask me anything!
                  </DialogDescription>
                </DialogHeader>
                <div className="flex h-96 flex-col">
                  <div className="flex-1 space-y-4 overflow-y-auto rounded-md bg-muted/50 p-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>AI</AvatarFallback>
                      </Avatar>
                      <div className="rounded-lg bg-background p-3 text-sm">
                        <p>Hello! How can I help you with your banking needs today?</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <Input placeholder="Type your message..." className="flex-1" />
                    <Button>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

             <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Bell className="h-6 w-6" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Notifications</h4>
                    <p className="text-sm text-muted-foreground">
                      You have 3 unread messages.
                    </p>
                  </div>
                  <Separator />
                   <div className="grid gap-2">
                    <div className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                      <span className="flex h-2 w-2 translate-y-1 rounded-full bg-primary" />
                      <div className="grid gap-1">
                        <p className="text-sm font-medium">
                          Salary Credited
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Your account has been credited with ₹1,50,000.
                        </p>
                      </div>
                    </div>
                     <div className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                      <span className="flex h-2 w-2 translate-y-1 rounded-full bg-primary" />
                      <div className="grid gap-1">
                        <p className="text-sm font-medium">
                          Payment Reminder
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Your credit card bill is due tomorrow.
                        </p>
                      </div>
                    </div>
                     <div className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                      <span className="flex h-2 w-2 translate-y-1 rounded-full bg-transparent" />
                      <div className="grid gap-1">
                        <p className="text-sm font-medium">
                          Netflix Payment
                        </p>
                        <p className="text-sm text-muted-foreground">
                          A payment of ₹799 was made to Netflix.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 space-y-8 overflow-y-auto">
          
          {/* Account Card */}
          <Card className="bg-blue-900 text-primary-foreground shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-lg font-bold">M&M Bank</p>
                  <p className="text-sm opacity-80">{email || user.email}</p>
                  <p className="text-xs opacity-60">Savings A/C: {savingsAccount?.number}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Copy className="h-4 w-4 cursor-pointer opacity-70 hover:opacity-100" />
                  <Share2 className="h-4 w-4 cursor-pointer opacity-70 hover:opacity-100" />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button variant="secondary" className="bg-white/20 text-white hover:bg-white/30" onClick={() => setShowBalance(!showBalance)}>
                    {showBalance ? 'Hide Balance' : 'View Balance'}
                  </Button>
                  {showBalance && savingsAccount && (
                    <span className="text-xl font-bold">{formatCurrency(savingsAccount.balance)}</span>
                  )}
                </div>
                <div className="flex items-center divide-x divide-white/20 text-sm">
                   <Link href="/history" className="px-3 hover:underline">View Transactions</Link>
                   <Dialog>
                    <DialogTrigger asChild>
                      <button className="pl-3 hover:underline">My UPI ID & QR Code</button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-xs">
                      <DialogHeader>
                        <DialogTitle className="text-center">My UPI QR Code</DialogTitle>
                      </DialogHeader>
                      <div className="flex flex-col items-center justify-center gap-4 py-4">
                        <div className="rounded-lg border bg-white p-2">
                          <Image
                            src={user.qrCodeUrl}
                            alt="UPI QR Code"
                            width={200}
                            height={200}
                          />
                        </div>
                        <p className="text-center font-mono text-sm text-muted-foreground">{user.upiId}</p>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <section className="grid grid-cols-3 gap-4 text-center">
            <QuickAction icon={Send} label="Send Money" />
            <QuickAction icon={Send} label="Collect Money" />
            <QuickAction icon={History} label="Pending Requests" />
          </section>

          {/* Services Grid */}
          <section>
            <div className="grid grid-cols-3 gap-4">
              {services.map((service) => (
                <ServiceIcon key={service.id} service={service} />
              ))}
            </div>
          </section>

        </main>
      </div>
    </UserDashboardLayout>
  );
}
