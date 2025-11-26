import * as React from 'react';
import DashboardClient from './DashboardClient';
import {
  Bot,
  Bell,
  Copy,
  History,
  Send,
  Share2,
  Users,
  Loader2,
  HandCoins,
  FileText,
  PiggyBank,
  Gem,
  MapPin,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { UserDashboardLayout } from "@/components/layout/user-dashboard-layout";
import { user, services, accounts, people, Person } from "@/lib/data";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { chat } from '@/ai/flows/chat-flow';


const QuickAction = ({ icon, label, href }: { icon: React.ElementType, label: string, href?: string }) => {
  const Icon = icon;
  const content = (
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

  if (href) {
    return <Link href={href}>{content}</Link>
  }

  return content;
};

const ServiceIcon = ({ service, onClick }: { service: { id: string, name: string, icon: React.ElementType, href?: string }, onClick?: () => void }) => {
  const Icon = service.icon;

  const content = (
    <div className="flex flex-col items-center justify-center gap-2 rounded-lg bg-card p-4 text-center hover:bg-accent">
        <Icon className="h-8 w-8 text-primary" />
        <span className="text-xs font-medium">{service.name}</span>
    </div>
  );

  if (service.href && service.href !== '#') {
    return (
        <Link href={service.href} key={service.id}>
            {content}
        </Link>
    );
  }

  return <div className='cursor-pointer' onClick={onClick}>{content}</div>;
};


const DetailItem = ({ label, value }: { label: string, value: string | undefined }) => (
    <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium">{value}</p>
    </div>
);

interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}

const loanOptions = [
    { label: "Apply for New Loan", icon: FileText, href: "#" },
    { label: "EMI @ UPI", icon: PiggyBank, href: "#" },
    { label: "Gold Loan", icon: Gem, href: "#" },
    { label: "Track New Loan", icon: MapPin, href: "#" },
];

export default function DashboardPage() {
  return (
    <React.Suspense fallback={<div />}>
      <DashboardClient />
    </React.Suspense>
  );
}
