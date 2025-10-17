import Navigation from '@/components/Navigation';
import ServicePage from '@/components/ServicePage';
import Footer from '@/components/Footer';
import biogasImage from '@assets/generated_images/Biogas_production_facility_18317fab.png';

export default function BiogasPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <ServicePage
        title="Biogas (FAME)"
        subtitle="Sustainable Biodiesel from Renewable Sources"
        description="Premium Fatty Acid Methyl Ester (FAME) biodiesel produced from renewable feedstocks, offering sustainable transportation fuel solutions with excellent performance characteristics and environmental benefits."
        image={biogasImage}
        chemicalFormula="R-COOCH₃"
        features={[
          {
            title: "Renewable Feedstock",
            description: "Produced from sustainable sources including waste oils, agricultural residues, and dedicated energy crops."
          },
          {
            title: "High Conversion Efficiency",
            description: "Advanced production processes achieving maximum yield and optimal fuel quality from raw materials."
          },
          {
            title: "Carbon Neutral",
            description: "Closed-loop carbon cycle providing significant greenhouse gas emissions reduction compared to fossil fuels."
          },
          {
            title: "Engine Compatibility",
            description: "Fully compatible with existing diesel engines and fuel systems without modifications required."
          },
          {
            title: "Quality Specifications",
            description: "Meets or exceeds international biodiesel standards including ASTM D6751 and EN 14214."
          },
          {
            title: "Supply Flexibility",
            description: "Available in various blend ratios from B5 to B100 to meet specific application requirements."
          }
        ]}
        applications={[
          {
            title: "Transportation Fuel",
            description: "Clean-burning diesel substitute for automotive, commercial vehicles, and public transportation fleets.",
            industries: ["Automotive", "Trucking", "Public Transit", "Delivery Services"]
          },
          {
            title: "Marine Applications",
            description: "Sustainable fuel solutions for shipping, fishing vessels, and recreational marine applications.",
            industries: ["Shipping", "Fishing", "Marine Transport", "Recreation"]
          },
          {
            title: "Industrial Power",
            description: "Backup power generation, industrial equipment, and off-grid power solutions with reduced emissions.",
            industries: ["Power Generation", "Construction", "Mining", "Agriculture"]
          }
        ]}
        specifications={{
          "Ester Content": "> 96.5%",
          "Density": "0.86-0.90 g/mL at 15°C",
          "Viscosity": "3.5-5.0 mm²/s at 40°C",
          "Flash Point": "> 120°C",
          "Sulfur Content": "< 10 mg/kg",
          "Water Content": "< 500 mg/kg",
          "Acid Value": "< 0.5 mg KOH/g",
          "Blend Ratios": "B5, B20, B100"
        }}
        benefits={[
          "Significant reduction in greenhouse gas emissions up to 80%",
          "Improved engine performance with enhanced lubrication properties",
          "Renewable and sustainable fuel source reducing fossil fuel dependence",
          "Local production capabilities supporting energy independence",
          "Compatible with existing fuel infrastructure and equipment",
          "Competitive pricing with stable supply chain management",
          "Biodegradable and non-toxic reducing environmental risks",
          "Government incentives and renewable fuel standards support"
        ]}
      />
      <Footer />
    </div>
  );
}