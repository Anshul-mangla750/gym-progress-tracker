import type { Food } from '../types';

let _id = 0;
const fid = () => `food_${++_id}`;
const now = new Date().toISOString();

// Sources: IFCT 2017 (Indian Food Composition Tables), USDA FoodData Central, manufacturer labels
// Values are per servingSize in servingUnit. Most are per 100g unless noted.

export const seedFoods: Food[] = [
  // ── Grains & Cereals ───────────────────────────────────
  { id: fid(), name: 'Oats (Dry)', category: 'grains', servingBasis: 'per 100g', servingSize: 100, servingUnit: 'g', calories: 389, protein: 16.9, carbohydrates: 66.3, fat: 6.9, fiber: 10.6, source: 'USDA', verified: true, isCustom: false, createdAt: now },
  { id: fid(), name: 'Wheat Flour Roti (1 medium)', category: 'grains', servingBasis: 'per piece (~40g)', servingSize: 1, servingUnit: 'piece', calories: 120, protein: 3.5, carbohydrates: 20, fat: 3.5, fiber: 2, source: 'IFCT estimate', verified: true, isCustom: false, createdAt: now },
  { id: fid(), name: 'White Bread (1 slice)', category: 'grains', servingBasis: 'per piece (~30g)', servingSize: 1, servingUnit: 'piece', calories: 79, protein: 2.7, carbohydrates: 15, fat: 1, fiber: 0.6, source: 'USDA', verified: true, isCustom: false, createdAt: now },
  { id: fid(), name: 'Brown Bread (1 slice)', category: 'grains', servingBasis: 'per piece (~30g)', servingSize: 1, servingUnit: 'piece', calories: 73, protein: 3.5, carbohydrates: 12.5, fat: 1.1, fiber: 1.9, source: 'USDA', verified: true, isCustom: false, createdAt: now },
  { id: fid(), name: 'Poha (Flattened Rice, Dry)', category: 'grains', servingBasis: 'per 100g', servingSize: 100, servingUnit: 'g', calories: 346, protein: 6.6, carbohydrates: 77, fat: 1.2, fiber: 1.7, source: 'IFCT', verified: true, isCustom: false, createdAt: now },
  { id: fid(), name: 'Dalia (Broken Wheat, Dry)', category: 'grains', servingBasis: 'per 100g', servingSize: 100, servingUnit: 'g', calories: 342, protein: 12, carbohydrates: 69, fat: 1.7, fiber: 12.5, source: 'IFCT', verified: true, isCustom: false, createdAt: now },
  { id: fid(), name: 'Cornflakes', category: 'grains', servingBasis: 'per 100g', servingSize: 100, servingUnit: 'g', calories: 357, protein: 7, carbohydrates: 84, fat: 0.4, fiber: 3.3, source: 'manufacturer', verified: true, isCustom: false, createdAt: now },
  { id: fid(), name: 'Muesli (No Added Sugar)', category: 'grains', servingBasis: 'per 100g', servingSize: 100, servingUnit: 'g', calories: 375, protein: 10, carbohydrates: 62, fat: 8, fiber: 8, source: 'manufacturer', verified: true, isCustom: false, createdAt: now },

  // ── Rice ────────────────────────────────────────────────
  { id: fid(), name: 'Cooked White Rice', category: 'rice', servingBasis: 'per 100g', servingSize: 100, servingUnit: 'g', calories: 130, protein: 2.7, carbohydrates: 28, fat: 0.3, fiber: 0.4, source: 'USDA', verified: true, isCustom: false, createdAt: now },
  { id: fid(), name: 'Cooked Brown Rice', category: 'rice', servingBasis: 'per 100g', servingSize: 100, servingUnit: 'g', calories: 112, protein: 2.6, carbohydrates: 23.5, fat: 0.9, fiber: 1.8, source: 'USDA', verified: true, isCustom: false, createdAt: now },
  { id: fid(), name: 'Rice Flakes (Murmura)', category: 'rice', servingBasis: 'per 100g', servingSize: 100, servingUnit: 'g', calories: 394, protein: 6.6, carbohydrates: 90, fat: 0.5, fiber: 0.2, source: 'IFCT', verified: true, isCustom: false, createdAt: now },

  // ── Dal & Legumes ───────────────────────────────────────
  { id: fid(), name: 'Moong Dal (Cooked)', category: 'dal_legumes', servingBasis: 'per 100g', servingSize: 100, servingUnit: 'g', calories: 106, protein: 7.1, carbohydrates: 18, fat: 0.4, fiber: 3, source: 'IFCT', verified: true, isCustom: false, createdAt: now },
  { id: fid(), name: 'Masoor Dal (Cooked)', category: 'dal_legumes', servingBasis: 'per 100g', servingSize: 100, servingUnit: 'g', calories: 116, protein: 9, carbohydrates: 20, fat: 0.4, fiber: 3.8, source: 'IFCT', verified: true, isCustom: false, createdAt: now },
  { id: fid(), name: 'Toor Dal (Cooked)', category: 'dal_legumes', servingBasis: 'per 100g', servingSize: 100, servingUnit: 'g', calories: 120, protein: 7.7, carbohydrates: 21, fat: 0.6, fiber: 5, source: 'IFCT', verified: true, isCustom: false, createdAt: now },
  { id: fid(), name: 'Rajma (Cooked)', category: 'dal_legumes', servingBasis: 'per 100g', servingSize: 100, servingUnit: 'g', calories: 127, protein: 8.7, carbohydrates: 22.8, fat: 0.5, fiber: 6.4, source: 'USDA', verified: true, isCustom: false, createdAt: now },
  { id: fid(), name: 'Chole / Chickpeas (Cooked)', category: 'dal_legumes', servingBasis: 'per 100g', servingSize: 100, servingUnit: 'g', calories: 164, protein: 8.9, carbohydrates: 27.4, fat: 2.6, fiber: 7.6, source: 'USDA', verified: true, isCustom: false, createdAt: now },
  { id: fid(), name: 'Chana Dal (Dry)', category: 'dal_legumes', servingBasis: 'per 100g', servingSize: 100, servingUnit: 'g', calories: 360, protein: 22, carbohydrates: 58, fat: 5.3, fiber: 11, source: 'IFCT', verified: true, isCustom: false, createdAt: now },
  { id: fid(), name: 'Sprouts (Moong)', category: 'dal_legumes', servingBasis: 'per 100g', servingSize: 100, servingUnit: 'g', calories: 31, protein: 3.2, carbohydrates: 5.9, fat: 0.2, fiber: 1.8, source: 'USDA', verified: true, isCustom: false, createdAt: now },
  { id: fid(), name: 'Roasted Chana', category: 'dal_legumes', servingBasis: 'per 100g', servingSize: 100, servingUnit: 'g', calories: 369, protein: 22, carbohydrates: 58, fat: 5, fiber: 15, source: 'IFCT estimate', verified: true, isCustom: false, createdAt: now },

  // ── Vegetables ──────────────────────────────────────────
  { id: fid(), name: 'Spinach (Raw)', category: 'vegetables', servingBasis: 'per 100g', servingSize: 100, servingUnit: 'g', calories: 23, protein: 2.9, carbohydrates: 3.6, fat: 0.4, fiber: 2.2, source: 'USDA', verified: true, isCustom: false, createdAt: now },
  { id: fid(), name: 'Broccoli', category: 'vegetables', servingBasis: 'per 100g', servingSize: 100, servingUnit: 'g', calories: 34, protein: 2.8, carbohydrates: 7, fat: 0.4, fiber: 2.6, source: 'USDA', verified: true, isCustom: false, createdAt: now },
  { id: fid(), name: 'Sweet Potato (Cooked)', category: 'vegetables', servingBasis: 'per 100g', servingSize: 100, servingUnit: 'g', calories: 90, protein: 2, carbohydrates: 21, fat: 0.1, fiber: 3.3, source: 'USDA', verified: true, isCustom: false, createdAt: now },
  { id: fid(), name: 'Potato (Boiled)', category: 'vegetables', servingBasis: 'per 100g', servingSize: 100, servingUnit: 'g', calories: 87, protein: 1.9, carbohydrates: 20, fat: 0.1, fiber: 1.8, source: 'USDA', verified: true, isCustom: false, createdAt: now },
  { id: fid(), name: 'Tomato', category: 'vegetables', servingBasis: 'per 100g', servingSize: 100, servingUnit: 'g', calories: 18, protein: 0.9, carbohydrates: 3.9, fat: 0.2, fiber: 1.2, source: 'USDA', verified: true, isCustom: false, createdAt: now },
  { id: fid(), name: 'Onion', category: 'vegetables', servingBasis: 'per 100g', servingSize: 100, servingUnit: 'g', calories: 40, protein: 1.1, carbohydrates: 9.3, fat: 0.1, fiber: 1.7, source: 'USDA', verified: true, isCustom: false, createdAt: now },
  { id: fid(), name: 'Capsicum (Bell Pepper)', category: 'vegetables', servingBasis: 'per 100g', servingSize: 100, servingUnit: 'g', calories: 31, protein: 1, carbohydrates: 6, fat: 0.3, fiber: 2.1, source: 'USDA', verified: true, isCustom: false, createdAt: now },
  { id: fid(), name: 'Carrot', category: 'vegetables', servingBasis: 'per 100g', servingSize: 100, servingUnit: 'g', calories: 41, protein: 0.9, carbohydrates: 10, fat: 0.2, fiber: 2.8, source: 'USDA', verified: true, isCustom: false, createdAt: now },
  { id: fid(), name: 'Cucumber', category: 'vegetables', servingBasis: 'per 100g', servingSize: 100, servingUnit: 'g', calories: 16, protein: 0.7, carbohydrates: 3.6, fat: 0.1, fiber: 0.5, source: 'USDA', verified: true, isCustom: false, createdAt: now },
  { id: fid(), name: 'Green Peas (Cooked)', category: 'vegetables', servingBasis: 'per 100g', servingSize: 100, servingUnit: 'g', calories: 81, protein: 5.4, carbohydrates: 14.5, fat: 0.4, fiber: 5.1, source: 'USDA', verified: true, isCustom: false, createdAt: now },

  // ── Fruits ──────────────────────────────────────────────
  { id: fid(), name: 'Banana (1 medium)', category: 'fruits', servingBasis: 'per piece (~120g)', servingSize: 1, servingUnit: 'piece', calories: 105, protein: 1.3, carbohydrates: 27, fat: 0.4, fiber: 3.1, source: 'USDA', verified: true, isCustom: false, createdAt: now },
  { id: fid(), name: 'Apple (1 medium)', category: 'fruits', servingBasis: 'per piece (~180g)', servingSize: 1, servingUnit: 'piece', calories: 95, protein: 0.5, carbohydrates: 25, fat: 0.3, fiber: 4.4, source: 'USDA', verified: true, isCustom: false, createdAt: now },
  { id: fid(), name: 'Mango', category: 'fruits', servingBasis: 'per 100g', servingSize: 100, servingUnit: 'g', calories: 60, protein: 0.8, carbohydrates: 15, fat: 0.4, fiber: 1.6, source: 'USDA', verified: true, isCustom: false, createdAt: now },
  { id: fid(), name: 'Papaya', category: 'fruits', servingBasis: 'per 100g', servingSize: 100, servingUnit: 'g', calories: 43, protein: 0.5, carbohydrates: 11, fat: 0.3, fiber: 1.7, source: 'USDA', verified: true, isCustom: false, createdAt: now },
  { id: fid(), name: 'Orange (1 medium)', category: 'fruits', servingBasis: 'per piece (~130g)', servingSize: 1, servingUnit: 'piece', calories: 62, protein: 1.2, carbohydrates: 15.4, fat: 0.2, fiber: 3.1, source: 'USDA', verified: true, isCustom: false, createdAt: now },
  { id: fid(), name: 'Watermelon', category: 'fruits', servingBasis: 'per 100g', servingSize: 100, servingUnit: 'g', calories: 30, protein: 0.6, carbohydrates: 7.6, fat: 0.2, fiber: 0.4, source: 'USDA', verified: true, isCustom: false, createdAt: now },
  { id: fid(), name: 'Grapes', category: 'fruits', servingBasis: 'per 100g', servingSize: 100, servingUnit: 'g', calories: 69, protein: 0.7, carbohydrates: 18, fat: 0.2, fiber: 0.9, source: 'USDA', verified: true, isCustom: false, createdAt: now },
  { id: fid(), name: 'Pomegranate', category: 'fruits', servingBasis: 'per 100g', servingSize: 100, servingUnit: 'g', calories: 83, protein: 1.7, carbohydrates: 19, fat: 1.2, fiber: 4, source: 'USDA', verified: true, isCustom: false, createdAt: now },

  // ── Dairy ───────────────────────────────────────────────
  { id: fid(), name: 'Whole Milk', category: 'dairy', servingBasis: 'per 100ml', servingSize: 100, servingUnit: 'ml', calories: 62, protein: 3.2, carbohydrates: 4.8, fat: 3.3, fiber: 0, source: 'USDA', verified: true, isCustom: false, createdAt: now },
  { id: fid(), name: 'Toned Milk', category: 'dairy', servingBasis: 'per 100ml', servingSize: 100, servingUnit: 'ml', calories: 50, protein: 3.3, carbohydrates: 4.9, fat: 1.5, fiber: 0, source: 'IFCT', verified: true, isCustom: false, createdAt: now },
  { id: fid(), name: 'Curd / Yogurt (Plain)', category: 'dairy', servingBasis: 'per 100g', servingSize: 100, servingUnit: 'g', calories: 60, protein: 3.5, carbohydrates: 4.7, fat: 3.3, fiber: 0, source: 'USDA', verified: true, isCustom: false, createdAt: now },
  { id: fid(), name: 'Greek Yogurt (Plain)', category: 'dairy', servingBasis: 'per 100g', servingSize: 100, servingUnit: 'g', calories: 97, protein: 9, carbohydrates: 3.6, fat: 5, fiber: 0, source: 'USDA', verified: true, isCustom: false, createdAt: now },
  { id: fid(), name: 'Paneer', category: 'dairy', servingBasis: 'per 100g', servingSize: 100, servingUnit: 'g', calories: 265, protein: 18.3, carbohydrates: 1.2, fat: 20.8, fiber: 0, source: 'IFCT', verified: true, isCustom: false, createdAt: now },
  { id: fid(), name: 'Cottage Cheese (Low Fat)', category: 'dairy', servingBasis: 'per 100g', servingSize: 100, servingUnit: 'g', calories: 98, protein: 11.1, carbohydrates: 3.4, fat: 4.3, fiber: 0, source: 'USDA', verified: true, isCustom: false, createdAt: now },

  // ── Eggs & Poultry ──────────────────────────────────────
  { id: fid(), name: 'Whole Egg (1 large)', category: 'eggs_poultry', servingBasis: 'per piece (~50g)', servingSize: 1, servingUnit: 'piece', calories: 72, protein: 6.3, carbohydrates: 0.4, fat: 4.8, fiber: 0, source: 'USDA', verified: true, isCustom: false, createdAt: now },
  { id: fid(), name: 'Egg White (1 large)', category: 'eggs_poultry', servingBasis: 'per piece (~33g)', servingSize: 1, servingUnit: 'piece', calories: 17, protein: 3.6, carbohydrates: 0.2, fat: 0.1, fiber: 0, source: 'USDA', verified: true, isCustom: false, createdAt: now },
  { id: fid(), name: 'Chicken Breast (Cooked)', category: 'eggs_poultry', servingBasis: 'per 100g', servingSize: 100, servingUnit: 'g', calories: 165, protein: 31, carbohydrates: 0, fat: 3.6, fiber: 0, source: 'USDA', verified: true, isCustom: false, createdAt: now },
  { id: fid(), name: 'Chicken Thigh (Cooked)', category: 'eggs_poultry', servingBasis: 'per 100g', servingSize: 100, servingUnit: 'g', calories: 209, protein: 26, carbohydrates: 0, fat: 10.9, fiber: 0, source: 'USDA', verified: true, isCustom: false, createdAt: now },
  { id: fid(), name: 'Fish — Rohu (Cooked)', category: 'fish_seafood', servingBasis: 'per 100g', servingSize: 100, servingUnit: 'g', calories: 97, protein: 17, carbohydrates: 0, fat: 3, fiber: 0, source: 'IFCT estimate', verified: true, isCustom: false, createdAt: now },

  // ── Nuts & Seeds ────────────────────────────────────────
  { id: fid(), name: 'Almonds', category: 'nuts_seeds', servingBasis: 'per 100g', servingSize: 100, servingUnit: 'g', calories: 579, protein: 21.2, carbohydrates: 21.6, fat: 49.9, fiber: 12.5, source: 'USDA', verified: true, isCustom: false, createdAt: now },
  { id: fid(), name: 'Peanuts (Roasted)', category: 'nuts_seeds', servingBasis: 'per 100g', servingSize: 100, servingUnit: 'g', calories: 567, protein: 25.8, carbohydrates: 16.1, fat: 49.2, fiber: 8.5, source: 'USDA', verified: true, isCustom: false, createdAt: now },
  { id: fid(), name: 'Cashews', category: 'nuts_seeds', servingBasis: 'per 100g', servingSize: 100, servingUnit: 'g', calories: 553, protein: 18.2, carbohydrates: 30.2, fat: 43.9, fiber: 3.3, source: 'USDA', verified: true, isCustom: false, createdAt: now },
  { id: fid(), name: 'Walnuts', category: 'nuts_seeds', servingBasis: 'per 100g', servingSize: 100, servingUnit: 'g', calories: 654, protein: 15.2, carbohydrates: 13.7, fat: 65.2, fiber: 6.7, source: 'USDA', verified: true, isCustom: false, createdAt: now },
  { id: fid(), name: 'Flaxseeds', category: 'nuts_seeds', servingBasis: 'per 100g', servingSize: 100, servingUnit: 'g', calories: 534, protein: 18.3, carbohydrates: 28.9, fat: 42.2, fiber: 27.3, source: 'USDA', verified: true, isCustom: false, createdAt: now },

  // ── Soy Products ────────────────────────────────────────
  { id: fid(), name: 'Soya Chunks (Dry)', category: 'soy_products', servingBasis: 'per 100g', servingSize: 100, servingUnit: 'g', calories: 345, protein: 52, carbohydrates: 33, fat: 0.5, fiber: 13, source: 'manufacturer', verified: true, isCustom: false, createdAt: now },
  { id: fid(), name: 'Tofu (Firm)', category: 'soy_products', servingBasis: 'per 100g', servingSize: 100, servingUnit: 'g', calories: 76, protein: 8, carbohydrates: 1.9, fat: 4.8, fiber: 0.3, source: 'USDA', verified: true, isCustom: false, createdAt: now },
  { id: fid(), name: 'Soy Milk', category: 'soy_products', servingBasis: 'per 100ml', servingSize: 100, servingUnit: 'ml', calories: 33, protein: 2.9, carbohydrates: 1.8, fat: 1.8, fiber: 0.4, source: 'USDA', verified: true, isCustom: false, createdAt: now },

  // ── Oils & Fats ─────────────────────────────────────────
  { id: fid(), name: 'Ghee', category: 'oils_fats', servingBasis: 'per 1 tbsp (~14g)', servingSize: 1, servingUnit: 'tbsp', calories: 123, protein: 0, carbohydrates: 0, fat: 14, fiber: 0, source: 'USDA', verified: true, isCustom: false, createdAt: now },
  { id: fid(), name: 'Olive Oil', category: 'oils_fats', servingBasis: 'per 1 tbsp (~14g)', servingSize: 1, servingUnit: 'tbsp', calories: 119, protein: 0, carbohydrates: 0, fat: 13.5, fiber: 0, source: 'USDA', verified: true, isCustom: false, createdAt: now },
  { id: fid(), name: 'Mustard Oil', category: 'oils_fats', servingBasis: 'per 1 tbsp (~14g)', servingSize: 1, servingUnit: 'tbsp', calories: 124, protein: 0, carbohydrates: 0, fat: 14, fiber: 0, source: 'IFCT', verified: true, isCustom: false, createdAt: now },
  { id: fid(), name: 'Coconut Oil', category: 'oils_fats', servingBasis: 'per 1 tbsp (~14g)', servingSize: 1, servingUnit: 'tbsp', calories: 121, protein: 0, carbohydrates: 0, fat: 13.5, fiber: 0, source: 'USDA', verified: true, isCustom: false, createdAt: now },

  // ── Packaged / Supplements ──────────────────────────────
  { id: fid(), name: 'Whey Protein (1 scoop)', category: 'packaged', servingBasis: 'per scoop (~30g)', servingSize: 1, servingUnit: 'scoop', calories: 120, protein: 24, carbohydrates: 3, fat: 1.5, fiber: 0, source: 'manufacturer avg', verified: true, isCustom: false, createdAt: now },
  { id: fid(), name: 'Peanut Butter', category: 'packaged', servingBasis: 'per 100g', servingSize: 100, servingUnit: 'g', calories: 588, protein: 25, carbohydrates: 20, fat: 50, fiber: 6, source: 'USDA', verified: true, isCustom: false, createdAt: now },
  { id: fid(), name: 'Honey', category: 'packaged', servingBasis: 'per 100g', servingSize: 100, servingUnit: 'g', calories: 304, protein: 0.3, carbohydrates: 82, fat: 0, fiber: 0.2, source: 'USDA', verified: true, isCustom: false, createdAt: now },
  { id: fid(), name: 'Protein Bar (avg)', category: 'packaged', servingBasis: 'per piece (~60g)', servingSize: 1, servingUnit: 'piece', calories: 220, protein: 20, carbohydrates: 22, fat: 8, fiber: 3, source: 'manufacturer avg', verified: false, isCustom: false, createdAt: now },

  // ── Common Prepared Meals ───────────────────────────────
  { id: fid(), name: 'Poha (Prepared, 1 serving)', category: 'common_meals', servingBasis: 'per serving (~200g)', servingSize: 1, servingUnit: 'serving', calories: 250, protein: 5, carbohydrates: 45, fat: 7, fiber: 2, source: 'IFCT estimate', verified: false, isCustom: false, createdAt: now },
  { id: fid(), name: 'Khichdi (Rice + Dal)', category: 'common_meals', servingBasis: 'per serving (~250g)', servingSize: 1, servingUnit: 'serving', calories: 220, protein: 8, carbohydrates: 38, fat: 4, fiber: 3, source: 'IFCT estimate', verified: false, isCustom: false, createdAt: now },
  { id: fid(), name: 'Idli (2 pieces)', category: 'common_meals', servingBasis: 'per 2 pieces (~120g)', servingSize: 2, servingUnit: 'piece', calories: 156, protein: 4.2, carbohydrates: 32, fat: 1, fiber: 1.5, source: 'IFCT estimate', verified: false, isCustom: false, createdAt: now },
  { id: fid(), name: 'Dosa (1 plain)', category: 'common_meals', servingBasis: 'per piece (~100g)', servingSize: 1, servingUnit: 'piece', calories: 168, protein: 4, carbohydrates: 27, fat: 5, fiber: 1, source: 'IFCT estimate', verified: false, isCustom: false, createdAt: now },
  { id: fid(), name: 'Upma (1 serving)', category: 'common_meals', servingBasis: 'per serving (~200g)', servingSize: 1, servingUnit: 'serving', calories: 220, protein: 5, carbohydrates: 35, fat: 7, fiber: 2.5, source: 'IFCT estimate', verified: false, isCustom: false, createdAt: now },
  { id: fid(), name: 'Paratha (1 plain)', category: 'common_meals', servingBasis: 'per piece (~80g)', servingSize: 1, servingUnit: 'piece', calories: 260, protein: 5, carbohydrates: 36, fat: 11, fiber: 2, source: 'IFCT estimate', verified: false, isCustom: false, createdAt: now },
  { id: fid(), name: 'Dal Rice (1 plate)', category: 'common_meals', servingBasis: 'per serving (~350g)', servingSize: 1, servingUnit: 'serving', calories: 370, protein: 14, carbohydrates: 62, fat: 6, fiber: 5, source: 'IFCT estimate', verified: false, isCustom: false, createdAt: now },
  { id: fid(), name: 'Roti + Sabzi (1 roti + 100g sabzi)', category: 'common_meals', servingBasis: 'per serving', servingSize: 1, servingUnit: 'serving', calories: 200, protein: 5, carbohydrates: 28, fat: 8, fiber: 3, source: 'IFCT estimate', verified: false, isCustom: false, createdAt: now },

  // ── Beverages ───────────────────────────────────────────
  { id: fid(), name: 'Black Coffee', category: 'beverages', servingBasis: 'per cup (~240ml)', servingSize: 1, servingUnit: 'cup', calories: 2, protein: 0.3, carbohydrates: 0, fat: 0, fiber: 0, source: 'USDA', verified: true, isCustom: false, createdAt: now },
  { id: fid(), name: 'Chai (with milk & sugar)', category: 'beverages', servingBasis: 'per cup (~150ml)', servingSize: 1, servingUnit: 'cup', calories: 70, protein: 2, carbohydrates: 10, fat: 2.5, fiber: 0, source: 'estimate', verified: false, isCustom: false, createdAt: now },
  { id: fid(), name: 'Coconut Water', category: 'beverages', servingBasis: 'per 100ml', servingSize: 100, servingUnit: 'ml', calories: 19, protein: 0.7, carbohydrates: 3.7, fat: 0.2, fiber: 1.1, source: 'USDA', verified: true, isCustom: false, createdAt: now },
  { id: fid(), name: 'Lassi (Sweet)', category: 'beverages', servingBasis: 'per glass (~200ml)', servingSize: 1, servingUnit: 'serving', calories: 160, protein: 5, carbohydrates: 28, fat: 3.5, fiber: 0, source: 'IFCT estimate', verified: false, isCustom: false, createdAt: now },
];
