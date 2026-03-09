import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Leaf, AlertTriangle, CheckCircle, Info, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { exportSoilHealthToPDF } from "@/utils/pdfExport";

interface NutrientLevel {
  value: number;
  optimal: [number, number];
  unit: string;
}

const OPTIMAL_RANGES = {
  nitrogen: { optimal: [240, 480] as [number, number], unit: "kg/ha" },
  phosphorus: { optimal: [22, 56] as [number, number], unit: "kg/ha" },
  potassium: { optimal: [140, 280] as [number, number], unit: "kg/ha" },
  ph: { optimal: [6.0, 7.5] as [number, number], unit: "" },
  organicCarbon: { optimal: [0.5, 1.0] as [number, number], unit: "%" },
};

interface Amendment {
  name: string;
  quantity: string;
  reason: string;
  priority: "high" | "medium" | "low";
}

const getStatus = (value: number, range: [number, number]) => {
  if (value < range[0]) return "low";
  if (value > range[1]) return "high";
  return "optimal";
};

const getScore = (n: number, p: number, k: number, ph: number, oc: number): number => {
  let score = 0;
  const check = (val: number, range: [number, number], weight: number) => {
    const status = getStatus(val, range);
    if (status === "optimal") return weight;
    const mid = (range[0] + range[1]) / 2;
    const dist = Math.abs(val - mid) / mid;
    return Math.max(0, weight * (1 - dist));
  };
  score += check(n, OPTIMAL_RANGES.nitrogen.optimal, 25);
  score += check(p, OPTIMAL_RANGES.phosphorus.optimal, 20);
  score += check(k, OPTIMAL_RANGES.potassium.optimal, 20);
  score += check(ph, OPTIMAL_RANGES.ph.optimal, 20);
  score += check(oc, OPTIMAL_RANGES.organicCarbon.optimal, 15);
  return Math.round(Math.min(100, Math.max(0, score)));
};

const getAmendments = (n: number, p: number, k: number, ph: number, oc: number): Amendment[] => {
  const amendments: Amendment[] = [];
  if (n < OPTIMAL_RANGES.nitrogen.optimal[0]) {
    amendments.push({ name: "Urea (46-0-0)", quantity: `${Math.round((OPTIMAL_RANGES.nitrogen.optimal[0] - n) * 2.17)} kg/ha`, reason: "Nitrogen deficiency", priority: "high" });
  }
  if (p < OPTIMAL_RANGES.phosphorus.optimal[0]) {
    amendments.push({ name: "SSP (0-16-0)", quantity: `${Math.round((OPTIMAL_RANGES.phosphorus.optimal[0] - p) * 6.25)} kg/ha`, reason: "Phosphorus deficiency", priority: "high" });
  }
  if (k < OPTIMAL_RANGES.potassium.optimal[0]) {
    amendments.push({ name: "MOP (0-0-60)", quantity: `${Math.round((OPTIMAL_RANGES.potassium.optimal[0] - k) * 1.67)} kg/ha`, reason: "Potassium deficiency", priority: "medium" });
  }
  if (ph < OPTIMAL_RANGES.ph.optimal[0]) {
    amendments.push({ name: "Agricultural Lime", quantity: "2-4 tonnes/ha", reason: "Soil too acidic", priority: "high" });
  }
  if (ph > OPTIMAL_RANGES.ph.optimal[1]) {
    amendments.push({ name: "Gypsum", quantity: "2-5 tonnes/ha", reason: "Soil too alkaline", priority: "medium" });
  }
  if (oc < OPTIMAL_RANGES.organicCarbon.optimal[0]) {
    amendments.push({ name: "FYM / Vermicompost", quantity: "5-10 tonnes/ha", reason: "Low organic carbon", priority: "medium" });
  }
  if (n > OPTIMAL_RANGES.nitrogen.optimal[1]) {
    amendments.push({ name: "Reduce N-fertilizer", quantity: "Cut by 30-50%", reason: "Excess nitrogen", priority: "low" });
  }
  return amendments;
};

