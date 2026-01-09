import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Portal from "@/pages/Portal";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import SharedAccess from "@/pages/SharedAccess";
import PitchPage from "@/pages/PitchPage";
import RoadmapPage from "@/pages/RoadmapPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/portal" component={Portal} />
      <Route path="/shared-access/:token" component={SharedAccess} />
      <Route path="/pitch/:token" component={PitchPage} />
      <Route path="/roadmap/:token" component={RoadmapPage} />
      <Route path="/login" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/dashboard/leads" component={Dashboard} />
      <Route path="/dashboard/campaigns" component={Dashboard} />
      <Route path="/dashboard/social" component={Dashboard} />
      <Route path="/dashboard/settings" component={Dashboard} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
