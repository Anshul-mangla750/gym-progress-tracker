import { useState } from 'react';
import { useProgress } from '../hooks/useProgress';
import { useAuth } from '../hooks/useAuth';
import { PageHeader } from '../components/layout/PageHeader';
import { VolumeChart } from '../components/progress/VolumeChart';
import { BodyWeightChart } from '../components/progress/BodyWeightChart';
import { Card, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { Plus, Trophy, Dumbbell } from 'lucide-react';
import { getTodayString } from '../lib/date-utils';

export function Progress() {
  const { bodyWeights, sessions, logBodyWeight } = useProgress();
  const { user } = useAuth();
  const unit = user?.unitPreference || 'kg';

  const [isWeightModalOpen, setIsWeightModalOpen] = useState(false);
  const [weightValue, setWeightValue] = useState('');
  const [weightDate, setWeightDate] = useState(getTodayString());
  const [weightNotes, setWeightNotes] = useState('');

  const handleSaveWeight = async (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(weightValue);
    if (isNaN(val) || val <= 0) return;

    await logBodyWeight({
      userId: 'user_1',
      date: weightDate,
      weight: val,
      unit,
      notes: weightNotes,
    });

    setWeightValue('');
    setWeightNotes('');
    setIsWeightModalOpen(false);
  };

  // Collect personal records from sessions
  const personalRecords = sessions.flatMap((s) => s.personalRecords || []);

  return (
    <div className="progress-page space-y-6 sm:space-y-8 animate-fade-in max-w-6xl mx-auto">
      <PageHeader
        title="Progress & Analytics"
        subtitle="Track long-term progressive overload volume trends, personal records, and body composition"
        action={
          <Button
            variant="primary"
            size="sm"
            icon={<Plus size={14} className="stroke-[3]" />}
            onClick={() => setIsWeightModalOpen(true)}
          >
            Log Weigh-In
          </Button>
        }
      />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <VolumeChart sessions={sessions} unit={unit} />
        <BodyWeightChart entries={bodyWeights} unit={unit} />
      </div>

      {/* Personal Records Table */}
      <Card>
        <CardHeader
          title="Personal Records & Milestones"
          subtitle="All-time best weight and repetition milestones unlocked"
          action={
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-accent-secondary-muted text-accent-secondary border border-accent-secondary/20 flex items-center gap-1">
              <Trophy size={12} />
              <span>{personalRecords.length + 3} PRs Recorded</span>
            </span>
          }
        />

        <div className="overflow-x-auto pt-2 no-scrollbar">
          <table className="w-full min-w-[500px] text-left text-xs">
            <thead>
              <tr className="border-b border-border-default text-text-muted uppercase tracking-wider text-[11px]">
                <th className="pb-3 font-semibold">Exercise</th>
                <th className="pb-3 font-semibold">Record Type</th>
                <th className="pb-3 font-semibold">Max Performance</th>
                <th className="pb-3 font-semibold">Progression</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-default/40">
              <tr>
                <td className="py-3 font-bold text-text-primary flex items-center gap-2">
                  <Dumbbell size={14} className="text-accent-primary" />
                  Barbell Bench Press
                </td>
                <td className="py-3 text-text-secondary capitalize">Weight (Working Sets)</td>
                <td className="py-3 font-extrabold text-accent-primary font-mono text-sm tabular-nums">
                  80 {unit} × 8 reps
                </td>
                <td className="py-3 text-success font-semibold tabular-nums">+2.5 {unit} (Overloaded)</td>
              </tr>
              <tr>
                <td className="py-3 font-bold text-text-primary flex items-center gap-2">
                  <Dumbbell size={14} className="text-accent-primary" />
                  Barbell Bent-Over Row
                </td>
                <td className="py-3 text-text-secondary capitalize">Weight & Reps</td>
                <td className="py-3 font-extrabold text-accent-primary font-mono text-sm tabular-nums">
                  70 {unit} × 8 reps
                </td>
                <td className="py-3 text-success font-semibold tabular-nums">+5.0 {unit} (Overloaded)</td>
              </tr>
              <tr>
                <td className="py-3 font-bold text-text-primary flex items-center gap-2">
                  <Dumbbell size={14} className="text-accent-primary" />
                  Barbell Squat
                </td>
                <td className="py-3 text-text-secondary capitalize">Peak 5-rep Set</td>
                <td className="py-3 font-extrabold text-accent-primary font-mono text-sm tabular-nums">
                  105 {unit} × 6 reps
                </td>
                <td className="py-3 text-accent-secondary font-semibold tabular-nums">+1 Rep Target</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      {/* Log Body Weight Modal */}
      <Modal
        isOpen={isWeightModalOpen}
        onClose={() => setIsWeightModalOpen(false)}
        title="Record Body Weight"
        description="Log your daily or weekly morning weigh-in"
        maxWidth="sm"
      >
        <form onSubmit={handleSaveWeight} className="space-y-4">
          <Input
            label={`Weight (${unit})`}
            type="number"
            step="0.1"
            placeholder="e.g. 78.5"
            value={weightValue}
            onChange={(e) => setWeightValue(e.target.value)}
            required
            autoFocus
          />

          <Input
            label="Date"
            type="date"
            value={weightDate}
            onChange={(e) => setWeightDate(e.target.value)}
            required
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-text-secondary">Notes (optional)</label>
            <input
              type="text"
              placeholder="e.g. Morning fasting, post-cardio"
              value={weightNotes}
              onChange={(e) => setWeightNotes(e.target.value)}
              className="h-10 px-3 rounded-lg text-sm bg-bg-input border border-border-default text-text-primary focus:outline-none focus:border-accent-primary"
            />
          </div>

          <div className="flex gap-3 pt-3">
            <Button type="button" variant="secondary" fullWidth onClick={() => setIsWeightModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" fullWidth disabled={!weightValue}>
              Save Weigh-In
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
