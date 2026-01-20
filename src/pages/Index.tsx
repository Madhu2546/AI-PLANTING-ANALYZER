import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CropRecommendationForm from "@/components/CropRecommendationForm";
import CropComparison from "@/components/CropComparison";
import SeasonalCalendar from "@/components/SeasonalCalendar";
import RegionalRecommendations from "@/components/RegionalRecommendations";
import CropDiseases from "@/components/CropDiseases";
import ProfitCalculator from "@/components/ProfitCalculator";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import IndiaMap from "@/components/IndiaMap";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>AgriAI - Smart Crop Recommendation System Using Machine Learning</title>
        <meta name="description" content="Get personalized crop recommendations based on soil nutrients, climate conditions, and environmental factors. Our ML-powered system analyzes 22 crop types with 99% accuracy." />
        <meta name="keywords" content="crop recommendation, machine learning, agriculture, smart farming, NPK, soil analysis, precision agriculture" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Navbar />
        <Hero />
        <CropRecommendationForm />
        <CropComparison />
        <SeasonalCalendar />
        <RegionalRecommendations />
        <CropDiseases />
        <ProfitCalculator />
        <IndiaMap />
        <HowItWorks />
        <Features />
        <Footer />
      </div>
    </>
  );
};

export default Index;
