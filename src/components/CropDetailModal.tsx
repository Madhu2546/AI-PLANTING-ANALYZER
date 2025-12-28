import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { X, Thermometer, Droplets, Calendar, Leaf, FlaskConical, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CropDetails } from "@/data/cropDetails";

interface CropDetailModalProps {
  crop: CropDetails;
  onClose: () => void;
}

const CropDetailModal = ({ crop, onClose }: CropDetailModalProps) => {
  const { t } = useTranslation();

  const details = [
    { icon: Calendar, label: t("cropDetails.season"), value: crop.season },
    { icon: Clock, label: t("cropDetails.growingPeriod"), value: crop.growingPeriod },
    { icon: Droplets, label: t("cropDetails.waterRequirement"), value: crop.waterRequirement },
    { icon: Leaf, label: t("cropDetails.soilType"), value: crop.soilType },
    { icon: Thermometer, label: t("cropDetails.optimalTemp"), value: crop.optimalTemp },
    { icon: Droplets, label: t("cropDetails.optimalHumidity"), value: crop.optimalHumidity },
    { icon: FlaskConical, label: t("cropDetails.optimalPh"), value: crop.optimalPh },
    { icon: FlaskConical, label: t("cropDetails.npk"), value: crop.npk },
  ];

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-card rounded-2xl shadow-card border border-border max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <span className="text-6xl">{crop.icon}</span>
              <div>
                <h2 className="font-serif text-3xl font-bold text-foreground">{crop.name}</h2>
                <p className="text-muted-foreground">{t("cropDetails.expectedYield")}: {crop.expectedYield}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          <p className="text-muted-foreground mb-6">{crop.description}</p>

          <h3 className="font-serif text-xl font-bold text-foreground mb-4">{t("cropDetails.growingConditions")}</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {details.map((detail, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <detail.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{detail.label}</p>
                  <p className="font-medium text-foreground">{detail.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-end">
            <Button onClick={onClose}>{t("cropDetails.close")}</Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CropDetailModal;
