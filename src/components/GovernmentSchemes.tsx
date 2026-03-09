import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Landmark, ExternalLink, Filter, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { governmentSchemes, indianStates } from "@/data/governmentSchemes";
import { exportSchemeDetailsToPDF } from "@/utils/pdfExport";

const CROP_OPTIONS = ["All", "Rice", "Wheat", "Cotton", "Maize", "Lentil", "Chickpea", "Coconut", "Coffee", "Jute"];
const CATEGORY_OPTIONS = [
  { value: "all", label: "All Categories" },
  { value: "subsidy", label: "Subsidy" },
  { value: "insurance", label: "Insurance" },
  { value: "loan", label: "Loan" },
  { value: "support", label: "Support" },
];

const categoryColors: Record<string, string> = {
  subsidy: "bg-primary/10 text-primary",
  insurance: "bg-sun/20 text-sun",
  loan: "bg-water/20 text-water",
  support: "bg-leaf/20 text-leaf",
};

const GovernmentSchemes = () => {
  const { t, i18n } = useTranslation();
  const isHindi = i18n.language === "hi";
  const [selectedState, setSelectedState] = useState("All States");
  const [selectedCrop, setSelectedCrop] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filtered = governmentSchemes.filter(s => {
    if (selectedCategory !== "all" && s.category !== selectedCategory) return false;
    if (selectedCrop !== "All" && !s.eligibleCrops.includes("All") && !s.eligibleCrops.includes(selectedCrop)) return false;
    if (selectedState !== "All States" && !s.eligibleStates.includes("All") && !s.eligibleStates.includes(selectedState)) return false;
    return true;
  });

  return (
    <section id="government-schemes" className="py-16 md:py-24 bg-secondary/20">
      <div className="container mx-auto px-4">
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <Landmark className="w-4 h-4" />
            <span className="text-sm font-medium">{t("schemes.badge", "Government Schemes")}</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">{t("schemes.title", "Agricultural Scheme Finder")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t("schemes.description", "Find relevant government subsidies, insurance, and loan schemes for your crop and region.")}</p>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">{t("schemes.filters", "Filter Schemes")}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Select value={selectedState} onValueChange={setSelectedState}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{indianStates.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                </Select>
                <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{CROP_OPTIONS.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                </Select>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{CATEGORY_OPTIONS.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              {filtered.length > 0 && (
                <Button variant="outline" size="sm" className="mt-3 w-full sm:w-auto" onClick={() => exportSchemeDetailsToPDF(filtered.map(s => ({ name: s.name, category: s.category, description: s.description, benefits: s.benefits, website: s.website })))}>
                  <Download className="w-3 h-3 mr-1" /> Export as PDF
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Results */}
          <div className="grid md:grid-cols-2 gap-4">
            {filtered.map(scheme => (
              <motion.div key={scheme.id} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Card className="h-full hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-base">{isHindi ? scheme.nameHi : scheme.name}</CardTitle>
                      <Badge className={`${categoryColors[scheme.category]} text-xs shrink-0`}>{scheme.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">{isHindi ? scheme.descriptionHi : scheme.description}</p>
                    <div className="p-2 rounded-md bg-muted/50">
                      <p className="text-xs font-medium text-foreground">{t("schemes.benefits", "Benefits")}:</p>
                      <p className="text-sm text-primary font-medium">{isHindi ? scheme.benefitsHi : scheme.benefits}</p>
                    </div>
                    {!scheme.eligibleCrops.includes("All") && (
                      <div className="flex flex-wrap gap-1">
                        {scheme.eligibleCrops.map(c => <Badge key={c} variant="outline" className="text-xs">{c}</Badge>)}
                      </div>
                    )}
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <a href={scheme.website} target="_blank" rel="noopener noreferrer">
                        {t("schemes.visitWebsite", "Visit Website")} <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">{t("schemes.noResults", "No schemes found matching your filters. Try broadening your search.")}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};

export default GovernmentSchemes;
