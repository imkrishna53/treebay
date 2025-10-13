import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Beaker, Zap, Leaf, Droplets } from 'lucide-react';
import { Link } from 'wouter';
import heroImage from '@assets/generated_images/Chemistry_lab_hero_background_86ba8fa9.png';
import { motion } from 'framer-motion';
import axios from "axios";
import TypedText from './TypedText';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const API_URL = `${apiBaseUrl}/api/home`;


const features = [
  { icon: Beaker, text: 'Premium Chemical Solutions' },
  { icon: Zap, text: 'Advanced Energy Technology' },
  { icon: Leaf, text: 'Sustainable Processes' },
  { icon: Droplets, text: 'Industry Leading Quality' }
];


export default function Hero() {

  const [currentFeature, setCurrentFeature] = useState(0);
  const [heroDescription, setHeroDescription] = useState("");
  const [heroyearsExperience, setYearsExperience] = useState("");
  const [heroprojectsCompleted, setProjectCompleted] = useState("");
  const [heroqualityRating, setQualityRating] = useState("");
  const [error, setError] = useState("");
  const [loader, setLoading] = useState(true);
  useEffect(() => {
    const fetchHeader = async () => {
      try {
        const { data } = await axios.get(API_URL);
        // alert(`ff ${data.description}`); 
        setHeroDescription(data.description || "");
        setYearsExperience(data.yearsExperience || "");
        setProjectCompleted(data.projectsCompleted || "");
        setQualityRating(data.qualityRating || "");
      } catch (error) {
        console.error(error);
        setError("Failed to fetch current header description");
      } finally {
        setLoading(false);
      }
    };
    fetchHeader();
  }, []);
 const strings = [
    'Innovation...',
    'Solution...',
    'Sustainability...',
    'Excellence...'
  ];
  const strings_2 = [
    'Process research...',
    'Equipment Design...'
  ];
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
          <motion.div 
            initial={{ opacity: 0, y: -50 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1 }}
            className="space-y-4"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
              Leading the Future of
              <span className="text-primary block">
              <TypedText id="typed-text" strings={strings} />
            </span>
            </h1>
            <h2 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
              <span className="text-primary block">
              <TypedText id="typed-text" strings={strings_2} />
            </span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              {heroDescription}
              {/* Delivering premium chemical services and sustainable energy solutions 
              for industrial applications worldwide. Quality, innovation, and sustainability 
              at the forefront of everything we do. */}
            </p>
            
          </motion.div>

          {/* Animated Features */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 1.2 }}
            className="flex items-center justify-center space-x-2 text-primary"
          >
            {(() => {
              const IconComponent = features[currentFeature].icon;
              return <IconComponent className="h-6 w-6" />;
            })()}
            <span className="text-lg font-medium transition-all duration-500">
              {features[currentFeature].text}
            </span>
          </motion.div>

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

          {/* Stats with Fade-In Animation */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 1.5, delay: 1.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 border-t border-border/30"
          >
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">{heroyearsExperience}</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">{heroprojectsCompleted}</div>
              <div className="text-sm text-muted-foreground">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">{heroqualityRating}</div>
              <div className="text-sm text-muted-foreground">Quality Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">Support Available</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
