import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNutrition } from '../../hooks/useNutrition';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Target, TrendingDown, TrendingUp, CheckCircle2 } from 'lucide-react';

interface GoalPaceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GoalPaceModal({ isOpen, onClose }: GoalPaceModalProps) {
  const { user, updateUser } = useAuth();
  const { updateGoals } = useNutrition();

  const [sex, setSex] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<number>(25);
  const [weightKg, setWeightKg] = useState<number>(78);
  const [heightCm, setHeightCm] = useState<number>(178);
  const [goal, setGoal] = useState<'fat_loss' | 'maintain' | 'muscle_gain'>('fat_loss');
  const [pace, setPace] = useState<'slow' | 'recommended' | 'aggressive'>('recommended');
  const activity = 1.55; // Moderate (3-5 gym sessions)
  const [isSaved, setIsSaved] = useState(false);

  // Mifflin-St Jeor BMR Equation
  // BMR = 10 * weight(kg) + 6.25 * height(cm) - 5 * age + (sex === male ? +5 : -161)
  const bmr = Math.round(
    10 * weightKg + 6.25 * heightCm - 5 * age + (sex === 'male' ? 5 : -161)
  );
  const tdee = Math.round(bmr * activity);

  // Delta calculation based on goal & pace
  let delta = 0;

  if (goal === 'fat_loss') {
    if (pace === 'slow') {
      delta = -300;
    } else if (pace === 'recommended') {
      delta = -500;
    } else {
      delta = -750;
    }
  } else if (goal === 'muscle_gain') {
    if (pace === 'slow') {
      delta = +200;
    } else if (pace === 'recommended') {
      delta = +350;
    } else {
      delta = +500;
    }
  }

  const targetCalories = Math.max(1200, tdee + delta);
  // Protein: 2.0g per kg bodyweight
  const targetProtein = Math.round(weightKg * 2.0);
  // Fat: 0.8g per kg bodyweight
  const targetFat = Math.round(weightKg * 0.8);
  // Carbs: Remaining calories / 4
  const remainingCals = targetCalories - targetProtein * 4 - targetFat * 9;
  const targetCarbs = Math.max(50, Math.round(remainingCals / 4));

