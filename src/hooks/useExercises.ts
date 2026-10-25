import { useState, useEffect, useMemo, useCallback } from 'react';
import type { Exercise, MuscleGroup, EquipmentType, ExerciseType } from '../types';
import { mockApi } from '../api/mock-adapter';

export function useExercises() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState<MuscleGroup | 'all'>('all');
  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentType | 'all'>('all');
  const [selectedType, setSelectedType] = useState<ExerciseType | 'all'>('all');
  const [isLoading, setIsLoading] = useState(true);

  const loadExercises = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await mockApi.getExercises();
      setExercises(data);
    } catch (err) {
      console.error('Failed to load exercises:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadExercises();
  }, [loadExercises]);

  const filteredExercises = useMemo(() => {
    return exercises.filter((ex) => {
      const matchesSearch =
        searchQuery === '' ||
        ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ex.primaryMuscle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ex.secondaryMuscles.some((m) => m.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesMuscle = selectedMuscle === 'all' || ex.primaryMuscle === selectedMuscle;
      const matchesEquipment = selectedEquipment === 'all' || ex.equipment === selectedEquipment;
      const matchesType = selectedType === 'all' || ex.exerciseType === selectedType;

      return matchesSearch && matchesMuscle && matchesEquipment && matchesType;
    });
  }, [exercises, searchQuery, selectedMuscle, selectedEquipment, selectedType]);

  const addCustomExercise = useCallback(
    async (exercise: Omit<Exercise, 'id' | 'createdAt'>) => {
      const newEx = await mockApi.createExercise(exercise);
      await loadExercises();
      return newEx;
    },
    [loadExercises]
  );

  return {
    exercises,
    filteredExercises,
    searchQuery,
    setSearchQuery,
    selectedMuscle,
    setSelectedMuscle,
    selectedEquipment,
    setSelectedEquipment,
    selectedType,
    setSelectedType,
    isLoading,
    refresh: loadExercises,
    addCustomExercise,
  };
}
