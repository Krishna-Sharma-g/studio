
'use client';

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CreditCard, LogOut, Settings, User } from "lucide-react";
import { user as defaultUser } from "@/lib/data";

export function UserNav() {
  const searchParams = useSearchParams();
  const nameParam = searchParams.get('name');
  const emailParam = searchParams.get('email');

  const user = {
    name: nameParam || defaultUser.name,
    email: emailParam || defaultUser.email,
    avatar: defaultUser.avatar
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  };
  
  const navLinks = [
    { href: "/profile", icon: User, label: "Profile" },
    { href: "/history", icon: CreditCard, label: "Billing" },
    { href: "/profile", icon: Settings, label: "Settings" },
  ].map(item => {
        const url = new URL(item.href, "http://localhost");
        searchParams.forEach((value, key) => {
            url.searchParams.append(key, value);
        })
        return {
            ...item,
            hrefWithParams: `${url.pathname}${url.search}`
        }
    });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage src={user.avatar} alt={`@${user.name}`} />
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {navLinks.map(link => (
             <DropdownMenuItem key={link.label} asChild>
              <Link href={link.hrefWithParams}>
                <link.icon />
                {link.label}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/">
            <LogOut />
            Log out
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