  const handleSave = async () => {
    await updateUser({
      name: user?.name,
    });

    await updateGoals({
      calorieTarget: targetCalories,
      proteinTarget: targetProtein,
      carbTarget: targetCarbs,
      fatTarget: targetFat,
      fiberTarget: 32,
    });

    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Athlete Profile & Goal Pace Engine"
      description="Calculate your precise metabolic expenditure, deficit/surplus pace, and macro targets."
      maxWidth="lg"
    >
      <div className="space-y-6 pt-2">
        {/* Sex and Age */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-text-secondary block mb-1.5 uppercase tracking-wider">
              Biological Sex
            </label>
            <div className="flex p-1 bg-bg-secondary rounded-xl border border-border-default">
              <button
                type="button"
                onClick={() => setSex('male')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  sex === 'male'
                    ? 'bg-accent-primary text-black font-extrabold shadow-xs'
                    : 'text-text-muted hover:text-text-primary'
                }`}
              >
                ♂ Male
              </button>
              <button
                type="button"
                onClick={() => setSex('female')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  sex === 'female'
                    ? 'bg-accent-primary text-black font-extrabold shadow-xs'
                    : 'text-text-muted hover:text-text-primary'
                }`}
              >
                ♀ Female
              </button>
            </div>
          </div>

          <Input
            label="Age (Years)"
            type="number"
            value={age}
            onChange={(e) => setAge(parseInt(e.target.value, 10) || 25)}
          />
        </div>

        {/* Weight & Height */}
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Weight (kg)"
            type="number"
            step="0.5"
            value={weightKg}
            onChange={(e) => setWeightKg(parseFloat(e.target.value) || 75)}
          />
          <Input
            label="Height (cm)"
            type="number"
            value={heightCm}
            onChange={(e) => setHeightCm(parseInt(e.target.value, 10) || 175)}
          />
        </div>

        {/* Goal Selector */}
        <div>
          <label className="text-xs font-semibold text-text-secondary block mb-1.5 uppercase tracking-wider">
            Primary Nutrition Objective
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'fat_loss', label: 'Lose Fat', icon: TrendingDown },
              { id: 'maintain', label: 'Maintain', icon: Target },
              { id: 'muscle_gain', label: 'Build Muscle', icon: TrendingUp },
            ].map((opt) => {
              const Icon = opt.icon;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setGoal(opt.id as any)}
                  className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all ${
                    goal === opt.id
                      ? 'bg-accent-primary text-black border-accent-primary font-extrabold shadow-md shadow-accent-primary/20'
                      : 'bg-bg-secondary text-text-secondary border-border-default hover:bg-bg-elevated hover:text-text-primary'
                  }`}
                >
                  <Icon size={16} />
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Goal Pace Selector (if not maintaining) */}
        {goal !== 'maintain' && (
          <div>
            <label className="text-xs font-semibold text-text-secondary block mb-1.5 uppercase tracking-wider">
              Goal Pace Intensity
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'slow', label: 'Slow & Steady', rate: goal === 'fat_loss' ? '-0.3 kg/wk' : '+0.2 kg/wk' },
                { id: 'recommended', label: 'Recommended', rate: goal === 'fat_loss' ? '-0.5 kg/wk' : '+0.35 kg/wk' },
                { id: 'aggressive', label: 'Aggressive', rate: goal === 'fat_loss' ? '-0.75 kg/wk' : '+0.5 kg/wk' },
              ].map((opt) => (
                <div
                  key={opt.id}
                  onClick={() => setPace(opt.id as any)}
                  className={`p-3 rounded-xl border cursor-pointer text-center transition-all ${
                    pace === opt.id
                      ? 'bg-accent-primary-muted border-accent-primary text-text-primary'
                      : 'bg-bg-secondary border-border-default hover:bg-bg-elevated'
                  }`}
                >
                  <span className="font-bold text-xs block text-text-primary">{opt.label}</span>
                  <span className="text-[11px] font-mono text-accent-primary font-bold">{opt.rate}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Calculated Results Summary */}
        <div className="p-4 rounded-2xl bg-bg-secondary border border-border-default space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-border-default">
            <div>
              <span className="text-[11px] font-bold text-text-muted uppercase">Daily Target Calorie Intake</span>
              <div className="flex items-baseline gap-2">
                <span className="font-heading font-black text-2xl text-accent-primary tabular-nums">
                  {targetCalories} kcal
                </span>
                <span className="text-xs text-text-muted">
                  ({delta >= 0 ? `+${delta}` : delta} kcal {goal === 'fat_loss' ? 'deficit' : goal === 'muscle_gain' ? 'surplus' : 'maintenance'})
                </span>
              </div>
            </div>

            <div className="text-right text-xs">
              <span className="text-text-muted block">BMR / TDEE</span>
              <strong className="text-text-primary font-mono">{bmr} / {tdee} kcal</strong>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 rounded-xl bg-bg-card border border-border-subtle">
              <span className="text-text-muted text-[10px] uppercase font-bold block">Protein</span>
              <strong className="text-accent-primary font-extrabold text-sm">{targetProtein}g</strong>
            </div>
            <div className="p-2 rounded-xl bg-bg-card border border-border-subtle">
              <span className="text-text-muted text-[10px] uppercase font-bold block">Carbs</span>
              <strong className="text-accent-secondary font-extrabold text-sm">{targetCarbs}g</strong>
            </div>
            <div className="p-2 rounded-xl bg-bg-card border border-border-subtle">
              <span className="text-text-muted text-[10px] uppercase font-bold block">Fats</span>
              <strong className="text-warning font-extrabold text-sm">{targetFat}g</strong>
            </div>
          </div>
        </div>

        {/* Save button */}
        <div className="flex items-center justify-between pt-2">
          {isSaved ? (
            <span className="text-xs font-bold text-success flex items-center gap-1.5 animate-fade-in">
              <CheckCircle2 size={16} />
              <span>Target goals updated!</span>
            </span>
          ) : (
            <div />
          )}

          <div className="flex gap-2">
            <Button variant="secondary" size="md" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" size="md" onClick={handleSave}>
              Save & Apply Goals
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
