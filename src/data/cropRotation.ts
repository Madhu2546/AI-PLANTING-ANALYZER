export interface CropRotationData {
  crop: string;
  family: string;
  nutrientEffect: 'depleting' | 'enriching' | 'neutral';
  primaryNutrient: 'nitrogen' | 'phosphorus' | 'potassium' | 'balanced';
  soilImpact: string;
  bestFollowedBy: string[];
  avoidAfter: string[];
  restPeriod: number; // years before replanting same crop
  seasonType: 'kharif' | 'rabi' | 'zaid' | 'perennial';
}

export const cropRotationData: CropRotationData[] = [
  {
    crop: 'Rice',
    family: 'Gramineae',
    nutrientEffect: 'depleting',
    primaryNutrient: 'nitrogen',
    soilImpact: 'Heavy nitrogen feeder, can waterlog soil',
    bestFollowedBy: ['Chickpea', 'Lentil', 'Mustard', 'Wheat'],
    avoidAfter: ['Rice', 'Maize', 'Wheat'],
    restPeriod: 2,
    seasonType: 'kharif'
  },
  {
    crop: 'Wheat',
    family: 'Gramineae',
    nutrientEffect: 'depleting',
    primaryNutrient: 'nitrogen',
    soilImpact: 'Moderate nitrogen feeder, improves soil structure',
    bestFollowedBy: ['Chickpea', 'Lentil', 'Soybean', 'Cotton'],
    avoidAfter: ['Wheat', 'Rice', 'Maize'],
    restPeriod: 2,
    seasonType: 'rabi'
  },
  {
    crop: 'Maize',
    family: 'Gramineae',
    nutrientEffect: 'depleting',
    primaryNutrient: 'nitrogen',
    soilImpact: 'Heavy feeder, leaves good residue',
    bestFollowedBy: ['Chickpea', 'Soybean', 'Groundnut', 'Mustard'],
    avoidAfter: ['Maize', 'Rice', 'Sorghum'],
    restPeriod: 2,
    seasonType: 'kharif'
  },
  {
    crop: 'Chickpea',
    family: 'Leguminosae',
    nutrientEffect: 'enriching',
    primaryNutrient: 'nitrogen',
    soilImpact: 'Fixes atmospheric nitrogen, improves soil fertility',
    bestFollowedBy: ['Rice', 'Maize', 'Cotton', 'Wheat'],
    avoidAfter: ['Chickpea', 'Lentil', 'Pigeon Peas'],
    restPeriod: 3,
    seasonType: 'rabi'
  },
  {
    crop: 'Lentil',
    family: 'Leguminosae',
    nutrientEffect: 'enriching',
    primaryNutrient: 'nitrogen',
    soilImpact: 'Nitrogen fixer, improves soil structure',
    bestFollowedBy: ['Rice', 'Wheat', 'Maize', 'Cotton'],
    avoidAfter: ['Lentil', 'Chickpea', 'Mung Bean'],
    restPeriod: 3,
    seasonType: 'rabi'
  },
  {
    crop: 'Soybean',
    family: 'Leguminosae',
    nutrientEffect: 'enriching',
    primaryNutrient: 'nitrogen',
    soilImpact: 'Excellent nitrogen fixer, improves soil organic matter',
    bestFollowedBy: ['Wheat', 'Maize', 'Cotton', 'Rice'],
    avoidAfter: ['Soybean', 'Groundnut', 'Chickpea'],
    restPeriod: 2,
    seasonType: 'kharif'
  },
  {
    crop: 'Cotton',
    family: 'Malvaceae',
    nutrientEffect: 'depleting',
    primaryNutrient: 'potassium',
    soilImpact: 'Heavy potassium feeder, deep root system',
    bestFollowedBy: ['Chickpea', 'Wheat', 'Soybean', 'Groundnut'],
    avoidAfter: ['Cotton', 'Jute'],
    restPeriod: 3,
    seasonType: 'kharif'
  },
  {
    crop: 'Groundnut',
    family: 'Leguminosae',
    nutrientEffect: 'enriching',
    primaryNutrient: 'nitrogen',
    soilImpact: 'Fixes nitrogen, improves soil aeration',
    bestFollowedBy: ['Rice', 'Wheat', 'Maize', 'Cotton'],
    avoidAfter: ['Groundnut', 'Soybean'],
    restPeriod: 2,
    seasonType: 'kharif'
  },
  {
    crop: 'Mustard',
    family: 'Cruciferae',
    nutrientEffect: 'neutral',
    primaryNutrient: 'balanced',
    soilImpact: 'Deep roots improve soil structure, biofumigant properties',
    bestFollowedBy: ['Rice', 'Cotton', 'Maize', 'Soybean'],
    avoidAfter: ['Mustard', 'Cabbage'],
    restPeriod: 2,
    seasonType: 'rabi'
  },
  {
    crop: 'Potato',
    family: 'Solanaceae',
    nutrientEffect: 'depleting',
    primaryNutrient: 'potassium',
    soilImpact: 'Heavy potassium feeder, loosens soil',
    bestFollowedBy: ['Wheat', 'Maize', 'Beans', 'Onion'],
    avoidAfter: ['Potato', 'Tomato', 'Brinjal'],
    restPeriod: 3,
    seasonType: 'rabi'
  },
  {
    crop: 'Sugarcane',
    family: 'Gramineae',
    nutrientEffect: 'depleting',
    primaryNutrient: 'nitrogen',
    soilImpact: 'Very heavy feeder, long duration crop',
    bestFollowedBy: ['Wheat', 'Chickpea', 'Mustard', 'Potato'],
    avoidAfter: ['Sugarcane', 'Rice'],
    restPeriod: 4,
    seasonType: 'perennial'
  },
  {
    crop: 'Jute',
    family: 'Tiliaceae',
    nutrientEffect: 'neutral',
    primaryNutrient: 'balanced',
    soilImpact: 'Fibrous roots improve soil, good green manure',
    bestFollowedBy: ['Rice', 'Wheat', 'Mustard', 'Potato'],
    avoidAfter: ['Jute', 'Cotton'],
    restPeriod: 2,
    seasonType: 'kharif'
  }
];

