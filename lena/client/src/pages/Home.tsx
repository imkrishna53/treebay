import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import ServicesOverview from '@/components/ServicesOverview';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <ServicesOverview />
      <Contact />
      <Footer />
    </div>
  );
}