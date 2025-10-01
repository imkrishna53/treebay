import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CheckCircle, Download, Mail } from 'lucide-react';
import { Link } from 'wouter';

interface ServiceFeature {
  title: string;
  description: string;
}

interface ServiceApplication {
  title: string;
  description: string;
  industries: string[];
}

interface ServicePageProps {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  chemicalFormula?: string;
  features: ServiceFeature[];
  applications: ServiceApplication[];
  specifications: { [key: string]: string };
  benefits: string[];
}

export default function ServicePage({
  title,
  subtitle,
  description,
  image,
  chemicalFormula,
  features,
  applications,
  specifications,
  benefits
}: ServicePageProps) {
  return (
    <div className="pt-16">
      {/* Navigation */}
      <div className="bg-muted/30 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Services
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {chemicalFormula && (
                <Badge variant="secondary" className="text-sm font-mono">
                  {chemicalFormula}
                </Badge>
              )}
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                {title}
              </h1>
              <p className="text-xl text-primary font-medium">{subtitle}</p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
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
              <img 
                src={image} 
                alt={`${title} production facility`}
                className="w-full h-80 object-cover rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Key Features & Benefits</h2>
            <p className="text-lg text-muted-foreground">
              Discover what makes our {title.toLowerCase()} solutions industry-leading
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover-elevate">
                <CardHeader>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
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

      {/* Applications Section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Applications & Industries</h2>
            <p className="text-lg text-muted-foreground">
              Versatile solutions across multiple sectors
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {applications.map((application, index) => (
              <Card key={index} className="hover-elevate">
                <CardHeader>
                  <CardTitle className="text-xl">{application.title}</CardTitle>
                  <CardDescription className="text-base">
                    {application.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Industries:</p>
                    <div className="flex flex-wrap gap-2">
                      {application.industries.map((industry, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {industry}
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

      {/* Specifications & Benefits */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Technical Specifications */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-8">Technical Specifications</h2>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {Object.entries(specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center py-2 border-b border-border last:border-b-0">
                        <span className="font-medium text-foreground">{key}</span>
                        <span className="text-muted-foreground font-mono text-sm">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Key Benefits */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-8">Why Choose Our {title}?</h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-muted-foreground">{benefit}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link href="/contact">
                  <Button size="lg" className="w-full sm:w-auto" data-testid="button-discuss-requirements">
                    Discuss Your Requirements
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}