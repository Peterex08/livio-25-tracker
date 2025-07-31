import { HeroSection } from "@/components/HeroSection";
import { VirusReport } from "@/components/VirusReport";
import { ReportsSection } from "@/components/ReportsSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Report Form Section */}
      <div id="report-section">
        <VirusReport />
      </div>
      
      {/* Reports Display Section */}
      <ReportsSection />
    </div>
  );
};

export default Index;
