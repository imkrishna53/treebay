import Navigation from '@/components/Navigation';
import ServicePage from '@/components/ServicePage';
import Footer from '@/components/Footer';
import ethanolImage from '@assets/generated_images/Ethanol_production_facility_c316fee7.png';

export default function EthanolPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <ServicePage
        title="Ethanol"
        subtitle="Premium Industrial Grade Ethanol Solutions"
        description="Our high-purity ethanol is produced using advanced distillation processes and sustainable feedstocks, meeting the strictest quality standards for industrial, pharmaceutical, and fuel applications."
        image={ethanolImage}
        chemicalFormula="C₂H₅OH"
        features={[
          {
            title: "Ultra-High Purity",
            description: "Achieve purity levels up to 99.9% with our advanced distillation technology and quality control systems."
          },
          {
            title: "Sustainable Production",
            description: "Manufactured using renewable feedstocks and environmentally responsible processes to minimize carbon footprint."
          },
          {
            title: "Flexible Volumes",
            description: "From laboratory quantities to industrial scale, we provide flexible volume solutions to meet your specific needs."
          },
          {
            title: "Quality Assurance",
            description: "Every batch undergoes rigorous testing and quality control to ensure consistent product specifications."
          },
          {
            title: "Fast Delivery",
            description: "Streamlined production and logistics ensure quick turnaround times for your ethanol requirements."
          },
          {
            title: "Technical Support",
            description: "Our expert team provides comprehensive technical support and custom formulation assistance."
          }
        ]}
        applications={[
          {
            title: "Industrial Solvent",
            description: "Used as a versatile solvent in manufacturing processes, cleaning applications, and chemical synthesis.",
            industries: ["Manufacturing", "Pharmaceuticals", "Cosmetics", "Electronics"]
          },
          {
            title: "Fuel Blending",
            description: "Premium ethanol for gasoline blending and biofuel applications in the transportation sector.",
            industries: ["Automotive", "Aviation", "Marine", "Agriculture"]
          },
          {
            title: "Food & Beverage",
            description: "Food-grade ethanol for extraction processes, flavor compounds, and beverage production.",
            industries: ["Food Processing", "Beverage", "Flavor & Fragrance", "Nutraceuticals"]
          }
        ]}
        specifications={{
          "Purity": "99.5% - 99.9%",
          "Water Content": "< 0.1%",
          "Methanol Content": "< 50 ppm",
          "Acidity": "< 0.007%",
          "Density": "0.789 g/mL at 20°C",
          "Boiling Point": "78.37°C",
          "Flash Point": "13°C",
          "Packaging": "Drums, Totes, Bulk Transport"
        }}
        benefits={[
          "Consistent quality and purity levels across all batches",
          "Sustainable production methods reducing environmental impact",
          "Flexible delivery options including bulk transport and packaged solutions",
          "Technical support and custom specifications available",
          "Compliant with international quality standards and regulations",
          "Competitive pricing with volume discounts available",
          "24/7 customer support and emergency delivery services",
          "Comprehensive documentation and certificates of analysis"
        ]}
      />
      <Footer />
    </div>
  );
}