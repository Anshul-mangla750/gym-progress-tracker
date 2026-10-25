import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorkout } from '../hooks/useWorkout';
import { useActiveWorkout } from '../hooks/useActiveWorkout';
import { useExercises } from '../hooks/useExercises';
import { ExerciseDetailModal } from '../components/workout/ExerciseDetailModal';
import type { WorkoutSplit, Exercise } from '../types';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { SplitBuilder } from '../components/workout/SplitBuilder';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { ProgramWizardModal } from '../components/wizard/ProgramWizardModal';
import { toast } from 'sonner';
import {
  Plus,
  Copy,
  Trash2,
  Check,
  CalendarDays,
  Dumbbell,
  Sparkles,
  Search,
  Filter,
  Eye,
  Play,
} from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'All Splits' },
  { id: 'PPL', label: 'Push Pull Legs' },
  { id: 'Upper/Lower', label: 'Upper / Lower' },
  { id: 'Arnold', label: 'Arnold Golden Era' },
  { id: 'Bro Split', label: 'Bro Split' },
  { id: 'Full Body', label: 'Full Body' },
  { id: 'Powerbuilding', label: 'Powerbuilding 5x5' },
  { id: 'Calisthenics', label: 'Calisthenics' },
];

const FREQUENCIES = [
  { id: 'all', label: 'All Frequencies' },
  { id: '3', label: '3 Days / Wk' },
  { id: '4', label: '4 Days / Wk' },
  { id: '5', label: '5 Days / Wk' },
  { id: '6', label: '6 Days / Wk' },
];

