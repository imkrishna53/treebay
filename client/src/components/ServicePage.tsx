import { useEffect, useState } from 'react';
import { useRoute } from 'wouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CheckCircle, Download, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

interface ServiceFeature {
  title: string;
  description: string;
}

interface ServiceApplication {
  title: string;
  description: string;
  features: string[];
}

interface TechnicalSpecification {
  name: string;
  value: string;
}

interface ServiceData {
  title: string;
  description: string;
  heroDescription: string;
  image: string;
  keyFeaturesDescription: string;
  keyFeatures: ServiceFeature[];
  applicationsDescription: string;
  applications: ServiceApplication[];
  technicalSpecifications: TechnicalSpecification[];
  whyChooseUs: string[];
}

export default function ServicePage() {
  const [match, params] = useRoute('/services/:serviceSlug');
  const [service, setService] = useState<ServiceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params?.serviceSlug) {
      fetchServiceData(params.serviceSlug);
    }
  }, [params?.serviceSlug]);

  const fetchServiceData = async (slug: string) => {
    try {
      setLoading(true);
      const response = await fetch(`${apiBaseUrl}/api/services/slug/${slug}`);
      if (!response.ok) {
        throw new Error('Service not found');
      }
      const serviceData = await response.json();
      setService(serviceData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load service');
    } finally {
      setLoading(false);
    }
  };

  // Function to get the correct image URL
  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return '';
    
    // If it's already a full URL, return as is
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // If it's a relative path starting with /uploads, prepend the backend URL
    if (imagePath.startsWith('/uploads/')) {
      return `${apiBaseUrl}/${imagePath}`;
    }
    
    // If it's just a filename, construct the full path
    return `${apiBaseUrl}/uploads/services/${imagePath}`;
  };

  if (loading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading service...</p>
        </div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Service Not Found</h1>
          <p className="text-muted-foreground mb-6">{error || 'The requested service could not be found.'}</p>
          <Link to="/services">
            <Button>
              Back to Services
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const {
    title,
    description,
    heroDescription,
    image,
    keyFeaturesDescription,
    keyFeatures,
    applicationsDescription,
    applications,
    technicalSpecifications,
    whyChooseUs
  } = service;

  // Get the correct image URL
  const imageUrl = getImageUrl(image);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-16">
        {/* Navigation */}
        <div className="bg-muted/30 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link to="/services" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Services
            </Link>
          </div>
        </div>

        {/* Hero Section - UPDATED WITH CORRECT IMAGE URL */}
        <section className="py-24 bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                  {title}
                </h1>
                <p className="text-xl text-primary font-medium">{description}</p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {heroDescription}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/contact">
                    <Button size="lg" data-testid="button-get-quote-service">
                      Get a Quote
                      <Mail className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Button variant="outline" size="lg" data-testid="button-download-specs">
                    Download Specs
                    <Download className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="relative">
                {imageUrl ? (
                  <img 
                    src={imageUrl} 
                    alt={`${title} production facility`}
                    className="w-full h-80 object-cover rounded-lg shadow-lg"
                    onError={(e) => {
                      // If image fails to load, show fallback
                      console.error('Image failed to load:', imageUrl);
                      e.target.style.display = 'none';
                      const fallback = e.target.nextElementSibling;
                      if (fallback) {
                        fallback.style.display = 'flex';
                      }
                    }}
                    onLoad={(e) => {
                      // Image loaded successfully, hide fallback
                      const fallback = e.target.nextElementSibling;
                      if (fallback) {
                        fallback.style.display = 'none';
                      }
                    }}
                  />
                ) : null}
                <div 
                  className={`w-full h-80 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg shadow-lg flex items-center justify-center ${
                    imageUrl ? 'absolute inset-0' : 'relative'
                  }`}
                  style={{ display: imageUrl ? 'none' : 'flex' }}
                >
                  <div className="text-center text-muted-foreground">
                    <div className="text-6xl mb-4">⚗️</div>
                    <p className="text-lg font-medium">{title} Solution</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent rounded-lg"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features & Benefits Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">Key Features & Benefits</h2>
              {keyFeaturesDescription && (
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  {keyFeaturesDescription}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {keyFeatures.map((feature, index) => (
                <Card key={index} className="hover-elevate border-l-4 border-l-primary">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Applications & Industries Section */}
        <section className="py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">Applications & Industries</h2>
              {applicationsDescription && (
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  {applicationsDescription}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {applications.map((application, index) => (
                <Card key={index} className="hover-elevate">
                  <CardHeader>
                    <CardTitle className="text-xl">{application.title}</CardTitle>
                    <CardDescription className="text-base">
                      {application.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm font-medium text-muted-foreground">Key Features:</p>
                      <div className="grid grid-cols-2 gap-2">
                        {application.features.map((feature, i) => (
                          <Badge 
                            key={i} 
                            variant="outline" 
                            className="text-xs justify-center py-1.5 bg-background/50"
                          >
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Specifications & Why Choose Us */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Technical Specifications */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-8">Technical Specifications</h2>
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {technicalSpecifications.map((spec, index) => (
                        <div 
                          key={index} 
                          className="flex justify-between items-center py-3 border-b border-border last:border-b-0"
                        >
                          <span className="font-medium text-foreground">{spec.name}</span>
                          <span className="text-muted-foreground font-mono text-sm bg-muted/50 px-2 py-1 rounded">
                            {spec.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Why Choose Us */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-8">Why Choose Our {title}?</h2>
                <div className="space-y-4">
                  {whyChooseUs.map((point, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-muted-foreground">{point}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <Link to="/contact">
                    <Button size="lg" className="w-full sm:w-auto" data-testid="button-discuss-requirements">
                      Discuss Your Requirements
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Contact our team today to discuss your specific requirements and discover how our {title.toLowerCase()} solutions can benefit your operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" variant="secondary" className="min-w-48">
                  Contact Sales
                </Button>
              </Link>
              <Link to="/samples">
                <Button size="lg" variant="outline" className="min-w-48 bg-transparent border-white text-white hover:bg-white hover:text-primary">
                  Request Sample
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}