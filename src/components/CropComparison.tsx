import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cropDetails, CropDetails } from "@/data/cropDetails";
import { cropImages } from "@/data/cropImages";
import { Scale, X, Plus } from "lucide-react";

const CropComparison = () => {
  const { t } = useTranslation();
  const [selectedCrops, setSelectedCrops] = useState<string[]>([]);
  const allCrops = Object.keys(cropDetails);

  const addCrop = (cropName: string) => {
    if (selectedCrops.length < 4 && !selectedCrops.includes(cropName)) {
      setSelectedCrops([...selectedCrops, cropName]);
    }
  };

  const removeCrop = (cropName: string) => {
    setSelectedCrops(selectedCrops.filter(c => c !== cropName));
  };

  const availableCrops = allCrops.filter(c => !selectedCrops.includes(c));

  const comparisonFields: { key: keyof CropDetails; label: string }[] = [
    { key: "season", label: t("compare.season") },
    { key: "growingPeriod", label: t("compare.growingPeriod") },
    { key: "waterRequirement", label: t("compare.waterRequirement") },
    { key: "soilType", label: t("compare.soilType") },
    { key: "expectedYield", label: t("compare.expectedYield") },
    { key: "optimalTemp", label: t("compare.temperature") },
    { key: "optimalHumidity", label: t("compare.humidity") },
    { key: "optimalPh", label: t("compare.phRange") },
    { key: "npk", label: t("compare.npk") },
  ];

  return (
    <section id="crop-comparison" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Scale className="h-8 w-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {t("compare.title")}
            </h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("compare.description")}
          </p>
        </div>

        {/* Crop Selection */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          <Select onValueChange={addCrop} value="">
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder={t("compare.addPlaceholder")} />
            </SelectTrigger>
            <SelectContent>
              {availableCrops.map(crop => (
                <SelectItem key={crop} value={crop}>
                  {crop}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex flex-wrap gap-2">
            {selectedCrops.map(crop => (
              <Badge key={crop} variant="secondary" className="px-3 py-1.5 text-sm flex items-center gap-2">
                {crop}
                <button onClick={() => removeCrop(crop)} className="hover:text-destructive">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>

          {selectedCrops.length > 0 && (
            <Button variant="outline" size="sm" onClick={() => setSelectedCrops([])}>
              {t("compare.clearAll")}
            </Button>
          )}
        </div>

        {selectedCrops.length === 0 ? (
          <Card className="max-w-lg mx-auto">
            <CardContent className="py-12 text-center">
              <Plus className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                {t("compare.selectPrompt")}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-4 bg-card border-b font-semibold text-foreground min-w-[160px]">
                    {t("compare.property")}
                  </th>
                  {selectedCrops.map(crop => (
                    <th key={crop} className="p-4 bg-card border-b min-w-[200px]">
                      <div className="flex flex-col items-center gap-2">
                        <img 
                          src={cropImages[crop]} 
                          alt={crop}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <span className="font-semibold text-foreground">{crop}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonFields.map((field, idx) => (
                  <tr key={field.key} className={idx % 2 === 0 ? "bg-muted/20" : "bg-card"}>
                    <td className="p-4 border-b font-medium text-foreground">
                      {field.label}
                    </td>
                    {selectedCrops.map(crop => (
                      <td key={crop} className="p-4 border-b text-center text-muted-foreground">
                        {cropDetails[crop]?.[field.key] || "-"}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="bg-muted/20">
                  <td className="p-4 border-b font-medium text-foreground">{t("compare.description2")}</td>
                  {selectedCrops.map(crop => (
                    <td key={crop} className="p-4 border-b text-sm text-muted-foreground">
                      {cropDetails[crop]?.description || "-"}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default CropComparison;
