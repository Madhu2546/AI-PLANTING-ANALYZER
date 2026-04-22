import { Leaf, Github, Mail, ExternalLink, Languages } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-foreground text-background py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Leaf className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-serif text-2xl font-bold">AgriAI</span>
            </div>
            <p className="text-background/70 text-sm">
              {t('footer.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2 text-background/70 text-sm">
              <li>
                <a href="#recommendation-form" className="hover:text-primary transition-colors">
                  {t('footer.getRecommendation')}
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-primary transition-colors">
                  {t('footer.howItWorks')}
                </a>
              </li>
              <li>
                <a 
                  href="https://www.kaggle.com/datasets/atharvaingle/crop-recommendation-dataset" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors inline-flex items-center gap-1"
                >
                  {t('footer.datasetSource')}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <Link to="/translation-gaps" className="hover:text-primary transition-colors inline-flex items-center gap-1">
                  <Languages className="w-3 h-3" />
                  Translation Coverage
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer.projectBy')}</h4>
            <ul className="space-y-2 text-background/70 text-sm">
              <li>R. Sowmya (22891A6750)</li>
              <li>R. Naveen Kumar (22891A6749)</li>
              <li>K. Mahesh (22891A6728)</li>
              <li>K. Harshith (22891A6729)</li>
            </ul>
            <p className="mt-4 text-xs text-background/50">
              {t('footer.college')}
            </p>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-background/50">
            {t('footer.copyright')}
          </p>
          <div className="flex items-center gap-4">
            <a href="mailto:contact@agriai.com" className="text-background/70 hover:text-primary transition-colors">
              <Mail className="w-5 h-5" />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-background/70 hover:text-primary transition-colors">
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
