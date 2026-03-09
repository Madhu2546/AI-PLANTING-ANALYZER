import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Leaf, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-card/95 backdrop-blur-md shadow-soft" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center shadow-soft">
              <Leaf className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-serif text-xl md:text-2xl font-bold text-foreground">
              AgriAI
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => scrollTo("how-it-works")}
              className="text-foreground/80 hover:text-primary transition-colors font-medium"
            >
              {t("nav.howItWorks")}
            </button>
            <button
              onClick={() => scrollTo("crop-comparison")}
              className="text-foreground/80 hover:text-primary transition-colors font-medium"
            >
              Compare Crops
            </button>
            <button
              onClick={() => scrollTo("seasonal-calendar")}
              className="text-foreground/80 hover:text-primary transition-colors font-medium"
            >
              Calendar
            </button>
            <button
              onClick={() => scrollTo("regional-recommendations")}
              className="text-foreground/80 hover:text-primary transition-colors font-medium"
            >
              Regional
            </button>
            <button
              onClick={() => scrollTo("crop-diseases")}
              className="text-foreground/80 hover:text-primary transition-colors font-medium"
            >
              Diseases
            </button>
            <button
              onClick={() => scrollTo("profit-calculator")}
              className="text-foreground/80 hover:text-primary transition-colors font-medium"
            >
              Calculator
            </button>
            <button
              onClick={() => scrollTo("weather-alerts")}
              className="text-foreground/80 hover:text-primary transition-colors font-medium"
            >
              Weather
            </button>
            <button
              onClick={() => scrollTo("market-trends")}
              className="text-foreground/80 hover:text-primary transition-colors font-medium"
            >
              Trends
            </button>
            <LanguageSwitcher />
            <Button
              variant="default"
              size="sm"
              onClick={() => scrollTo("recommendation-form")}
            >
              {t("nav.tryNow")}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden bg-card rounded-b-2xl shadow-card border-t border-border"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex flex-col p-4 gap-2">
              <button
                onClick={() => scrollTo("how-it-works")}
                className="text-foreground/80 hover:text-primary transition-colors font-medium text-left py-2"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollTo("crop-comparison")}
                className="text-foreground/80 hover:text-primary transition-colors font-medium text-left py-2"
              >
                Compare Crops
              </button>
              <button
                onClick={() => scrollTo("seasonal-calendar")}
                className="text-foreground/80 hover:text-primary transition-colors font-medium text-left py-2"
              >
                Seasonal Calendar
              </button>
              <button
                onClick={() => scrollTo("regional-recommendations")}
                className="text-foreground/80 hover:text-primary transition-colors font-medium text-left py-2"
              >
                Regional Crops
              </button>
              <button
                onClick={() => scrollTo("crop-diseases")}
                className="text-foreground/80 hover:text-primary transition-colors font-medium text-left py-2"
              >
                Disease Guide
              </button>
              <button
                onClick={() => scrollTo("profit-calculator")}
                className="text-foreground/80 hover:text-primary transition-colors font-medium text-left py-2"
              >
                Profit Calculator
              </button>
              <Button
                variant="default"
                onClick={() => scrollTo("recommendation-form")}
                className="w-full mt-2"
              >
                Try Now
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
