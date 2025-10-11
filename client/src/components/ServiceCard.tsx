import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'wouter';
import { useEffect, useState } from 'react';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

interface ServiceCardProps {
  title: string;
  description: string;
  features: string[];
  image: string;
  path: string;
  badge?: string;
}

export default function ServiceCard({ 
  title, 
  description, 
  features, 
  image, 
  path, 
  badge 
}: ServiceCardProps) {
  
const baseUrl = apiBaseUrl + '/' + image;
  return (
    <Card className="group hover-elevate transition-all duration-300 overflow-hidden">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={baseUrl}
          alt={`${title} facility`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent"></div>
        {badge && (
          <div className="absolute top-4 right-4">
            <Badge variant="secondary" className="bg-primary/90 text-primary-foreground">
              {badge}
            </Badge>
          </div>
        )}
      </div>

      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-xl font-bold">{title}</span>
        </CardTitle>
        <CardDescription className="text-base">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Features */}
        <div className="space-y-2">
          {features && features.slice(0, 3).map((feature, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
              <span className="text-muted-foreground">{feature}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="pt-2">
          <Link href={path}>
            <Button className="w-full group" data-testid={`button-learn-more-${title.toLowerCase().replace(' ', '-')}`}>
              Learn More
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}