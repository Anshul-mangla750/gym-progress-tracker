import { useState } from 'react';
import type { WorkoutSplit, WorkoutDay } from '../../types';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { SplitDayEditor } from './SplitDayEditor';
import { Plus } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface SplitBuilderProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (split: Omit<WorkoutSplit, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  initialSplit?: WorkoutSplit | null;
}

export function SplitBuilder({
  isOpen,
  onClose,
  onSave,
  initialSplit,
}: SplitBuilderProps) {
  const { user } = useAuth();
  const [name, setName] = useState(initialSplit?.name || '');
  const [description, setDescription] = useState(initialSplit?.description || '');
  const [days, setDays] = useState<WorkoutDay[]>(
    initialSplit?.days || [
      {
        id: `day_${Date.now()}_1`,
        name: 'Day 1',
        sortOrder: 1,
        exercises: [],
      },
    ]
  );
  const [isSaving, setIsSaving] = useState(false);

  const handleAddDay = () => {
    const newDay: WorkoutDay = {
      id: `day_${Date.now()}_${days.length + 1}`,
      name: `Day ${days.length + 1}`,
      sortOrder: days.length + 1,
      exercises: [],
    };
    setDays([...days, newDay]);
  };

  const handleUpdateDay = (index: number, updatedDay: WorkoutDay) => {
    const updated = [...days];
    updated[index] = updatedDay;
    setDays(updated);
  };

  const handleRemoveDay = (index: number) => {
    setDays(days.filter((_, idx) => idx !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSaving(true);
    try {
      await onSave({
        userId: user?.id || '',
        name,
        description,
        isTemplate: false,
        isActive: false,
        days,
      });
      onClose();
    } catch (err) {
      console.error('Failed to save workout split:', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialSplit ? 'Edit Workout Split' : 'Create Custom Workout Split'}
      description="Configure training days, target rep brackets, and exercise sequences"
      maxWidth="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Split Name"
          placeholder="e.g. Push Pull Legs, Upper Lower, Full Body..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-text-secondary">
            Description & Program Objective (Optional)
          </label>
          <input
            type="text"
            placeholder="e.g. 4-day hypertrophy focus targeting progressive overload on compound lifts"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="h-10 px-3 rounded-lg text-sm bg-bg-input border border-border-default text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent-primary/30 focus:border-accent-primary"
          />
        </div>

        {/* Training Days */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-heading font-bold text-sm text-text-primary uppercase tracking-wider">
              Training Days ({days.length})
            </h4>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              icon={<Plus size={14} />}
              onClick={handleAddDay}
            >
              Add Day
            </Button>
          </div>

          <div className="space-y-3">
            {days.map((day, idx) => (
              <SplitDayEditor
                key={day.id}
                day={day}
                dayIndex={idx}
                onUpdateDay={(updated) => handleUpdateDay(idx, updated)}
                onRemoveDay={() => handleRemoveDay(idx)}
              />
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="flex gap-3 pt-4 border-t border-border-default">
          <Button type="button" variant="secondary" fullWidth onClick={onClose} disabled={isSaving}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" fullWidth isLoading={isSaving} disabled={!name.trim()}>
            Save Workout Split
          </Button>
        </div>
      </form>
    </Modal>
  );
}
