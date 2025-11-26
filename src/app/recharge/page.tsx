
'use client';

import { UserDashboardLayout } from "@/components/layout/user-dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useCollection } from '@/firebase/firestore/use-collection';
import { useFirestore, useMemoFirebase } from '@/firebase/provider';
import { collection, query } from "firebase/firestore";
import type { RechargePlan } from "@/lib/data";
import { Skeleton } from "@/components/ui/skeleton";

export default function RechargePage() {
  const firestore = useFirestore();

  const rechargePlansQuery = useMemoFirebase(
    () => (firestore ? query(collection(firestore, "recharge_plans")) : null),
    [firestore]
  );

  const { data: rechargePlans, isLoading } = useCollection<RechargePlan>(rechargePlansQuery);

  return (
    <UserDashboardLayout>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Mobile Recharge</CardTitle>
          <CardDescription>Select a plan to recharge your mobile.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading && (
            <>
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </>
          )}
          {rechargePlans?.map((plan) => (
            <div key={plan.id} className="flex items-center justify-between rounded-lg border p-4">
                <div>
                    <p className="text-xl font-bold">₹{plan.amount}</p>
                    <p className="text-sm text-muted-foreground">Validity: {plan.validity}</p>
                    <p className="text-sm text-muted-foreground">Data: {plan.dataPerDay}</p>
                </div>
                <Button asChild>
                    <Link href={`/transfer?amount=${plan.amount}&note=${encodeURIComponent(`Recharge: ${plan.operator} ₹${plan.amount}`)}`}>
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
