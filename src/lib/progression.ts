import type { SetLog, ProgressionSuggestion, WeightUnit } from '../types';
import { getWeightIncrement } from './unit-conversion';

interface ProgressionInput {
  previousSets: SetLog[];
  targetRepsMin: number;
  targetRepsMax: number;
  exerciseEquipment: string;
  unit: WeightUnit;
  threshold?: 'all_sets' | 'majority_sets';
  customIncrement?: number;
}

/**
 * Double progression algorithm.
 * 1. If no previous data → first session.
 * 2. If all sets hit top of rep range → suggest weight increase.
 * 3. If all sets above minimum → suggest more reps.
 * 4. Otherwise → repeat current weight.
 */
export function calculateProgression(input: ProgressionInput): ProgressionSuggestion {
  const {
    previousSets,
    targetRepsMin,
    targetRepsMax,
    exerciseEquipment,
    unit,
    threshold = 'all_sets',
    customIncrement,
  } = input;

  // Filter to completed sets only
  const completedSets = previousSets.filter(s => s.isCompleted && s.actualReps != null);

  if (completedSets.length === 0) {
    return {
      type: 'first_session',
      message: 'First session — start with a comfortable weight and focus on form.',
    };
  }

  const previousWeight = completedSets[0]?.weight || 0;
  const reps = completedSets.map(s => s.actualReps!);
  const avgReps = reps.reduce((a, b) => a + b, 0) / reps.length;

  // Check if progression criteria are met
  const allAtTop = checkThreshold(reps, targetRepsMax, threshold);
  const allAboveMin = checkThreshold(reps, targetRepsMin, threshold);

  if (allAtTop) {
    const increment = getWeightIncrement(exerciseEquipment, unit, customIncrement);
    const suggestedWeight = previousWeight + increment;

    return {
      type: 'increase_weight',
      suggestedWeight,
      previousWeight,
      previousReps: reps,
      message: `All sets at ${targetRepsMax} reps. Increase to ${suggestedWeight} ${unit}.`,
    };
  }

  if (allAboveMin) {
    const targetReps = Math.min(Math.ceil(avgReps) + 1, targetRepsMax);

    return {
      type: 'increase_reps',
      suggestedReps: targetReps,
      previousWeight,
      previousReps: reps,
      message: `Aim for ${targetReps} reps at ${previousWeight} ${unit}.`,
    };
  }

  // Not all sets above minimum — repeat
  return {
    type: 'repeat',
    previousWeight,
    previousReps: reps,
    message: `Continue at ${previousWeight} ${unit}. Focus on hitting ${targetRepsMin}+ reps on all sets.`,
  };
}

function checkThreshold(
  reps: number[],
  target: number,
  threshold: 'all_sets' | 'majority_sets'
): boolean {
  if (threshold === 'all_sets') {
    return reps.every(r => r >= target);
  }
  // majority = at least 2/3 of sets
  const passing = reps.filter(r => r >= target).length;
  return passing >= Math.ceil(reps.length * (2 / 3));
}

/** Format previous performance as a display string */
export function formatPreviousPerformance(sets: SetLog[], unit: WeightUnit): string {
  const completed = sets.filter(s => s.isCompleted && s.actualReps != null);
  if (completed.length === 0) return 'No previous data';

  const weight = completed[0]?.weight;
  const reps = completed.map(s => s.actualReps);

  if (weight) {
    return `${weight} ${unit} × ${reps.join(', ')}`;
  }
  return `${reps.join(', ')} reps`;
}
