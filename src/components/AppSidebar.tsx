import { 
  LayoutDashboard, 
  Image, 
  History, 
  Landmark, 
  Users, 
  GraduationCap, 
  MapPin, 
  Building2, 
  Building, 
  FileText, 
  UserCircle,
  ChevronLeft,
  LogOut
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const menuItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Banner", url: "/banner", icon: Image },
  { title: "History", url: "/history", icon: History },
  { title: "Culture", url: "/culture", icon: Landmark },
  { title: "Person", url: "/person", icon: Users },
  { title: "Students", url: "/students", icon: GraduationCap },
  { title: "Tourist", url: "/tourist", icon: MapPin },
  { title: "Institute", url: "/institute", icon: Building2 },
  { title: "Organization", url: "/organization", icon: Building },
  { title: "Blog", url: "/blog", icon: FileText },
  { title: "User", url: "/user", icon: UserCircle },
];

export function AppSidebar() {
  const location = useLocation();
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar 
      className="border-r-0 bg-sidebar"
      collapsible="icon"
    >
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          <div className={cn("flex items-center gap-3 transition-all duration-300", isCollapsed && "justify-center")}>
            <div className="w-10 h-10 rounded-xl bg-gradient-gold flex items-center justify-center shadow-glow">
              <Landmark className="w-5 h-5 text-primary-foreground" />
            </div>
            {!isCollapsed && (
              <div className="animate-fade-in">
                <h1 className="font-display font-bold text-lg text-sidebar-foreground">Admin</h1>
                <p className="text-xs text-sidebar-muted">Management Panel</p>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className={cn(
              "h-8 w-8 text-sidebar-muted hover:text-sidebar-foreground hover:bg-sidebar-accent transition-all",
              isCollapsed && "hidden"
            )}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      className={cn(
                        "h-11 rounded-lg transition-all duration-200",
                        isActive 
                          ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-glow" 
                          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      )}
                    >
                      <NavLink to={item.url} className="flex items-center gap-3 px-3">
                        <item.icon className={cn("h-5 w-5 flex-shrink-0", isActive && "animate-scale-in")} />
                        <span className={cn(
                          "font-medium transition-all duration-200",
                          isCollapsed && "hidden"
                        )}>
                          {item.title}
                        </span>
                        {isActive && !isCollapsed && (
                          <div className="ml-auto w-1.5 h-1.5 rounded-full bg-sidebar-primary-foreground animate-pulse" />
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-sidebar-border">
        <div className={cn(
          "flex items-center gap-3 transition-all duration-300",
          isCollapsed && "justify-center"
        )}>
          <Avatar className="h-10 w-10 ring-2 ring-sidebar-border">
            <AvatarImage src="" />
            <AvatarFallback className="bg-sidebar-accent text-sidebar-accent-foreground font-semibold">
              AD
            </AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="flex-1 min-w-0 animate-fade-in">
              <p className="text-sm font-medium text-sidebar-foreground truncate">Admin User</p>
              <p className="text-xs text-sidebar-muted truncate">admin@example.com</p>
            </div>
          )}
          {!isCollapsed && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-sidebar-muted hover:text-destructive hover:bg-destructive/10"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
