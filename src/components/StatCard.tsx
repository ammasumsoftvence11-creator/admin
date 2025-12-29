import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  delay?: number;
}

export function StatCard({ title, value, icon: Icon, trend, className, delay = 0 }: StatCardProps) {
  return (
    <div 
      className={cn(
        "bg-card rounded-xl p-6 shadow-card border border-border/50 hover:shadow-lg hover:border-primary/20 transition-all duration-300 animate-slide-up group",
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-display font-bold text-foreground">{value}</p>
          {trend && (
            <div className={cn(
              "inline-flex items-center gap-1 text-sm font-medium px-2 py-0.5 rounded-full",
              trend.isPositive 
                ? "text-chart-4 bg-chart-4/10" 
                : "text-destructive bg-destructive/10"
            )}>
              <span>{trend.isPositive ? "+" : ""}{trend.value}%</span>
              <span className="text-xs text-muted-foreground">vs last month</span>
            </div>
          )}
        </div>
        <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center group-hover:bg-primary group-hover:shadow-glow transition-all duration-300">
          <Icon className="w-6 h-6 text-accent-foreground group-hover:text-primary-foreground transition-colors" />
        </div>
      </div>
    </div>
  );
}
