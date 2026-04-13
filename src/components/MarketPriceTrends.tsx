import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { TrendingUp, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { cropPriceData, CropPriceData } from "@/data/marketPrices";

const CHART_COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--sun))",
  "hsl(var(--leaf))",
  "hsl(var(--water))",
  "hsl(var(--soil))",
  "#e11d48",
  "#8b5cf6",
  "#06b6d4",
];

const MarketPriceTrends = () => {
  const [selectedCrops, setSelectedCrops] = useState<string[]>(["Rice", "Wheat", "Cotton"]);

  const toggleCrop = (name: string) => {
    setSelectedCrops(prev =>
      prev.includes(name)
        ? prev.filter(c => c !== name)
        : prev.length < 4
        ? [...prev, name]
        : prev
    );
  };

  // Build merged data for recharts
  const years = cropPriceData[0].priceHistory.map(p => p.year);
  const chartData = years.map(year => {
    const point: Record<string, string | number> = { year };
    selectedCrops.forEach(crop => {
      const cd = cropPriceData.find(c => c.name === crop);
      const entry = cd?.priceHistory.find(p => p.year === year);
      if (entry) point[crop] = entry.price;
    });
    return point;
  });

  const getGrowth = (crop: CropPriceData) => {
    const h = crop.priceHistory;
    return (((h[h.length - 1].price - h[0].price) / h[0].price) * 100).toFixed(1);
  };

  return (
    <section id="market-trends" className="py-16 md:py-24 bg-secondary/20">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <BarChart3 className="w-4 h-4" />
            <span className="text-sm font-medium">Market Intelligence</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Market Price Trends
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Track MSP and market price trends for major crops over the years. Select up to 4 crops to compare.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto space-y-6">
          {/* Crop selector */}
          <div className="flex flex-wrap gap-2 justify-center">
            {cropPriceData.map(crop => (
              <Badge
                key={crop.name}
                variant={selectedCrops.includes(crop.name) ? "default" : "outline"}
                className="cursor-pointer text-sm px-4 py-2 transition-colors"
                onClick={() => toggleCrop(crop.name)}
              >
                {crop.name}
              </Badge>
            ))}
          </div>

          {/* Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Price Comparison (₹/Quintal)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                      formatter={(value: number) => [`₹${value.toLocaleString("en-IN")}`, ""]}
                    />
                    <Legend />
                    {selectedCrops.map((crop, i) => (
                      <Line
                        key={crop}
                        type="monotone"
                        dataKey={crop}
                        stroke={CHART_COLORS[cropPriceData.findIndex(c => c.name === crop) % CHART_COLORS.length]}
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Stats cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {selectedCrops.map(name => {
              const crop = cropPriceData.find(c => c.name === name)!;
              const growth = getGrowth(crop);
              return (
                <Card key={name}>
                  <CardContent className="p-4 text-center">
                    <p className="text-sm text-muted-foreground">{crop.name}</p>
                    <p className="text-2xl font-bold text-foreground mt-1">
                      ₹{crop.currentMSP.toLocaleString("en-IN")}
                    </p>
                    <p className="text-xs text-muted-foreground">Current MSP</p>
                    <div className="flex items-center justify-center gap-1 mt-2">
                      <TrendingUp className="w-3 h-3 text-primary" />
                      <span className="text-sm font-medium text-primary">+{growth}%</span>
                    </div>
                    <p className="text-xs text-muted-foreground">since 2018</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketPriceTrends;
