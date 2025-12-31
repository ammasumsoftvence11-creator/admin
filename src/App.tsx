import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PlaceholderPage from "./pages/PlaceholderPage";
import HistoryPage from "./pages/HistoryPage";
import BannerPage from "./pages/BannerPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/banner" element={<BannerPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/culture" element={<PlaceholderPage />} />
          <Route path="/person" element={<PlaceholderPage />} />
          <Route path="/students" element={<PlaceholderPage />} />
          <Route path="/tourist" element={<PlaceholderPage />} />
          <Route path="/institute" element={<PlaceholderPage />} />
          <Route path="/organization" element={<PlaceholderPage />} />
          <Route path="/blog" element={<PlaceholderPage />} />
          <Route path="/user" element={<PlaceholderPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
