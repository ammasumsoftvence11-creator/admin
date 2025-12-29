import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", visitors: 4000, users: 2400 },
  { name: "Feb", visitors: 3000, users: 1398 },
  { name: "Mar", visitors: 5000, users: 3800 },
  { name: "Apr", visitors: 4780, users: 3908 },
  { name: "May", visitors: 5890, users: 4800 },
  { name: "Jun", visitors: 6390, users: 5300 },
  { name: "Jul", visitors: 7490, users: 6100 },
];

export function VisitorChart() {
  return (
    <div className="bg-card rounded-xl shadow-card border border-border/50 p-6 animate-slide-up" style={{ animationDelay: "200ms" }}>
      <div className="mb-6">
        <h3 className="font-display font-semibold text-lg text-foreground">Visitor Analytics</h3>
        <p className="text-sm text-muted-foreground mt-1">Monthly visitors and registered users</p>
      </div>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(35 92% 50%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(35 92% 50%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(180 60% 45%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(180 60% 45%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "hsl(var(--card))", 
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                boxShadow: "var(--shadow-card)"
              }}
              labelStyle={{ color: "hsl(var(--foreground))", fontWeight: 600 }}
            />
            <Area
              type="monotone"
              dataKey="visitors"
              stroke="hsl(35 92% 50%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorVisitors)"
            />
            <Area
              type="monotone"
              dataKey="users"
              stroke="hsl(180 60% 45%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorUsers)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-sm text-muted-foreground">Visitors</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-chart-2" />
          <span className="text-sm text-muted-foreground">Users</span>
        </div>
      </div>
    </div>
  );
}
