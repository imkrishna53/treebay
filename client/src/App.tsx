import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import EthanolPage from "@/pages/services/EthanolPage";
import IsobutanolPage from "@/pages/services/IsobutanolPage";
import HydrogenPage from "@/pages/services/HydrogenPage";
import BiogasPage from "@/pages/services/BiogasPage";
import ContactPage from "@/pages/ContactPage";
import NotFound from "@/pages/not-found";
import AboutPage from "./pages/AboutPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services/ethanol" component={EthanolPage} />
      <Route path="/services/isobutanol" component={IsobutanolPage} />
      <Route path="/services/hydrogen" component={HydrogenPage} />
      <Route path="/services/biogas" component={BiogasPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/aboutus" component={AboutPage} />
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