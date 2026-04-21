import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Bug, AlertTriangle, Shield, Pill, Search, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cropDiseases, getSeverityColor, Disease } from "@/data/cropDiseases";

const CropDiseases = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCrop, setSelectedCrop] = useState<string>("all");
  const [expandedDisease, setExpandedDisease] = useState<string | null>(null);

  // Get unique crops from diseases
  const affectedCrops = Array.from(
    new Set(cropDiseases.flatMap(d => d.affectedCrops))
  ).sort();

  const filteredDiseases = cropDiseases.filter(disease => {
    const matchesSearch = disease.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      disease.affectedCrops.some(crop => crop.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCrop = selectedCrop === "all" || disease.affectedCrops.includes(selectedCrop);
    return matchesSearch && matchesCrop;
  });

  const toggleExpand = (diseaseId: string) => {
    setExpandedDisease(expandedDisease === diseaseId ? null : diseaseId);
  };

  return (
    <section id="crop-diseases" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-4 py-2 rounded-full mb-4">
            <Bug className="w-4 h-4" />
            <span className="text-sm font-medium">{t('diseases.badge')}</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('diseases.title')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('diseases.description')}
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 max-w-2xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder={t('diseases.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCrop} onValueChange={setSelectedCrop}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder={t('diseases.filterByCrop')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('diseases.allCrops')}</SelectItem>
              {affectedCrops.map(crop => (
                <SelectItem key={crop} value={crop}>{t(`crops.${crop}`, crop)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Disease Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredDiseases.map((disease, index) => (
            <DiseaseCard
              key={disease.id}
              disease={disease}
              index={index}
              isExpanded={expandedDisease === disease.id}
              onToggle={() => toggleExpand(disease.id)}
            />
          ))}
        </div>

        {filteredDiseases.length === 0 && (
          <div className="text-center py-12">
            <Bug className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">{t('diseases.noResults')}</p>
          </div>
        )}
      </div>
    </section>
  );
};

interface DiseaseCardProps {
  disease: Disease;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

const DiseaseCard = ({ disease, index, isExpanded, onToggle }: DiseaseCardProps) => {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="h-full hover:shadow-lg transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg font-semibold">{t(`diseaseGuide.${disease.id}.name`, disease.name)}</CardTitle>
            <Badge className={getSeverityColor(disease.severity)}>
              {t(`severity.${disease.severity}`, disease.severity.toUpperCase())}
            </Badge>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {disease.affectedCrops.map(crop => (
              <Badge key={crop} variant="outline" className="text-xs">
                {t(`crops.${crop}`, crop)}
              </Badge>
            ))}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Symptoms - Always visible */}
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
              <AlertTriangle className="w-4 h-4 text-yellow-600" />
              {t('diseases.symptoms')}
            </div>
            <ul className="text-sm text-muted-foreground space-y-1">
              {disease.symptoms.slice(0, 2).map((symptom, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-yellow-600 mt-1">•</span>
                  {t(`diseaseGuide.${disease.id}.symptoms.${i}`, symptom)}
                </li>
              ))}
            </ul>
          </div>

          {/* Expanded Content */}
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4"
            >
              {/* All Symptoms */}
              {disease.symptoms.length > 2 && (
                <ul className="text-sm text-muted-foreground space-y-1">
                  {disease.symptoms.slice(2).map((symptom, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-yellow-600 mt-1">•</span>
                      {t(`diseaseGuide.${disease.id}.symptoms.${i + 2}`, symptom)}
                    </li>
                  ))}
                </ul>
              )}

              {/* Causes */}
              <div>
                <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                  <Bug className="w-4 h-4 text-red-600" />
                  {t('diseases.causes')}
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {disease.causes.map((cause, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-red-600 mt-1">•</span>
                      {t(`diseaseGuide.${disease.id}.causes.${i}`, cause)}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Treatment */}
              <div>
                <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                  <Pill className="w-4 h-4 text-blue-600" />
                  {t('diseases.treatment')}
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {disease.treatment.map((treat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      {t(`diseaseGuide.${disease.id}.treatment.${i}`, treat)}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Prevention */}
              <div>
                <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                  <Shield className="w-4 h-4 text-green-600" />
                  {t('diseases.prevention')}
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {disease.prevention.map((prev, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">•</span>
                      {t(`diseaseGuide.${disease.id}.prevention.${i}`, prev)}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="w-full mt-2"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-4 h-4 mr-2" />
                {t('diseases.showLess')}
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 mr-2" />
                {t('diseases.viewDetails')}
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CropDiseases;
