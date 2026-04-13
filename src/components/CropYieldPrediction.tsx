import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { BarChart2, TrendingUp, Leaf, Droplets, Thermometer, Cloud } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

interface CropYieldData {
  name: string;
  baseYield: number;
  unit: string;
  optimalConditions: {
    temperature: [number, number];
    rainfall: [number, number];
    humidity: [number, number];
  };
  historicalYields: { year: string; yield: number }[];
}

const cropYieldDatabase: CropYieldData[] = [
  {
    name: "Rice",
    baseYield: 40,
    unit: "Quintal/ha",
    optimalConditions: { temperature: [22, 32], rainfall: [150, 250], humidity: [75, 90] },
    historicalYields: [
      { year: "2020", yield: 38.5 }, { year: "2021", yield: 39.2 }, { year: "2022", yield: 40.1 },
      { year: "2023", yield: 41.3 }, { year: "2024", yield: 42.0 }
    ],
  },
  {
    name: "Wheat",
    baseYield: 35,
    unit: "Quintal/ha",
    optimalConditions: { temperature: [15, 25], rainfall: [50, 100], humidity: [50, 70] },
    historicalYields: [
      { year: "2020", yield: 33.8 }, { year: "2021", yield: 34.5 }, { year: "2022", yield: 35.2 },
      { year: "2023", yield: 35.8 }, { year: "2024", yield: 36.5 }
    ],
  },
  {
    name: "Maize",
    baseYield: 50,
    unit: "Quintal/ha",
    optimalConditions: { temperature: [20, 30], rainfall: [80, 150], humidity: [60, 80] },
    historicalYields: [
      { year: "2020", yield: 48.0 }, { year: "2021", yield: 49.5 }, { year: "2022", yield: 50.2 },
      { year: "2023", yield: 51.0 }, { year: "2024", yield: 52.5 }
    ],
  },
  {
    name: "Cotton",
    baseYield: 18,
    unit: "Quintal/ha",
    optimalConditions: { temperature: [25, 35], rainfall: [60, 110], humidity: [60, 75] },
    historicalYields: [
      { year: "2020", yield: 16.5 }, { year: "2021", yield: 17.2 }, { year: "2022", yield: 17.8 },
      { year: "2023", yield: 18.5 }, { year: "2024", yield: 19.0 }
    ],
  },
  {
    name: "Soybean",
    baseYield: 15,
    unit: "Quintal/ha",
    optimalConditions: { temperature: [20, 30], rainfall: [60, 100], humidity: [60, 80] },
    historicalYields: [
      { year: "2020", yield: 14.0 }, { year: "2021", yield: 14.5 }, { year: "2022", yield: 15.0 },
      { year: "2023", yield: 15.5 }, { year: "2024", yield: 16.0 }
    ],
  },
  {
    name: "Sugarcane",
    baseYield: 700,
    unit: "Quintal/ha",
    optimalConditions: { temperature: [25, 35], rainfall: [150, 250], humidity: [75, 90] },
    historicalYields: [
      { year: "2020", yield: 680 }, { year: "2021", yield: 695 }, { year: "2022", yield: 710 },
      { year: "2023", yield: 720 }, { year: "2024", yield: 735 }
    ],
  },
];

