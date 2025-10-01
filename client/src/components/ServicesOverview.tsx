import ServiceCard from './ServiceCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import ethanolImage from '@assets/generated_images/Ethanol_production_facility_c316fee7.png';
import isobutanolImage from '@assets/generated_images/Isobutanol_processing_plant_9389e9c0.png';
import hydrogenImage from '@assets/generated_images/Hydrogen_energy_facility_6f96d236.png';
import biogasImage from '@assets/generated_images/Biogas_production_facility_18317fab.png';

const services = [
  {
    title: 'Ethanol',
    description: 'High-purity ethanol production for industrial applications, pharmaceuticals, and fuel blending with sustainable manufacturing processes.',
    features: [
      'Purity levels up to 99.9%',
      'Food-grade and industrial grades',
      'Sustainable production methods',
      'Custom volume solutions'
    ],
    image: ethanolImage,
    path: '/services/ethanol',
    badge: 'Most Popular'
  },
  {
    title: 'Isobutanol',
    description: 'Advanced isobutanol solutions for specialty chemical applications, coatings, and next-generation biofuels with superior performance.',
    features: [
      'High-performance solvent properties',
      'Low volatility formulations',
      'Enhanced fuel additives',
      'Industrial coating applications'
    ],
    image: isobutanolImage,
    path: '/services/isobutanol'
  },
  {
    title: 'Hydrogen Energy',
    description: 'Clean hydrogen production and fuel cell technology solutions driving the renewable energy revolution for a sustainable future.',
    features: [
      'Green hydrogen production',
      'Fuel cell grade purity',
      'Storage and transport solutions',
      'Industrial scale deployment'
    ],
    image: hydrogenImage,
    path: '/services/hydrogen',
    badge: 'Eco-Friendly'
  },
  {
    title: 'Biogas (FAME)',
    description: 'Fatty Acid Methyl Ester production from renewable feedstocks creating sustainable biodiesel solutions for transportation.',
    features: [
      'Renewable feedstock sourcing',
      'High conversion efficiency',
      'B100 and blend solutions',
      'Carbon neutral production'
    ],
    image: biogasImage,
    path: '/services/biogas'
  }
];

export default function ServicesOverview() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Our Services
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Comprehensive Chemical Solutions
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We specialize in four key areas of chemical production and renewable energy, 
            delivering the highest quality products with sustainable practices.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <ServiceCard {...service} />
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4">
            <p className="text-muted-foreground">
              Need a custom solution or have questions about our services?
            </p>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="group" data-testid="button-contact-us">
                Contact Our Experts
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}