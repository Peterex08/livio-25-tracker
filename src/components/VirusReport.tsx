import { useState } from "react";
import { supabase } from "@/integrations/supabase/client.ts"; // Descomente quando Supabase estiver configurado
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Zap, Users, AlertTriangle } from "lucide-react";

interface ReportData {
  name: string;
  course: string;
  symptoms: string;
  date: string;
}

// Email do Lívio - constante para onde os emails serão enviados
const LIVIO_EMAIL = "hshaggggiiutjj@gmail.com"; // Substitua pelo email real do Lívio

export const VirusReport = () => {
  const [formData, setFormData] = useState<ReportData>({
    name: "",
    course: "",
    symptoms: "",
    date: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.course || !formData.symptoms) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Store the report data in localStorage for now
      const reports = JSON.parse(localStorage.getItem("livio25Reports") || "[]");
      const newReport = {
        ...formData,
        id: Date.now(),
        reportDate: new Date().toISOString()
      };
      reports.push(newReport);
      localStorage.setItem("livio25Reports", JSON.stringify(reports));

      // Send email notification via Supabase Edge Function
      // Descomente quando Supabase estiver configurado:
      
      try {
        const { data, error } = await supabase.functions.invoke('send-email', {
          body: {
            to: LIVIO_EMAIL,
            subject: `🦠 Nova vítima do Lívio25: ${formData.name}`,
            reportData: newReport
          }
        });

        if (error) {
          console.error("Erro ao enviar email:", error);
        } else {
          console.log("Email enviado com sucesso!", data);
        }
      } catch (error) {
        console.error("Erro ao enviar email:", error);
      }

      toast({
        title: "Relatório enviado! 🦠",
        description: "Sua experiência com o Lívio25 foi registrada com sucesso",
      });

      // Reset form
      setFormData({
        name: "",
        course: "",
        symptoms: "",
        date: ""
      });

      // Dispatch custom event to refresh reports
      window.dispatchEvent(new Event("reportSubmitted"));

    } catch (error) {
      toast({
        title: "Erro",
        description: "Houve um problema ao enviar seu relatório",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 px-4 bg-danger-bg">
      <div className="max-w-2xl mx-auto">
        <Card className="p-8 shadow-[var(--shadow-card)] border-virus-red/20">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-4 rounded-full bg-gradient-to-r from-virus-red to-virus-orange">
                <AlertTriangle className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-virus-red mb-2">
              Reporte sua infecção
            </h2>
            <p className="text-muted-foreground">
              Conte sua experiência como vítima do Lívio25
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name" className="text-foreground font-medium">
                Seu nome *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Como você se chama?"
                className="mt-2"
                required
              />
            </div>

            <div>
              <Label htmlFor="course" className="text-foreground font-medium">
                Seu curso *
              </Label>
              <Input
                id="course"
                value={formData.course}
                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                placeholder="Qual seu curso na universidade?"
                className="mt-2"
                required
              />
            </div>

            <div>
              <Label htmlFor="date" className="text-foreground font-medium">
                Quando foi infectado?
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="symptoms" className="text-foreground font-medium">
                Descreva seus "sintomas" *
              </Label>
              <Textarea
                id="symptoms"
                value={formData.symptoms}
                onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                placeholder="Como foi sua experiência? O que aconteceu quando foi infectado pelo Lívio25?"
                className="mt-2 min-h-[120px]"
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-virus-red to-virus-orange hover:from-virus-red/90 hover:to-virus-orange/90 text-white font-medium py-3"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Reportar Infecção 🦠"}
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
};