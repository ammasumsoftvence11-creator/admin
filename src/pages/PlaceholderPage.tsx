import { DashboardLayout } from "@/components/DashboardLayout";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

const PlaceholderPage = () => {
  const location = useLocation();
  const pageName = location.pathname.slice(1).charAt(0).toUpperCase() + location.pathname.slice(2);

  return (
    <DashboardLayout title={pageName}>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-display font-bold text-foreground">{pageName} Management</h2>
            <p className="text-muted-foreground mt-1">Manage all {pageName.toLowerCase()} entries</p>
          </div>
          <Button className="bg-gradient-gold hover:opacity-90 shadow-glow w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Add New
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder={`Search ${pageName.toLowerCase()}...`}
              className="pl-9 bg-card border-border"
            />
          </div>
          <Button variant="secondary" className="w-full sm:w-auto">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Empty State */}
        <div className="bg-card rounded-xl border border-border/50 shadow-card p-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-accent mx-auto flex items-center justify-center mb-4">
            <Plus className="h-8 w-8 text-accent-foreground" />
          </div>
          <h3 className="text-lg font-display font-semibold text-foreground mb-2">
            No {pageName.toLowerCase()} entries yet
          </h3>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            Get started by adding your first {pageName.toLowerCase()} entry. 
            This content will be displayed on the public website.
          </p>
          <Button className="bg-gradient-gold hover:opacity-90 shadow-glow">
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Entry
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PlaceholderPage;
