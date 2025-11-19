
import { UserDashboardLayout } from "@/components/layout/user-dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { rechargePlans } from "@/lib/data";
import Link from "next/link";

export default function RechargePage() {
  return (
    <UserDashboardLayout>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Mobile Recharge</CardTitle>
          <CardDescription>Select a plan to recharge your mobile.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {rechargePlans.map((plan) => (
            <div key={plan.id} className="flex items-center justify-between rounded-lg border p-4">
                <div>
                    <p className="text-xl font-bold">₹{plan.amount}</p>
                    <p className="text-sm text-muted-foreground">Validity: {plan.validity}</p>
                    <p className="text-sm text-muted-foreground">Data: {plan.data}</p>
                </div>
                <Button asChild>
                    <Link href={`/transfer?amount=${plan.amount}&note=${encodeURIComponent(`Recharge: ${plan.amount}`)}`}>
                        Recharge
                    </Link>
                </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </UserDashboardLayout>
  );
}
