import Navigation from '@/components/Navigation';
import ServicePage from '@/components/ServicePage';
import Footer from '@/components/Footer';
import hydrogenImage from '@assets/generated_images/Hydrogen_energy_facility_6f96d236.png';

export default function HydrogenPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <ServicePage
        title="Hydrogen Energy"
        subtitle="Clean Hydrogen Solutions for the Future"
        description="Leading the renewable energy revolution with high-purity hydrogen production, fuel cell technology, and comprehensive energy solutions for industrial and transportation applications."
        image={hydrogenImage}
        chemicalFormula="H₂"
        features={[
          {
            title: "Green Hydrogen Production",
            description: "Produced using renewable energy sources through advanced electrolysis technology for zero-carbon footprint."
          },
          {
            title: "Fuel Cell Grade Purity",
            description: "Ultra-high purity hydrogen meeting strict fuel cell specifications for optimal performance and longevity."
          },
          {
            title: "Scalable Solutions",
            description: "From small-scale applications to industrial deployment with flexible production and delivery options."
          },
          {
            title: "Advanced Storage",
            description: "State-of-the-art storage and compression systems ensuring safe and efficient hydrogen handling."
          },
          {
            title: "Integration Support",
            description: "Complete system integration services including infrastructure planning and implementation."
          },
          {
            title: "Safety Excellence",
            description: "Industry-leading safety protocols and equipment ensuring secure hydrogen operations."
          }
        ]}
        applications={[
          {
            title: "Fuel Cell Vehicles",
            description: "High-purity hydrogen fuel for automotive, bus, truck, and maritime fuel cell applications.",
            industries: ["Automotive", "Public Transport", "Logistics", "Maritime"]
          },
          {
            title: "Industrial Processes",
            description: "Process gas for refineries, chemical production, metal processing, and manufacturing applications.",
            industries: ["Refining", "Steel Production", "Electronics", "Glass Manufacturing"]
          },
          {
            title: "Energy Storage",
            description: "Large-scale energy storage solutions for renewable energy integration and grid stabilization.",
            industries: ["Utilities", "Renewable Energy", "Grid Operators", "Data Centers"]
          }
        ]}
        specifications={{
          "Purity": "99.97% - 99.999%",
          "Moisture Content": "< 5 ppm",
          "Oxygen Content": "< 2 ppm",
          "Nitrogen Content": "< 100 ppm",
          "CO Content": "< 0.2 ppm",
          "CO₂ Content": "< 2 ppm",
          "Delivery Pressure": "350 - 700 bar",
          "Supply Methods": "Tube Trailers, Pipeline, On-site"
        }}
        benefits={[
          "Zero-emission energy solution supporting decarbonization goals",
          "High energy density providing efficient power storage and delivery",
          "Renewable production methods using clean energy sources",
          "Versatile applications across multiple industries and sectors",
          "Proven technology with established safety and handling protocols",
          "Growing infrastructure support and government incentives",
          "Long-term cost competitiveness as technology scales",
          "Complete lifecycle support from production to end-use applications"
        ]}
      />
      <Footer />
    </div>
  );
}