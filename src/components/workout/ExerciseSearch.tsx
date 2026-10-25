import { useState, useMemo } from 'react';
import type { Exercise, MuscleGroup } from '../../types';
import { Modal } from '../ui/Modal';
import { MUSCLE_GROUPS } from '../../lib/constants';
import { Search, Plus } from 'lucide-react';
import { seedExercises } from '../../data/seed-exercises';

interface ExerciseSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectExercise: (exercise: Exercise) => void;
}

export function ExerciseSearch({
  isOpen,
  onClose,
  onSelectExercise,
}: ExerciseSearchProps) {
  const [query, setQuery] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState<MuscleGroup | 'all'>('all');

  const filtered = useMemo(() => {
    return seedExercises.filter((ex) => {
      const matchQuery =
        query === '' ||
        ex.name.toLowerCase().includes(query.toLowerCase()) ||
        ex.primaryMuscle.toLowerCase().includes(query.toLowerCase());

      const matchMuscle = selectedMuscle === 'all' || ex.primaryMuscle === selectedMuscle;
      return matchQuery && matchMuscle;
    });
  }, [query, selectedMuscle]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Exercise"
      description="Choose an exercise to add to your workout session"
      maxWidth="lg"
    >
      <div className="space-y-4">
        {/* Search input */}
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Search exercises by name or muscle..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded-xl bg-bg-input border border-border-default text-text-primary text-sm focus:outline-none focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20"
            autoFocus
          />
        </div>

        {/* Muscle chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          <button
            type="button"
            onClick={() => setSelectedMuscle('all')}
            className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer transition-colors ${
              selectedMuscle === 'all'
                ? 'bg-accent-primary text-black font-semibold'
                : 'bg-bg-elevated text-text-secondary hover:text-text-primary'
            }`}
          >
            All Muscles
          </button>
          {MUSCLE_GROUPS.map((m) => (
            <button
              key={m.value}
              type="button"
              onClick={() => setSelectedMuscle(m.value as MuscleGroup)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer capitalize transition-colors ${
                selectedMuscle === m.value
                  ? 'bg-accent-primary text-black font-semibold'
                  : 'bg-bg-elevated text-text-secondary hover:text-text-primary'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* Results list */}
        <div className="max-h-[50vh] overflow-y-auto space-y-2 pr-1">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-text-muted text-sm">
              No exercises found matching "{query}".
            </div>
          ) : (
            filtered.map((ex) => (
              <div
                key={ex.id}
                onClick={() => {
                  onSelectExercise(ex);
                  onClose();
                }}
                className="flex items-center justify-between p-3 rounded-xl bg-bg-secondary hover:bg-bg-elevated border border-border-default cursor-pointer transition-all duration-150 group"
              >
                <div>
                  <h4 className="font-heading font-semibold text-sm text-text-primary group-hover:text-accent-primary transition-colors">
                    {ex.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-1 text-xs text-text-muted">
                    <span className="capitalize text-accent-primary font-medium">{ex.primaryMuscle}</span>
                    <span>•</span>
                    <span className="capitalize">{ex.equipment}</span>
                    <span>•</span>
                    <span className="capitalize">{ex.exerciseType}</span>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-lg bg-bg-card border border-border-default flex items-center justify-center text-text-secondary group-hover:bg-accent-primary group-hover:text-black transition-colors shrink-0">
                  <Plus size={16} />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Modal>
  );
}
