import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/Navbar";
import Landing from "./pages/Landing";
import Assessment from "./pages/Assessment";
import Results from "./pages/Results";
import Explore from "./pages/Explore";
import CountryDetails from "./pages/CountryDetails";
import Compare from "./pages/Compare";
import VisaPathways from "./pages/VisaPathways";
import CostExplorer from "./pages/CostExplorer";
import AIAdvisor from "./pages/AIAdvisor";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/results" element={<Results />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/country/:id" element={<CountryDetails />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/visa-pathways" element={<VisaPathways />} />
          <Route path="/cost-explorer" element={<CostExplorer />} />
          <Route path="/ai-advisor" element={<AIAdvisor />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
