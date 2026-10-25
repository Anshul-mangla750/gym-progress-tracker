import { useState } from 'react';
import { useExercises } from '../hooks/useExercises';
import type { Exercise, MuscleGroup, EquipmentType, ExerciseType } from '../types';
import { PageHeader } from '../components/layout/PageHeader';
import { ExerciseCard } from '../components/workout/ExerciseCard';
import { ExerciseDetailModal } from '../components/workout/ExerciseDetailModal';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { MUSCLE_GROUPS, EQUIPMENT_TYPES } from '../lib/constants';
import { Search, Plus } from 'lucide-react';

export function ExerciseLibrary() {
  const {
    filteredExercises,
    searchQuery,
    setSearchQuery,
    selectedMuscle,
    setSelectedMuscle,
    selectedEquipment,
    setSelectedEquipment,
    selectedType,
    setSelectedType,
    addCustomExercise,
  } = useExercises();

  const [activeModalExercise, setActiveModalExercise] = useState<Exercise | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Custom exercise form state
  const [name, setName] = useState('');
  const [muscle, setMuscle] = useState<MuscleGroup>('chest');
  const [equipment, setEquipment] = useState<EquipmentType>('barbell');
  const [exerciseType, setExerciseType] = useState<ExerciseType>('compound');
  const [instructions, setInstructions] = useState('');
  const [techniqueNotes, setTechniqueNotes] = useState('');

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    await addCustomExercise({
      name,
      primaryMuscle: muscle,
      secondaryMuscles: [],
      equipment,
      exerciseType,
      trackingType: 'weight_reps',
      instructions,
      techniqueNotes,
      defaultRestSeconds: 90,
      isCustom: true,
    });

    setName('');
    setInstructions('');
    setTechniqueNotes('');
    setIsCreateOpen(false);
  };

  return (
    <div className="exercise-library-page space-y-6 animate-fade-in">
      <PageHeader
        title="Exercise Library"
        subtitle="Explore compound and isolation movements, anatomy targets, and coaching cues"
        action={
          <Button
            variant="primary"
            size="sm"
            icon={<Plus size={14} className="stroke-[3]" />}
            onClick={() => setIsCreateOpen(true)}
          >
            New Custom Exercise
          </Button>
        }
      />

      {/* Search & Filters */}
      <div className="space-y-3.5 bg-white p-4 sm:p-5 rounded-2xl border border-[#E2E8E4] shadow-xs">
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="Search exercises by name, primary or secondary muscle..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded-xl bg-[#F8FAF9] border border-[#E4EDE7] text-[#101828] placeholder:text-[#667085] text-sm focus:outline-none focus:border-[#079447] focus:ring-2 focus:ring-[#079447]/20 transition-all"
          />
        </div>

        {/* Muscle chips */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          <button
            type="button"
            onClick={() => setSelectedMuscle('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
              selectedMuscle === 'all'
                ? 'bg-[#079447] text-white shadow-xs'
                : 'bg-neutral-100 text-[#667085] hover:text-[#101828] hover:bg-neutral-200/80'
            }`}
          >
            All Muscles
          </button>
          {MUSCLE_GROUPS.map((m) => (
            <button
              key={m.value}
              type="button"
              onClick={() => setSelectedMuscle(m.value as MuscleGroup)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap cursor-pointer capitalize transition-all ${
                selectedMuscle === m.value
                  ? 'bg-[#079447] text-white shadow-xs'
                  : 'bg-neutral-100 text-[#667085] hover:text-[#101828] hover:bg-neutral-200/80'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* Secondary filters: Equipment & Type */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-1 border-t border-border-default/60">
          <Select
            value={selectedEquipment}
            onChange={(e) => setSelectedEquipment(e.target.value as EquipmentType | 'all')}
          >
            <option value="all">All Equipment Types</option>
            {EQUIPMENT_TYPES.map((eq) => (
              <option key={eq.value} value={eq.value}>
                {eq.label}
              </option>
            ))}
          </Select>

          <Select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as ExerciseType | 'all')}
          >
            <option value="all">All Movement Types</option>
            <option value="compound">Compound Movements</option>
            <option value="isolation">Isolation Movements</option>
          </Select>
        </div>
      </div>

      {/* Grid of Exercises */}
      {filteredExercises.length === 0 ? (
        <div className="py-16 text-center text-text-muted text-sm border border-dashed border-border-default rounded-2xl">
          No exercises found matching your search and filter criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredExercises.map((ex) => (
            <ExerciseCard
              key={ex.id}
              exercise={ex}
              onViewDetails={(item) => setActiveModalExercise(item)}
            />
          ))}
        </div>
      )}

      {/* Exercise Detail Modal */}
      <ExerciseDetailModal
        exercise={activeModalExercise}
        isOpen={!!activeModalExercise}
        onClose={() => setActiveModalExercise(null)}
      />

      {/* Custom Exercise Creation Modal */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Add Custom Exercise"
        description="Expand your personal gym library with custom variations or specialized machines"
      >
        <form onSubmit={handleCreateSubmit} className="space-y-4">
          <Input
            label="Exercise Name"
            placeholder="e.g. Incline Smith Machine Press"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Primary Target Muscle"
              value={muscle}
              onChange={(e) => setMuscle(e.target.value as MuscleGroup)}
            >
              {MUSCLE_GROUPS.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </Select>

            <Select
              label="Equipment"
              value={equipment}
              onChange={(e) => setEquipment(e.target.value as EquipmentType)}
            >
              {EQUIPMENT_TYPES.map((eq) => (
                <option key={eq.value} value={eq.value}>
                  {eq.label}
                </option>
              ))}
            </Select>
          </div>

          <Select
            label="Movement Mechanics"
            value={exerciseType}
            onChange={(e) => setExerciseType(e.target.value as ExerciseType)}
          >
            <option value="compound">Compound (Multi-joint)</option>
            <option value="isolation">Isolation (Single-joint)</option>
          </Select>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-text-secondary">Execution Instructions</label>
            <textarea
              rows={2}
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Step-by-step setup and movement guidance..."
              className="p-3 rounded-lg text-sm bg-bg-input border border-border-default text-text-primary focus:outline-none focus:border-accent-primary"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-text-secondary">Technique Notes & Cues</label>
            <textarea
              rows={2}
              value={techniqueNotes}
              onChange={(e) => setTechniqueNotes(e.target.value)}
              placeholder="e.g. Retract scapula, control negative for 3 seconds..."
              className="p-3 rounded-lg text-sm bg-bg-input border border-border-default text-text-primary focus:outline-none focus:border-accent-primary"
            />
          </div>

          <div className="flex gap-3 pt-3">
            <Button type="button" variant="secondary" fullWidth onClick={() => setIsCreateOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" fullWidth disabled={!name.trim()}>
              Save Exercise
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
