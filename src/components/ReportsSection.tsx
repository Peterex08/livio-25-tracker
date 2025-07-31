import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, GraduationCap } from "lucide-react";

interface Report {
  id: number;
  name: string;
  course: string;
  symptoms: string;
  date: string;
  reportDate: string;
}

export const ReportsSection = () => {
  const [reports, setReports] = useState<Report[]>([]);

  const loadReports = () => {
    const storedReports = JSON.parse(localStorage.getItem("livio25Reports") || "[]");
    setReports(storedReports.reverse()); // Show newest first
  };

  useEffect(() => {
    loadReports();

    // Listen for new reports
    const handleNewReport = () => {
      loadReports();
    };

    window.addEventListener("reportSubmitted", handleNewReport);
    return () => window.removeEventListener("reportSubmitted", handleNewReport);
  }, []);

  if (reports.length === 0) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-virus-red mb-8">
            Ainda não há relatos de vítimas
          </h2>
          <p className="text-muted-foreground">
            Seja o primeiro a reportar sua experiência com o Lívio25!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-virus-red mb-4">
            Vítimas do Lívio25
          </h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Users className="h-5 w-5 text-virus-orange" />
            <span className="text-lg font-medium">
              {reports.length} {reports.length === 1 ? "pessoa infectada" : "pessoas infectadas"}
            </span>
          </div>
          <p className="text-muted-foreground">
            Veja os relatos de outras vítimas da doença que está se espalhando pela universidade
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {reports.map((report) => (
            <Card key={report.id} className="p-6 hover:shadow-[var(--shadow-card)] transition-shadow border-virus-red/10">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg text-virus-red">
                      {report.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <GraduationCap className="h-4 w-4 text-virus-orange" />
                      <span className="text-sm text-muted-foreground">
                        {report.course}
                      </span>
                    </div>
                  </div>
                  <Badge variant="destructive" className="bg-virus-red/10 text-virus-red hover:bg-virus-red/20">
                    Infectado
                  </Badge>
                </div>

                {report.date && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-virus-orange" />
                    <span className="text-sm text-muted-foreground">
                      Infectado em: {new Date(report.date).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                )}

                <div className="bg-danger-bg p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    "{report.symptoms}"
                  </p>
                </div>

                <div className="text-xs text-muted-foreground">
                  Reportado em {new Date(report.reportDate).toLocaleDateString('pt-BR')} às{' '}
                  {new Date(report.reportDate).toLocaleTimeString('pt-BR', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};