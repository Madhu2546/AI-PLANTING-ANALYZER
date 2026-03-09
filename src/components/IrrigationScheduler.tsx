import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Droplets, CloudRain, Thermometer, Wind, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useWeather from "@/hooks/useWeather";

interface IrrigationPlan {
  frequency: string;
  amount: string;
  method: string;
  bestTime: string;
  tips: string[];
  weeklySchedule: { day: string; action: string; duration: string }[];
}

const CROPS_WATER: Record<string, { baseWater: number; method: string; critical: string }> = {
  Rice: { baseWater: 50, method: "Flood irrigation / AWD", critical: "Tillering & Flowering" },
  Wheat: { baseWater: 25, method: "Furrow / Sprinkler", critical: "CRI, Flowering, Grain filling" },
  Maize: { baseWater: 30, method: "Furrow / Drip", critical: "Tasseling & Silking" },
  Cotton: { baseWater: 28, method: "Drip / Furrow", critical: "Flowering & Boll formation" },
  Chickpea: { baseWater: 15, method: "Sprinkler / Light furrow", critical: "Flowering & Pod filling" },
  Lentil: { baseWater: 12, method: "Sprinkler", critical: "Flowering" },
  Coconut: { baseWater: 40, method: "Basin / Drip", critical: "Summer months" },
  Coffee: { baseWater: 35, method: "Drip / Sprinkler", critical: "Blossom & Berry development" },
  Mango: { baseWater: 20, method: "Basin / Drip", critical: "Fruit set & development" },
  Grapes: { baseWater: 22, method: "Drip", critical: "Berry development" },
};

const generatePlan = (crop: string, temp: number, humidity: number, rainfall: number): IrrigationPlan => {
  const info = CROPS_WATER[crop] || { baseWater: 25, method: "Sprinkler", critical: "Flowering" };
  let waterNeed = info.baseWater;

  // Adjust for weather
  if (temp > 35) waterNeed *= 1.3;
  else if (temp > 30) waterNeed *= 1.15;
  else if (temp < 20) waterNeed *= 0.8;

  if (humidity < 40) waterNeed *= 1.2;
  else if (humidity > 80) waterNeed *= 0.85;

  const effectiveRain = rainfall * 0.7; // 70% effective
  waterNeed = Math.max(5, waterNeed - effectiveRain / 7);

  const freqDays = waterNeed > 35 ? 1 : waterNeed > 25 ? 2 : waterNeed > 15 ? 3 : 5;

  const tips: string[] = [];
  if (temp > 35) tips.push("🌡️ High temp: Irrigate early morning (5-7 AM) or evening to reduce evaporation.");
  if (humidity < 40) tips.push("💨 Low humidity: Consider mulching to retain soil moisture.");
  if (rainfall > 10) tips.push("🌧️ Rainfall expected: Reduce irrigation, ensure proper drainage.");
  if (crop === "Rice") tips.push("🌾 Maintain 2-5 cm standing water during vegetative stage.");
  tips.push(`⚠️ Critical irrigation stage: ${info.critical}`);
  if (waterNeed > 30) tips.push("💧 Consider drip irrigation for 30-50% water savings.");

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const weeklySchedule = days.map((day, i) => {
    const shouldIrrigate = i % freqDays === 0;
    return {
      day,
      action: shouldIrrigate ? "Irrigate" : rainfall > 5 ? "Skip (rain)" : "Monitor soil",
      duration: shouldIrrigate ? `${Math.round(waterNeed * 0.6)} min` : "-",
    };
  });

  return {
    frequency: `Every ${freqDays} day${freqDays > 1 ? "s" : ""}`,
    amount: `${Math.round(waterNeed)} mm/week`,
    method: info.method,
    bestTime: temp > 30 ? "5:00 - 7:00 AM" : "6:00 - 9:00 AM",
    tips,
    weeklySchedule,
  };
};

