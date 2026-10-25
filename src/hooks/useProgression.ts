import { useState, useEffect } from 'react';
import type { ProgressionSuggestion, SetLog, WeightUnit } from '../types';
import { calculateProgression, formatPreviousPerformance } from '../lib/progression';
import { mockApi } from '../api/mock-adapter';

interface UseProgressionProps {
  exerciseId: string;
  targetRepsMin: number;
  targetRepsMax: number;
  equipment?: string;
  unit?: WeightUnit;
}

export function useProgression({
  exerciseId,
  targetRepsMin,
  targetRepsMax,
  equipment = 'barbell',
  unit = 'kg',
}: UseProgressionProps) {
  const [suggestion, setSuggestion] = useState<ProgressionSuggestion | null>(null);
  const [previousSets, setPreviousSets] = useState<SetLog[]>([]);
  const [previousSummary, setPreviousSummary] = useState<string>('No previous data');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    async function loadHistory() {
      setIsLoading(true);
      try {
        const history = await mockApi.getExerciseHistory(exerciseId);
        if (!isMounted) return;

        if (history.length > 0 && history[0].sets.length > 0) {
          const lastSessionSets = history[0].sets;
          setPreviousSets(lastSessionSets);
          setPreviousSummary(formatPreviousPerformance(lastSessionSets, unit));

          const res = calculateProgression({
            previousSets: lastSessionSets,
            targetRepsMin,
            targetRepsMax,
            exerciseEquipment: equipment,
            unit,
          });
          setSuggestion(res);
        } else {
          setSuggestion({
            type: 'first_session',
            message: 'First session — start with a comfortable weight and focus on clean form.',
          });
          setPreviousSummary('First time recording');
        }
      } catch (err) {
        console.error('Failed to load progression history:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    if (exerciseId) {
      loadHistory();
    }

    return () => {
      isMounted = false;
    };
  }, [exerciseId, targetRepsMin, targetRepsMax, equipment, unit]);

  return {
    suggestion,
    previousSets,
    previousSummary,
    isLoading,
  };
}
