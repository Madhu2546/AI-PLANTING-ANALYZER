import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, TrendingUp, TrendingDown, IndianRupee, Wheat, Package, Tractor, FileDown } from "lucide-react";
import { exportProfitReportToPDF } from "@/utils/pdfExport";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CropData {
  name: string;
  avgYield: number; // quintal per hectare
  avgPrice: number; // Rs per quintal
  seedCost: number; // Rs per hectare
  fertilizerCost: number;
  laborCost: number;
  irrigationCost: number;
  pesticideCost: number;
  otherCosts: number;
}

const cropDatabase: CropData[] = [
  { name: "Rice", avgYield: 40, avgPrice: 2200, seedCost: 1500, fertilizerCost: 8000, laborCost: 15000, irrigationCost: 5000, pesticideCost: 3000, otherCosts: 2000 },
  { name: "Wheat", avgYield: 35, avgPrice: 2125, seedCost: 2000, fertilizerCost: 6000, laborCost: 12000, irrigationCost: 4000, pesticideCost: 2000, otherCosts: 1500 },
  { name: "Maize", avgYield: 50, avgPrice: 1962, seedCost: 2500, fertilizerCost: 7000, laborCost: 10000, irrigationCost: 3500, pesticideCost: 2500, otherCosts: 1500 },
  { name: "Cotton", avgYield: 18, avgPrice: 6620, seedCost: 3000, fertilizerCost: 10000, laborCost: 20000, irrigationCost: 6000, pesticideCost: 8000, otherCosts: 3000 },
  { name: "Sugarcane", avgYield: 700, avgPrice: 315, seedCost: 8000, fertilizerCost: 15000, laborCost: 30000, irrigationCost: 10000, pesticideCost: 5000, otherCosts: 5000 },
  { name: "Soybean", avgYield: 15, avgPrice: 4600, seedCost: 4000, fertilizerCost: 5000, laborCost: 8000, irrigationCost: 2000, pesticideCost: 3000, otherCosts: 1000 },
  { name: "Groundnut", avgYield: 18, avgPrice: 5550, seedCost: 6000, fertilizerCost: 6000, laborCost: 12000, irrigationCost: 3000, pesticideCost: 2500, otherCosts: 1500 },
  { name: "Chickpea", avgYield: 12, avgPrice: 5335, seedCost: 3500, fertilizerCost: 4000, laborCost: 8000, irrigationCost: 2000, pesticideCost: 2000, otherCosts: 1000 },
  { name: "Mustard", avgYield: 14, avgPrice: 5450, seedCost: 1000, fertilizerCost: 4000, laborCost: 7000, irrigationCost: 2500, pesticideCost: 1500, otherCosts: 1000 },
  { name: "Potato", avgYield: 250, avgPrice: 1200, seedCost: 40000, fertilizerCost: 12000, laborCost: 25000, irrigationCost: 8000, pesticideCost: 6000, otherCosts: 4000 },
  { name: "Onion", avgYield: 200, avgPrice: 1500, seedCost: 25000, fertilizerCost: 10000, laborCost: 20000, irrigationCost: 6000, pesticideCost: 4000, otherCosts: 3000 },
  { name: "Tomato", avgYield: 300, avgPrice: 1800, seedCost: 8000, fertilizerCost: 15000, laborCost: 30000, irrigationCost: 8000, pesticideCost: 8000, otherCosts: 5000 },
];

