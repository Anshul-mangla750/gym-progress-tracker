import type { WeightUnit } from '../types';

const KG_TO_LB = 2.20462;
const LB_TO_KG = 0.453592;

export function kgToLb(kg: number): number {
  return Math.round(kg * KG_TO_LB * 10) / 10;
}

export function lbToKg(lb: number): number {
  return Math.round(lb * LB_TO_KG * 10) / 10;
}

export function convertWeight(value: number, from: WeightUnit, to: WeightUnit): number {
  if (from === to) return value;
  return from === 'kg' ? kgToLb(value) : lbToKg(value);
}

export function formatWeight(value: number, unit: WeightUnit): string {
  return `${value} ${unit}`;
}

export function getWeightIncrement(
  exerciseEquipment: string,
  unit: WeightUnit,
  customIncrement?: number
): number {
  if (customIncrement) return customIncrement;

  const increments: Record<string, { kg: number; lb: number }> = {
    barbell: { kg: 2.5, lb: 5 },
    dumbbell: { kg: 2, lb: 5 },
    cable: { kg: 2.5, lb: 5 },
    machine: { kg: 2.5, lb: 5 },
    kettlebell: { kg: 4, lb: 8 },
  };

  const inc = increments[exerciseEquipment] || { kg: 2.5, lb: 5 };
  return unit === 'kg' ? inc.kg : inc.lb;
}

/** Round a weight to the nearest available increment */
export function roundToIncrement(weight: number, increment: number): number {
  return Math.round(weight / increment) * increment;
}
