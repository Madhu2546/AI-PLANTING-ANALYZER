import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cropCalendar, monthNames, seasonColors, CropCalendarEntry } from "@/data/cropCalendar";
import { cropImages } from "@/data/cropImages";
import { Calendar, Sprout, Wheat } from "lucide-react";

const SeasonalCalendar = () => {
  const { t } = useTranslation();
  const [selectedSeason, setSelectedSeason] = useState<string>("all");

  const filteredCrops = selectedSeason === "all" 
    ? cropCalendar 
    : cropCalendar.filter(c => c.season === selectedSeason);

  const currentMonth = new Date().getMonth();

  const getCropsForMonth = (monthIndex: number, type: "planting" | "harvest") => {
    return cropCalendar.filter(crop => 
      type === "planting" 
        ? crop.plantingMonths.includes(monthIndex)
        : crop.harvestMonths.includes(monthIndex)
    );
  };

  const currentPlanting = getCropsForMonth(currentMonth, "planting");
  const currentHarvest = getCropsForMonth(currentMonth, "harvest");

  return (
    <section id="crop-calendar" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calendar className="h-8 w-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {t("Seasonal Crop Calendar")}
            </h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("Plan your farming with the best planting and harvesting times throughout the year")}
          </p>
        </div>

        {/* Current Month Highlights */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <Card className="border-green-500/30 bg-green-500/5">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Sprout className="h-5 w-5 text-green-600" />
                <h3 className="font-semibold text-foreground">
                  Plant Now ({monthNames[currentMonth]})
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {currentPlanting.length > 0 ? currentPlanting.map(crop => (
                  <Badge key={crop.crop} variant="outline" className="bg-green-500/10 border-green-500/30">
                    {crop.crop}
                  </Badge>
                )) : (
                  <span className="text-muted-foreground text-sm">No major planting this month</span>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border-amber-500/30 bg-amber-500/5">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Wheat className="h-5 w-5 text-amber-600" />
                <h3 className="font-semibold text-foreground">
                  Harvest Now ({monthNames[currentMonth]})
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {currentHarvest.length > 0 ? currentHarvest.map(crop => (
                  <Badge key={crop.crop} variant="outline" className="bg-amber-500/10 border-amber-500/30">
                    {crop.crop}
                  </Badge>
                )) : (
                  <span className="text-muted-foreground text-sm">No major harvests this month</span>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Season Filter */}
        <Tabs value={selectedSeason} onValueChange={setSelectedSeason} className="mb-6">
          <TabsList className="grid w-full max-w-lg mx-auto grid-cols-5">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="Kharif">Kharif</TabsTrigger>
            <TabsTrigger value="Rabi">Rabi</TabsTrigger>
            <TabsTrigger value="Zaid">Zaid</TabsTrigger>
            <TabsTrigger value="Year-round">Year-round</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Calendar Grid */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[900px]">
            <thead>
              <tr>
                <th className="text-left p-3 bg-card border-b font-semibold text-foreground sticky left-0 z-10 min-w-[140px]">
                  Crop
                </th>
                {monthNames.map((month, idx) => (
                  <th 
                    key={month} 
                    className={`p-3 bg-card border-b text-center font-medium text-foreground min-w-[60px] ${
                      idx === currentMonth ? "bg-primary/10" : ""
                    }`}
                  >
                    {month}
                  </th>
                ))}
                <th className="p-3 bg-card border-b text-center font-semibold text-foreground min-w-[100px]">
                  Season
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCrops.map((crop, idx) => (
                <tr key={crop.crop} className={idx % 2 === 0 ? "bg-muted/20" : "bg-card"}>
                  <td className="p-3 border-b sticky left-0 z-10 bg-inherit">
                    <div className="flex items-center gap-2">
                      <img 
                        src={cropImages[crop.crop]} 
                        alt={crop.crop}
                        className="w-8 h-8 object-cover rounded"
                      />
                      <span className="font-medium text-foreground text-sm">{crop.crop}</span>
                    </div>
                  </td>
                  {monthNames.map((_, monthIdx) => {
                    const isPlanting = crop.plantingMonths.includes(monthIdx);
                    const isHarvest = crop.harvestMonths.includes(monthIdx);
                    const isCurrent = monthIdx === currentMonth;
                    
                    return (
                      <td 
                        key={monthIdx} 
                        className={`p-1 border-b text-center ${isCurrent ? "bg-primary/5" : ""}`}
                      >
                        {isPlanting && isHarvest ? (
                          <div className="flex gap-0.5 justify-center">
                            <div className="w-3 h-3 rounded-full bg-green-500" title="Planting" />
                            <div className="w-3 h-3 rounded-full bg-amber-500" title="Harvest" />
                          </div>
                        ) : isPlanting ? (
                          <div className="w-3 h-3 rounded-full bg-green-500 mx-auto" title="Planting" />
                        ) : isHarvest ? (
                          <div className="w-3 h-3 rounded-full bg-amber-500 mx-auto" title="Harvest" />
                        ) : null}
                      </td>
                    );
                  })}
                  <td className="p-3 border-b text-center">
                    <Badge className={`${seasonColors[crop.season]} text-white text-xs`}>
                      {crop.season}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-6 mt-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-500" />
            <span className="text-sm text-muted-foreground">Planting Time</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-amber-500" />
            <span className="text-sm text-muted-foreground">Harvest Time</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeasonalCalendar;