const CropYieldPrediction = () => {
  const { t } = useTranslation();
  const [selectedCrop, setSelectedCrop] = useState<string>("");
  const [temperature, setTemperature] = useState<string>("");
  const [rainfall, setRainfall] = useState<string>("");
  const [humidity, setHumidity] = useState<string>("");
  const [prediction, setPrediction] = useState<{ yield: number; confidence: number; factors: string[] } | null>(null);

  const predictYield = () => {
    const crop = cropYieldDatabase.find(c => c.name === selectedCrop);
    if (!crop) return;

    const temp = parseFloat(temperature);
    const rain = parseFloat(rainfall);
    const hum = parseFloat(humidity);

    let multiplier = 1;
    const factors: string[] = [];

    // Temperature factor
    const [tempMin, tempMax] = crop.optimalConditions.temperature;
    if (temp >= tempMin && temp <= tempMax) {
      multiplier *= 1.05;
      factors.push("✓ Temperature is optimal");
    } else if (temp < tempMin - 5 || temp > tempMax + 5) {
      multiplier *= 0.75;
      factors.push("⚠ Temperature is significantly outside optimal range");
    } else {
      multiplier *= 0.9;
      factors.push("△ Temperature is slightly outside optimal range");
    }

    // Rainfall factor
    const [rainMin, rainMax] = crop.optimalConditions.rainfall;
    if (rain >= rainMin && rain <= rainMax) {
      multiplier *= 1.05;
      factors.push("✓ Rainfall is optimal");
    } else if (rain < rainMin * 0.5 || rain > rainMax * 1.5) {
      multiplier *= 0.7;
      factors.push("⚠ Rainfall is significantly outside optimal range");
    } else {
      multiplier *= 0.85;
      factors.push("△ Rainfall is slightly outside optimal range");
    }

    // Humidity factor
    const [humMin, humMax] = crop.optimalConditions.humidity;
    if (hum >= humMin && hum <= humMax) {
      multiplier *= 1.03;
      factors.push("✓ Humidity is optimal");
    } else {
      multiplier *= 0.92;
      factors.push("△ Humidity outside optimal range");
    }

    // Add historical trend bonus
    const yields = crop.historicalYields.map(h => h.yield);
    const trend = (yields[yields.length - 1] - yields[0]) / yields[0];
    if (trend > 0.05) {
      multiplier *= 1.02;
      factors.push("↑ Positive historical yield trend");
    }

    const predictedYield = Math.round(crop.baseYield * multiplier * 10) / 10;
    const confidence = Math.min(95, Math.max(60, multiplier * 85));

    setPrediction({ yield: predictedYield, confidence: Math.round(confidence), factors });
  };

  const selectedCropData = cropYieldDatabase.find(c => c.name === selectedCrop);

  return (
    <section id="yield-prediction" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <BarChart2 className="w-4 h-4" />
            <span className="text-sm font-medium">{t('yieldPrediction.badge')}</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('yieldPrediction.title')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('yieldPrediction.description')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Input Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-primary" />
                  Enter Conditions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Select Crop</Label>
                  <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a crop" />
                    </SelectTrigger>
                    <SelectContent>
                      {cropYieldDatabase.map(crop => (
                        <SelectItem key={crop.name} value={crop.name}>
                          {crop.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Thermometer className="w-4 h-4 text-sun" />
                    Average Temperature (°C)
                  </Label>
                  <Input
                    type="number"
                    value={temperature}
                    onChange={(e) => setTemperature(e.target.value)}
                    placeholder="e.g., 28"
                  />
                  {selectedCropData && (
                    <p className="text-xs text-muted-foreground">
                      Optimal: {selectedCropData.optimalConditions.temperature[0]}–{selectedCropData.optimalConditions.temperature[1]}°C
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Cloud className="w-4 h-4 text-water" />
                    Expected Rainfall (mm)
                  </Label>
                  <Input
                    type="number"
                    value={rainfall}
                    onChange={(e) => setRainfall(e.target.value)}
                    placeholder="e.g., 150"
                  />
                  {selectedCropData && (
                    <p className="text-xs text-muted-foreground">
                      Optimal: {selectedCropData.optimalConditions.rainfall[0]}–{selectedCropData.optimalConditions.rainfall[1]} mm
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-water" />
                    Average Humidity (%)
                  </Label>
                  <Input
                    type="number"
                    value={humidity}
                    onChange={(e) => setHumidity(e.target.value)}
                    placeholder="e.g., 75"
                  />
                  {selectedCropData && (
                    <p className="text-xs text-muted-foreground">
                      Optimal: {selectedCropData.optimalConditions.humidity[0]}–{selectedCropData.optimalConditions.humidity[1]}%
                    </p>
                  )}
                </div>

                <Button
                  onClick={predictYield}
                  className="w-full"
                  size="lg"
                  disabled={!selectedCrop || !temperature || !rainfall || !humidity}
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Predict Yield
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className={`h-full ${!prediction ? 'opacity-60' : ''}`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart2 className="w-5 h-5 text-primary" />
                  Yield Prediction
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {prediction ? (
                  <>
                    <div className="p-6 rounded-xl bg-primary/10 border border-primary/20 text-center">
                      <p className="text-sm text-muted-foreground mb-2">Predicted Yield</p>
                      <p className="text-4xl font-bold text-primary">
                        {prediction.yield} <span className="text-lg">{selectedCropData?.unit}</span>
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Prediction Confidence</span>
                        <span className="font-medium">{prediction.confidence}%</span>
                      </div>
                      <Progress value={prediction.confidence} className="h-2" />
                    </div>

                    <div className="space-y-3">
                      <p className="font-medium text-foreground">Analysis Factors:</p>
                      {prediction.factors.map((factor, i) => (
                        <div key={i} className="text-sm text-muted-foreground p-2 bg-muted/50 rounded">
                          {factor}
                        </div>
                      ))}
                    </div>

                    {selectedCropData && (
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <p className="text-sm font-medium text-foreground mb-2">Historical Trend</p>
                        <div className="flex items-end gap-1 h-16">
                          {selectedCropData.historicalYields.map((h, i) => {
                            const max = Math.max(...selectedCropData.historicalYields.map(x => x.yield));
                            const height = (h.yield / max) * 100;
                            return (
                              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                                <div
                                  className="w-full bg-primary/70 rounded-t transition-all"
                                  style={{ height: `${height}%` }}
                                />
                                <span className="text-xs text-muted-foreground">{h.year.slice(-2)}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="h-full flex items-center justify-center text-muted-foreground">
                    <p>Enter crop and conditions to see prediction</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CropYieldPrediction;
