import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Trophy, Medal, Eye, FileDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import CropDetailModal from "./CropDetailModal";
import { cropDetails } from "@/data/cropDetails";
import { cropImages } from "@/data/cropImages";
import { exportCropRecommendationToPDF } from "@/utils/pdfExport";

interface CropWithScore {
  name: string;
  icon: string;
  matchScore: number;
}

interface CropResultProps {
  crops: CropWithScore[];
}

const CropResult = ({ crops }: CropResultProps) => {
  const { t } = useTranslation();
  const [selectedCrop, setSelectedCrop] = useState<string | null>(null);

  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-leaf bg-leaf/10 border-leaf/30";
    if (score >= 50) return "text-sun bg-sun/10 border-sun/30";
    return "text-muted-foreground bg-muted border-border";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 85) return { label: t('results.excellentMatch'), icon: Trophy };
    if (score >= 70) return { label: t('results.goodMatch'), icon: CheckCircle2 };
    if (score >= 50) return { label: t('results.moderateMatch'), icon: Medal };
    return { label: t('results.lowMatch'), icon: AlertCircle };
  };

  const topCrops = crops.slice(0, 3);
  const otherCrops = crops.slice(3);

  const selectedCropDetails = selectedCrop ? cropDetails[selectedCrop] : null;

  return (
    <>
      <motion.div
        className="mt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <h3 className="font-serif text-3xl font-bold text-center text-foreground mb-8">
          {t('results.title')}
        </h3>

        {/* Top 3 Recommendations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {topCrops.map((crop, index) => {
            const scoreInfo = getScoreLabel(crop.matchScore);
            const ScoreIcon = scoreInfo.icon;
            const cropImage = cropImages[crop.name];
            
            return (
              <motion.div
                key={crop.name}
                className={`relative bg-card rounded-2xl p-6 shadow-card border-2 ${
                  index === 0 ? "border-primary md:scale-105 md:-translate-y-2" : "border-border"
                }`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: index === 0 ? 1.05 : 1 }}
                transition={{ delay: index * 0.1 }}
              >
                {index === 0 && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-semibold rounded-full">
                    {t('results.bestMatch')}
                  </div>
                )}
                
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden shadow-lg border-4 border-primary/20">
                    <img 
                      src={cropImage} 
                      alt={crop.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="font-serif text-2xl font-bold text-foreground mb-2">
                    {crop.name}
                  </h4>
                  
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${getScoreColor(crop.matchScore)}`}>
                    <ScoreIcon className="w-4 h-4" />
                    <span className="font-medium">{scoreInfo.label}</span>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-1">
                      <span>{t('results.matchScore')}</span>
                      <span className="font-semibold text-foreground">{Math.round(crop.matchScore)}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${
                          crop.matchScore >= 70 ? "bg-primary" : crop.matchScore >= 50 ? "bg-sun" : "bg-muted-foreground"
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${crop.matchScore}%` }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                      />
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4"
                    onClick={() => setSelectedCrop(crop.name)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    {t('results.viewDetails')}
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Other Recommendations */}
        <motion.div
          className="bg-card rounded-2xl p-6 shadow-card border border-border"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h4 className="font-serif text-xl font-bold text-foreground mb-4">
            {t('results.otherCrops')}
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {otherCrops.map((crop, index) => {
              const cropImage = cropImages[crop.name];
              return (
                <motion.div
                  key={crop.name}
                  className={`flex flex-col items-center p-3 rounded-xl border transition-colors hover:border-primary/50 cursor-pointer ${getScoreColor(crop.matchScore)}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.03 }}
                  onClick={() => setSelectedCrop(crop.name)}
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden shadow-md mb-2 border-2 border-primary/10">
                    <img 
                      src={cropImage} 
                      alt={crop.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-medium text-foreground text-center">{crop.name}</span>
                  <span className="text-xs text-muted-foreground">{Math.round(crop.matchScore)}%</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {selectedCropDetails && (
          <CropDetailModal
            crop={selectedCropDetails}
            onClose={() => setSelectedCrop(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default CropResult;
