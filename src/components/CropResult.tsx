import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle, Trophy, Medal } from "lucide-react";

interface CropWithScore {
  name: string;
  icon: string;
  matchScore: number;
}

interface CropResultProps {
  crops: CropWithScore[];
}

const CropResult = ({ crops }: CropResultProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-leaf bg-leaf/10 border-leaf/30";
    if (score >= 50) return "text-sun bg-sun/10 border-sun/30";
    return "text-muted-foreground bg-muted border-border";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 85) return { label: "Excellent Match", icon: Trophy };
    if (score >= 70) return { label: "Good Match", icon: CheckCircle2 };
    if (score >= 50) return { label: "Moderate Match", icon: Medal };
    return { label: "Low Match", icon: AlertCircle };
  };

  const topCrops = crops.slice(0, 3);
  const otherCrops = crops.slice(3);

  return (
    <motion.div
      className="mt-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h3 className="font-serif text-3xl font-bold text-center text-foreground mb-8">
        Recommended Crops for Your Land
      </h3>

      {/* Top 3 Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {topCrops.map((crop, index) => {
          const scoreInfo = getScoreLabel(crop.matchScore);
          const ScoreIcon = scoreInfo.icon;
          
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
                  Best Match
                </div>
              )}
              
              <div className="text-center">
                <div className="text-6xl mb-4">{crop.icon}</div>
                <h4 className="font-serif text-2xl font-bold text-foreground mb-2">
                  {crop.name}
                </h4>
                
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${getScoreColor(crop.matchScore)}`}>
                  <ScoreIcon className="w-4 h-4" />
                  <span className="font-medium">{scoreInfo.label}</span>
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-1">
                    <span>Match Score</span>
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
          Other Suitable Crops
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {otherCrops.map((crop, index) => (
            <motion.div
              key={crop.name}
              className={`flex flex-col items-center p-3 rounded-xl border transition-colors hover:border-primary/50 ${getScoreColor(crop.matchScore)}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + index * 0.03 }}
            >
              <span className="text-3xl mb-1">{crop.icon}</span>
              <span className="text-sm font-medium text-foreground text-center">{crop.name}</span>
              <span className="text-xs text-muted-foreground">{Math.round(crop.matchScore)}%</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CropResult;
