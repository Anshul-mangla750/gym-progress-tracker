import { useState, useEffect, useCallback } from 'react';
import type { WorkoutSplit, WorkoutSession } from '../types';
import { mockApi } from '../api/mock-adapter';

export function useWorkout() {
  const [splits, setSplits] = useState<WorkoutSplit[]>([]);
  const [activeSplit, setActiveSplit] = useState<WorkoutSplit | null>(null);
  const [sessions, setSessions] = useState<WorkoutSession[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [allSplits, allSessions, active] = await Promise.all([
        mockApi.getSplits(),
        mockApi.getSessions(),
        mockApi.getActiveSplit(),
      ]);
      setSplits(allSplits);
      setSessions(allSessions);
      setActiveSplit(active || allSplits[0] || null);
    } catch (err) {
      console.error('Failed to load workout data:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const createSplit = useCallback(
    async (split: Omit<WorkoutSplit, 'id' | 'createdAt' | 'updatedAt'>) => {
      const created = await mockApi.createSplit(split);
      await loadData();
      return created;
    },
    [loadData]
  );

  const updateSplit = useCallback(
    async (id: string, updates: Partial<WorkoutSplit>) => {
      const updated = await mockApi.updateSplit(id, updates);
      await loadData();
      return updated;
    },
    [loadData]
  );

  const deleteSplit = useCallback(
    async (id: string) => {
      await mockApi.deleteSplit(id);
      await loadData();
    },
    [loadData]
  );

  const duplicateSplit = useCallback(
    async (id: string) => {
      const dup = await mockApi.duplicateSplit(id);
      await loadData();
      return dup;
    },
    [loadData]
  );

  const activateSplit = useCallback(
    async (id: string) => {
      await mockApi.updateSplit(id, { isActive: true });
      await loadData();
    },
    [loadData]
  );

  return {
    splits,
    activeSplit,
    sessions,
    isLoading,
    refresh: loadData,
    createSplit,
    updateSplit,
    deleteSplit,
    duplicateSplit,
    activateSplit,
  };
}
