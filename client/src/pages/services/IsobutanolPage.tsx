import Navigation from '@/components/Navigation';
import ServicePage from '@/components/ServicePage';
import Footer from '@/components/Footer';
import isobutanolImage from '@assets/generated_images/Isobutanol_processing_plant_9389e9c0.png';

export default function IsobutanolPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <ServicePage
        title="Isobutanol"
        subtitle="Advanced Isobutanol for Specialty Applications"
        description="Our premium isobutanol offers superior performance characteristics for specialty chemical applications, advanced coatings, and next-generation biofuels with exceptional quality and consistency."
        image={isobutanolImage}
        chemicalFormula="(CH₃)₂CHCH₂OH"
        features={[
          {
            title: "Superior Solvent Properties",
            description: "Excellent solvency power with unique chemical properties ideal for high-performance applications."
          },
          {
            title: "Low Volatility",
            description: "Controlled evaporation rates provide better process control and reduced emissions in applications."
          },
          {
            title: "High Purity Grade",
            description: "Manufactured to exceed industry standards with minimal impurities for critical applications."
          },
          {
            title: "Chemical Stability",
            description: "Excellent stability under various conditions ensures reliable performance in demanding applications."
          },
          {
            title: "Versatile Applications",
            description: "Suitable for use in coatings, adhesives, fuel additives, and specialty chemical synthesis."
          },
          {
            title: "Environmental Benefits",
            description: "Lower toxicity and improved biodegradability compared to traditional solvents."
          }
        ]}
        applications={[
          {
            title: "Specialty Coatings",
            description: "Premium solvent for high-performance coatings, lacquers, and surface treatments requiring superior finish quality.",
            industries: ["Automotive", "Aerospace", "Industrial Coatings", "Furniture"]
          },
          {
            title: "Advanced Biofuels",
            description: "Next-generation biofuel component with superior combustion characteristics and reduced emissions.",
            industries: ["Transportation", "Aviation", "Marine", "Power Generation"]
          },
          {
            title: "Chemical Synthesis",
            description: "Intermediate and solvent for pharmaceutical, agrochemical, and specialty chemical manufacturing.",
            industries: ["Pharmaceuticals", "Agrochemicals", "Fine Chemicals", "Research"]
          }
        ]}
        specifications={{
          "Purity": "99.0% - 99.5%",
          "Water Content": "< 0.2%",
          "Density": "0.802 g/mL at 20°C",
          "Boiling Point": "107.9°C",
          "Flash Point": "28°C",
          "Viscosity": "4.0 mPa·s at 20°C",
          "Acidity": "< 0.01%",
          "Packaging": "Drums, IBC Totes, Bulk"
        }}
        benefits={[
          "Enhanced performance characteristics over traditional butanol",
          "Reduced environmental impact with better biodegradability",
          "Consistent quality with rigorous batch testing and quality control",
          "Flexible supply chain with reliable delivery schedules",
          "Technical expertise and application development support",
          "Competitive pricing for both spot and contract purchases",
          "Regulatory compliance with international chemical standards",
          "Custom packaging and logistics solutions available"
        ]}
      />
      <Footer />
    </div>
  );
}