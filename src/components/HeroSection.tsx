import { Button } from "@/components/ui/button";
import { Zap, AlertTriangle, TrendingUp } from "lucide-react";
import doenca from "@/../public/doença.jpg"

export const HeroSection = () => {
  const scrollToReport = () => {
    const reportSection = document.getElementById('report-section');
    if (reportSection) {
      reportSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-danger-bg via-background to-warning-bg">
      <div className="max-w-4xl mx-auto text-center">
        {/* Virus Icon Animation */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="animate-pulse p-6 rounded-full bg-gradient-to-r from-virus-red to-virus-orange shadow-[var(--shadow-virus)]">
              <Zap className="h-16 w-16 text-white" />
            </div>
            <div className="absolute -top-2 -right-2">
              <AlertTriangle className="h-8 w-8 text-virus-yellow animate-bounce" />
            </div>
          </div>
        </div>

        <div className="w-1/2">
          <img 
            src= {doenca}
            alt="Doente do Lívio25" 
            className="w-full h-auto" 
          />
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-virus-red via-virus-orange to-virus-yellow bg-clip-text text-transparent">
          Você foi uma vítima do Lívio25?
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          <strong className="text-virus-red">Avise aqui o Lívio</strong> que você foi infectado pela doença dele!
        </p>

        {/* Warning Box */}
        <div className="bg-virus-red/10 border border-virus-red/20 rounded-lg p-6 mb-8 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-3">
            <TrendingUp className="h-6 w-6 text-virus-red" />
            <span className="font-semibold text-virus-red">ALERTA EPIDEMIOLÓGICO</span>
          </div>
          <p className="text-sm text-foreground">
            O vírus Lívio25 está se espalhando rapidamente pela universidade. 
            Se você teve contato próximo com o paciente zero, reporte sua condição imediatamente!
          </p>
        </div>

        {/* CTA Button */}
        <Button 
          onClick={scrollToReport}
          className="bg-gradient-to-r from-virus-red to-virus-orange hover:from-virus-red/90 hover:to-virus-orange/90 text-white font-bold px-8 py-4 text-lg rounded-lg shadow-[var(--shadow-virus)] transition-all duration-300 hover:scale-105"
        >
          Reportar Infecção 🦠
        </Button>

        {/* Scroll Indicator */}
        <div className="mt-16 animate-bounce">
          <div className="w-1 h-16 bg-gradient-to-b from-virus-orange to-transparent mx-auto rounded-full"></div>
        </div>
      </div>
    </section>
  );
};