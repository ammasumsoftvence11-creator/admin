import { DashboardLayout } from "@/components/DashboardLayout";
import { StatCard } from "@/components/StatCard";
import { RecentActivity } from "@/components/RecentActivity";
import { QuickActions } from "@/components/QuickActions";
import { VisitorChart } from "@/components/VisitorChart";
import { 
  Users, 
  FileText, 
  MapPin, 
  GraduationCap,
  Building2,
  Eye
} from "lucide-react";

const stats = [
  { title: "Total Users", value: "12,845", icon: Users, trend: { value: 12, isPositive: true } },
  { title: "Blog Posts", value: "248", icon: FileText, trend: { value: 8, isPositive: true } },
  { title: "Tourist Spots", value: "156", icon: MapPin, trend: { value: 5, isPositive: true } },
  { title: "Students", value: "3,420", icon: GraduationCap, trend: { value: 15, isPositive: true } },
  { title: "Institutes", value: "89", icon: Building2, trend: { value: 3, isPositive: true } },
  { title: "Page Views", value: "1.2M", icon: Eye, trend: { value: 22, isPositive: true } },
];

const Index = () => {
  return (
    <DashboardLayout title="Dashboard">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
            Welcome back, <span className="text-gradient">Admin</span>
          </h2>
          <p className="text-muted-foreground mt-1">Here's what's happening with your platform today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              trend={stat.trend}
              delay={index * 100}
            />
          ))}
        </div>

        {/* Charts and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <VisitorChart />
          </div>
          <div className="space-y-6">
            <QuickActions />
          </div>
        </div>

        {/* Recent Activity */}
        <RecentActivity />
      </div>
    </DashboardLayout>
  );
};

export default Index;
