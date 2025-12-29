import { FileText, Image, Users, MapPin, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

const activities = [
  {
    id: 1,
    action: "New blog post published",
    description: "Heritage of Bangladesh: A Journey Through Time",
    time: "2 minutes ago",
    icon: FileText,
    color: "text-chart-1",
    bg: "bg-chart-1/10",
  },
  {
    id: 2,
    action: "Banner updated",
    description: "Homepage hero banner replaced",
    time: "15 minutes ago",
    icon: Image,
    color: "text-chart-2",
    bg: "bg-chart-2/10",
  },
  {
    id: 3,
    action: "New student registered",
    description: "Ahmed Rahman joined the program",
    time: "1 hour ago",
    icon: Users,
    color: "text-chart-3",
    bg: "bg-chart-3/10",
  },
  {
    id: 4,
    action: "Tourist spot added",
    description: "Cox's Bazar Beach information updated",
    time: "3 hours ago",
    icon: MapPin,
    color: "text-chart-4",
    bg: "bg-chart-4/10",
  },
  {
    id: 5,
    action: "Institute verified",
    description: "Dhaka University profile approved",
    time: "5 hours ago",
    icon: Building2,
    color: "text-chart-5",
    bg: "bg-chart-5/10",
  },
];

export function RecentActivity() {
  return (
    <div className="bg-card rounded-xl shadow-card border border-border/50 animate-slide-up" style={{ animationDelay: "400ms" }}>
      <div className="p-6 border-b border-border">
        <h3 className="font-display font-semibold text-lg text-foreground">Recent Activity</h3>
        <p className="text-sm text-muted-foreground mt-1">Latest updates across all modules</p>
      </div>
      <div className="divide-y divide-border">
        {activities.map((activity, index) => (
          <div 
            key={activity.id} 
            className="p-4 hover:bg-muted/50 transition-colors"
            style={{ animationDelay: `${500 + index * 100}ms` }}
          >
            <div className="flex items-start gap-4">
              <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0", activity.bg)}>
                <activity.icon className={cn("w-5 h-5", activity.color)} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{activity.action}</p>
                <p className="text-sm text-muted-foreground truncate">{activity.description}</p>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
