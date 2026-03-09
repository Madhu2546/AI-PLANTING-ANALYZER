import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Beaker, Bug, Sprout, Clock, Shield, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cropNutrientPlans, availableCrops } from "@/data/cropNutrients";

const CropNutrientGuide = () => {
  const { t } = useTranslation();
  const [selectedCrop, setSelectedCrop] = useState("Rice");
  const [expandedStage, setExpandedStage] = useState<number | null>(0);

  const plan = cropNutrientPlans[selectedCrop];
  if (!plan) return null;

  return (
    <section id="nutrient-guide" className="py-16 md:py-24 bg-secondary/20">
      <div className="container mx-auto px-4">
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <Beaker className="w-4 h-4" />
            <span className="text-sm font-medium">Crop Nutrient Guide</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Fertilizer & Pesticide Planner
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Stage-wise fertilizer schedule, pest & disease management with recommended chemicals for your crop.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-6">
          {/* Crop Selector */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <div className="flex items-center gap-2">
                  <Sprout className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">Select Crop:</span>
                </div>
                <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                  <SelectTrigger className="w-full sm:w-[200px]"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {availableCrops.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
                <div className="flex gap-2 ml-auto">
                  <Badge variant="outline" className="text-xs">N: {plan.totalN} kg/ha</Badge>
                  <Badge variant="outline" className="text-xs">P: {plan.totalP} kg/ha</Badge>
                  <Badge variant="outline" className="text-xs">K: {plan.totalK} kg/ha</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="schedule">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="schedule" className="gap-2"><Clock className="w-4 h-4" />Fertilizer Schedule</TabsTrigger>
              <TabsTrigger value="protection" className="gap-2"><Shield className="w-4 h-4" />Pest & Disease Control</TabsTrigger>
            </TabsList>

            {/* Fertilizer Schedule */}
            <TabsContent value="schedule" className="space-y-3 mt-4">
              {plan.fertilizerSchedule.map((stage, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <Card className="overflow-hidden">
                    <button
                      onClick={() => setExpandedStage(expandedStage === idx ? null : idx)}
                      className="w-full text-left"
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                              {idx + 1}
                            </div>
                            <div>
                              <CardTitle className="text-base">{stage.stage}</CardTitle>
                              <p className="text-xs text-muted-foreground mt-0.5">⏱ {stage.timing}</p>
                            </div>
                          </div>
                          {expandedStage === idx ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                        </div>
                      </CardHeader>
                    </button>
                    {expandedStage === idx && (
                      <CardContent className="pt-0">
                        <div className="space-y-2 mt-2">
                          {stage.chemicals.map((chem, ci) => (
                            <div key={ci} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                              <Beaker className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="font-medium text-sm text-foreground">{chem.name}</span>
                                  <Badge variant="secondary" className="text-xs">{chem.type}</Badge>
                                </div>
                                <p className="text-xs text-muted-foreground mt-0.5">{chem.purpose}</p>
                              </div>
                              <span className="text-sm font-medium text-primary shrink-0">{chem.dose}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    )}
                  </Card>
                </motion.div>
              ))}
            </TabsContent>

            {/* Pest & Disease */}
            <TabsContent value="protection" className="space-y-4 mt-4">
              {plan.pestsAndDiseases.map((pd, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-3">
                        <Bug className={`w-5 h-5 ${pd.type === "pest" ? "text-destructive" : "text-sun"}`} />
                        <div>
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-base">{pd.name}</CardTitle>
                            <Badge variant={pd.type === "pest" ? "destructive" : "secondary"} className="text-xs capitalize">{pd.type}</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">Symptoms: {pd.symptoms}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs font-medium text-foreground mb-2">Recommended Pesticides / Fungicides:</p>
                      <div className="space-y-2">
                        {pd.pesticides.map((pest, pi) => (
                          <div key={pi} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                            <Shield className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                            <div className="flex-1">
                              <span className="font-medium text-sm text-foreground">{pest.name}</span>
                              <p className="text-xs text-muted-foreground">{pest.application} · Dose: {pest.dose}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default CropNutrientGuide;
