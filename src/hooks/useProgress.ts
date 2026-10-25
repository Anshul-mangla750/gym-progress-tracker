import { useState, useEffect, useCallback } from 'react';
import type { BodyWeightEntry, MealLog, WorkoutSession } from '../types';
import { mockApi } from '../api/mock-adapter';

export function useProgress() {
  const [bodyWeights, setBodyWeights] = useState<BodyWeightEntry[]>([]);
  const [sessions, setSessions] = useState<WorkoutSession[]>([]);
  const [meals, setMeals] = useState<MealLog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [weights, allSessions, allMeals] = await Promise.all([
        mockApi.getBodyWeights(),
        mockApi.getSessions(),
        mockApi.getAllMeals(),
      ]);
      setBodyWeights(weights);
      setSessions(allSessions);
      setMeals(allMeals);
    } catch (err) {
      console.error('Failed to load progress data:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const logBodyWeight = useCallback(
    async (entry: Omit<BodyWeightEntry, 'id' | 'createdAt'>) => {
      const created = await mockApi.logBodyWeight(entry);
      await loadData();
      return created;
    },
    [loadData]
  );

  const deleteBodyWeight = useCallback(
    async (id: string) => {
      await mockApi.deleteBodyWeight(id);
      await loadData();
    },
    [loadData]
  );

  return {
    bodyWeights,
    sessions,
    meals,
    isLoading,
    refresh: loadData,
    logBodyWeight,
    deleteBodyWeight,
  };
}