const IrrigationScheduler = () => {
  const { t } = useTranslation();
  const { fetchWeather, isLoading: weatherLoading } = useWeather();
  const [crop, setCrop] = useState("Rice");
  const [temp, setTemp] = useState("30");
  const [humidity, setHumidity] = useState("65");
  const [rainfall, setRainfall] = useState("5");
  const [plan, setPlan] = useState<IrrigationPlan | null>(null);

  const handleGenerate = () => {
    setPlan(generatePlan(crop, parseFloat(temp) || 30, parseFloat(humidity) || 65, parseFloat(rainfall) || 0));
  };

  const handleAutoFill = async () => {
    const data = await fetchWeather();
    if (data) {
      setTemp(data.temperature);
      setHumidity(data.humidity);
      setRainfall(data.rainfall);
    }
  };

  return (
    <section id="irrigation-scheduler" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="inline-flex items-center gap-2 bg-water/20 text-water px-4 py-2 rounded-full mb-4">
            <Droplets className="w-4 h-4" />
            <span className="text-sm font-medium">Smart Irrigation</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Weather-Based Irrigation Scheduler
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get personalized watering schedules based on crop type, temperature, humidity, and rainfall forecast.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          {/* Inputs */}
          <Card>
            <CardHeader><CardTitle className="text-lg">Configure Schedule</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm">Crop</Label>
                <Select value={crop} onValueChange={setCrop}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {Object.keys(CROPS_WATER).map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label className="text-xs flex items-center gap-1"><Thermometer className="w-3 h-3" />Temp (°C)</Label>
                  <Input type="number" value={temp} onChange={e => setTemp(e.target.value)} className="mt-1" />
                </div>
                <div>
                  <Label className="text-xs flex items-center gap-1"><Wind className="w-3 h-3" />Humidity (%)</Label>
                  <Input type="number" value={humidity} onChange={e => setHumidity(e.target.value)} className="mt-1" />
                </div>
                <div>
                  <Label className="text-xs flex items-center gap-1"><CloudRain className="w-3 h-3" />Rain (mm)</Label>
                  <Input type="number" value={rainfall} onChange={e => setRainfall(e.target.value)} className="mt-1" />
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={handleAutoFill} disabled={weatherLoading} className="w-full">
                {weatherLoading ? <><Loader2 className="w-3 h-3 animate-spin" /> Fetching...</> : "📍 Auto-fill from Location"}
              </Button>
              <Button onClick={handleGenerate} className="w-full">Generate Irrigation Plan</Button>
            </CardContent>
          </Card>

          {/* Result */}
          {plan ? (
            <div className="space-y-4">
              <Card>
                <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Droplets className="w-5 h-5 text-water" />Irrigation Summary</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "Frequency", value: plan.frequency },
                      { label: "Water Need", value: plan.amount },
                      { label: "Best Time", value: plan.bestTime },
                      { label: "Method", value: plan.method },
                    ].map(item => (
                      <div key={item.label} className="p-3 rounded-lg bg-muted/50">
                        <p className="text-xs text-muted-foreground">{item.label}</p>
                        <p className="text-sm font-medium text-foreground">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle className="text-base">Weekly Schedule</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-1.5">
                    {plan.weeklySchedule.map(day => (
                      <div key={day.day} className={`flex items-center justify-between p-2 rounded text-sm ${day.action === "Irrigate" ? "bg-water/10" : "bg-muted/30"}`}>
                        <span className="font-medium text-foreground w-24">{day.day}</span>
                        <Badge variant={day.action === "Irrigate" ? "default" : "secondary"} className="text-xs">{day.action}</Badge>
                        <span className="text-muted-foreground text-xs w-16 text-right">{day.duration}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle className="text-base">Tips</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {plan.tips.map((tip, i) => (
                      <p key={i} className="text-sm text-muted-foreground">{tip}</p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card className="flex items-center justify-center h-full">
              <CardContent className="text-center py-12">
                <Droplets className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-muted-foreground">Configure your crop and weather to generate an irrigation plan</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};

export default IrrigationScheduler;
