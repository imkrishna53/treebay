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
import { AdminLogin, Dashboard, EditService, Services } from "./admin";

  import { Routes, Route } from "react-router-dom";
import ServicePage from "./components/ServicePage";
import ServicesList from "./components/ServicesList";
import ServicesListAdmin from "./admin/pages/ServicesListAdmin";
import CreateService from "./admin/pages/CreateService";
import Query from "./admin/pages/Contact";
import CreateOurServices from "./admin/pages/CreateOurServices";
import NewOurServices from "./admin/pages/NewOurServices";
import HomeEdit from "./admin/pages/HomeEdit";

function Router() {

return (
  <Routes>
    <Route path="/" element={<Home />} />
    {/* <Route path="/services/ethanol" element={<EthanolPage />} />
    <Route path="/services/isobutanol" element={<IsobutanolPage />} />
    <Route path="/services/hydrogen" element={<HydrogenPage />} />
    <Route path="/services/biogas" element={<BiogasPage />} /> */}
      <Route path="/services" element={<ServicesList/>} />
        <Route path="/services/:serviceSlug" element={<ServicePage />} />
    <Route path="/contact" element={<ContactPage />} />
    <Route path="/aboutus" element={<AboutPage />} />

    {/* Admin Routes */}
    <Route path="/admin/login" element={<AdminLogin />} />
    <Route path="/admin/dashboard" element={<Dashboard />} />
<Route path="/admin/services" element={<ServicesListAdmin />} />
<Route path="/admin/services/new" element={<CreateService />} />
<Route path="/admin/services/edit/:id" element={<EditService />} />
<Route path="/admin/contact" element={<Query />} />
<Route path="/admin/create/our-services" element={< CreateOurServices/>} />
<Route path="/admin/our-services" element={< NewOurServices/>} />
<Route path="/admin/home" element={< HomeEdit/>} />

    {/* 404 fallback */}
    <Route path="*" element={<NotFound />} />
  </Routes>
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