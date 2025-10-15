'use client';

import { useState } from 'react';
import Link from "next/link"
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

export default function UserLogin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="mx-auto w-full max-w-sm shadow-lg">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <Logo />
          </div>
          <CardTitle className="text-2xl font-headline">Welcome to M&M Bank</CardTitle>
          <CardDescription>
            Enter your details to login to your account
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
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="pin">4-Digit PIN</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your PIN?
                </Link>
              </div>
              <PinInput />
            </div>
            <Button className="w-full" asChild>
              <Link href={`/dashboard?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`}>Login</Link>
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Access{" "}
            <Link href="/admin" className="underline">
              Admin Portal
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
