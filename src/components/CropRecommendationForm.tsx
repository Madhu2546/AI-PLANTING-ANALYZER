import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, Droplets, Thermometer, Cloud, FlaskConical, Sparkles, RotateCcw, MapPin, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import CropResult from "./CropResult";
import { useWeather } from "@/hooks/useWeather";

interface FormData {
  nitrogen: string;
  phosphorus: string;
  potassium: string;
  temperature: string;
  humidity: string;
  ph: string;
  rainfall: string;
}

// Crop data with optimal conditions (simplified from the research paper)
const cropData = [
  { name: "Rice", icon: "🌾", n: [70, 100], p: [30, 60], k: [30, 60], temp: [20, 35], humidity: [80, 95], ph: [5.5, 7], rainfall: [150, 300] },
  { name: "Maize", icon: "🌽", n: [60, 100], p: [30, 60], k: [15, 40], temp: [18, 32], humidity: [50, 80], ph: [5.5, 7.5], rainfall: [60, 120] },
  { name: "Chickpea", icon: "🫘", n: [20, 50], p: [50, 80], k: [60, 90], temp: [15, 30], humidity: [30, 60], ph: [6, 8], rainfall: [40, 80] },
  { name: "Kidney Beans", icon: "🫘", n: [15, 40], p: [55, 75], k: [15, 25], temp: [15, 25], humidity: [20, 50], ph: [5.5, 7], rainfall: [60, 100] },
  { name: "Pigeon Peas", icon: "🌱", n: [15, 35], p: [50, 80], k: [15, 25], temp: [20, 35], humidity: [30, 65], ph: [5.5, 7], rainfall: [100, 150] },
  { name: "Moth Beans", icon: "🌱", n: [15, 30], p: [35, 55], k: [15, 25], temp: [25, 40], humidity: [30, 60], ph: [6.5, 8], rainfall: [25, 50] },
  { name: "Mung Bean", icon: "🫛", n: [15, 35], p: [35, 65], k: [15, 25], temp: [25, 35], humidity: [60, 90], ph: [6, 7.5], rainfall: [40, 80] },
  { name: "Black Gram", icon: "🫘", n: [30, 50], p: [55, 75], k: [15, 25], temp: [25, 35], humidity: [60, 80], ph: [6, 7.5], rainfall: [40, 80] },
  { name: "Lentil", icon: "🍲", n: [15, 30], p: [55, 75], k: [15, 25], temp: [15, 25], humidity: [30, 60], ph: [6, 7.5], rainfall: [25, 50] },
  { name: "Pomegranate", icon: "🍎", n: [15, 30], p: [15, 25], k: [35, 45], temp: [20, 35], humidity: [80, 95], ph: [5.5, 7.5], rainfall: [40, 70] },
  { name: "Banana", icon: "🍌", n: [80, 120], p: [70, 90], k: [45, 55], temp: [25, 35], humidity: [75, 90], ph: [5.5, 7], rainfall: [100, 150] },
  { name: "Mango", icon: "🥭", n: [15, 30], p: [15, 30], k: [25, 45], temp: [25, 40], humidity: [45, 70], ph: [5.5, 7.5], rainfall: [80, 120] },
  { name: "Grapes", icon: "🍇", n: [15, 30], p: [120, 140], k: [190, 210], temp: [15, 30], humidity: [75, 90], ph: [5.5, 7], rainfall: [60, 90] },
  { name: "Watermelon", icon: "🍉", n: [80, 110], p: [15, 25], k: [45, 55], temp: [25, 35], humidity: [75, 90], ph: [6, 7], rainfall: [40, 60] },
  { name: "Muskmelon", icon: "🍈", n: [90, 110], p: [15, 25], k: [45, 55], temp: [25, 35], humidity: [85, 95], ph: [6, 7], rainfall: [20, 40] },
  { name: "Apple", icon: "🍎", n: [15, 30], p: [120, 140], k: [190, 210], temp: [10, 25], humidity: [85, 95], ph: [5.5, 7], rainfall: [100, 140] },
  { name: "Orange", icon: "🍊", n: [15, 30], p: [15, 25], k: [5, 15], temp: [20, 30], humidity: [85, 95], ph: [6, 7.5], rainfall: [90, 130] },
  { name: "Papaya", icon: "🧡", n: [45, 65], p: [55, 75], k: [45, 55], temp: [30, 45], humidity: [85, 95], ph: [6, 7], rainfall: [120, 160] },
  { name: "Coconut", icon: "🥥", n: [15, 30], p: [15, 25], k: [25, 35], temp: [25, 35], humidity: [90, 99], ph: [5.5, 7], rainfall: [120, 180] },
  { name: "Cotton", icon: "☁️", n: [100, 140], p: [40, 60], k: [15, 25], temp: [22, 35], humidity: [70, 85], ph: [6, 8], rainfall: [60, 100] },
  { name: "Jute", icon: "🌿", n: [60, 90], p: [35, 55], k: [35, 45], temp: [25, 38], humidity: [75, 95], ph: [6, 7.5], rainfall: [150, 200] },
  { name: "Coffee", icon: "☕", n: [90, 120], p: [15, 25], k: [25, 35], temp: [20, 30], humidity: [55, 75], ph: [5.5, 7], rainfall: [120, 180] },
];

