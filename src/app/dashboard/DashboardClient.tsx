"use client";

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

export default function DashboardClient() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const nameParam = searchParams.get('name');
  const [showBalance, setShowBalance] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [requestAmount, setRequestAmount] = useState('');
  const [isAccountDialogOpen, setIsAccountDialogOpen] = useState(false);
  const [isLoansDialogOpen, setIsLoansDialogOpen] = useState(false);
  
  // AI Chatbot state
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { sender: 'ai', text: "Hello! How can I help you with your banking needs today?" }
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  let displayName = user.name;
  if (nameParam) {
    displayName = nameParam;
  } else if (email) {
    const emailName = email.split('@')[0];
    displayName = emailName.charAt(0).toUpperCase() + emailName.slice(1);
  }
  
  const upiId = nameParam 
    ? `${nameParam.toLowerCase().replace(/\s+/g, '.')}@mmbank`
    : user.upiId;

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

  const handleSelectPerson = (person: Person) => {
    setSelectedPerson(person);
    setRequestAmount('');
  };

  const handleRequestMoney = () => {
    if (requestAmount && parseFloat(requestAmount) > 0) {
      const amountFormatted = formatCurrency(parseFloat(requestAmount));
      console.log(`Requesting ${amountFormatted}`);
      setRequestAmount('');
    }
  };

  const handleSendChatMessage = async () => {
    if (!chatInput.trim() || isChatLoading) return;

    const newMessages: ChatMessage[] = [...chatMessages, { sender: 'user', text: chatInput }];
    setChatMessages(newMessages);
    const currentQuery = chatInput;
    setChatInput('');
    setIsChatLoading(true);

    try {
      const result = await chat({ query: currentQuery });
      setChatMessages([...newMessages, { sender: 'ai', text: result.response }]);
    } catch (error) {
      console.error("Chatbot error:", error);
      setChatMessages([...newMessages, { sender: 'ai', text: "I'm sorry, something went wrong. Please try again." }]);
    } finally {
      setIsChatLoading(false);
    }
  };
  
  const resetCollectMoneyDialog = () => {
    setSelectedPerson(null);
    setRequestAmount('');
  };
  
  const handleServiceClick = (serviceId: string) => {
    if (serviceId === 'service_3') { // 'Accounts & FD/RD'
        setIsAccountDialogOpen(true);
    } else if (serviceId === 'service_4') { // 'Loans'
        setIsLoansDialogOpen(true);
    }
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
            <h1 className="text-lg font-semibold">Hi {displayName.split(' ')[0]}</h1>
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
                    {chatMessages.map((message, index) => (
                      <div key={index} className={`flex items-start gap-3 ${message.sender === 'user' ? 'justify-end' : ''}`}>
                        {message.sender === 'ai' && (
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>AI</AvatarFallback>
                          </Avatar>
                        )}
                        <div className={`rounded-lg p-3 text-sm ${message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-background'}`}>
                          <p>{message.text}</p>
                        </div>
                         {message.sender === 'user' && (
                          <Avatar className="h-8 w-8">
                             <AvatarImage src={user.avatar} alt={displayName} />
                            <AvatarFallback>{getInitials(displayName)}</AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    ))}
                     {isChatLoading && (
                      <div className="flex items-start gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>AI</AvatarFallback>
                        </Avatar>
                        <div className="rounded-lg bg-background p-3 text-sm">
                          <Loader2 className="h-5 w-5 animate-spin" />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <Input
                      placeholder="Type your message..."
                      className="flex-1"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendChatMessage()}
                      disabled={isChatLoading}
                    />
                    <Button onClick={handleSendChatMessage} disabled={isChatLoading}>
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
                      <button className="pl-3 hover:underline">My UPI ID &amp; QR Code</button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-xs">
                      <DialogHeader>
                        <DialogTitle className="text-center">My UPI QR Code</DialogTitle>
                      </DialogHeader>
                      <div className="flex flex-col items-center justify-center gap-4 py-4">
                        <div className="rounded-lg border bg-white p-2">
                          <Image
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=${upiId}`}
                            alt="UPI QR Code"
                            width={200}
                            height={200}
                          />
                        </div>
                        <p className="text-center font-mono text-sm text-muted-foreground">{upiId}</p>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <section className="grid grid-cols-3 gap-4 text-center">
            <QuickAction icon={Send} label="Send Money" href="/transfer" />
            <Dialog onOpenChange={(open) => !open && resetCollectMoneyDialog()}>
              <DialogTrigger asChild>
                <div>
                  <QuickAction icon={Send} label="Collect Money" />
                </div>
              </DialogTrigger>
              <DialogContent>
                {!selectedPerson ? (
                  <>
                    <DialogHeader>
                      <DialogTitle>Request Money</DialogTitle>
                      <DialogDescription>
                        Search for a contact to request money from.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <Input placeholder="Search by name or UPI ID" />
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Recent Contacts
                        </h3>
                        <div className="flex flex-col gap-2">
                          {people.map((person) => (
                            <button
                              key={person.id}
                              onClick={() => handleSelectPerson(person)}
                              className="flex items-center gap-3 rounded-md p-2 text-left hover:bg-accent"
                            >
                              <Avatar>
                                <AvatarImage src={person.avatar} />
                                <AvatarFallback>
                                  {getInitials(person.name)}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-medium">{person.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <DialogHeader className="border-b pb-3">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={selectedPerson.avatar} />
                           <AvatarFallback>{getInitials(selectedPerson.name)}</AvatarFallback>
                        </Avatar>
                        <DialogTitle>{selectedPerson.name}</DialogTitle>
                      </div>
                    </DialogHeader>
                    <div className="flex h-80 flex-col justify-between">
                      <div className="flex-1 space-y-4 overflow-y-auto p-4">
                         {/* This part seems to be for a different feature. I will leave it for now. */}
                      </div>
                      <div className="flex items-center gap-2 border-t p-4">
                        <Input
                          type="number"
                          placeholder="Enter amount"
                          value={requestAmount}
                          onChange={(e) => setRequestAmount(e.target.value)}
                          className="flex-1"
                        />
                        <Button onClick={handleRequestMoney}>Request</Button>
                      </div>
                    </div>
                  </>
                )}
              </DialogContent>
            </Dialog>
            <QuickAction icon={History} label="Pending Requests" href="/requests"/>
          </section>

          {/* Services Grid */}
          <section>
             <div className="grid grid-cols-4 gap-4">
              {services.map((service) => {
                return (
                    <ServiceIcon
                        key={service.id}
                        service={service}
                        onClick={() => handleServiceClick(service.id)}
                    />
                );
              })}
            </div>
          </section>

        </main>
      </div>

       {/* Accounts Dialog */}
      <Dialog open={isAccountDialogOpen} onOpenChange={setIsAccountDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Account Details</DialogTitle>
            <DialogDescription>
              Your personal and account information.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <DetailItem label="Full Name" value={displayName} />
            <DetailItem label="Email Address" value={email || user.email} />
            <DetailItem label="UPI ID" value={upiId} />
          </div>
          <DialogFooter className="sm:justify-start">
             <Button asChild variant="outline">
                <Link href="/" onClick={() => setIsAccountDialogOpen(false)}>
                    Create New Account
                </Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Loans Dialog */}
      <Dialog open={isLoansDialogOpen} onOpenChange={setIsLoansDialogOpen}>
        <DialogContent className="sm:max-w-md">
            <DialogHeader>
                <DialogTitle>Loan Services</DialogTitle>
                <DialogDescription>
                    Explore our loan options.
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                {loanOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                        <Link href={option.href} key={option.label} onClick={() => setIsLoansDialogOpen(false)}>
                            <div className="flex items-center gap-3 rounded-md p-3 text-left hover:bg-accent cursor-pointer border">
                                <Icon className="h-6 w-6 text-primary" />
                                <span className="font-medium">{option.label}</span>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </DialogContent>
      </Dialog>
    </UserDashboardLayout>
  );
}
