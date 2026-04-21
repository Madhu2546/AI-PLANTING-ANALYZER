import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { RotateCcw, ArrowRight, Leaf, AlertCircle, Calendar, Plus, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cropRotationData, generateRotationPlan, getSeasonColor, getNutrientColor, RotationPlan } from "@/data/cropRotation";

const CropRotationPlanner = () => {
  const { t } = useTranslation();
  const [selectedCrop, setSelectedCrop] = useState<string>("");
  const [rotationYears, setRotationYears] = useState<number>(4);
  const [rotationPlan, setRotationPlan] = useState<RotationPlan[]>([]);
  const [showDetails, setShowDetails] = useState(false);

  const handleGeneratePlan = () => {
    if (selectedCrop) {
      const plan = generateRotationPlan(selectedCrop, rotationYears);
      setRotationPlan(plan);
      setShowDetails(true);
    }
  };

  const selectedCropData = cropRotationData.find(c => c.crop === selectedCrop);

  return (
    <section id="crop-rotation" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <RotateCcw className="w-4 h-4" />
            <span className="text-sm font-medium">{t('rotation.badge')}</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('rotation.title')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('rotation.description')}
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Selection Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-primary" />
                  {t('rotation.startTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">{t('rotation.startingCrop')}</label>
                    <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                      <SelectTrigger>
                        <SelectValue placeholder={t('rotation.selectCrop')} />
                      </SelectTrigger>
                      <SelectContent>
                        {cropRotationData.map(crop => (
                          <SelectItem key={crop.crop} value={crop.crop}>
                            {t(`crops.${crop.crop}`, crop.crop)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">{t('rotation.planDuration')}</label>
                    <Select 
                      value={rotationYears.toString()} 
                      onValueChange={(v) => setRotationYears(parseInt(v))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">{t('rotation.years2')}</SelectItem>
                        <SelectItem value="3">{t('rotation.years3')}</SelectItem>
                        <SelectItem value="4">{t('rotation.years4')}</SelectItem>
                        <SelectItem value="5">{t('rotation.years5')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end">
                    <Button 
                      onClick={handleGeneratePlan}
                      disabled={!selectedCrop}
                      className="w-full"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      {t('rotation.generatePlan')}
                    </Button>
                  </div>
                </div>

                {/* Crop Details */}
                {selectedCropData && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-6 p-4 bg-muted/50 rounded-lg"
                  >
                    <h4 className="font-medium text-foreground mb-3">{t('rotation.cropInfo')}: {t(`crops.${selectedCropData.crop}`, selectedCropData.crop)}</h4>
                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">{t('rotation.family')}:</span>
                        <p className="font-medium">{t(`rotationData.${selectedCropData.crop}.family`, selectedCropData.family)}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">{t('rotation.nutrientEffect')}:</span>
                        <p className={`font-medium ${getNutrientColor(selectedCropData.nutrientEffect)}`}>
                          {t(`nutrientEffect.${selectedCropData.nutrientEffect}`, selectedCropData.nutrientEffect)}
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">{t('rotation.restPeriod')}:</span>
                        <p className="font-medium">{selectedCropData.restPeriod} {t('rotation.yearsUnit')}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">{t('rotation.season')}:</span>
                        <Badge className={getSeasonColor(selectedCropData.seasonType)}>
                          {t(`calendar.${selectedCropData.seasonType}`, selectedCropData.seasonType.toUpperCase())}
                        </Badge>
                      </div>
                    </div>
                    <div className="mt-3">
                      <span className="text-muted-foreground text-sm">{t('rotation.soilImpact')}:</span>
                      <p className="text-sm">{t(`rotationData.${selectedCropData.crop}.soilImpact`, selectedCropData.soilImpact)}</p>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Rotation Plan Timeline */}
          {showDetails && rotationPlan.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    {t('rotation.yourPlan', { years: rotationYears })}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Timeline View */}
                  <div className="relative">
                    {Array.from({ length: rotationYears }, (_, yearIndex) => (
                      <div key={yearIndex} className="mb-8 last:mb-0">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                            Y{yearIndex + 1}
                          </div>
                          <h4 className="text-lg font-semibold">{t('rotation.year')} {yearIndex + 1}</h4>
                        </div>
                        
                        <div className="ml-5 pl-8 border-l-2 border-primary/20 space-y-4">
                          {rotationPlan
                            .filter(p => p.year === yearIndex + 1)
                            .map((plan, index) => (
                              <motion.div
                                key={`${plan.year}-${plan.season}`}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="relative"
                              >
                                <div className="absolute -left-[2.55rem] w-4 h-4 rounded-full bg-card border-2 border-primary" />
                                <Card className="ml-4">
                                  <CardContent className="p-4">
                                    <div className="flex flex-wrap items-center gap-3 mb-2">
                                      <Badge className={getSeasonColor(plan.season)}>
                                        {t(`calendar.${plan.season}`, plan.season)}
                                      </Badge>
                                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                                      <span className="font-semibold text-foreground">{t(`crops.${plan.crop}`, plan.crop)}</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{t(`rotationData.${plan.crop}.soilImpact`, plan.benefit)}</p>
                                  </CardContent>
                                </Card>
                              </motion.div>
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tips Section */}
                  <div className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertCircle className="w-5 h-5 text-primary" />
                      <h4 className="font-medium text-foreground">{t('rotation.tips')}</h4>
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        {t('rotation.tip1')}
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        {t('rotation.tip2')}
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        {t('rotation.tip3')}
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        {t('rotation.tip4')}
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Crop Compatibility Matrix */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8"
          >
            <Card>
              <CardHeader>
                <CardTitle>{t('rotation.compatibilityGuide')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-3 font-medium">{t('rotation.crop')}</th>
                        <th className="text-left p-3 font-medium">{t('rotation.bestFollowedBy')}</th>
                        <th className="text-left p-3 font-medium">{t('rotation.avoidAfter')}</th>
                        <th className="text-center p-3 font-medium">{t('rotation.restPeriod')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cropRotationData.slice(0, 8).map((crop, index) => (
                        <tr key={crop.crop} className={index % 2 === 0 ? 'bg-muted/30' : ''}>
                          <td className="p-3 font-medium">{t(`crops.${crop.crop}`, crop.crop)}</td>
                          <td className="p-3">
                            <div className="flex flex-wrap gap-1">
                              {crop.bestFollowedBy.slice(0, 3).map(c => (
                                <Badge key={c} variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                                  {t(`crops.${c}`, c)}
                                </Badge>
                              ))}
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="flex flex-wrap gap-1">
                              {crop.avoidAfter.map(c => (
                                <Badge key={c} variant="outline" className="text-xs bg-red-50 text-red-700 border-red-200">
                                  {t(`crops.${c}`, c)}
                                </Badge>
                              ))}
                            </div>
                          </td>
                          <td className="p-3 text-center">{crop.restPeriod} {t('rotation.yearsUnit')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CropRotationPlanner;
