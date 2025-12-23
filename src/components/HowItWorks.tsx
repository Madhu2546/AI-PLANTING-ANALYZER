import { motion } from "framer-motion";
import { Database, Cpu, BarChart3, Lightbulb, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Database,
    title: "Data Collection",
    description: "We collect soil and climate parameters including N, P, K levels, pH, temperature, humidity, and rainfall data.",
    color: "bg-water/10 text-water border-water/30",
  },
  {
    icon: Cpu,
    title: "ML Processing",
    description: "Our machine learning models (Decision Tree, SVM, Logistic Regression, Naive Bayes) analyze the input data.",
    color: "bg-leaf/10 text-leaf border-leaf/30",
  },
  {
    icon: BarChart3,
    title: "Pattern Matching",
    description: "The system compares your data against 2200+ historical agricultural records to identify optimal crops.",
    color: "bg-sun/10 text-sun border-sun/30",
  },
  {
    icon: Lightbulb,
    title: "Smart Recommendation",
    description: "You receive a ranked list of suitable crops with match scores to make informed farming decisions.",
    color: "bg-primary/10 text-primary border-primary/30",
  },
];

const HowItWorks = () => {
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
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our system uses advanced machine learning algorithms to analyze your 
            agricultural data and provide accurate crop recommendations.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2 z-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
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
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {step.description}
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
            Machine Learning Algorithms Used
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Decision Tree", accuracy: "90%" },
              { name: "Support Vector Machine", accuracy: "97%" },
              { name: "Logistic Regression", accuracy: "95%" },
              { name: "Naive Bayes", accuracy: "99%" },
            ].map((algo, index) => (
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