const CropRecommendationForm = () => {
  const { t } = useTranslation();
  const { fetchWeather, isLoading: isFetchingWeather } = useWeather();
  const [formData, setFormData] = useState<FormData>({
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: "",
  });
  const [results, setResults] = useState<typeof cropData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const fetchWeatherData = async () => {
    try {
      const weatherData = await fetchWeather();
      
      if (weatherData) {
        setFormData(prev => ({
          ...prev,
          temperature: weatherData.temperature,
          humidity: weatherData.humidity,
          rainfall: weatherData.rainfall,
        }));
        toast.success(t('form.weatherSuccess'));
      } else {
        toast.error(t('form.locationError'));
      }
    } catch (error) {
      toast.error(t('form.weatherError'));
    }
  };

  const calculateMatch = (crop: typeof cropData[0], data: FormData) => {
    const n = parseFloat(data.nitrogen);
    const p = parseFloat(data.phosphorus);
    const k = parseFloat(data.potassium);
    const temp = parseFloat(data.temperature);
    const hum = parseFloat(data.humidity);
    const ph = parseFloat(data.ph);
    const rain = parseFloat(data.rainfall);

    let score = 0;
    let maxScore = 7;

    if (n >= crop.n[0] && n <= crop.n[1]) score++;
    if (p >= crop.p[0] && p <= crop.p[1]) score++;
    if (k >= crop.k[0] && k <= crop.k[1]) score++;
    if (temp >= crop.temp[0] && temp <= crop.temp[1]) score++;
    if (hum >= crop.humidity[0] && hum <= crop.humidity[1]) score++;
    if (ph >= crop.ph[0] && ph <= crop.ph[1]) score++;
    if (rain >= crop.rainfall[0] && rain <= crop.rainfall[1]) score++;

    return (score / maxScore) * 100;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const values = Object.values(formData);
    if (values.some(v => !v || isNaN(parseFloat(v)))) {
      toast.error(t('form.fillError'));
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate ML processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Calculate matches and sort
    const scoredCrops = cropData
      .map(crop => ({
        ...crop,
        matchScore: calculateMatch(crop, formData),
      }))
      .sort((a, b) => b.matchScore - a.matchScore);

    setResults(scoredCrops as any);
    setIsAnalyzing(false);
    
    toast.success(t('form.success'));
  };

  const resetForm = () => {
    setFormData({
      nitrogen: "",
      phosphorus: "",
      potassium: "",
      temperature: "",
      humidity: "",
      ph: "",
      rainfall: "",
    });
    setResults(null);
  };

  const inputFields = [
    { key: "nitrogen" as const, labelKey: "form.nitrogen", unit: "kg/ha", icon: FlaskConical, placeholder: "0-140", color: "text-leaf" },
    { key: "phosphorus" as const, labelKey: "form.phosphorus", unit: "kg/ha", icon: FlaskConical, placeholder: "5-145", color: "text-soil" },
    { key: "potassium" as const, labelKey: "form.potassium", unit: "kg/ha", icon: FlaskConical, placeholder: "5-205", color: "text-soil-light" },
    { key: "temperature" as const, labelKey: "form.temperature", unit: "°C", icon: Thermometer, placeholder: "8-45", color: "text-sun" },
    { key: "humidity" as const, labelKey: "form.humidity", unit: "%", icon: Droplets, placeholder: "14-100", color: "text-water" },
    { key: "ph" as const, labelKey: "form.ph", unit: "pH", icon: FlaskConical, placeholder: "3.5-10", color: "text-primary" },
    { key: "rainfall" as const, labelKey: "form.rainfall", unit: "mm", icon: Cloud, placeholder: "20-300", color: "text-water-light" },
  ];

  return (
    <section id="recommendation-form" className="py-20 px-4 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">{t('form.badge')}</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t('form.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('form.description')}
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="bg-card rounded-2xl p-8 shadow-card border border-border"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {/* Auto-fill Button */}
          <div className="flex justify-center mb-6">
            <Button
              type="button"
              variant="outline"
              onClick={fetchWeatherData}
              disabled={isFetchingWeather}
              className="gap-2"
            >
              {isFetchingWeather ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {t('form.fetching')}
                </>
              ) : (
                <>
                  <MapPin className="w-4 h-4" />
                  {t('form.autoFill')}
                </>
              )}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {inputFields.map((field, index) => (
              <motion.div
                key={field.key}
                className="space-y-2"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
              >
                <Label htmlFor={field.key} className="flex items-center gap-2 text-foreground">
                  <field.icon className={`w-4 h-4 ${field.color}`} />
                  {t(field.labelKey)}
                </Label>
                <div className="relative">
                  <Input
                    id={field.key}
                    type="number"
                    step="0.1"
                    placeholder={field.placeholder}
                    value={formData[field.key]}
                    onChange={(e) => handleInputChange(field.key, e.target.value)}
                    className="pr-12"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    {field.unit}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              type="submit"
              variant="hero"
              size="lg"
              disabled={isAnalyzing}
              className="min-w-[200px]"
            >
              {isAnalyzing ? (
                <>
                  <motion.div
                    className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  {t('form.analyzing')}
                </>
              ) : (
                <>
                  <Leaf className="w-5 h-5" />
                  {t('form.analyze')}
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={resetForm}
              className="min-w-[150px]"
            >
              <RotateCcw className="w-4 h-4" />
              {t('form.reset')}
            </Button>
          </div>
        </motion.form>

        {/* Results */}
        <AnimatePresence>
          {results && <CropResult crops={results as any} />}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CropRecommendationForm;