export function WorkoutPlanner() {
  const {
    splits,
    createSplit,
    deleteSplit,
    duplicateSplit,
    activateSplit,
  } = useWorkout();
  const { startWorkout } = useActiveWorkout();
  const { exercises } = useExercises();
  const navigate = useNavigate();

  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [editingSplit, setEditingSplit] = useState<WorkoutSplit | null>(null);
  const [splitToDelete, setSplitToDelete] = useState<string | null>(null);
  const [previewSplit, setPreviewSplit] = useState<WorkoutSplit | null>(null);
  const [selectedExerciseModal, setSelectedExerciseModal] = useState<Exercise | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');
  const [selectedFreq, setSelectedFreq] = useState('all');

  const handleOpenCreate = () => {
    setEditingSplit(null);
    setIsBuilderOpen(true);
  };

  const handleActivate = async (split: WorkoutSplit) => {
    await activateSplit(split.id);
    toast.success(`Active Program switched to "${split.name}"!`, {
      description: 'Your dashboard workout and training volume are now synced to this split.',
    });
  };

  const handleDuplicate = async (split: WorkoutSplit) => {
    await duplicateSplit(split.id);
    toast.success(`Created editable copy of "${split.name}"!`, {
      description: 'Customize days and exercises to match your personal routine.',
    });
  };

  const handleDeleteConfirm = async () => {
    if (splitToDelete) {
      await deleteSplit(splitToDelete);
      setSplitToDelete(null);
      toast.info('Workout split removed.');
    }
  };

  const handleStartDay = (split: WorkoutSplit, dayIdx: number = 0) => {
    const day = split.days[dayIdx] || split.days[0];
    if (!day) return;
    startWorkout(day, split.name, split.id);
    toast.success(`Starting ${day.name}!`, {
      description: 'Track your sets and reps. Push for progressive overload!',
    });
    navigate('/active-workout');
  };

  const handleExerciseClick = (name: string, id?: string) => {
    const found = exercises.find(
      (e) => (id && e.id === id) || e.name.toLowerCase() === name.toLowerCase()
    );
    if (found) {
      setSelectedExerciseModal(found);
    } else {
      // Fallback pseudo exercise object for preview modal
      setSelectedExerciseModal({
        id: id || `ex_${Date.now()}`,
        name,
        primaryMuscle: 'chest',
        secondaryMuscles: ['triceps', 'shoulders'],
        equipment: 'barbell',
        exerciseType: 'compound',
        trackingType: 'weight_reps',
        instructions: 'Perform with controlled tempo and full range of motion. Keep core braced throughout.',
        techniqueNotes: 'Maintain smooth concentric drive and pause briefly at the contraction point.',
        defaultRestSeconds: 90,
        isCustom: false,
        createdAt: new Date().toISOString(),
      });
    }
  };

  const filteredSplits = useMemo(() => {
    return splits.filter((s) => {
      // Category match
      if (selectedCat !== 'all') {
        const cat = s.category || (s.name.toLowerCase().includes('push') ? 'PPL' : 'Upper/Lower');
        if (cat !== selectedCat) return false;
      }

      // Frequency match
      if (selectedFreq !== 'all') {
        const targetDays = parseInt(selectedFreq, 10);
        if (s.days.length !== targetDays) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = s.name.toLowerCase().includes(q);
        const matchesDesc = s.description?.toLowerCase().includes(q);
        const matchesDays = s.days.some((d) =>
          d.name.toLowerCase().includes(q) ||
          d.exercises.some((e) => e.exerciseName.toLowerCase().includes(q))
        );
        const matchesTags = s.tags?.some((t) => t.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc && !matchesDays && !matchesTags) return false;
      }

      return true;
    });
  }, [splits, selectedCat, selectedFreq, searchQuery]);

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <PageHeader
        title="Workout Split Planner"
        subtitle="Explore evidence-based bodybuilding, strength, and calisthenics splits tailored to your weekly schedule"
        action={
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              icon={<Sparkles size={14} className="text-accent-primary" />}
              onClick={() => setIsWizardOpen(true)}
            >
              <span className="hidden sm:inline">Build My Program </span>(Wizard)
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={<Plus size={14} className="stroke-[3]" />}
              onClick={handleOpenCreate}
            >
              <span className="hidden xs:inline">Custom Split</span>
              <span className="xs:hidden">+ Split</span>
            </Button>
          </div>
        }
      />

      {/* Filter & Search Bar Card */}
      <div className="bg-white p-3.5 sm:p-5 rounded-3xl border border-[#E2E8E4] shadow-xs space-y-3 sm:space-y-4">
        {/* Search Input + Frequency filter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-96">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by split name, target muscle, or exercise..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-10 pr-4 rounded-xl bg-[#F8FAF9] border border-[#E2E8E4] text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#16A34A] focus:ring-2 focus:ring-emerald-500/15 transition-all"
            />
          </div>

          {/* Frequency selector buttons */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto no-scrollbar">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider mr-1 hidden lg:inline">
              Schedule:
            </span>
            {FREQUENCIES.map((f) => {
              const isActive = selectedFreq === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setSelectedFreq(f.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#16A34A] text-white shadow-xs'
                      : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/70'
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2 border-t border-[#E8ECE9]">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCat === cat.id;
            const count = splits.filter((s) => {
              if (cat.id === 'all') return true;
              return s.category === cat.id || (s.name.toLowerCase().includes(cat.id.toLowerCase()));
            }).length;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCat(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap cursor-pointer transition-all flex items-center gap-1.5 shrink-0 ${
                  isActive
                    ? 'bg-[#E8F8EE] text-[#15803D] border border-[#A7E2BE] shadow-2xs'
                    : 'bg-[#F8FAF9] text-neutral-600 hover:text-neutral-900 border border-[#E8ECE9] hover:bg-neutral-100'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${isActive ? 'bg-[#16A34A] text-white' : 'bg-neutral-200 text-neutral-600'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count Header */}
      <div className="flex items-center justify-between px-1 text-xs text-neutral-500 font-medium">
        <span>Showing <strong className="text-neutral-900 font-bold">{filteredSplits.length}</strong> fitness splits</span>
        {(selectedCat !== 'all' || selectedFreq !== 'all' || searchQuery) && (
          <button
            type="button"
            onClick={() => {
              setSelectedCat('all');
              setSelectedFreq('all');
              setSearchQuery('');
            }}
            className="text-emerald-600 font-bold hover:underline cursor-pointer"
          >
            Reset Filters
          </button>
        )}
      </div>

      {filteredSplits.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-3xl border border-[#E2E8E4] p-8 space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-400 mx-auto">
            <Filter size={24} />
          </div>
          <h3 className="font-heading font-black text-lg text-neutral-800">No workout splits found</h3>
          <p className="text-xs text-neutral-500 max-w-md mx-auto">
            No programs match the selected category and frequency filters. Try adjusting your search or resetting filters.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCat('all');
              setSelectedFreq('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl bg-[#16A34A] text-white text-xs font-bold shadow-xs hover:bg-[#15803D] cursor-pointer transition-all"
          >
            Show All 10 Splits
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSplits.map((split) => {
            const totalExercises = split.days.reduce((acc, d) => acc + d.exercises.length, 0);

            return (
              <div
                key={split.id}
                className={`
                  flex flex-col justify-between rounded-3xl p-4 sm:p-6 transition-all duration-200 relative group
                  ${
                    split.isActive
                      ? 'bg-gradient-to-b from-white to-[#F6FCF8] border-2 border-[#16A34A] shadow-[0_12px_32px_-6px_rgba(22,163,74,0.18)]'
                      : 'bg-white border border-[#E2E8E4] shadow-xs hover:shadow-md hover:border-emerald-300/80 hover:-translate-y-0.5'
                  }
                `}
              >
                <div>
                  {/* Header Row: Badges & Controls */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {split.isActive ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-[#E8F8EE] text-[#15803D] border border-[#A7E2BE] shadow-2xs">
                          <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse"></span>
                          Active Program
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleActivate(split)}
                          className="px-2.5 py-1 rounded-full text-[11px] font-bold text-neutral-600 bg-neutral-100 hover:bg-emerald-50 hover:text-emerald-700 border border-neutral-200/80 flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <Check size={12} />
                          <span>Set Active</span>
                        </button>
                      )}
                      {split.category && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-50 text-blue-700 border border-blue-200/70">
                          {split.category}
                        </span>
                      )}
                      {split.level && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200/70">
                          {split.level}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setPreviewSplit(split)}
                        className="p-1.5 rounded-lg text-neutral-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors cursor-pointer"
                        title="Quick Preview Lifts"
                      >
                        <Eye size={15} />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDuplicate(split)}
                        className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-800 hover:bg-neutral-100 transition-colors cursor-pointer"
                        title="Duplicate Split"
                      >
                        <Copy size={15} />
                      </button>

                      {!split.isTemplate && (
                        <button
                          type="button"
                          onClick={() => setSplitToDelete(split.id)}
                          className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Delete Split"
                        >
                          <Trash2 size={15} />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-heading font-black text-xl text-neutral-900 tracking-tight mb-1.5">
                    {split.name}
                  </h3>
                  {split.description && (
                    <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed mb-4">
                      {split.description}
                    </p>
                  )}

                  {/* Split Quick Stats Banner */}
                  <div className="grid grid-cols-2 gap-2 mb-4 p-2.5 rounded-xl bg-[#F8FAF9] border border-[#E9EFEA]">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                        <CalendarDays size={14} />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-neutral-400 block leading-tight">Schedule</span>
                        <span className="text-xs font-bold text-neutral-800">{split.days.length} Days / Wk</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                        <Dumbbell size={14} />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-neutral-400 block leading-tight">Volume</span>
                        <span className="text-xs font-bold text-neutral-800">{totalExercises} Total Lifts</span>
                      </div>
                    </div>
                  </div>

                  {/* Training Days Pill List */}
                  <div className="space-y-2 mb-5">
                    <div className="flex items-center justify-between text-[11px] font-extrabold uppercase tracking-wider text-neutral-400">
                      <span className="flex items-center gap-1.5">
                        <CalendarDays size={13} className="text-neutral-500" />
                        <span>Program Days ({split.days.length})</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => setPreviewSplit(split)}
                        className="text-emerald-600 hover:underline font-bold normal-case text-xs cursor-pointer"
                      >
                        Preview Lifts
                      </button>
                    </div>
                    <div className="space-y-1.5">
                      {split.days.map((d, dIdx) => (
                        <div
                          key={d.id}
                          onClick={() => setPreviewSplit(split)}
                          className="flex items-center justify-between px-3 py-2 rounded-xl bg-white hover:bg-emerald-50/50 border border-[#E7ECE9] text-xs transition-colors cursor-pointer"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] flex items-center justify-center shrink-0">
                              {dIdx + 1}
                            </span>
                            <span className="font-bold text-neutral-800 truncate">
                              {d.name}
                            </span>
                          </div>
                          <span className="text-neutral-500 font-semibold tabular-nums text-[11px] bg-neutral-100 px-2 py-0.5 rounded-md shrink-0 ml-2">
                            {d.exercises.length} lifts
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Card Footer */}
                <div className="pt-4 border-t border-[#E8ECE9] flex items-center justify-between">
                  <span className="text-xs font-medium text-neutral-500 flex items-center gap-1.5">
                    <Dumbbell size={13} className="text-emerald-600" />
                    <span>{totalExercises} exercises</span>
                  </span>

                  {split.isActive ? (
                    <span className="text-xs font-black text-[#15803D] flex items-center gap-1">
                      <Check size={14} className="stroke-[3]" />
                      <span>Current Active</span>
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleActivate(split)}
                      className="px-3.5 py-1.5 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-bold shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center gap-1"
                    >
                      <span>Activate Program</span>
                      <span>→</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Split Detailed Preview Modal */}
      {previewSplit && (
        <Modal
          isOpen={!!previewSplit}
          onClose={() => setPreviewSplit(null)}
          title={previewSplit.name}
          description={previewSplit.description}
          maxWidth="2xl"
        >
          <div className="space-y-6 pt-2">
            {/* Quick Stats Banner inside Modal */}
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#F8FAF9] border border-[#E9EFEA] text-xs font-semibold text-neutral-700 flex-wrap">
              <span className="flex items-center gap-1.5">
                <CalendarDays size={14} className="text-emerald-600" />
                <span>{previewSplit.days.length} Days / Week</span>
              </span>
              <span className="text-neutral-300">•</span>
              <span className="flex items-center gap-1.5">
                <Dumbbell size={14} className="text-blue-600" />
                <span>{previewSplit.days.reduce((acc, d) => acc + d.exercises.length, 0)} Total Exercises</span>
              </span>
              {previewSplit.level && (
                <>
                  <span className="text-neutral-300">•</span>
                  <span className="text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                    {previewSplit.level} Level
                  </span>
                </>
              )}
            </div>

            {/* Program Days Accordion/List */}
            <div className="space-y-4 max-h-[55vh] overflow-y-auto pr-1">
              <div className="text-[11px] text-neutral-400 font-medium px-1">
                Tip: Click any exercise to inspect form, muscles, and technique cues.
              </div>
              {previewSplit.days.map((day, dIdx) => (
                <div key={day.id} className="p-4 rounded-2xl bg-white border border-[#E2E8E4] shadow-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-[#E8ECE9]">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">
                        {dIdx + 1}
                      </span>
                      <h4 className="font-heading font-black text-sm text-neutral-900">{day.name}</h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-neutral-500">{day.exercises.length} lifts</span>
                      <button
                        type="button"
                        onClick={() => handleStartDay(previewSplit, dIdx)}
                        className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-[#15803D] text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                        title="Start this specific day workout"
                      >
                        <Play size={10} className="fill-[#15803D]" />
                        <span>Start Day</span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    {day.exercises.map((ex, exIdx) => (
                      <div
                        key={ex.id || exIdx}
                        onClick={() => handleExerciseClick(ex.exerciseName, ex.exerciseId)}
                        className="flex items-center justify-between px-3 py-2 rounded-xl bg-[#F8FAF9] text-xs hover:bg-emerald-50/70 border border-transparent hover:border-emerald-200 text-neutral-800 transition-all cursor-pointer group"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-neutral-400 font-mono text-[11px] w-4">{exIdx + 1}.</span>
                          <span className="font-bold text-neutral-900 group-hover:text-emerald-700 truncate">{ex.exerciseName}</span>
                          <Eye size={12} className="opacity-0 group-hover:opacity-100 text-emerald-600 transition-opacity" />
                        </div>
                        <div className="flex items-center gap-2 shrink-0 ml-2">
                          <span className="text-neutral-600 font-semibold tabular-nums">
                            {ex.targetSets} sets × {ex.targetRepsMin}-{ex.targetRepsMax} reps
                          </span>
                          <span className="text-neutral-400 text-[10px] bg-white px-1.5 py-0.5 rounded border border-[#E8ECE9]">
                            {ex.restSeconds}s rest
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#E8ECE9]">
              <Button variant="secondary" onClick={() => setPreviewSplit(null)}>
                Close Preview
              </Button>
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                {!previewSplit.isActive ? (
                  <Button
                    variant="secondary"
                    icon={<Check size={14} className="stroke-[3]" />}
                    onClick={async () => {
                      await handleActivate(previewSplit);
                    }}
                  >
                    Activate Split
                  </Button>
                ) : (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-200 flex items-center gap-1.5">
                    <Check size={14} className="stroke-[3]" />
                    <span>Active Program</span>
                  </span>
                )}
                <Button
                  variant="primary"
                  icon={<Play size={14} className="fill-white" />}
                  onClick={() => {
                    handleStartDay(previewSplit, 0);
                  }}
                >
                  Start Day 1 Now
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Exercise Detail Modal on click */}
      <ExerciseDetailModal
        isOpen={!!selectedExerciseModal}
        exercise={selectedExerciseModal}
        onClose={() => setSelectedExerciseModal(null)}
      />

      {/* Split Builder Modal */}
      <SplitBuilder
        isOpen={isBuilderOpen}
        onClose={() => setIsBuilderOpen(false)}
        onSave={async (s) => {
          await createSplit(s);
        }}
        initialSplit={editingSplit}
      />

      {/* Program Wizard Modal */}
      <ProgramWizardModal
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!splitToDelete}
        onClose={() => setSplitToDelete(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Workout Split?"
        message="Are you sure you want to remove this split? Any workouts logged in history under this split will remain preserved."
        confirmLabel="Delete"
        variant="danger"
      />
    </div>
  );
}
