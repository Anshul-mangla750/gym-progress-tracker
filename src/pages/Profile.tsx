import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNutrition } from '../hooks/useNutrition';
import type { WeightUnit, ExperienceLevel } from '../types';
import { PageHeader } from '../components/layout/PageHeader';
import { Card, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { CheckCircle2 } from 'lucide-react';

export function Profile() {
  const { user, updateUser, updateUnitPreference } = useAuth();
  const { goals, updateGoals } = useNutrition();

  // Profile fields
  const [name, setName] = useState(user?.name || '');
  const [unit, setUnit] = useState<WeightUnit>(user?.unitPreference || 'kg');
  const [level, setLevel] = useState<ExperienceLevel>(user?.experienceLevel || 'intermediate');

  // Progression settings
  const [incrementKg, setIncrementKg] = useState(
    user?.progressionSettings?.defaultWeightIncrementKg || 2.5
  );
  const [incrementLb, setIncrementLb] = useState(
    user?.progressionSettings?.defaultWeightIncrementLb || 5
  );
  const [threshold, setThreshold] = useState<'all_sets' | 'majority_sets'>(
    user?.progressionSettings?.progressionThreshold || 'all_sets'
  );

  // Nutrition goals
  const [calories, setCalories] = useState(goals?.calorieTarget || 2450);
  const [protein, setProtein] = useState(goals?.proteinTarget || 175);
  const [carbs, setCarbs] = useState(goals?.carbTarget || 260);
  const [fat, setFat] = useState(goals?.fatTarget || 65);
  const [fiber, setFiber] = useState(goals?.fiberTarget || 32);

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setUnit(user.unitPreference);
      setLevel(user.experienceLevel);
      if (user.progressionSettings) {
        setIncrementKg(user.progressionSettings.defaultWeightIncrementKg);
        setIncrementLb(user.progressionSettings.defaultWeightIncrementLb);
        setThreshold(user.progressionSettings.progressionThreshold);
      }
    }
  }, [user]);

  useEffect(() => {
    if (goals) {
      setCalories(goals.calorieTarget);
      setProtein(goals.proteinTarget);
      setCarbs(goals.carbTarget);
      setFat(goals.fatTarget);
      setFiber(goals.fiberTarget || 32);
    }
  }, [goals]);

  const handleSaveAll = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateUser({
      name,
      unitPreference: unit,
      experienceLevel: level,
      progressionSettings: {
        defaultWeightIncrementKg: incrementKg,
        defaultWeightIncrementLb: incrementLb,
        progressionThreshold: threshold,
        repTargetPosition: 'top',
      },
    });

    await updateUnitPreference(unit);

    await updateGoals({
      calorieTarget: calories,
      proteinTarget: protein,
      carbTarget: carbs,
      fatTarget: fat,
      fiberTarget: fiber,
    });

    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="profile-page space-y-6 sm:space-y-8 animate-fade-in max-w-4xl mx-auto pb-12">
      <PageHeader
        title="Athlete Profile & Engine Settings"
        subtitle="Configure your progressive overload rules, measurement units, and daily nutrition targets"
      />

      <form onSubmit={handleSaveAll} className="space-y-6">
        {/* Personal Details */}
        <Card>
          <CardHeader
            title="Athlete Profile"
            subtitle="Your identity and personal gym preferences"
          />
          <div className="space-y-4 pt-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <Input
                label="Account Email"
                value={user?.email || 'athlete@ironlog.io'}
                disabled
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Preferred Weight Unit"
                value={unit}
                onChange={(e) => setUnit(e.target.value as WeightUnit)}
              >
                <option value="kg">Kilograms (kg)</option>
                <option value="lb">Pounds (lb)</option>
              </Select>

              <Select
                label="Training Experience"
                value={level}
                onChange={(e) => setLevel(e.target.value as ExperienceLevel)}
              >
                <option value="beginner">Beginner (&lt; 1 year)</option>
                <option value="intermediate">Intermediate (1-3 years)</option>
                <option value="advanced">Advanced (3+ years)</option>
              </Select>
            </div>
          </div>
        </Card>

        {/* Progressive Overload Engine Rules */}
        <Card>
          <CardHeader
            title="Progressive Overload Rules"
            subtitle="Customize automated weight jumping and double progression triggers"
          />
          <div className="space-y-4 pt-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Default Increment (kg)"
                type="number"
                step="0.5"
                min="0.5"
                value={incrementKg}
                onChange={(e) => setIncrementKg(parseFloat(e.target.value) || 2.5)}
              />

              <Input
                label="Default Increment (lb)"
                type="number"
                step="1"
                min="1"
                value={incrementLb}
                onChange={(e) => setIncrementLb(parseFloat(e.target.value) || 5)}
              />
            </div>

            <Select
              label="Progression Threshold Criteria"
              value={threshold}
              onChange={(e) => setThreshold(e.target.value as 'all_sets' | 'majority_sets')}
              hint="Double progression recommendation triggers when this threshold is satisfied."
            >
              <option value="all_sets">Strict: All working sets must achieve top rep range</option>
              <option value="majority_sets">Flexible: Majority (2/3) of sets achieve top rep range</option>
            </Select>
          </div>
        </Card>

        {/* Nutrition Macro Goals */}
        <Card>
          <CardHeader
            title="Daily Nutrition Targets"
            subtitle="Automated calorie and macronutrient tracking baselines"
          />
          <div className="space-y-4 pt-3">
            <Input
              label="Daily Calorie Target (kcal)"
              type="number"
              value={calories}
              onChange={(e) => setCalories(parseInt(e.target.value, 10) || 2000)}
            />

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Input
                label="Protein (g)"
                type="number"
                value={protein}
                onChange={(e) => setProtein(parseInt(e.target.value, 10) || 150)}
              />
              <Input
                label="Carbs (g)"
                type="number"
                value={carbs}
                onChange={(e) => setCarbs(parseInt(e.target.value, 10) || 200)}
              />
              <Input
                label="Fat (g)"
                type="number"
                value={fat}
                onChange={(e) => setFat(parseInt(e.target.value, 10) || 50)}
              />
              <Input
                label="Fiber (g)"
                type="number"
                value={fiber}
                onChange={(e) => setFiber(parseInt(e.target.value, 10) || 30)}
              />
            </div>
          </div>
        </Card>

        {/* Save button */}
        <div className="flex items-center justify-between pt-2">
          {isSaved ? (
            <span className="text-xs font-bold text-success flex items-center gap-1.5 animate-fade-in">
              <CheckCircle2 size={16} />
              <span>Settings saved successfully!</span>
            </span>
          ) : (
            <span />
          )}

          <Button type="submit" variant="primary" size="lg">
            Save Engine Settings
          </Button>
        </div>
      </form>
    </div>
  );
}
