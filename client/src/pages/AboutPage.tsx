import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import About from '@/components/About';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
       <div className="pt-16">
          <About />
        </div>
      <Footer />
    </div>
  );
}