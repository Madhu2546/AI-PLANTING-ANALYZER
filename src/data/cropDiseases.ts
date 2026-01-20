export interface Disease {
  id: string;
  name: string;
  affectedCrops: string[];
  symptoms: string[];
  causes: string[];
  treatment: string[];
  prevention: string[];
  severity: 'low' | 'medium' | 'high';
  imageKeyword: string;
}

export const cropDiseases: Disease[] = [
  {
    id: 'rice-blast',
    name: 'Rice Blast',
    affectedCrops: ['Rice'],
    symptoms: [
      'Diamond-shaped lesions on leaves',
      'Gray-green lesions turning white with brown borders',
      'Neck rot causing panicle to break',
      'Nodes become brown and rotted'
    ],
    causes: [
      'Fungus Magnaporthe oryzae',
      'High humidity and moderate temperatures',
      'Excessive nitrogen fertilization',
      'Dense planting'
    ],
    treatment: [
      'Apply fungicides like Tricyclazole or Isoprothiolane',
      'Remove and destroy infected plant debris',
      'Apply silicon-based fertilizers to strengthen cell walls',
      'Use copper-based fungicides as preventive measure'
    ],
    prevention: [
      'Use resistant rice varieties',
      'Avoid excessive nitrogen application',
      'Maintain proper plant spacing',
      'Ensure good drainage in fields'
    ],
    severity: 'high',
    imageKeyword: 'rice blast disease leaf'
  },
  {
    id: 'bacterial-leaf-blight',
    name: 'Bacterial Leaf Blight',
    affectedCrops: ['Rice'],
    symptoms: [
      'Water-soaked lesions on leaf margins',
      'Lesions turn yellow then grayish-white',
      'Leaves dry up from tip downward',
      'Bacterial ooze on infected leaves'
    ],
    causes: [
      'Bacteria Xanthomonas oryzae',
      'Warm and humid conditions',
      'Flooding and heavy rains',
      'Wounds from insects or mechanical damage'
    ],
    treatment: [
      'Apply copper-based bactericides',
      'Drain excess water from fields',
      'Apply potassium fertilizers to strengthen plants',
      'Remove severely infected plants'
    ],
    prevention: [
      'Use certified disease-free seeds',
      'Avoid excessive nitrogen fertilization',
      'Maintain proper water management',
      'Control insect vectors'
    ],
    severity: 'high',
    imageKeyword: 'bacterial leaf blight rice'
  },
  {
    id: 'maize-rust',
    name: 'Common Rust of Maize',
    affectedCrops: ['Maize'],
    symptoms: [
      'Small, circular to elongated brown pustules on leaves',
      'Pustules appear on both leaf surfaces',
      'Severe infection causes leaf yellowing',
      'Premature leaf death in severe cases'
    ],
    causes: [
      'Fungus Puccinia sorghi',
      'Cool to moderate temperatures (16-23°C)',
      'High humidity and dew formation',
      'Wind-borne spore dispersal'
    ],
    treatment: [
      'Apply fungicides like Mancozeb or Propiconazole',
      'Remove infected plant debris after harvest',
      'Apply foliar fungicides at first sign of infection',
      'Use triazole-based fungicides for severe infection'
    ],
    prevention: [
      'Plant rust-resistant hybrid varieties',
      'Early planting to avoid peak infection periods',
      'Crop rotation with non-host crops',
      'Avoid overhead irrigation'
    ],
    severity: 'medium',
    imageKeyword: 'corn rust disease'
  },
  {
    id: 'cotton-wilt',
    name: 'Fusarium Wilt of Cotton',
    affectedCrops: ['Cotton'],
    symptoms: [
      'Yellowing and wilting of leaves',
      'Brown discoloration of vascular tissue',
      'Stunted plant growth',
      'Leaves drop prematurely'
    ],
    causes: [
      'Fungus Fusarium oxysporum f.sp. vasinfectum',
      'Soil-borne pathogen surviving for years',
      'Warm soil temperatures (23-28°C)',
      'Root damage from nematodes'
    ],
    treatment: [
      'No effective chemical treatment once infected',
      'Remove and destroy infected plants',
      'Solarize soil to reduce pathogen levels',
      'Apply biological control agents like Trichoderma'
    ],
    prevention: [
      'Use resistant cotton varieties',
      'Practice crop rotation (4-5 years)',
      'Control root-knot nematodes',
      'Maintain soil pH above 7.0'
    ],
    severity: 'high',
    imageKeyword: 'cotton wilt disease'
  },
  {
    id: 'mango-anthracnose',
    name: 'Mango Anthracnose',
    affectedCrops: ['Mango'],
    symptoms: [
      'Black spots on flowers and young fruits',
      'Sunken dark lesions on mature fruits',
      'Leaf spots with irregular margins',
      'Twig dieback and blossom blight'
    ],
    causes: [
      'Fungus Colletotrichum gloeosporioides',
      'High humidity and rainfall',
      'Warm temperatures (25-30°C)',
      'Overhead irrigation wetting foliage'
    ],
    treatment: [
      'Apply copper-based fungicides before flowering',
      'Hot water treatment of harvested fruits (52°C for 5 min)',
      'Post-harvest fungicide dips',
      'Prune and destroy infected plant parts'
    ],
    prevention: [
      'Maintain orchard sanitation',
      'Avoid overhead irrigation during flowering',
      'Apply preventive fungicide sprays',
      'Ensure good air circulation through pruning'
    ],
    severity: 'high',
    imageKeyword: 'mango anthracnose disease'
  },
  {
    id: 'banana-sigatoka',
    name: 'Black Sigatoka',
    affectedCrops: ['Banana'],
    symptoms: [
      'Small pale streaks on lower leaf surface',
      'Streaks enlarge and turn brown-black',
      'Leaves dry out prematurely',
      'Reduced fruit size and quality'
    ],
    causes: [
      'Fungus Mycosphaerella fijiensis',
      'High humidity and warm temperatures',
      'Prolonged leaf wetness',
      'Dense plantings with poor air circulation'
    ],
    treatment: [
      'Apply systemic fungicides like Propiconazole',
      'Remove and destroy infected leaves',
      'Rotate fungicide modes of action',
      'Apply mineral oil with fungicides'
    ],
    prevention: [
      'Use resistant banana varieties',
      'Maintain proper spacing between plants',
      'Remove old leaves to improve air flow',
      'Practice good drainage management'
    ],
    severity: 'high',
    imageKeyword: 'banana black sigatoka leaf'
  },
  {
    id: 'citrus-canker',
    name: 'Citrus Canker',
    affectedCrops: ['Orange', 'Lemon'],
    symptoms: [
      'Raised corky lesions on leaves and fruits',
      'Lesions with water-soaked margins',
      'Yellow halo around lesions',
      'Premature fruit and leaf drop'
    ],
    causes: [
      'Bacteria Xanthomonas citri',
      'Wind-driven rain spreading bacteria',
      'Wounds from thorns, insects, or wind',
      'High temperatures and humidity'
    ],
    treatment: [
      'Apply copper-based bactericides',
      'Remove and destroy infected plant parts',
      'Apply streptomycin in severe cases',
      'Protect wounds with copper paste'
    ],
    prevention: [
      'Use certified disease-free nursery stock',
      'Windbreaks to reduce wind-driven rain',
      'Disinfect pruning tools between trees',
      'Control leaf miner insects'
    ],
    severity: 'high',
    imageKeyword: 'citrus canker disease'
  },
  {
    id: 'grape-powdery-mildew',
    name: 'Powdery Mildew of Grape',
    affectedCrops: ['Grapes'],
    symptoms: [
      'White powdery growth on leaves and shoots',
      'Distorted and curled young leaves',
      'Brown scarring on fruit surface',
      'Cracking of infected berries'
    ],
    causes: [
      'Fungus Uncinula necator',
      'Moderate temperatures (20-27°C)',
      'Shade and poor air circulation',
      'High humidity without rain'
    ],
    treatment: [
      'Apply sulfur-based fungicides',
      'Use systemic fungicides like Myclobutanil',
      'Remove heavily infected leaves',
      'Apply potassium bicarbonate sprays'
    ],
    prevention: [
      'Select resistant grape varieties',
      'Prune for good air circulation',
      'Avoid excessive nitrogen fertilization',
      'Remove dormant infected wood'
    ],
    severity: 'medium',
    imageKeyword: 'grape powdery mildew'
  },
  {
    id: 'chickpea-wilt',
    name: 'Chickpea Wilt',
    affectedCrops: ['Chickpea'],
    symptoms: [
      'Yellowing and drooping of leaves',
      'Rapid wilting of entire plant',
      'Brown discoloration of roots and stem base',
      'Internal browning of vascular tissue'
    ],
    causes: [
      'Fungus Fusarium oxysporum f.sp. ciceris',
      'Soil-borne pathogen',
      'Warm soil temperatures',
      'Previous chickpea cultivation in field'
    ],
    treatment: [
      'No effective treatment once infected',
      'Remove and destroy infected plants',
      'Apply Trichoderma-based biocontrol',
      'Solarize soil before planting'
    ],
    prevention: [
      'Use wilt-resistant varieties',
      'Practice 4-5 year crop rotation',
      'Treat seeds with fungicides',
      'Avoid water stress during flowering'
    ],
    severity: 'high',
    imageKeyword: 'chickpea wilt disease'
  },
  {
    id: 'papaya-ringspot',
    name: 'Papaya Ringspot Virus',
    affectedCrops: ['Papaya'],
    symptoms: [
      'Ring-shaped spots on fruits',
      'Mosaic patterns on leaves',
      'Distorted and shoe-string shaped leaves',
      'Oily streaks on stems and petioles'
    ],
    causes: [
      'Papaya ringspot virus (PRSV)',
      'Aphid transmission',
      'Infected plant material',
      'No seed transmission'
    ],
    treatment: [
      'No cure for infected plants',
      'Remove and destroy infected plants immediately',
      'Control aphid vectors with insecticides',
      'Use reflective mulches to repel aphids'
    ],
    prevention: [
      'Plant virus-resistant varieties',
      'Use virus-free seedlings',
      'Maintain border crops as barriers',
      'Regular monitoring and roguing'
    ],
    severity: 'high',
    imageKeyword: 'papaya ringspot virus fruit'
  },
  {
    id: 'coffee-leaf-rust',
    name: 'Coffee Leaf Rust',
    affectedCrops: ['Coffee'],
    symptoms: [
      'Orange-yellow powdery spots on leaf undersides',
      'Pale yellow spots visible on upper leaf surface',
      'Premature leaf fall',
      'Reduced berry production'
    ],
    causes: [
      'Fungus Hemileia vastatrix',
      'Wind-borne spore dispersal',
      'Warm and humid conditions',
      'Shade and poor air circulation'
    ],
    treatment: [
      'Apply copper-based fungicides',
      'Use systemic fungicides like Triadimefon',
      'Remove and destroy fallen infected leaves',
      'Apply fungicides preventively during rainy season'
    ],
    prevention: [
      'Plant rust-resistant coffee varieties',
      'Maintain proper spacing and pruning',
      'Balanced fertilization to maintain plant vigor',
      'Shade management for air circulation'
    ],
    severity: 'high',
    imageKeyword: 'coffee leaf rust disease'
  },
  {
    id: 'pomegranate-bacterial-blight',
    name: 'Bacterial Blight of Pomegranate',
    affectedCrops: ['Pomegranate'],
    symptoms: [
      'Water-soaked spots on leaves',
      'Dark brown to black lesions on fruits',
      'Cracking and rotting of fruits',
      'Girdling cankers on branches'
    ],
    causes: [
      'Bacteria Xanthomonas axonopodis',
      'Warm and wet conditions',
      'Wounds from insects or hail',
      'Infected planting material'
    ],
    treatment: [
      'Apply streptomycin sulfate sprays',
      'Use copper hydroxide applications',
      'Prune and destroy infected branches',
      'Apply bactericides before monsoon'
    ],
    prevention: [
      'Use disease-free planting material',
      'Avoid overhead irrigation',
      'Control insect pests causing wounds',
      'Maintain orchard hygiene'
    ],
    severity: 'high',
    imageKeyword: 'pomegranate bacterial blight'
  }
];

export const getSeverityColor = (severity: Disease['severity']) => {
  switch (severity) {
    case 'low':
      return 'bg-green-100 text-green-800';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800';
    case 'high':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};
