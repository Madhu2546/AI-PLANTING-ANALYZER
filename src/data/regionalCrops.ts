// Regional crop recommendations based on Indian states
export interface StateRecommendation {
  name: string;
  climate: string;
  majorCrops: string[];
  soilTypes: string[];
  bestSeason: string;
}

export const stateRecommendations: Record<string, StateRecommendation> = {
  "Andhra Pradesh": {
    name: "Andhra Pradesh",
    climate: "Tropical, Hot and Humid",
    majorCrops: ["Rice", "Cotton", "Maize", "Pigeon Peas", "Mango", "Banana", "Coconut"],
    soilTypes: ["Black soil", "Red soil", "Alluvial"],
    bestSeason: "Kharif (June-Oct) & Rabi (Nov-Mar)"
  },
  "Arunachal Pradesh": {
    name: "Arunachal Pradesh",
    climate: "Subtropical to Alpine",
    majorCrops: ["Rice", "Maize", "Apple", "Orange", "Coffee"],
    soilTypes: ["Forest soil", "Laterite"],
    bestSeason: "Kharif (Apr-Sept)"
  },
  "Assam": {
    name: "Assam",
    climate: "Tropical Monsoon",
    majorCrops: ["Rice", "Jute", "Banana", "Orange", "Coconut"],
    soilTypes: ["Alluvial", "Laterite"],
    bestSeason: "Kharif (June-Oct)"
  },
  "Bihar": {
    name: "Bihar",
    climate: "Humid Subtropical",
    majorCrops: ["Rice", "Maize", "Lentil", "Chickpea", "Mango", "Banana"],
    soilTypes: ["Alluvial", "Clay loam"],
    bestSeason: "Kharif & Rabi"
  },
  "Chhattisgarh": {
    name: "Chhattisgarh",
    climate: "Tropical Wet and Dry",
    majorCrops: ["Rice", "Maize", "Pigeon Peas", "Black Gram", "Mango"],
    soilTypes: ["Red and yellow soil", "Laterite"],
    bestSeason: "Kharif (June-Oct)"
  },
  "Goa": {
    name: "Goa",
    climate: "Tropical Monsoon",
    majorCrops: ["Rice", "Coconut", "Banana", "Mango", "Papaya"],
    soilTypes: ["Laterite", "Alluvial"],
    bestSeason: "Kharif (June-Sept)"
  },
  "Gujarat": {
    name: "Gujarat",
    climate: "Semi-arid to Arid",
    majorCrops: ["Cotton", "Groundnut", "Chickpea", "Banana", "Mango", "Pomegranate"],
    soilTypes: ["Black soil", "Sandy loam"],
    bestSeason: "Kharif & Rabi"
  },
  "Haryana": {
    name: "Haryana",
    climate: "Semi-arid",
    majorCrops: ["Rice", "Cotton", "Chickpea", "Muskmelon", "Watermelon"],
    soilTypes: ["Alluvial", "Sandy loam"],
    bestSeason: "Kharif & Rabi"
  },
  "Himachal Pradesh": {
    name: "Himachal Pradesh",
    climate: "Temperate to Alpine",
    majorCrops: ["Apple", "Rice", "Maize", "Kidney Beans", "Lentil"],
    soilTypes: ["Forest soil", "Mountain soil"],
    bestSeason: "Kharif (Apr-Sept)"
  },
  "Jharkhand": {
    name: "Jharkhand",
    climate: "Tropical Wet and Dry",
    majorCrops: ["Rice", "Maize", "Pigeon Peas", "Black Gram", "Mango"],
    soilTypes: ["Red soil", "Laterite"],
    bestSeason: "Kharif (June-Oct)"
  },
  "Karnataka": {
    name: "Karnataka",
    climate: "Tropical to Semi-arid",
    majorCrops: ["Rice", "Coffee", "Cotton", "Maize", "Coconut", "Mango", "Grapes", "Pomegranate"],
    soilTypes: ["Red soil", "Black soil", "Laterite"],
    bestSeason: "Kharif & Rabi"
  },
  "Kerala": {
    name: "Kerala",
    climate: "Tropical Monsoon",
    majorCrops: ["Rice", "Coconut", "Banana", "Coffee", "Papaya", "Mango"],
    soilTypes: ["Laterite", "Alluvial", "Forest soil"],
    bestSeason: "Two monsoons (June-Sept & Oct-Nov)"
  },
  "Madhya Pradesh": {
    name: "Madhya Pradesh",
    climate: "Tropical to Subtropical",
    majorCrops: ["Rice", "Chickpea", "Lentil", "Cotton", "Maize", "Orange", "Mango"],
    soilTypes: ["Black soil", "Alluvial"],
    bestSeason: "Kharif & Rabi"
  },
  "Maharashtra": {
    name: "Maharashtra",
    climate: "Tropical to Semi-arid",
    majorCrops: ["Cotton", "Rice", "Chickpea", "Grapes", "Orange", "Pomegranate", "Banana", "Mango"],
    soilTypes: ["Black soil", "Laterite", "Alluvial"],
    bestSeason: "Kharif & Rabi"
  },
  "Manipur": {
    name: "Manipur",
    climate: "Subtropical",
    majorCrops: ["Rice", "Maize", "Orange", "Banana", "Papaya"],
    soilTypes: ["Alluvial", "Laterite"],
    bestSeason: "Kharif (June-Oct)"
  },
  "Meghalaya": {
    name: "Meghalaya",
    climate: "Subtropical",
    majorCrops: ["Rice", "Maize", "Orange", "Banana", "Papaya"],
    soilTypes: ["Laterite", "Forest soil"],
    bestSeason: "Kharif (June-Oct)"
  },
  "Mizoram": {
    name: "Mizoram",
    climate: "Tropical to Subtropical",
    majorCrops: ["Rice", "Maize", "Banana", "Orange", "Coffee"],
    soilTypes: ["Laterite", "Forest soil"],
    bestSeason: "Kharif (June-Oct)"
  },
  "Nagaland": {
    name: "Nagaland",
    climate: "Subtropical",
    majorCrops: ["Rice", "Maize", "Orange", "Banana", "Coffee"],
    soilTypes: ["Forest soil", "Laterite"],
    bestSeason: "Kharif (June-Oct)"
  },
  "Odisha": {
    name: "Odisha",
    climate: "Tropical Monsoon",
    majorCrops: ["Rice", "Jute", "Coconut", "Mango", "Banana", "Papaya"],
    soilTypes: ["Alluvial", "Red soil", "Laterite"],
    bestSeason: "Kharif (June-Oct)"
  },
  "Punjab": {
    name: "Punjab",
    climate: "Semi-arid",
    majorCrops: ["Rice", "Cotton", "Maize", "Chickpea", "Watermelon", "Muskmelon"],
    soilTypes: ["Alluvial", "Sandy loam"],
    bestSeason: "Kharif & Rabi"
  },
  "Rajasthan": {
    name: "Rajasthan",
    climate: "Arid to Semi-arid",
    majorCrops: ["Moth Beans", "Mung Bean", "Chickpea", "Cotton", "Watermelon", "Muskmelon"],
    soilTypes: ["Sandy", "Alluvial", "Saline"],
    bestSeason: "Kharif & Rabi"
  },
  "Sikkim": {
    name: "Sikkim",
    climate: "Temperate to Alpine",
    majorCrops: ["Rice", "Maize", "Orange", "Apple", "Coffee"],
    soilTypes: ["Forest soil", "Mountain soil"],
    bestSeason: "Kharif (Apr-Sept)"
  },
  "Tamil Nadu": {
    name: "Tamil Nadu",
    climate: "Tropical",
    majorCrops: ["Rice", "Coconut", "Banana", "Mango", "Cotton", "Coffee"],
    soilTypes: ["Black soil", "Red soil", "Alluvial"],
    bestSeason: "Samba (Aug-Jan) & Kuruvai (June-Sept)"
  },
  "Telangana": {
    name: "Telangana",
    climate: "Tropical, Semi-arid",
    majorCrops: ["Rice", "Cotton", "Maize", "Pigeon Peas", "Mango", "Orange"],
    soilTypes: ["Black soil", "Red soil"],
    bestSeason: "Kharif & Rabi"
  },
  "Tripura": {
    name: "Tripura",
    climate: "Tropical Monsoon",
    majorCrops: ["Rice", "Jute", "Coconut", "Orange", "Banana", "Papaya"],
    soilTypes: ["Alluvial", "Laterite"],
    bestSeason: "Kharif (June-Oct)"
  },
  "Uttar Pradesh": {
    name: "Uttar Pradesh",
    climate: "Subtropical",
    majorCrops: ["Rice", "Maize", "Chickpea", "Lentil", "Mango", "Banana", "Watermelon"],
    soilTypes: ["Alluvial", "Sandy loam"],
    bestSeason: "Kharif & Rabi"
  },
  "Uttarakhand": {
    name: "Uttarakhand",
    climate: "Temperate to Alpine",
    majorCrops: ["Rice", "Apple", "Kidney Beans", "Lentil", "Orange"],
    soilTypes: ["Forest soil", "Alluvial"],
    bestSeason: "Kharif (Apr-Sept)"
  },
  "West Bengal": {
    name: "West Bengal",
    climate: "Tropical Wet",
    majorCrops: ["Rice", "Jute", "Mango", "Banana", "Coconut", "Lentil"],
    soilTypes: ["Alluvial", "Laterite"],
    bestSeason: "Kharif & Rabi"
  }
};

export const indianStates = Object.keys(stateRecommendations);