const SoilHealthDashboard = () => {
  const { t } = useTranslation();
  const [nitrogen, setNitrogen] = useState("");
  const [phosphorus, setPhosphorus] = useState("");
  const [potassium, setPotassium] = useState("");
  const [ph, setPh] = useState("");
  const [organicCarbon, setOrganicCarbon] = useState("");
  const [analyzed, setAnalyzed] = useState(false);

  const n = parseFloat(nitrogen) || 0;
  const p = parseFloat(phosphorus) || 0;
  const k = parseFloat(potassium) || 0;
  const phVal = parseFloat(ph) || 0;
  const oc = parseFloat(organicCarbon) || 0;

  const score = analyzed ? getScore(n, p, k, phVal, oc) : 0;
  const amendments = analyzed ? getAmendments(n, p, k, phVal, oc) : [];

  const handleAnalyze = () => {
    if (n > 0 && p > 0 && k > 0 && phVal > 0 && oc > 0) {
      setAnalyzed(true);
    }
  };

  const NutrientBar = ({ label, value, range, unit }: { label: string; value: number; range: [number, number]; unit: string }) => {
    const status = getStatus(value, range);
    const pct = Math.min(100, (value / range[1]) * 80);
    return (
      <div className="space-y-1">
        <div className="flex justify-between text-sm">
          <span className="font-medium text-foreground">{label}</span>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">{value} {unit}</span>
            <Badge variant={status === "optimal" ? "default" : status === "low" ? "destructive" : "secondary"} className="text-xs">
              {status === "optimal" ? "✓ Optimal" : status === "low" ? "↓ Low" : "↑ High"}
            </Badge>
          </div>
        </div>
        <div className="relative h-3 rounded-full bg-muted overflow-hidden">
          <div className="absolute h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, backgroundColor: status === "optimal" ? "hsl(var(--primary))" : status === "low" ? "hsl(var(--destructive))" : "hsl(var(--sun))" }} />
          <div className="absolute h-full border-l-2 border-r-2 border-foreground/30 opacity-50" style={{ left: `${(range[0] / range[1]) * 80}%`, width: `${((range[1] - range[0]) / range[1]) * 80}%` }} />
        </div>
        <p className="text-xs text-muted-foreground">Optimal: {range[0]}–{range[1]} {unit}</p>
      </div>
    );
  };

  return (
    <section id="soil-health" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <Leaf className="w-4 h-4" />
            <span className="text-sm font-medium">{t("soilHealth.badge", "Soil Analysis")}</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">{t("soilHealth.title", "Soil Health Dashboard")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t("soilHealth.description", "Track NPK balance, pH, and organic carbon to get tailored soil amendment recommendations.")}</p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          {/* Input */}
          <Card>
            <CardHeader><CardTitle className="text-lg">{t("soilHealth.inputTitle", "Enter Soil Test Results")}</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: t("soilHealth.nitrogen", "Nitrogen (kg/ha)"), val: nitrogen, set: setNitrogen, placeholder: "e.g. 280" },
                { label: t("soilHealth.phosphorus", "Phosphorus (kg/ha)"), val: phosphorus, set: setPhosphorus, placeholder: "e.g. 35" },
                { label: t("soilHealth.potassium", "Potassium (kg/ha)"), val: potassium, set: setPotassium, placeholder: "e.g. 200" },
                { label: t("soilHealth.ph", "Soil pH"), val: ph, set: setPh, placeholder: "e.g. 6.5" },
                { label: t("soilHealth.organicCarbon", "Organic Carbon (%)"), val: organicCarbon, set: setOrganicCarbon, placeholder: "e.g. 0.7" },
              ].map(({ label, val, set, placeholder }) => (
                <div key={label}>
                  <Label className="text-sm">{label}</Label>
                  <Input type="number" value={val} onChange={e => set(e.target.value)} placeholder={placeholder} className="mt-1" />
                </div>
              ))}
              <Button onClick={handleAnalyze} className="w-full">{t("soilHealth.analyze", "Analyze Soil Health")}</Button>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-6">
            {analyzed ? (
              <>
                <Card>
                  <CardHeader><CardTitle className="text-lg flex items-center gap-2">
                    {score >= 70 ? <CheckCircle className="w-5 h-5 text-primary" /> : <AlertTriangle className="w-5 h-5 text-destructive" />}
                    {t("soilHealth.scoreTitle", "Soil Health Score")}
                  </CardTitle></CardHeader>
                  <CardContent>
                    <div className="text-center mb-4">
                      <span className={`text-5xl font-bold ${score >= 70 ? "text-primary" : score >= 40 ? "text-sun" : "text-destructive"}`}>{score}</span>
                      <span className="text-2xl text-muted-foreground">/100</span>
                    </div>
                    <Progress value={score} className="h-3 mb-6" />
                    <div className="space-y-4">
                      <NutrientBar label="Nitrogen" value={n} range={OPTIMAL_RANGES.nitrogen.optimal} unit="kg/ha" />
                      <NutrientBar label="Phosphorus" value={p} range={OPTIMAL_RANGES.phosphorus.optimal} unit="kg/ha" />
                      <NutrientBar label="Potassium" value={k} range={OPTIMAL_RANGES.potassium.optimal} unit="kg/ha" />
                      <NutrientBar label="pH" value={phVal} range={OPTIMAL_RANGES.ph.optimal} unit="" />
                      <NutrientBar label="Organic Carbon" value={oc} range={OPTIMAL_RANGES.organicCarbon.optimal} unit="%" />
                    </div>
                  </CardContent>
                </Card>

                {amendments.length > 0 && (
                  <Card>
                    <CardHeader><CardTitle className="text-lg">{t("soilHealth.amendments", "Recommended Amendments")}</CardTitle></CardHeader>
                    <CardContent className="space-y-3">
                      {amendments.map((a, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                          <Info className={`w-4 h-4 mt-0.5 shrink-0 ${a.priority === "high" ? "text-destructive" : a.priority === "medium" ? "text-sun" : "text-muted-foreground"}`} />
                          <div>
                            <p className="font-medium text-foreground text-sm">{a.name}</p>
                            <p className="text-xs text-muted-foreground">{a.reason} · Apply {a.quantity}</p>
                          </div>
                          <Badge variant={a.priority === "high" ? "destructive" : "secondary"} className="ml-auto text-xs shrink-0">{a.priority}</Badge>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}
              </>
            ) : (
              <Card className="flex items-center justify-center h-full">
                <CardContent className="text-center py-12">
                  <Leaf className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                  <p className="text-muted-foreground">{t("soilHealth.placeholder", "Enter your soil test results to see analysis")}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SoilHealthDashboard;
