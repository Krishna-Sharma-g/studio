
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { UserDashboardLayout } from "@/components/layout/user-dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUser, useFirestore, useMemoFirebase } from '@/firebase/provider';
import { useCollection } from '@/firebase/firestore/use-collection';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

interface ElectricityBill {
    id: string;
    userId: string;
    consumerNumber: string;
    month: string;
    amount: number;
    status: 'pending' | 'paid';
}

export default function ElectricityBillPage() {
    const { user } = useUser();
    const firestore = useFirestore();
    const [consumerNumber, setConsumerNumber] = useState('');
    const [submittedConsumerNumber, setSubmittedConsumerNumber] = useState('');

    const electricityBillQuery = useMemoFirebase(() => {
        if (!firestore || !user || !submittedConsumerNumber) return null;
        // Shimmed query descriptor (no Firestore) — kept for API compatibility with useCollection shim.
        return {
            __memo: true,
            type: 'shim-query',
            path: `users/${user.uid}/electricity_bills`,
            filter: { consumerNumber: submittedConsumerNumber },
        };
    }, [firestore, user, submittedConsumerNumber]);

    const { data: bills, isLoading } = useCollection<ElectricityBill>(electricityBillQuery);

    const handleCheckBill = () => {
        if (consumerNumber) {
            setSubmittedConsumerNumber(consumerNumber);
        }
    };

    const bill = bills?.[0];

    return (
        <UserDashboardLayout>
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Electricity Bill</CardTitle>
                    <CardDescription>Enter your consumer number to check your bill status.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex w-full max-w-sm items-end space-x-2">
                        <div className="grid flex-1 gap-1.5">
                            <Label htmlFor="consumer-number">Consumer Number</Label>
                            <Input
                                id="consumer-number"
                                type="text"
                                placeholder="e.g., 123456789"
                                value={consumerNumber}
                                onChange={(e) => setConsumerNumber(e.target.value)}
                            />
                        </div>
                        <Button onClick={handleCheckBill} disabled={!consumerNumber || isLoading}>
                            {isLoading ? 'Checking...' : 'Check Bill'}
                        </Button>
                    </div>

                    {submittedConsumerNumber && (
                        <div className="mt-6 rounded-lg border p-6">
                            <h3 className="text-lg font-semibold mb-4">Bill Status</h3>
                            {isLoading && <Skeleton className="h-8 w-1/2" />}
                            {!isLoading && !bill && <p>No bill found for this consumer number.</p>}
                            {bill && (
                                <div className="flex flex-col items-start gap-4">
                                    {bill.status === 'paid' ? (
                                        <div className="flex flex-col items-start gap-2">
                                            <Badge className="bg-green-100 text-green-800 text-lg px-4 py-1">Paid</Badge>
                                            <p className="text-muted-foreground mt-2">Your electricity bill for {bill.month} has been paid.</p>
                                        </div>
                                    ) : (
                                        <div className="flex w-full items-center justify-between">
                                            <div className="flex flex-col gap-2">
                                                <Badge variant="destructive" className="text-lg px-4 py-1">Pending</Badge>
                                                <p className="text-muted-foreground">Your bill for {bill.month} is due.</p>
                                                <p className="text-2xl font-bold">₹{bill.amount.toFixed(2)}</p>
                                            </div>
                                            <Button size="lg" asChild>
                                                <Link href={`/transfer?amount=${bill.amount}&note=${encodeURIComponent(`Electricity Bill: ${bill.month}`)}&upiId=electricity.board@mmbank`}>
                                                    Pay Now
                                                </Link>
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>
        </UserDashboardLayout>
    );
}
