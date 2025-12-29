import { motion } from "framer-motion";
import { Database, Cpu, BarChart3, Lightbulb, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const HowItWorks = () => {
  const { t } = useTranslation();

  const steps = [
    {
      icon: Database,
      titleKey: "howItWorks.step1.title",
      descriptionKey: "howItWorks.step1.description",
      color: "bg-water/10 text-water border-water/30",
    },
    {
      icon: Cpu,
      titleKey: "howItWorks.step2.title",
      descriptionKey: "howItWorks.step2.description",
      color: "bg-leaf/10 text-leaf border-leaf/30",
    },
    {
      icon: BarChart3,
      titleKey: "howItWorks.step3.title",
      descriptionKey: "howItWorks.step3.description",
      color: "bg-sun/10 text-sun border-sun/30",
    },
    {
      icon: Lightbulb,
      titleKey: "howItWorks.step4.title",
      descriptionKey: "howItWorks.step4.description",
      color: "bg-primary/10 text-primary border-primary/30",
    },
  ];

  const algorithms = [
    { name: t('howItWorks.decisionTree'), accuracy: "90%" },
    { name: t('howItWorks.svm'), accuracy: "97%" },
    { name: t('howItWorks.logisticRegression'), accuracy: "95%" },
    { name: t('howItWorks.naiveBayes'), accuracy: "99%" },
  ];

  return (
    <section id="how-it-works" className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t('howItWorks.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('howItWorks.description')}
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2 z-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.titleKey}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <div className="bg-card rounded-2xl p-6 shadow-card border border-border h-full flex flex-col items-center text-center">
                  <div className={`w-16 h-16 rounded-2xl ${step.color} border-2 flex items-center justify-center mb-4`}>
                    <step.icon className="w-8 h-8" />
                  </div>
                  
                  <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>

                  <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                    {t(step.titleKey)}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {t(step.descriptionKey)}
                  </p>
                </div>

                {/* Arrow for mobile/tablet */}
                {index < steps.length - 1 && (
                  <div className="flex justify-center my-4 lg:hidden">
                    <ArrowRight className="w-6 h-6 text-muted-foreground rotate-90 md:rotate-0" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Algorithms Used */}
        <motion.div
          className="mt-16 bg-card rounded-2xl p-8 shadow-card border border-border"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="font-serif text-2xl font-bold text-foreground mb-6 text-center">
            {t('howItWorks.algorithmsTitle')}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {algorithms.map((algo, index) => (
              <motion.div
                key={algo.name}
                className="bg-muted/50 rounded-xl p-4 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-2xl font-bold text-primary mb-1">{algo.accuracy}</div>
                <div className="text-sm text-muted-foreground">{algo.name}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
