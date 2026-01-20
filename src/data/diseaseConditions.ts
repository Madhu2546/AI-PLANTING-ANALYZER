export interface DiseaseCondition {
  diseaseId: string;
  diseaseName: string;
  affectedCrops: string[];
  minTemp: number;
  maxTemp: number;
  minHumidity: number;
  maxHumidity: number;
  riskLevel: 'low' | 'medium' | 'high';
  description: string;
  preventiveMeasures: string[];
}

export const diseaseConditions: DiseaseCondition[] = [
  {
    diseaseId: 'rice-blast',
    diseaseName: 'Rice Blast',
    affectedCrops: ['Rice'],
    minTemp: 20,
    maxTemp: 30,
    minHumidity: 85,
    maxHumidity: 100,
    riskLevel: 'high',
    description: 'High humidity with moderate temperatures creates ideal conditions for rice blast fungus.',
    preventiveMeasures: [
      'Apply preventive fungicide sprays',
      'Avoid excessive nitrogen fertilization',
      'Ensure proper drainage in fields',
      'Use resistant rice varieties'
    ]
  },
  {
    diseaseId: 'bacterial-leaf-blight',
    diseaseName: 'Bacterial Leaf Blight',
    affectedCrops: ['Rice'],
    minTemp: 25,
    maxTemp: 35,
    minHumidity: 80,
    maxHumidity: 100,
    riskLevel: 'high',
    description: 'Warm and humid conditions favor bacterial spread, especially after heavy rains.',
    preventiveMeasures: [
      'Drain excess water from fields',
      'Apply copper-based bactericides',
      'Avoid working in wet fields',
      'Remove and destroy infected plants'
    ]
  },
  {
    diseaseId: 'maize-rust',
    diseaseName: 'Common Rust of Maize',
    affectedCrops: ['Maize'],
    minTemp: 16,
    maxTemp: 23,
    minHumidity: 75,
    maxHumidity: 100,
    riskLevel: 'medium',
    description: 'Cool temperatures with high humidity and morning dew promote rust development.',
    preventiveMeasures: [
      'Scout fields regularly for early symptoms',
      'Apply fungicides at first sign of infection',
      'Plant rust-resistant hybrids',
      'Avoid overhead irrigation'
    ]
  },
  {
    diseaseId: 'powdery-mildew',
    diseaseName: 'Powdery Mildew',
    affectedCrops: ['Grapes', 'Mango', 'Papaya'],
    minTemp: 20,
    maxTemp: 27,
    minHumidity: 60,
    maxHumidity: 80,
    riskLevel: 'medium',
    description: 'Moderate humidity without rain and warm temperatures favor powdery mildew growth.',
    preventiveMeasures: [
      'Apply sulfur-based fungicides',
      'Improve air circulation through pruning',
      'Avoid excessive nitrogen',
      'Remove infected plant parts'
    ]
  },
  {
    diseaseId: 'anthracnose',
    diseaseName: 'Anthracnose',
    affectedCrops: ['Mango', 'Banana', 'Papaya', 'Grapes'],
    minTemp: 25,
    maxTemp: 32,
    minHumidity: 85,
    maxHumidity: 100,
    riskLevel: 'high',
    description: 'High humidity with warm temperatures, especially during flowering and fruiting.',
    preventiveMeasures: [
      'Apply copper-based fungicides before rain',
      'Avoid overhead irrigation during flowering',
      'Remove fallen fruits and debris',
      'Ensure proper orchard sanitation'
    ]
  },
  {
    diseaseId: 'fusarium-wilt',
    diseaseName: 'Fusarium Wilt',
    affectedCrops: ['Cotton', 'Banana', 'Chickpea'],
    minTemp: 23,
    maxTemp: 30,
    minHumidity: 60,
    maxHumidity: 90,
    riskLevel: 'high',
    description: 'Warm soil temperatures with moderate moisture favor soil-borne fungal spread.',
    preventiveMeasures: [
      'Use resistant crop varieties',
      'Practice crop rotation',
      'Apply Trichoderma-based biocontrol',
      'Avoid waterlogging'
    ]
  },
  {
    diseaseId: 'late-blight',
    diseaseName: 'Late Blight',
    affectedCrops: ['Potato', 'Tomato'],
    minTemp: 10,
    maxTemp: 20,
    minHumidity: 85,
    maxHumidity: 100,
    riskLevel: 'high',
    description: 'Cool and wet conditions are ideal for rapid spread of late blight pathogen.',
    preventiveMeasures: [
      'Apply preventive fungicides before rain',
      'Avoid overhead irrigation in evening',
      'Destroy infected plant debris',
      'Use certified disease-free seed tubers'
    ]
  },
  {
    diseaseId: 'downy-mildew',
    diseaseName: 'Downy Mildew',
    affectedCrops: ['Grapes', 'Cucumber', 'Onion'],
    minTemp: 15,
    maxTemp: 25,
    minHumidity: 85,
    maxHumidity: 100,
    riskLevel: 'high',
    description: 'Cool nights with high humidity and morning dew favor downy mildew development.',
    preventiveMeasures: [
      'Apply protective fungicides before wet weather',
      'Improve air circulation',
      'Water in early morning to reduce leaf wetness',
      'Remove infected leaves immediately'
    ]
  },
  {
    diseaseId: 'bacterial-wilt',
    diseaseName: 'Bacterial Wilt',
    affectedCrops: ['Tomato', 'Potato', 'Banana'],
    minTemp: 25,
    maxTemp: 35,
    minHumidity: 70,
    maxHumidity: 100,
    riskLevel: 'high',
    description: 'Hot and humid conditions accelerate bacterial wilt spread through soil and water.',
    preventiveMeasures: [
      'Practice strict sanitation',
      'Use resistant varieties',
      'Avoid field flooding',
      'Remove and destroy infected plants immediately'
    ]
  },
  {
    diseaseId: 'coffee-rust',
    diseaseName: 'Coffee Leaf Rust',
    affectedCrops: ['Coffee'],
    minTemp: 20,
    maxTemp: 28,
    minHumidity: 80,
    maxHumidity: 100,
    riskLevel: 'high',
    description: 'Warm temperatures with high humidity during rainy season favor rust spread.',
    preventiveMeasures: [
      'Apply copper fungicides preventively',
      'Prune for better air circulation',
      'Plant shade trees strategically',
      'Use rust-resistant coffee varieties'
    ]
  }
];

export const checkDiseaseRisk = (
  temperature: number,
  humidity: number,
  crops: string[]
): DiseaseCondition[] => {
  return diseaseConditions.filter(condition => {
    // Check if temperature is in risk range
    const tempInRange = temperature >= condition.minTemp && temperature <= condition.maxTemp;
    // Check if humidity is in risk range
    const humidityInRange = humidity >= condition.minHumidity && humidity <= condition.maxHumidity;
    // Check if any of the user's crops are affected
    const cropAffected = crops.length === 0 || 
      condition.affectedCrops.some(crop => 
        crops.some(c => c.toLowerCase() === crop.toLowerCase())
      );
    
    return tempInRange && humidityInRange && cropAffected;
  });
};

export const getRiskColor = (riskLevel: DiseaseCondition['riskLevel']) => {
  switch (riskLevel) {
    case 'low':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'high':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};
