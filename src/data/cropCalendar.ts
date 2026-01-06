// Seasonal crop calendar data
export interface CropCalendarEntry {
  crop: string;
  plantingMonths: number[]; // 0-11 (Jan-Dec)
  harvestMonths: number[];
  season: "Kharif" | "Rabi" | "Zaid" | "Year-round";
}

export const cropCalendar: CropCalendarEntry[] = [
  {
    crop: "Rice",
    plantingMonths: [5, 6, 7], // June-Aug
    harvestMonths: [9, 10, 11], // Oct-Dec
    season: "Kharif"
  },
  {
    crop: "Maize",
    plantingMonths: [5, 6, 10, 11], // June-July, Nov-Dec
    harvestMonths: [8, 9, 2, 3], // Sept-Oct, Mar-Apr
    season: "Kharif"
  },
  {
    crop: "Chickpea",
    plantingMonths: [9, 10], // Oct-Nov
    harvestMonths: [1, 2, 3], // Feb-Apr
    season: "Rabi"
  },
  {
    crop: "Kidney Beans",
    plantingMonths: [6, 7], // July-Aug
    harvestMonths: [9, 10], // Oct-Nov
    season: "Kharif"
  },
  {
    crop: "Pigeon Peas",
    plantingMonths: [5, 6], // June-July
    harvestMonths: [11, 0, 1], // Dec-Feb
    season: "Kharif"
  },
  {
    crop: "Moth Beans",
    plantingMonths: [6, 7], // July-Aug
    harvestMonths: [8, 9], // Sept-Oct
    season: "Kharif"
  },
  {
    crop: "Mung Bean",
    plantingMonths: [2, 3, 6, 7], // Mar-Apr, July-Aug
    harvestMonths: [4, 5, 9, 10], // May-June, Oct-Nov
    season: "Kharif"
  },
  {
    crop: "Black Gram",
    plantingMonths: [5, 6, 7], // June-Aug
    harvestMonths: [8, 9, 10], // Sept-Nov
    season: "Kharif"
  },
  {
    crop: "Lentil",
    plantingMonths: [9, 10, 11], // Oct-Dec
    harvestMonths: [1, 2, 3], // Feb-Apr
    season: "Rabi"
  },
  {
    crop: "Pomegranate",
    plantingMonths: [5, 6, 9, 10], // June-July, Oct-Nov
    harvestMonths: [0, 1, 2, 10, 11], // Jan-Mar, Nov-Dec
    season: "Year-round"
  },
  {
    crop: "Banana",
    plantingMonths: [1, 2, 5, 6, 9, 10], // Feb-Mar, June-July, Oct-Nov
    harvestMonths: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], // Year-round
    season: "Year-round"
  },
  {
    crop: "Mango",
    plantingMonths: [6, 7, 8], // July-Sept (monsoon)
    harvestMonths: [3, 4, 5, 6], // Apr-July
    season: "Kharif"
  },
  {
    crop: "Grapes",
    plantingMonths: [0, 1, 5, 6], // Jan-Feb, June-July
    harvestMonths: [1, 2, 3, 4], // Feb-May
    season: "Rabi"
  },
  {
    crop: "Watermelon",
    plantingMonths: [1, 2, 3], // Feb-Apr
    harvestMonths: [4, 5, 6], // May-July
    season: "Zaid"
  },
  {
    crop: "Muskmelon",
    plantingMonths: [1, 2, 3], // Feb-Apr
    harvestMonths: [4, 5, 6], // May-July
    season: "Zaid"
  },
  {
    crop: "Apple",
    plantingMonths: [0, 1, 2], // Jan-Mar
    harvestMonths: [6, 7, 8, 9], // July-Oct
    season: "Kharif"
  },
  {
    crop: "Orange",
    plantingMonths: [6, 7, 8], // July-Sept
    harvestMonths: [10, 11, 0, 1], // Nov-Feb
    season: "Rabi"
  },
  {
    crop: "Papaya",
    plantingMonths: [1, 2, 6, 7, 9, 10], // Feb-Mar, July-Aug, Oct-Nov
    harvestMonths: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], // Year-round
    season: "Year-round"
  },
  {
    crop: "Coconut",
    plantingMonths: [4, 5, 8, 9], // May-June, Sept-Oct
    harvestMonths: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], // Year-round
    season: "Year-round"
  },
  {
    crop: "Cotton",
    plantingMonths: [4, 5, 6], // May-July
    harvestMonths: [9, 10, 11, 0], // Oct-Jan
    season: "Kharif"
  },
  {
    crop: "Jute",
    plantingMonths: [2, 3, 4], // Mar-May
    harvestMonths: [6, 7, 8], // July-Sept
    season: "Kharif"
  },
  {
    crop: "Coffee",
    plantingMonths: [5, 6], // June-July
    harvestMonths: [10, 11, 0, 1], // Nov-Feb
    season: "Year-round"
  }
];

export const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export const seasonColors = {
  Kharif: "bg-green-500",
  Rabi: "bg-amber-500",
  Zaid: "bg-orange-500",
  "Year-round": "bg-blue-500"
};
