
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { UserDashboardLayout } from "@/components/layout/user-dashboard-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { user as initialUser, accounts } from "@/lib/data";
import { Separator } from '@/components/ui/separator';
import { PinInput } from '@/components/ui/pin-input';

const DetailItem = ({ label, value }: { label: string, value: string | undefined }) => (
    <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium">{value}</p>
    </div>
);


export default function ProfilePage() {
    const searchParams = useSearchParams();
    const nameParam = searchParams.get('name');
    const emailParam = searchParams.get('email');
    
    const [user, setUser] = useState({
        ...initialUser,
        name: nameParam || initialUser.name,
        email: emailParam || initialUser.email,
        upiId: nameParam ? `${nameParam.toLowerCase().replace(' ', '.')}@mmbank` : initialUser.upiId,
    });
    
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editedUser, setEditedUser] = useState({
        name: user.name,
        address: "123 Financial District, Mumbai, 400051",
        phone: "+91 98765 43210",
        dob: "1992-08-15"
    });

    const savingsAccount = accounts.find(acc => acc.type === 'Savings');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setEditedUser(prev => ({ ...prev, [id]: value }));
    };

    const handleSaveChanges = () => {
        setUser(prev => ({ 
            ...prev, 
            name: editedUser.name,
            upiId: `${editedUser.name.toLowerCase().replace(' ', '.')}@mmbank`
        }));
        // In a real app, you'd also save the other fields.
        setIsEditModalOpen(false);
    };

  return (
    <UserDashboardLayout>
      <div className="flex justify-center">
        <Card className="w-full max-w-4xl shadow-lg">
            <CardHeader>
                <CardTitle className="font-headline text-2xl">My Profile</CardTitle>
                <CardDescription>View and manage your personal and account details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex flex-col items-center gap-4 sm:flex-row">
                    <div className="rounded-lg border bg-white p-2">
                        <Image
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=${user.upiId}`}
                            alt="UPI QR Code"
                            width={120}
                            height={120}
                        />
                    </div>
                    <div className="grid flex-1 gap-4 sm:grid-cols-2">
                        <DetailItem label="Full Name" value={user.name} />
                        <DetailItem label="Email Address" value={user.email} />
                        <DetailItem label="Address" value={editedUser.address} />
                        <DetailItem label="Phone Number" value={editedUser.phone} />
                        <DetailItem label="Date of Birth" value={editedUser.dob} />
                        <DetailItem label="UPI ID" value={user.upiId} />
                    </div>
                </div>
                <Separator />
                <div className="grid gap-4 sm:grid-cols-2">
                    <DetailItem label="Account Number" value={savingsAccount?.number} />
                    <DetailItem label="IFSC Code" value={savingsAccount?.ifsc} />
                </div>
            </CardContent>
            <CardFooter className="flex-col gap-4 sm:flex-row sm:justify-end">
                 <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline">Edit Profile</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit Profile</DialogTitle>
                            <DialogDescription>
                                Make changes to your personal information here.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">Name</Label>
                                <Input id="name" value={editedUser.name} onChange={handleInputChange} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="address" className="text-right">Address</Label>
                                <Input id="address" value={editedUser.address} onChange={handleInputChange} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="phone" className="text-right">Phone</Label>
                                <Input id="phone" value={editedUser.phone} onChange={handleInputChange} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="dob" className="text-right">D.O.B.</Label>
                                <Input id="dob" type="date" value={editedUser.dob} onChange={handleInputChange} className="col-span-3" />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={handleSaveChanges}>Save Changes</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button>Change PIN</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Change PIN</DialogTitle>
                            <DialogDescription>
                                Enter your old and new PIN to update your security credentials.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="current-pin">Current PIN</Label>
                                <PinInput length={4} />
                            </div>
                             <div className="grid gap-2">
                                <Label htmlFor="new-pin">New PIN</Label>
                                <PinInput length={4} />
                            </div>
                             <div className="grid gap-2">
                                <Label htmlFor="confirm-pin">Confirm New PIN</Label>
                                <PinInput length={4} />
                            </div>
                        </div>
                        <DialogFooter>
                             <DialogClose asChild>
                                <Button type="button" variant="secondary">Cancel</Button>
                            </DialogClose>
                            <DialogClose asChild>
                                <Button type="submit">Save</Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </CardFooter>
        </Card>
      </div>
    </UserDashboardLayout>
  );
}
