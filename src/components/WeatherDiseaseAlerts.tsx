import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Thermometer, Droplets, Shield, RefreshCw, MapPin, X, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { diseaseConditions, checkDiseaseRisk, getRiskColor, DiseaseCondition } from "@/data/diseaseConditions";
import { useWeather } from "@/hooks/useWeather";

interface WeatherState {
  temperature: number;
  humidity: number;
  rainfall: number;
}

const WeatherDiseaseAlerts = () => {
  const { fetchWeather, isLoading, error } = useWeather();
  const [weather, setWeather] = useState<WeatherState | null>(null);
  const [alerts, setAlerts] = useState<DiseaseCondition[]>([]);
  const [expandedAlert, setExpandedAlert] = useState<string | null>(null);
  const [selectedCrops, setSelectedCrops] = useState<string[]>([]);

  const allCrops = Array.from(
    new Set(diseaseConditions.flatMap(d => d.affectedCrops))
  ).sort();

  useEffect(() => {
    if (weather) {
      const riskAlerts = checkDiseaseRisk(
        weather.temperature,
        weather.humidity,
        selectedCrops
      );
      setAlerts(riskAlerts);
    }
  }, [weather, selectedCrops]);

  const toggleCrop = (crop: string) => {
    setSelectedCrops(prev =>
      prev.includes(crop)
        ? prev.filter(c => c !== crop)
        : [...prev, crop]
    );
  };

  const handleFetchWeather = async () => {
    const data = await fetchWeather();
    if (data) {
      setWeather({
        temperature: parseInt(data.temperature),
        humidity: parseInt(data.humidity),
        rainfall: parseInt(data.rainfall),
      });
    }
  };

  return (
    <section id="weather-alerts" className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-4 py-2 rounded-full mb-4">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm font-medium">Disease Risk Alerts</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Weather-Based Disease Alerts
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get real-time alerts when weather conditions favor crop diseases. Stay ahead with preventive measures.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Weather Status Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    Current Weather Conditions
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleFetchWeather}
                    disabled={isLoading}
                  >
                    <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                    {isLoading ? 'Fetching...' : 'Get Weather'}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {error && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {weather ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-muted/50 rounded-lg text-center">
                      <Thermometer className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-foreground">{weather.temperature}°C</p>
                      <p className="text-sm text-muted-foreground">Temperature</p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg text-center">
                      <Droplets className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-foreground">{weather.humidity}%</p>
                      <p className="text-sm text-muted-foreground">Humidity</p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg text-center col-span-2 md:col-span-1">
                      <AlertTriangle className={`w-8 h-8 mx-auto mb-2 ${alerts.length > 0 ? 'text-red-500' : 'text-green-500'}`} />
                      <p className="text-2xl font-bold text-foreground">{alerts.length}</p>
                      <p className="text-sm text-muted-foreground">Active Alerts</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <MapPin className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Click "Get Weather" to fetch your local weather conditions</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Crop Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Filter by Your Crops</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {allCrops.map(crop => (
                    <Badge
                      key={crop}
                      variant={selectedCrops.includes(crop) ? "default" : "outline"}
                      className="cursor-pointer transition-all hover:scale-105"
                      onClick={() => toggleCrop(crop)}
                    >
                      {crop}
                      {selectedCrops.includes(crop) && (
                        <X className="w-3 h-3 ml-1" />
                      )}
                    </Badge>
                  ))}
                </div>
                {selectedCrops.length > 0 && (
                  <p className="text-sm text-muted-foreground mt-3">
                    Showing alerts for: {selectedCrops.join(', ')}
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Disease Alerts */}
          {weather && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-xl font-semibold text-foreground">
                {alerts.length > 0 ? '⚠️ Active Disease Risks' : '✅ No Current Risks'}
              </h3>

              <AnimatePresence mode="popLayout">
                {alerts.length > 0 ? (
                  alerts.map((alert, index) => (
                    <motion.div
                      key={alert.diseaseId}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className={`border-2 ${getRiskColor(alert.riskLevel)}`}>
                        <CardContent className="p-4">
                          <div
                            className="flex items-start justify-between cursor-pointer"
                            onClick={() => setExpandedAlert(
                              expandedAlert === alert.diseaseId ? null : alert.diseaseId
                            )}
                          >
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <AlertTriangle className={`w-5 h-5 ${
                                  alert.riskLevel === 'high' ? 'text-red-600' :
                                  alert.riskLevel === 'medium' ? 'text-yellow-600' : 'text-green-600'
                                }`} />
                                <h4 className="font-semibold text-foreground">{alert.diseaseName}</h4>
                                <Badge className={getRiskColor(alert.riskLevel)}>
                                  {alert.riskLevel.toUpperCase()} RISK
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">
                                {alert.description}
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {alert.affectedCrops.map(crop => (
                                  <Badge key={crop} variant="outline" className="text-xs">
                                    {crop}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <Button variant="ghost" size="icon">
                              {expandedAlert === alert.diseaseId ? (
                                <ChevronUp className="w-5 h-5" />
                              ) : (
                                <ChevronDown className="w-5 h-5" />
                              )}
                            </Button>
                          </div>

                          <AnimatePresence>
                            {expandedAlert === alert.diseaseId && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-4 pt-4 border-t border-border"
                              >
                                <div className="flex items-center gap-2 mb-3">
                                  <Shield className="w-5 h-5 text-green-600" />
                                  <h5 className="font-medium text-foreground">Preventive Measures</h5>
                                </div>
                                <ul className="space-y-2">
                                  {alert.preventiveMeasures.map((measure, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                      <span className="text-green-600 mt-0.5">✓</span>
                                      {measure}
                                    </li>
                                  ))}
                                </ul>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <Card className="border-green-200 bg-green-50">
                      <CardContent className="p-6 text-center">
                        <Shield className="w-12 h-12 text-green-600 mx-auto mb-4" />
                        <h4 className="font-semibold text-green-800 mb-2">
                          No Disease Risks Detected
                        </h4>
                        <p className="text-green-700 text-sm">
                          Current weather conditions don't favor major crop diseases.
                          Continue with regular monitoring and preventive care.
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default WeatherDiseaseAlerts;
