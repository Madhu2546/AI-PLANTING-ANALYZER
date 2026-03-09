export interface GrowthStage {
  stage: string;
  timing: string;
  chemicals: { name: string; type: string; dose: string; purpose: string }[];
}

export interface PestDisease {
  name: string;
  type: "pest" | "disease";
  symptoms: string;
  pesticides: { name: string; dose: string; application: string }[];
}

export interface CropNutrientPlan {
  crop: string;
  totalN: number;
  totalP: number;
  totalK: number;
  fertilizerSchedule: GrowthStage[];
  pestsAndDiseases: PestDisease[];
}

export const cropNutrientPlans: Record<string, CropNutrientPlan> = {
  Rice: {
    crop: "Rice",
    totalN: 120, totalP: 60, totalK: 60,
    fertilizerSchedule: [
      { stage: "Basal (Before Transplanting)", timing: "0 days", chemicals: [
        { name: "DAP (18-46-0)", type: "Fertilizer", dose: "130 kg/ha", purpose: "Phosphorus base" },
        { name: "MOP (0-0-60)", type: "Fertilizer", dose: "100 kg/ha", purpose: "Potassium base" },
        { name: "Zinc Sulphate", type: "Micronutrient", dose: "25 kg/ha", purpose: "Zinc deficiency prevention" },
      ]},
      { stage: "Tillering Stage", timing: "21-25 days", chemicals: [
        { name: "Urea (46-0-0)", type: "Fertilizer", dose: "65 kg/ha (1st split)", purpose: "Nitrogen for tillering" },
      ]},
      { stage: "Panicle Initiation", timing: "45-50 days", chemicals: [
        { name: "Urea (46-0-0)", type: "Fertilizer", dose: "65 kg/ha (2nd split)", purpose: "Nitrogen for grain filling" },
        { name: "Potash (MOP)", type: "Fertilizer", dose: "50 kg/ha", purpose: "Grain development" },
      ]},
      { stage: "Flowering Stage", timing: "70-80 days", chemicals: [
        { name: "Urea (46-0-0)", type: "Fertilizer", dose: "30 kg/ha (3rd split)", purpose: "Late nitrogen boost" },
        { name: "Boron spray", type: "Micronutrient", dose: "0.2%", purpose: "Better grain setting" },
      ]},
    ],
    pestsAndDiseases: [
      { name: "Blast", type: "disease", symptoms: "Diamond-shaped spots on leaves", pesticides: [
        { name: "Tricyclazole 75% WP", dose: "0.6 g/L", application: "Foliar spray at first symptom" },
        { name: "Isoprothiolane 40% EC", dose: "1.5 mL/L", application: "Preventive spray" },
      ]},
      { name: "Brown Plant Hopper (BPH)", type: "pest", symptoms: "Hopper burn, yellowing at base", pesticides: [
        { name: "Imidacloprid 17.8% SL", dose: "0.5 mL/L", application: "Spray at base of plant" },
        { name: "Pymetrozine 50% WG", dose: "0.6 g/L", application: "Foliar spray" },
      ]},
      { name: "Sheath Blight", type: "disease", symptoms: "Oval lesions on leaf sheath", pesticides: [
        { name: "Hexaconazole 5% EC", dose: "2 mL/L", application: "Spray at tillering stage" },
        { name: "Validamycin 3% L", dose: "2.5 mL/L", application: "Foliar spray" },
      ]},
    ],
  },
  Wheat: {
    crop: "Wheat",
    totalN: 150, totalP: 60, totalK: 40,
    fertilizerSchedule: [
      { stage: "Basal (At Sowing)", timing: "0 days", chemicals: [
        { name: "DAP (18-46-0)", type: "Fertilizer", dose: "130 kg/ha", purpose: "Phosphorus + Nitrogen base" },
        { name: "MOP (0-0-60)", type: "Fertilizer", dose: "67 kg/ha", purpose: "Potassium base" },
      ]},
      { stage: "Crown Root Initiation (CRI)", timing: "21 days", chemicals: [
        { name: "Urea (46-0-0)", type: "Fertilizer", dose: "110 kg/ha (1st top-dress)", purpose: "Nitrogen for tillering" },
      ]},
      { stage: "Late Jointing", timing: "45-50 days", chemicals: [
        { name: "Urea (46-0-0)", type: "Fertilizer", dose: "55 kg/ha (2nd top-dress)", purpose: "Nitrogen for ear development" },
        { name: "Foliar Zinc", type: "Micronutrient", dose: "0.5% ZnSO4", purpose: "Zinc enrichment" },
      ]},
      { stage: "Flowering/Grain Filling", timing: "75-85 days", chemicals: [
        { name: "KNO3 foliar spray", type: "Fertilizer", dose: "2%", purpose: "Potassium + nitrogen boost" },
      ]},
    ],
    pestsAndDiseases: [
      { name: "Yellow Rust", type: "disease", symptoms: "Yellow stripes on leaves", pesticides: [
        { name: "Propiconazole 25% EC", dose: "1 mL/L", application: "Spray at first symptom" },
        { name: "Tebuconazole 25.9% EC", dose: "1 mL/L", application: "Preventive spray" },
      ]},
      { name: "Aphids", type: "pest", symptoms: "Honeydew on leaves, stunted growth", pesticides: [
        { name: "Dimethoate 30% EC", dose: "1.7 mL/L", application: "Foliar spray" },
        { name: "Thiamethoxam 25% WG", dose: "0.2 g/L", application: "Systemic spray" },
      ]},
      { name: "Karnal Bunt", type: "disease", symptoms: "Fishy smell in grains, black powder", pesticides: [
        { name: "Propiconazole 25% EC", dose: "1 mL/L", application: "Spray at boot stage" },
      ]},
    ],
  },
  Maize: {
    crop: "Maize",
    totalN: 120, totalP: 60, totalK: 40,
    fertilizerSchedule: [
      { stage: "Basal (At Sowing)", timing: "0 days", chemicals: [
        { name: "DAP (18-46-0)", type: "Fertilizer", dose: "130 kg/ha", purpose: "Phosphorus base" },
        { name: "MOP (0-0-60)", type: "Fertilizer", dose: "67 kg/ha", purpose: "Potassium base" },
        { name: "Zinc Sulphate", type: "Micronutrient", dose: "25 kg/ha", purpose: "Zinc nutrition" },
      ]},
      { stage: "Knee-high (V6)", timing: "25-30 days", chemicals: [
        { name: "Urea (46-0-0)", type: "Fertilizer", dose: "87 kg/ha (1st split)", purpose: "Vegetative growth" },
      ]},
      { stage: "Tasseling", timing: "50-55 days", chemicals: [
        { name: "Urea (46-0-0)", type: "Fertilizer", dose: "87 kg/ha (2nd split)", purpose: "Ear development" },
      ]},
    ],
    pestsAndDiseases: [
      { name: "Fall Armyworm", type: "pest", symptoms: "Ragged holes in leaves, frass in whorl", pesticides: [
        { name: "Spinetoram 11.7% SC", dose: "0.5 mL/L", application: "Spray into whorl" },
        { name: "Emamectin Benzoate 5% SG", dose: "0.4 g/L", application: "Foliar spray" },
      ]},
      { name: "Turcicum Leaf Blight", type: "disease", symptoms: "Cigar-shaped grey-green lesions", pesticides: [
        { name: "Mancozeb 75% WP", dose: "2.5 g/L", application: "Preventive spray" },
        { name: "Zineb 75% WP", dose: "2 g/L", application: "Foliar spray" },
      ]},
    ],
  },
  Cotton: {
    crop: "Cotton",
    totalN: 150, totalP: 60, totalK: 60,
    fertilizerSchedule: [
      { stage: "Basal (At Sowing)", timing: "0 days", chemicals: [
        { name: "SSP (0-16-0)", type: "Fertilizer", dose: "375 kg/ha", purpose: "Phosphorus + Sulphur" },
        { name: "MOP (0-0-60)", type: "Fertilizer", dose: "100 kg/ha", purpose: "Potassium base" },
      ]},
      { stage: "Square Formation", timing: "30-35 days", chemicals: [
        { name: "Urea (46-0-0)", type: "Fertilizer", dose: "80 kg/ha (1st split)", purpose: "Vegetative growth" },
        { name: "MgSO4 spray", type: "Micronutrient", dose: "1%", purpose: "Magnesium nutrition" },
      ]},
      { stage: "Flowering", timing: "60-65 days", chemicals: [
        { name: "Urea (46-0-0)", type: "Fertilizer", dose: "80 kg/ha (2nd split)", purpose: "Boll development" },
        { name: "DAP spray", type: "Fertilizer", dose: "2%", purpose: "Foliar phosphorus" },
      ]},
      { stage: "Boll Development", timing: "90-100 days", chemicals: [
        { name: "KNO3 spray", type: "Fertilizer", dose: "2%", purpose: "Boll weight increase" },
        { name: "Boron spray", type: "Micronutrient", dose: "0.2%", purpose: "Reduces boll shedding" },
      ]},
    ],
    pestsAndDiseases: [
      { name: "Bollworm", type: "pest", symptoms: "Damaged bolls, frass on plant", pesticides: [
        { name: "Emamectin Benzoate 5% SG", dose: "0.4 g/L", application: "Spray at flowering" },
        { name: "Chlorantraniliprole 18.5% SC", dose: "0.3 mL/L", application: "Preventive spray" },
      ]},
      { name: "Whitefly", type: "pest", symptoms: "Sticky honeydew, sooty mold", pesticides: [
        { name: "Diafenthiuron 50% WP", dose: "1.25 g/L", application: "Foliar spray" },
        { name: "Spiromesifen 22.9% SC", dose: "1 mL/L", application: "Under-leaf spray" },
      ]},
    ],
  },
  Chickpea: {
    crop: "Chickpea",
    totalN: 20, totalP: 60, totalK: 20,
    fertilizerSchedule: [
      { stage: "Basal (At Sowing)", timing: "0 days", chemicals: [
        { name: "DAP (18-46-0)", type: "Fertilizer", dose: "130 kg/ha", purpose: "Phosphorus + starter nitrogen" },
        { name: "Rhizobium inoculant", type: "Biofertilizer", dose: "200 g/10 kg seed", purpose: "Biological N fixation" },
        { name: "PSB culture", type: "Biofertilizer", dose: "200 g/10 kg seed", purpose: "Phosphorus solubilization" },
      ]},
      { stage: "Flowering", timing: "45-50 days", chemicals: [
        { name: "2% Urea spray", type: "Fertilizer", dose: "Foliar", purpose: "Mild nitrogen boost" },
        { name: "NAA spray", type: "Growth regulator", dose: "40 ppm", purpose: "Reduce flower drop" },
      ]},
    ],
    pestsAndDiseases: [
      { name: "Wilt (Fusarium)", type: "disease", symptoms: "Wilting of entire plant, dry roots", pesticides: [
        { name: "Trichoderma viride", dose: "4 g/kg seed", application: "Seed treatment" },
        { name: "Carbendazim 50% WP", dose: "1 g/L", application: "Soil drench" },
      ]},
      { name: "Pod Borer (Helicoverpa)", type: "pest", symptoms: "Holes in pods, larvae inside", pesticides: [
        { name: "HaNPV", dose: "250 LE/ha", application: "Biological spray at flowering" },
        { name: "Indoxacarb 15.8% EC", dose: "0.5 mL/L", application: "Foliar spray" },
      ]},
    ],
  },
  Lentil: {
    crop: "Lentil",
    totalN: 20, totalP: 40, totalK: 20,
    fertilizerSchedule: [
      { stage: "Basal", timing: "0 days", chemicals: [
        { name: "DAP", type: "Fertilizer", dose: "87 kg/ha", purpose: "Phosphorus base" },
        { name: "Rhizobium", type: "Biofertilizer", dose: "200 g/10 kg seed", purpose: "N fixation" },
      ]},
      { stage: "Flowering", timing: "50-55 days", chemicals: [
        { name: "2% Urea spray", type: "Fertilizer", dose: "Foliar", purpose: "Yield boost" },
      ]},
    ],
    pestsAndDiseases: [
      { name: "Rust", type: "disease", symptoms: "Orange-brown pustules on leaves", pesticides: [
        { name: "Mancozeb 75% WP", dose: "2.5 g/L", application: "Spray at first sign" },
      ]},
      { name: "Aphids", type: "pest", symptoms: "Curling leaves, honeydew", pesticides: [
        { name: "Dimethoate 30% EC", dose: "1.7 mL/L", application: "Foliar spray" },
      ]},
    ],
  },
  Coconut: {
    crop: "Coconut",
    totalN: 500, totalP: 320, totalK: 1200,
    fertilizerSchedule: [
      { stage: "Pre-monsoon (May-June)", timing: "Annual - Split 1", chemicals: [
        { name: "Urea", type: "Fertilizer", dose: "363 g/palm", purpose: "Nitrogen - 1st split" },
        { name: "SSP", type: "Fertilizer", dose: "1 kg/palm", purpose: "Phosphorus" },
        { name: "MOP", type: "Fertilizer", dose: "670 g/palm", purpose: "Potassium - 1st split" },
      ]},
      { stage: "Post-monsoon (Sep-Oct)", timing: "Annual - Split 2", chemicals: [
        { name: "Urea", type: "Fertilizer", dose: "363 g/palm", purpose: "Nitrogen - 2nd split" },
        { name: "MOP", type: "Fertilizer", dose: "670 g/palm", purpose: "Potassium - 2nd split" },
        { name: "Borax", type: "Micronutrient", dose: "50 g/palm", purpose: "Boron nutrition" },
      ]},
    ],
    pestsAndDiseases: [
      { name: "Rhinoceros Beetle", type: "pest", symptoms: "V-shaped cuts on fronds", pesticides: [
        { name: "Metarhizium anisopliae", dose: "5 × 10⁸ spores/mL", application: "Apply to manure pits" },
        { name: "Naphthalene balls", dose: "3 balls/palm", application: "Place in leaf axil" },
      ]},
      { name: "Bud Rot", type: "disease", symptoms: "Rotting of central shoot", pesticides: [
        { name: "Bordeaux paste", dose: "10%", application: "Apply to cut surface" },
        { name: "Mancozeb", dose: "4 g/L", application: "Crown drench" },
      ]},
    ],
  },
  Coffee: {
    crop: "Coffee",
    totalN: 160, totalP: 120, totalK: 160,
    fertilizerSchedule: [
      { stage: "Pre-blossom (March)", timing: "Split 1", chemicals: [
        { name: "17:17:17 NPK", type: "Fertilizer", dose: "150 g/plant", purpose: "Balanced nutrition pre-flowering" },
      ]},
      { stage: "Post-blossom (May)", timing: "Split 2", chemicals: [
        { name: "Urea", type: "Fertilizer", dose: "40 g/plant", purpose: "Nitrogen for berry set" },
        { name: "MOP", type: "Fertilizer", dose: "35 g/plant", purpose: "Potassium for berry" },
      ]},
      { stage: "Monsoon (August)", timing: "Split 3", chemicals: [
        { name: "Urea", type: "Fertilizer", dose: "40 g/plant", purpose: "Berry development" },
      ]},
      { stage: "Post-monsoon (October)", timing: "Split 4", chemicals: [
        { name: "MOP", type: "Fertilizer", dose: "35 g/plant", purpose: "Berry maturity" },
        { name: "Borax", type: "Micronutrient", dose: "10 g/plant", purpose: "Boron nutrition" },
      ]},
    ],
    pestsAndDiseases: [
      { name: "Coffee Berry Borer", type: "pest", symptoms: "Small holes in berries", pesticides: [
        { name: "Beauveria bassiana", dose: "5 g/L", application: "Spray during berry stage" },
        { name: "Chlorpyriphos 20% EC", dose: "3 mL/L", application: "Spot spray" },
      ]},
      { name: "Leaf Rust", type: "disease", symptoms: "Orange powdery spots on underside of leaves", pesticides: [
        { name: "Bordeaux mixture", dose: "1%", application: "Pre-monsoon spray" },
        { name: "Propiconazole", dose: "1 mL/L", application: "Curative spray" },
      ]},
    ],
  },
};

export const availableCrops = Object.keys(cropNutrientPlans);
