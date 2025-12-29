import { motion } from "framer-motion";
import { Leaf, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import heroImage from "@/assets/hero-farm.jpg";

const Hero = () => {
  const { t } = useTranslation();

  const scrollToForm = () => {
    document.getElementById("recommendation-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Lush green farmland with healthy crops"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-10 text-leaf opacity-40"
        animate={{ y: [0, -15, 0], rotate: [-5, 5, -5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Leaf size={60} />
      </motion.div>
      <motion.div
        className="absolute top-40 right-20 text-leaf-light opacity-30"
        animate={{ y: [0, -20, 0], rotate: [5, -5, 5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <Leaf size={80} />
      </motion.div>
      <motion.div
        className="absolute bottom-40 left-20 text-sun opacity-40"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <Leaf size={50} />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Leaf className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">{t('hero.badge')}</span>
          </motion.div>

          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-foreground">
            <span className="text-gradient">{t('hero.title')}</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-foreground/80 mb-4 font-light max-w-3xl mx-auto">
            {t('hero.subtitle')}
          </p>
          
          <p className="text-base md:text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            {t('hero.description')}
          </p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button variant="hero" size="xl" onClick={scrollToForm}>
              {t('hero.getRecommendation')}
              <ArrowDown className="ml-2 animate-bounce" />
            </Button>
            <Button variant="outline" size="lg" onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}>
              {t('hero.learnHow')}
            </Button>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          {[
            { value: "22", label: t('hero.stats.cropTypes') },
            { value: "7", label: t('hero.stats.inputParameters') },
            { value: "99%", label: t('hero.stats.accuracy') },
            { value: "2200+", label: t('hero.stats.dataPoints') },
          ].map((stat, index) => (
            <div key={index} className="bg-card/80 backdrop-blur-sm rounded-xl p-4 shadow-card border border-border/50">
              <div className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-primary"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
