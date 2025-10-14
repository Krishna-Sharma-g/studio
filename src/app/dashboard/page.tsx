import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  Search,
  Scan,
  Contact,
  Phone,
  Landmark,
  MoreHorizontal,
  ChevronRight,
  User as UserIcon,
  Home,
  Gift,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserDashboardLayout } from "@/components/layout/user-dashboard-layout";
import { user, people, bills } from "@/lib/data";

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

export default function DashboardPage() {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  };

  return (
    <UserDashboardLayout>
      <div className="flex h-full flex-col gap-8">
        {/* Header */}
        <header className="flex items-center gap-4">
          <Avatar className="h-11 w-11 border-2 border-background">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search people and bills"
              className="rounded-full bg-background pl-10"
            />
          </div>
          <Button variant="ghost" size="icon" className="h-11 w-11 rounded-full bg-primary/10 text-primary">
            <UserIcon />
          </Button>
        </header>

        {/* Main Content */}
        <main className="flex-1 space-y-8 overflow-y-auto">
          {/* Main Action Card */}
          <Card className="bg-primary/90 text-primary-foreground shadow-lg">
            <CardHeader>
               <Image
                    src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=priya.sharma@mmbank&color=fff&bgcolor=3B82F6"
                    alt="UPI QR Code"
                    width={60}
                    height={60}
                    className="rounded-lg border-4 border-white"
                  />
            </CardHeader>
            <CardContent>
              <p className="text-sm">Instant loans up to</p>
              <p className="text-4xl font-bold">₹8 lakhs</p>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm opacity-90">Check your offer & apply now</p>
                <Button variant="secondary" size="sm" className="bg-white/90 text-primary hover:bg-white">Apply Now</Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <section>
            <div className="grid grid-cols-4 gap-4 text-center">
              <QuickAction icon={Scan} label="Scan any QR code" />
              <QuickAction icon={Contact} label="Pay contacts" />
              <QuickAction icon={Phone} label="Pay phone number" />
              <QuickAction icon={Landmark} label="Bank transfer" />
            </div>
          </section>

           {/* People */}
          <section>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">People</h2>
              <Button variant="ghost" size="sm" className="text-primary">
                View all <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-4">
              {people.slice(0, 7).map((person) => (
                 <Link href="#" key={person.id} className="flex flex-col items-center gap-2 text-center">
                  <Avatar className="h-14 w-14">
                    <AvatarImage src={person.avatar} />
                    <AvatarFallback>{getInitials(person.name)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{person.name}</span>
                </Link>
              ))}
               <div className="flex flex-col items-center gap-2 text-center">
                  <Button variant="outline" className="h-14 w-14 rounded-full border-dashed">
                      <ChevronRight className="h-6 w-6 text-muted-foreground" />
                  </Button>
                  <span className="text-sm font-medium">View all</span>
                </div>
            </div>
          </section>

          {/* Bills, recharges & more */}
           <section>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Bills, recharges & more</h2>
               <Button variant="ghost" size="sm" className="text-primary">
                View all <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
             <div className="mt-4 grid grid-cols-4 gap-4">
              {bills.map((bill) => (
                 <Link href="#" key={bill.id} className="flex flex-col items-center gap-2 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">
                     <Image src={bill.iconUrl} alt={bill.name} width={32} height={32} />
                  </div>
                  <span className="text-sm font-medium">{bill.name}</span>
                </Link>
              ))}
            </div>
          </section>

           {/* Your M&M Bank Account */}
           <section>
             <Card className="overflow-hidden shadow-lg">
               <CardHeader className="flex-row items-center gap-4 bg-muted/50">
                  <Landmark className="h-8 w-8 text-primary" />
                 <div>
                   <CardTitle className="text-base font-semibold">Your M&M Bank Account</CardTitle>
                   <CardDescription>Savings Account</CardDescription>
                 </div>
               </CardHeader>
               <CardContent className="p-4">
                 <div className="flex items-center justify-between">
                   <p className="text-lg font-bold">Check balance</p>
                   <Button variant="outline" size="sm">Check</Button>
                 </div>
                 <hr className="my-4" />
                 <div className="flex items-center justify-between">
                   <p className="font-medium">Transaction history</p>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                 </div>
               </CardContent>
             </Card>
           </section>

        </main>
      </div>
    </UserDashboardLayout>
  );
}
