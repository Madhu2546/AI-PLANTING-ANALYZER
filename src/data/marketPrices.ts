export interface PriceDataPoint {
  year: string;
  price: number;
}

export interface CropPriceData {
  name: string;
  unit: string;
  currentMSP: number;
  priceHistory: PriceDataPoint[];
}

export const cropPriceData: CropPriceData[] = [
  {
    name: "Rice",
    unit: "₹/Quintal",
    currentMSP: 2203,
    priceHistory: [
      { year: "2018", price: 1750 },
      { year: "2019", price: 1815 },
      { year: "2020", price: 1868 },
      { year: "2021", price: 1940 },
      { year: "2022", price: 2040 },
      { year: "2023", price: 2183 },
      { year: "2024", price: 2203 },
    ],
  },
  {
    name: "Wheat",
    unit: "₹/Quintal",
    currentMSP: 2275,
    priceHistory: [
      { year: "2018", price: 1735 },
      { year: "2019", price: 1840 },
      { year: "2020", price: 1925 },
      { year: "2021", price: 1975 },
      { year: "2022", price: 2015 },
      { year: "2023", price: 2125 },
      { year: "2024", price: 2275 },
    ],
  },
  {
    name: "Maize",
    unit: "₹/Quintal",
    currentMSP: 2090,
    priceHistory: [
      { year: "2018", price: 1700 },
      { year: "2019", price: 1760 },
      { year: "2020", price: 1850 },
      { year: "2021", price: 1870 },
      { year: "2022", price: 1962 },
      { year: "2023", price: 2090 },
      { year: "2024", price: 2090 },
    ],
  },
  {
    name: "Cotton",
    unit: "₹/Quintal",
    currentMSP: 7020,
    priceHistory: [
      { year: "2018", price: 5150 },
      { year: "2019", price: 5550 },
      { year: "2020", price: 5726 },
      { year: "2021", price: 5726 },
      { year: "2022", price: 6380 },
      { year: "2023", price: 6620 },
      { year: "2024", price: 7020 },
    ],
  },
  {
    name: "Soybean",
    unit: "₹/Quintal",
    currentMSP: 4892,
    priceHistory: [
      { year: "2018", price: 3399 },
      { year: "2019", price: 3710 },
      { year: "2020", price: 3880 },
      { year: "2021", price: 3950 },
      { year: "2022", price: 4300 },
      { year: "2023", price: 4600 },
      { year: "2024", price: 4892 },
    ],
  },
  {
    name: "Groundnut",
    unit: "₹/Quintal",
    currentMSP: 6377,
    priceHistory: [
      { year: "2018", price: 4890 },
      { year: "2019", price: 5090 },
      { year: "2020", price: 5275 },
      { year: "2021", price: 5275 },
      { year: "2022", price: 5550 },
      { year: "2023", price: 5850 },
      { year: "2024", price: 6377 },
    ],
  },
  {
    name: "Sugarcane",
    unit: "₹/Quintal",
    currentMSP: 315,
    priceHistory: [
      { year: "2018", price: 275 },
      { year: "2019", price: 275 },
      { year: "2020", price: 285 },
      { year: "2021", price: 290 },
      { year: "2022", price: 305 },
      { year: "2023", price: 315 },
      { year: "2024", price: 315 },
    ],
  },
  {
    name: "Chickpea",
    unit: "₹/Quintal",
    currentMSP: 5440,
    priceHistory: [
      { year: "2018", price: 4400 },
      { year: "2019", price: 4875 },
      { year: "2020", price: 4875 },
      { year: "2021", price: 5100 },
      { year: "2022", price: 5230 },
      { year: "2023", price: 5335 },
      { year: "2024", price: 5440 },
    ],
  },
];
