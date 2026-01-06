import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { stateRecommendations, indianStates } from "@/data/regionalCrops";
import { cropImages } from "@/data/cropImages";
import { MapPin, Thermometer, Mountain, CalendarDays } from "lucide-react";

const RegionalRecommendations = () => {
  const { t } = useTranslation();
  const [selectedState, setSelectedState] = useState<string>("");

  const stateData = selectedState ? stateRecommendations[selectedState] : null;

  return (
    <section id="regional-recommendations" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <MapPin className="h-8 w-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {t("Regional Crop Recommendations")}
            </h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("Get crop recommendations based on your state's climate and soil conditions")}
          </p>
        </div>

        {/* State Selection */}
        <div className="max-w-md mx-auto mb-10">
          <Select value={selectedState} onValueChange={setSelectedState}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select your state" />
            </SelectTrigger>
            <SelectContent>
              {indianStates.map(state => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {!selectedState ? (
          <Card className="max-w-lg mx-auto">
            <CardContent className="py-12 text-center">
              <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                Select your state to see recommended crops for your region
              </p>
            </CardContent>
          </Card>
        ) : stateData && (
          <div className="max-w-4xl mx-auto">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <MapPin className="h-6 w-6 text-primary" />
                  {stateData.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="flex items-start gap-3">
                    <Thermometer className="h-5 w-5 text-orange-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-foreground">Climate</h4>
                      <p className="text-sm text-muted-foreground">{stateData.climate}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mountain className="h-5 w-5 text-amber-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-foreground">Soil Types</h4>
                      <p className="text-sm text-muted-foreground">{stateData.soilTypes.join(", ")}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CalendarDays className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-foreground">Best Season</h4>
                      <p className="text-sm text-muted-foreground">{stateData.bestSeason}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <h3 className="text-xl font-semibold text-foreground mb-4">
              Recommended Crops for {stateData.name}
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {stateData.majorCrops.map(crop => (
                <Card key={crop} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-square relative">
                    <img 
                      src={cropImages[crop] || "/placeholder.svg"} 
                      alt={crop}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <h4 className="font-semibold text-white text-center">{crop}</h4>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/20">
              <p className="text-sm text-muted-foreground text-center">
                💡 <strong>Tip:</strong> These recommendations are based on general climate and soil conditions. 
                For precise recommendations, use the Crop Recommendation System above with your specific soil parameters.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default RegionalRecommendations;
