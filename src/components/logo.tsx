import { cn } from "@/lib/utils";

const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <svg
        className="h-8 w-8 text-primary"
        width="40"
        height="28"
        viewBox="0 0 40 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 28V0L20 20L40 0V28H30L20 18L10 28H0Z"
          fill="hsl(var(--primary))"
        />
      </svg>
      <span className="text-2xl font-bold tracking-tighter font-headline text-primary">
        M&M Bank
      </span>
    </div>
  );
};

export default Logo;
