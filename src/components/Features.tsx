import { motion } from "framer-motion";
import { Leaf, TrendingUp, Shield, Zap, Globe, Users } from "lucide-react";
import { useTranslation } from "react-i18next";

const Features = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: Leaf,
      titleKey: "features.cropTypes.title",
      descriptionKey: "features.cropTypes.description",
      color: "bg-leaf/10 text-leaf",
    },
    {
      icon: TrendingUp,
      titleKey: "features.accuracy.title",
      descriptionKey: "features.accuracy.description",
      color: "bg-sun/10 text-sun",
    },
    {
      icon: Shield,
      titleKey: "features.dataDriven.title",
      descriptionKey: "features.dataDriven.description",
      color: "bg-primary/10 text-primary",
    },
    {
      icon: Zap,
      titleKey: "features.instant.title",
      descriptionKey: "features.instant.description",
      color: "bg-water/10 text-water",
    },
    {
      icon: Globe,
      titleKey: "features.regional.title",
      descriptionKey: "features.regional.description",
      color: "bg-soil/10 text-soil",
    },
    {
      icon: Users,
      titleKey: "features.friendly.title",
      descriptionKey: "features.friendly.description",
      color: "bg-leaf-light/10 text-leaf",
    },
  ];

  return (
    <section className="py-20 px-4 bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t('features.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('features.description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.titleKey}
              className="bg-card rounded-2xl p-6 shadow-soft border border-border hover:shadow-card transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-4`}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                {t(feature.titleKey)}
              </h3>
              <p className="text-muted-foreground">
                {t(feature.descriptionKey)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
