
'use client';

import { useState } from 'react';
import Link from "next/link"
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Logo from "@/components/logo"
import { PinInput } from "@/components/ui/pin-input"

export default function AdminLogin() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');
  const router = useRouter();

  const isFormComplete = name.trim() !== '' && email.trim() !== '' && pin.length === 4;

  const handleSignIn = () => {
    if (isFormComplete) {
      router.push('/admin/dashboard');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="mx-auto w-full max-w-sm shadow-lg">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <Logo />
          </div>
          <CardTitle className="text-2xl font-headline">Admin Portal</CardTitle>
          <CardDescription>
            Enter your credentials to access the admin dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                    id="name"
                    type="text"
                    placeholder="Full Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
             <div className="grid gap-2">
              <Label htmlFor="pin">4-Digit PIN</Label>
              <PinInput onComplete={setPin} />
            </div>
            <Button className="w-full" onClick={handleSignIn} disabled={!isFormComplete}>
              Sign In
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Not an admin?{" "}
            <Link href="/" className="underline">
              User Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
