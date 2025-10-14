import {
  ArrowRightLeft,
  CircleDollarSign,
  History,
  PiggyBank,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserDashboardLayout } from "@/components/layout/user-dashboard-layout";
import { accounts, transactions } from "@/lib/data";

export default function DashboardPage() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  return (
    <UserDashboardLayout>
      <div className="grid gap-6">
        <div className="grid gap-6 md:grid-cols-2">
          {accounts.map((account) => (
            <Card key={account.id} className="shadow-md">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-medium font-headline">
                  {account.type} Account
                </CardTitle>
                {account.type === 'Checking' ? <Wallet className="h-5 w-5 text-muted-foreground" /> : <PiggyBank className="h-5 w-5 text-muted-foreground" />}
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold font-headline">
                  {formatCurrency(account.balance)}
                </div>
                <p className="text-sm text-muted-foreground pt-1">
                  {account.number}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="shadow-md lg:col-span-2">
            <CardHeader>
              <CardTitle className="font-headline">Recent Transactions</CardTitle>
              <CardDescription>
                A quick look at your recent account activity.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.slice(0, 5).map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>
                        <div className="font-medium">{transaction.description}</div>
                        <div className="text-sm text-muted-foreground">{transaction.type}</div>
                      </TableCell>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell className={`text-right font-medium ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(transaction.amount)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="font-headline">Quick Actions</CardTitle>
              <CardDescription>
                Your most-used actions, just a click away.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <Button asChild className="w-full justify-start gap-3 p-6 text-base" variant="outline">
                <Link href="/transfer">
                  <ArrowRightLeft className="h-5 w-5" />
                  Transfer Funds
                </Link>
              </Button>
              <Button asChild className="w-full justify-start gap-3 p-6 text-base" variant="outline">
                <Link href="/history">
                  <History className="h-5 w-5" />
                  View All History
                </Link>
              </Button>
              <Button asChild className="w-full justify-start gap-3 p-6 text-base" variant="outline">
                <Link href="#">
                  <CircleDollarSign className="h-5 w-5" />
                  Pay Bills
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </UserDashboardLayout>
  );
}
