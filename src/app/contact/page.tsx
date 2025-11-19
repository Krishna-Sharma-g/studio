
import { UserDashboardLayout } from "@/components/layout/user-dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MessageSquare, ArrowRight } from "lucide-react";
import Link from "next/link";

const serviceOptions = [
  {
    icon: Phone,
    label: "Helpline Number",
    value: "1800-123-4567",
    description: "For immediate assistance",
  },
  {
    icon: Mail,
    label: "Email Support",
    value: "support@mmbank.com",
    description: "Get help via email",
  },
  {
    icon: MessageSquare,
    label: "Q&A AI Chatbot",
    value: "Chat Now",
    description: "Ask questions to our AI assistant",
    href: "/dashboard"
  },
];

export default function ContactPage() {
  return (
    <UserDashboardLayout>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Customer Service</CardTitle>
          <CardDescription>Contact us for any support or queries.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {serviceOptions.map((option) => (
              <div
                key={option.label}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center gap-4">
                  <option.icon className="h-8 w-8 text-primary" />
                  <div>
                    <p className="font-semibold">{option.label}</p>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </div>
                </div>
                {option.href ? (
                    <Link href={option.href} className="flex items-center gap-2 text-primary font-medium">
                        {option.value}
                        <ArrowRight className="h-5 w-5" />
                    </Link>
                ) : (
                    <p className="font-medium">{option.value}</p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </UserDashboardLayout>
  );
}
