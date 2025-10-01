import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Beaker, Zap, Leaf, Droplets } from 'lucide-react';
import { Link } from 'wouter';
import heroImage from '@assets/generated_images/Chemistry_lab_hero_background_86ba8fa9.png';

const features = [
  { icon: Beaker, text: 'Premium Chemical Solutions' },
  { icon: Zap, text: 'Advanced Energy Technology' },
  { icon: Leaf, text: 'Sustainable Processes' },
  { icon: Droplets, text: 'Industry Leading Quality' }
];

export default function Hero() {
  const [currentFeature, setCurrentFeature] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature(prev => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Modern chemistry laboratory" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/30"></div>
      </div>

      {/* Floating Molecules Animation */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full animate-pulse"
            style={{
              left: `${20 + (i * 15)}%`,
              top: `${30 + (i * 8)}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: '4s'
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Main Headline */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
              Leading the Future of
              <span className="text-primary block">Chemical Innovation</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Delivering premium chemical services and sustainable energy solutions 
              for industrial applications worldwide. Quality, innovation, and sustainability 
              at the forefront of everything we do.
            </p>
          </div>

          {/* Animated Features */}
          <div className="flex items-center justify-center space-x-2 text-primary">
            {(() => {
              const IconComponent = features[currentFeature].icon;
              return <IconComponent className="h-6 w-6" />;
            })()}
            <span className="text-lg font-medium transition-all duration-500">
              {features[currentFeature].text}
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/services/ethanol">
              <Button size="lg" className="group" data-testid="button-explore-services">
                Explore Our Services
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" data-testid="button-get-quote">
                Get a Quote
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 border-t border-border/30">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">15+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">99.8%</div>
              <div className="text-sm text-muted-foreground">Quality Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">Support Available</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}