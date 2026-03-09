export interface GovernmentScheme {
  id: string;
  name: string;
  nameHi: string;
  description: string;
  descriptionHi: string;
  category: "subsidy" | "insurance" | "loan" | "support";
  eligibleCrops: string[];
  eligibleStates: string[];
  benefits: string;
  benefitsHi: string;
  website: string;
}

export const governmentSchemes: GovernmentScheme[] = [
  {
    id: "pmkisan",
    name: "PM-KISAN",
    nameHi: "पीएम-किसान",
    description: "Direct income support of ₹6,000/year to small and marginal farmer families.",
    descriptionHi: "छोटे और सीमांत किसान परिवारों को ₹6,000/वर्ष की प्रत्यक्ष आय सहायता।",
    category: "support",
    eligibleCrops: ["All"],
    eligibleStates: ["All"],
    benefits: "₹6,000 per year in 3 installments",
    benefitsHi: "3 किस्तों में ₹6,000 प्रति वर्ष",
    website: "https://pmkisan.gov.in",
  },
  {
    id: "pmfby",
    name: "PM Fasal Bima Yojana",
    nameHi: "पीएम फसल बीमा योजना",
    description: "Crop insurance scheme covering losses from natural calamities, pests, and diseases.",
    descriptionHi: "प्राकृतिक आपदाओं, कीटों और रोगों से फसल हानि को कवर करने वाली बीमा योजना।",
    category: "insurance",
    eligibleCrops: ["Rice", "Wheat", "Cotton", "Maize", "Jute", "Lentil"],
    eligibleStates: ["All"],
    benefits: "Premium: 2% Kharif, 1.5% Rabi, 5% Commercial",
    benefitsHi: "प्रीमियम: 2% खरीफ, 1.5% रबी, 5% वाणिज्यिक",
    website: "https://pmfby.gov.in",
  },
  {
    id: "kcc",
    name: "Kisan Credit Card",
    nameHi: "किसान क्रेडिट कार्ड",
    description: "Easy credit access for farmers at subsidized interest rates for crop production.",
    descriptionHi: "फसल उत्पादन के लिए रियायती ब्याज दरों पर किसानों को आसान ऋण।",
    category: "loan",
    eligibleCrops: ["All"],
    eligibleStates: ["All"],
    benefits: "Loans up to ₹3 lakh at 4% interest",
    benefitsHi: "4% ब्याज पर ₹3 लाख तक का ऋण",
    website: "https://www.nabard.org",
  },
  {
    id: "nmsa",
    name: "National Mission for Sustainable Agriculture",
    nameHi: "राष्ट्रीय सतत कृषि मिशन",
    description: "Promotes sustainable agriculture through soil health, water management, and climate adaptation.",
    descriptionHi: "मृदा स्वास्थ्य, जल प्रबंधन और जलवायु अनुकूलन के माध्यम से टिकाऊ कृषि को बढ़ावा।",
    category: "subsidy",
    eligibleCrops: ["All"],
    eligibleStates: ["All"],
    benefits: "50-100% subsidy on micro-irrigation, soil testing",
    benefitsHi: "सूक्ष्म सिंचाई, मृदा परीक्षण पर 50-100% सब्सिडी",
    website: "https://nmsa.dac.gov.in",
  },
  {
    id: "rkvy",
    name: "Rashtriya Krishi Vikas Yojana",
    nameHi: "राष्ट्रीय कृषि विकास योजना",
    description: "State-level agricultural development with funding for infrastructure and innovation.",
    descriptionHi: "बुनियादी ढांचे और नवाचार के लिए राज्य स्तरीय कृषि विकास।",
    category: "subsidy",
    eligibleCrops: ["All"],
    eligibleStates: ["All"],
    benefits: "Project-based funding for agri-infrastructure",
    benefitsHi: "कृषि अवसंरचना के लिए परियोजना आधारित वित्तपोषण",
    website: "https://rkvy.nic.in",
  },
  {
    id: "mspc",
    name: "MSP Procurement",
    nameHi: "एमएसपी खरीद",
    description: "Government procurement at Minimum Support Price for major crops.",
    descriptionHi: "प्रमुख फसलों के लिए न्यूनतम समर्थन मूल्य पर सरकारी खरीद।",
    category: "support",
    eligibleCrops: ["Rice", "Wheat", "Cotton", "Maize", "Lentil", "Chickpea"],
    eligibleStates: ["All"],
    benefits: "Guaranteed purchase at MSP rates",
    benefitsHi: "MSP दरों पर गारंटीकृत खरीद",
    website: "https://farmer.gov.in",
  },
  {
    id: "enam",
    name: "e-NAM (National Agriculture Market)",
    nameHi: "ई-नाम (राष्ट्रीय कृषि बाजार)",
    description: "Online trading platform for agricultural commodities with transparent pricing.",
    descriptionHi: "पारदर्शी मूल्य निर्धारण के साथ कृषि वस्तुओं के लिए ऑनलाइन ट्रेडिंग प्लेटफॉर्म।",
    category: "support",
    eligibleCrops: ["Rice", "Wheat", "Cotton", "Maize", "Coconut", "Coffee"],
    eligibleStates: ["All"],
    benefits: "Better price discovery, reduced intermediaries",
    benefitsHi: "बेहतर मूल्य खोज, बिचौलियों में कमी",
    website: "https://enam.gov.in",
  },
  {
    id: "pmkmy",
    name: "PM Kisan Maan-Dhan Yojana",
    nameHi: "पीएम किसान मानधन योजना",
    description: "Pension scheme for small farmers providing ₹3,000/month after age 60.",
    descriptionHi: "60 वर्ष की आयु के बाद ₹3,000/माह प्रदान करने वाली छोटे किसानों के लिए पेंशन योजना।",
    category: "support",
    eligibleCrops: ["All"],
    eligibleStates: ["All"],
    benefits: "₹3,000/month pension after age 60",
    benefitsHi: "60 वर्ष के बाद ₹3,000/माह पेंशन",
    website: "https://maandhan.in",
  },
];

export const indianStates = [
  "All States", "Andhra Pradesh", "Assam", "Bihar", "Chhattisgarh", "Gujarat",
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
  "Madhya Pradesh", "Maharashtra", "Odisha", "Punjab", "Rajasthan",
  "Tamil Nadu", "Telangana", "Uttar Pradesh", "Uttarakhand", "West Bengal",
];
