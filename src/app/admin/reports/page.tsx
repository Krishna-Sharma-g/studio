import { AdminDashboardLayout } from "@/components/layout/admin-dashboard-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import { transactions } from "@/lib/data";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
};

const totalDeposits = transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
const totalWithdrawals = transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + t.amount, 0);

export default function AdminReportsPage() {
  return (
    <AdminDashboardLayout>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Transaction Reports</CardTitle>
          <CardDescription>
            Generate and view monthly transaction reports.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-8 flex flex-wrap items-end gap-4 rounded-lg border p-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Month</label>
              <Select defaultValue="7">
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Select Month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">January</SelectItem>
                  <SelectItem value="2">February</SelectItem>
                  <SelectItem value="3">March</SelectItem>
                  <SelectItem value="4">April</SelectItem>
                  <SelectItem value="5">May</SelectItem>
                  <SelectItem value="6">June</SelectItem>
                  <SelectItem value="7">July</SelectItem>
                  <SelectItem value="8">August</SelectItem>
                  <SelectItem value="9">September</SelectItem>
                  <SelectItem value="10">October</SelectItem>
                  <SelectItem value="11">November</SelectItem>
                  <SelectItem value="12">December</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
               <label className="text-sm font-medium">Year</label>
              <Select defaultValue="2024">
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Select Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button>Generate Report</Button>
          </div>

          <h3 className="mb-4 text-xl font-semibold font-headline">Report for July 2024</h3>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((txn) => (
                  <TableRow key={txn.id}>
                    <TableCell>{txn.date}</TableCell>
                    <TableCell className="font-medium">{txn.description}</TableCell>
                    <TableCell>{txn.type}</TableCell>
                    <TableCell className={`text-right font-medium ${txn.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(txn.amount)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3} className="font-bold">Total Deposits</TableCell>
                  <TableCell className="text-right font-bold text-green-600">{formatCurrency(totalDeposits)}</TableCell>
                </TableRow>
                 <TableRow>
                  <TableCell colSpan={3} className="font-bold">Total Withdrawals/Payments</TableCell>
                  <TableCell className="text-right font-bold text-red-600">{formatCurrency(totalWithdrawals)}</TableCell>
                </TableRow>
                 <TableRow>
                  <TableCell colSpan={3} className="font-bold text-lg">Net Flow</TableCell>
                  <TableCell className="text-right font-bold text-lg">{formatCurrency(totalDeposits + totalWithdrawals)}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="justify-end">
            <Button variant="outline">Download CSV</Button>
        </CardFooter>
      </Card>
    </AdminDashboardLayout>
  );
}