export interface RotationPlan {
  year: number;
  season: string;
  crop: string;
  benefit: string;
}

export const generateRotationPlan = (
  startingCrop: string,
  years: number = 4
): RotationPlan[] => {
  const plan: RotationPlan[] = [];
  const cropData = cropRotationData.find(c => c.crop === startingCrop);
  
  if (!cropData) return plan;
  
  let currentCrop = startingCrop;
  let currentData = cropData;
  
  for (let year = 1; year <= years; year++) {
    // Kharif season
    if (currentData.seasonType === 'kharif' || currentData.seasonType === 'perennial') {
      plan.push({
        year,
        season: 'Kharif (Jun-Oct)',
        crop: currentCrop,
        benefit: currentData.soilImpact
      });
      
      // Rabi season - find a complementary crop
      const rabiCrop = currentData.bestFollowedBy.find(c => {
        const data = cropRotationData.find(d => d.crop === c);
        return data?.seasonType === 'rabi';
      });
      
      if (rabiCrop) {
        const rabiData = cropRotationData.find(c => c.crop === rabiCrop);
        plan.push({
          year,
          season: 'Rabi (Nov-Mar)',
          crop: rabiCrop,
          benefit: rabiData?.soilImpact || 'Maintains soil health'
        });
      }
    } else if (currentData.seasonType === 'rabi') {
      // Find a kharif crop first
      const kharifCrop = cropRotationData.find(c => 
        c.seasonType === 'kharif' && 
        c.bestFollowedBy.includes(currentCrop)
      );
      
      if (kharifCrop) {
        plan.push({
          year,
          season: 'Kharif (Jun-Oct)',
          crop: kharifCrop.crop,
          benefit: kharifCrop.soilImpact
        });
      }
      
      plan.push({
        year,
        season: 'Rabi (Nov-Mar)',
        crop: currentCrop,
        benefit: currentData.soilImpact
      });
    }
    
    // Move to next year's crop
    const nextCrops = currentData.bestFollowedBy.filter(c => 
      !plan.some(p => p.crop === c && p.year >= year - 1)
    );
    
    if (nextCrops.length > 0) {
      currentCrop = nextCrops[0];
      currentData = cropRotationData.find(c => c.crop === currentCrop) || currentData;
    }
  }
  
  return plan;
};

export const getSeasonColor = (season: string) => {
  if (season.includes('Kharif')) return 'bg-green-100 text-green-800';
  if (season.includes('Rabi')) return 'bg-amber-100 text-amber-800';
  if (season.includes('Zaid')) return 'bg-orange-100 text-orange-800';
  return 'bg-gray-100 text-gray-800';
};

export const getNutrientColor = (effect: CropRotationData['nutrientEffect']) => {
  switch (effect) {
    case 'enriching':
      return 'text-green-600';
    case 'depleting':
      return 'text-red-600';
    default:
      return 'text-gray-600';
  }
};