const ProfitCalculator = () => {
  const [selectedCrop, setSelectedCrop] = useState<string>("");
  const [landArea, setLandArea] = useState<string>("1");
  const [expectedYield, setExpectedYield] = useState<string>("");
  const [marketPrice, setMarketPrice] = useState<string>("");
  const [seedCost, setSeedCost] = useState<string>("");
  const [fertilizerCost, setFertilizerCost] = useState<string>("");
  const [laborCost, setLaborCost] = useState<string>("");
  const [irrigationCost, setIrrigationCost] = useState<string>("");
  const [pesticideCost, setPesticideCost] = useState<string>("");
  const [otherCosts, setOtherCosts] = useState<string>("");
  const [showResults, setShowResults] = useState(false);

  const handleCropSelect = (cropName: string) => {
    setSelectedCrop(cropName);
    const crop = cropDatabase.find(c => c.name === cropName);
    if (crop) {
      setExpectedYield(crop.avgYield.toString());
      setMarketPrice(crop.avgPrice.toString());
      setSeedCost(crop.seedCost.toString());
      setFertilizerCost(crop.fertilizerCost.toString());
      setLaborCost(crop.laborCost.toString());
      setIrrigationCost(crop.irrigationCost.toString());
      setPesticideCost(crop.pesticideCost.toString());
      setOtherCosts(crop.otherCosts.toString());
    }
  };

  const calculateProfit = () => {
    const area = parseFloat(landArea) || 0;
    const yield_ = parseFloat(expectedYield) || 0;
    const price = parseFloat(marketPrice) || 0;
    const seeds = parseFloat(seedCost) || 0;
    const fertilizer = parseFloat(fertilizerCost) || 0;
    const labor = parseFloat(laborCost) || 0;
    const irrigation = parseFloat(irrigationCost) || 0;
    const pesticide = parseFloat(pesticideCost) || 0;
    const other = parseFloat(otherCosts) || 0;

    const totalRevenue = yield_ * price * area;
    const totalCosts = (seeds + fertilizer + labor + irrigation + pesticide + other) * area;
    const netProfit = totalRevenue - totalCosts;
    const profitMargin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;
    const costPerQuintal = yield_ > 0 ? totalCosts / (yield_ * area) : 0;
    const breakEvenPrice = yield_ > 0 ? totalCosts / (yield_ * area) : 0;

    return {
      totalRevenue,
      totalCosts,
      netProfit,
      profitMargin,
      costPerQuintal,
      breakEvenPrice,
      isProfitable: netProfit > 0
    };
  };

  const results = calculateProfit();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <section id="profit-calculator" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <Calculator className="w-4 h-4" />
            <span className="text-sm font-medium">Financial Planning</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Crop Profit Calculator
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Estimate your potential profits by calculating expected revenue against input costs. Make informed decisions for your farming business.
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
                  <Wheat className="w-5 h-5 text-primary" />
                  Enter Crop Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Crop Selection */}
                <div className="space-y-2">
                  <Label>Select Crop (auto-fills average values)</Label>
                  <Select value={selectedCrop} onValueChange={handleCropSelect}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a crop" />
                    </SelectTrigger>
                    <SelectContent>
                      {cropDatabase.map(crop => (
                        <SelectItem key={crop.name} value={crop.name}>
                          {crop.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Land Area */}
                <div className="space-y-2">
                  <Label>Land Area (Hectares)</Label>
                  <Input
                    type="number"
                    value={landArea}
                    onChange={(e) => setLandArea(e.target.value)}
                    placeholder="e.g., 2"
                    min="0.1"
                    step="0.1"
                  />
                </div>

                {/* Revenue Section */}
                <div className="space-y-4">
                  <h4 className="font-medium text-foreground flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    Expected Revenue
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Expected Yield (Quintal/ha)</Label>
                      <Input
                        type="number"
                        value={expectedYield}
                        onChange={(e) => setExpectedYield(e.target.value)}
                        placeholder="e.g., 40"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Market Price (₹/Quintal)</Label>
                      <Input
                        type="number"
                        value={marketPrice}
                        onChange={(e) => setMarketPrice(e.target.value)}
                        placeholder="e.g., 2200"
                      />
                    </div>
                  </div>
                </div>

                {/* Costs Section */}
                <div className="space-y-4">
                  <h4 className="font-medium text-foreground flex items-center gap-2">
                    <Package className="w-4 h-4 text-red-600" />
                    Input Costs (₹ per Hectare)
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Seeds</Label>
                      <Input
                        type="number"
                        value={seedCost}
                        onChange={(e) => setSeedCost(e.target.value)}
                        placeholder="e.g., 1500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Fertilizers</Label>
                      <Input
                        type="number"
                        value={fertilizerCost}
                        onChange={(e) => setFertilizerCost(e.target.value)}
                        placeholder="e.g., 8000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Labor</Label>
                      <Input
                        type="number"
                        value={laborCost}
                        onChange={(e) => setLaborCost(e.target.value)}
                        placeholder="e.g., 15000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Irrigation</Label>
                      <Input
                        type="number"
                        value={irrigationCost}
                        onChange={(e) => setIrrigationCost(e.target.value)}
                        placeholder="e.g., 5000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Pesticides</Label>
                      <Input
                        type="number"
                        value={pesticideCost}
                        onChange={(e) => setPesticideCost(e.target.value)}
                        placeholder="e.g., 3000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Other Costs</Label>
                      <Input
                        type="number"
                        value={otherCosts}
                        onChange={(e) => setOtherCosts(e.target.value)}
                        placeholder="e.g., 2000"
                      />
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => setShowResults(true)}
                  className="w-full"
                  size="lg"
                >
                  <Calculator className="w-4 h-4 mr-2" />
                  Calculate Profit
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
            <Card className={`h-full ${showResults ? '' : 'opacity-60'}`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tractor className="w-5 h-5 text-primary" />
                  Profit Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Main Profit Card */}
                <div className={`p-6 rounded-xl ${results.isProfitable ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                  <div className="flex items-center gap-3 mb-2">
                    {results.isProfitable ? (
                      <TrendingUp className="w-8 h-8 text-green-600" />
                    ) : (
                      <TrendingDown className="w-8 h-8 text-red-600" />
                    )}
                    <span className={`text-sm font-medium ${results.isProfitable ? 'text-green-600' : 'text-red-600'}`}>
                      {results.isProfitable ? 'Profitable' : 'Loss'}
                    </span>
                  </div>
                  <div className={`text-3xl font-bold ${results.isProfitable ? 'text-green-700' : 'text-red-700'}`}>
                    {formatCurrency(results.netProfit)}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Net Profit / Loss</p>
                </div>

                {/* Breakdown Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <IndianRupee className="w-4 h-4" />
                      Total Revenue
                    </div>
                    <p className="text-xl font-semibold text-green-600">
                      {formatCurrency(results.totalRevenue)}
                    </p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <Package className="w-4 h-4" />
                      Total Costs
                    </div>
                    <p className="text-xl font-semibold text-red-600">
                      {formatCurrency(results.totalCosts)}
                    </p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">Profit Margin</div>
                    <p className={`text-xl font-semibold ${results.profitMargin >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {results.profitMargin.toFixed(1)}%
                    </p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">Break-even Price</div>
                    <p className="text-xl font-semibold text-foreground">
                      ₹{results.breakEvenPrice.toFixed(0)}/Q
                    </p>
                  </div>
                </div>

                {/* Tips */}
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <h4 className="font-medium text-foreground mb-2">💡 Tips to Improve Profitability</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Sell when market prices are above {formatCurrency(results.breakEvenPrice)} per quintal</li>
                    <li>• Consider organic certification for premium pricing</li>
                    <li>• Group purchasing of inputs can reduce costs by 10-15%</li>
                    <li>• Explore government subsidies for seeds and fertilizers</li>
                  </ul>
                </div>

                {showResults && selectedCrop && (
                  <Button
                    variant="outline"
                    className="w-full gap-2"
                    onClick={() => {
                      exportProfitReportToPDF({
                        cropName: selectedCrop,
                        landArea: parseFloat(landArea) || 0,
                        expectedYield: parseFloat(expectedYield) || 0,
                        marketPrice: parseFloat(marketPrice) || 0,
                        totalRevenue: results.totalRevenue,
                        totalCosts: results.totalCosts,
                        netProfit: results.netProfit,
                        profitMargin: results.profitMargin,
                        costs: {
                          seeds: parseFloat(seedCost) || 0,
                          fertilizer: parseFloat(fertilizerCost) || 0,
                          labor: parseFloat(laborCost) || 0,
                          irrigation: parseFloat(irrigationCost) || 0,
                          pesticide: parseFloat(pesticideCost) || 0,
                          other: parseFloat(otherCosts) || 0,
                        },
                      });
                    }}
                  >
                    <FileDown className="w-4 h-4" />
                    Download PDF Report
                  </Button>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProfitCalculator;
