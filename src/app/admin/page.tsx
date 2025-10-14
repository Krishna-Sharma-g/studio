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

export default function AdminLogin() {
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
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@mmbank.com"
                required
                defaultValue="admin.kumar@mmbank.com"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required defaultValue="adminpass" />
            </div>
             <div className="grid gap-2">
              <Label htmlFor="pin">4-Digit PIN</Label>
              <Input
                id="pin"
                type="password"
                maxLength={4}
                placeholder="****"
                required
                className="tracking-[1rem] text-center"
              />
            </div>
            <Button className="w-full" asChild>
              <Link href="/admin/dashboard">Sign In</Link>
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
