import { Plus, Upload, UserPlus, FileEdit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const actions = [
  { label: "Add Post", icon: Plus, variant: "default" as const },
  { label: "Upload Banner", icon: Upload, variant: "secondary" as const },
  { label: "Add User", icon: UserPlus, variant: "secondary" as const },
  { label: "Edit Content", icon: FileEdit, variant: "secondary" as const },
];

export function QuickActions() {
  return (
    <div className="bg-card rounded-xl shadow-card border border-border/50 p-6 animate-slide-up" style={{ animationDelay: "300ms" }}>
      <h3 className="font-display font-semibold text-lg text-foreground mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <Button
            key={action.label}
            variant={action.variant}
            className={cn(
              "h-auto py-4 flex-col gap-2 transition-all hover:scale-105",
              action.variant === "default" && "bg-gradient-gold hover:opacity-90 shadow-glow"
            )}
          >
            <action.icon className="h-5 w-5" />
            <span className="text-sm font-medium">{action.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
