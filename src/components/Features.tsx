import { motion } from "framer-motion";
import { Leaf, TrendingUp, Shield, Zap, Globe, Users } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "22 Crop Types",
    description: "Support for a wide variety of crops including grains, pulses, fruits, and commercial crops.",
    color: "bg-leaf/10 text-leaf",
  },
  {
    icon: TrendingUp,
    title: "High Accuracy",
    description: "Up to 99% prediction accuracy using ensemble machine learning techniques.",
    color: "bg-sun/10 text-sun",
  },
  {
    icon: Shield,
    title: "Data-Driven Decisions",
    description: "Reduce trial-and-error farming with scientifically backed recommendations.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Zap,
    title: "Instant Results",
    description: "Get crop recommendations in seconds with our optimized ML models.",
    color: "bg-water/10 text-water",
  },
  {
    icon: Globe,
    title: "Region Specific",
    description: "Trained on diverse agricultural data covering multiple climate zones.",
    color: "bg-soil/10 text-soil",
  },
  {
    icon: Users,
    title: "Farmer Friendly",
    description: "Simple interface designed for easy use by farmers of all technical backgrounds.",
    color: "bg-leaf-light/10 text-leaf",
  },
];

const Features = () => {
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
            Why Choose AgriAI?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Empowering farmers with precision agriculture technology for 
            sustainable and profitable farming.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
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
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
