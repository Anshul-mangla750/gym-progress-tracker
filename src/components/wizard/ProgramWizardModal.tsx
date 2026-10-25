import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorkout } from '../../hooks/useWorkout';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import {
  Sparkles,
  Clock,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import type { WorkoutDay } from '../../types';
import { useAuth } from '../../hooks/useAuth';

interface ProgramWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProgramWizardModal({ isOpen, onClose }: ProgramWizardModalProps) {
  const [step, setStep] = useState(1);
  const totalSteps = 6;

  // Wizard selections
  const [experience, setExperience] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate');
  const [daysPerWeek, setDaysPerWeek] = useState<number>(6);
  const [physiqueGoal, setPhysiqueGoal] = useState<'vtaper' | 'upperlower' | 'powerbuilding' | 'fatloss'>('vtaper');
  const [equipment, setEquipment] = useState<'full_gym' | 'home_gym' | 'bodyweight'>('full_gym');
  const [duration, setDuration] = useState<number>(60);
  const [isGenerating, setIsGenerating] = useState(false);

  const { createSplit } = useWorkout();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleFinish = async () => {
    setIsGenerating(true);

    try {
      // Build targeted program based on selections
      let programName = 'V-Taper Push Pull Legs (6-Day Split)';
      let programDesc = 'Specialized program prioritizing lat width, lateral delts, and upper chest density.';
      let days: WorkoutDay[] = [];

      if (physiqueGoal === 'vtaper') {
        programName = 'V-Taper Push Pull Legs (6-Day Split)';
        programDesc = 'Aesthetic focus on lateral delts, lat width, upper chest, and double progressive overload.';
        days = [
          {
            id: `v_push_${Date.now()}`,
            name: 'Push (Chest, Shoulders & Triceps)',
            sortOrder: 1,
            exercises: [
              { id: 'p1', exerciseId: 'ex_2', exerciseName: 'Incline Dumbbell Press', sortOrder: 1, targetSets: 4, targetRepsMin: 8, targetRepsMax: 10, restSeconds: 90 },
              { id: 'p2', exerciseId: 'ex_1', exerciseName: 'Barbell Bench Press', sortOrder: 2, targetSets: 3, targetRepsMin: 6, targetRepsMax: 8, restSeconds: 120 },
              { id: 'p3', exerciseId: 'ex_16', exerciseName: 'Lateral Raise (Dumbbell)', sortOrder: 3, targetSets: 5, targetRepsMin: 12, targetRepsMax: 15, restSeconds: 60, notes: 'Priority V-Taper exercise' },
              { id: 'p4', exerciseId: 'ex_21', exerciseName: 'Tricep Pushdown (Cable)', sortOrder: 4, targetSets: 3, targetRepsMin: 10, targetRepsMax: 12, restSeconds: 60 },
            ],
          },
          {
            id: `v_pull_${Date.now()}`,
            name: 'Pull (Back Width & Biceps)',
            sortOrder: 2,
            exercises: [
              { id: 'pl1', exerciseId: 'ex_9', exerciseName: 'Lat Pulldown', sortOrder: 1, targetSets: 4, targetRepsMin: 8, targetRepsMax: 10, restSeconds: 90, notes: 'Focus on maximum lat stretch' },
              { id: 'pl2', exerciseId: 'ex_8', exerciseName: 'Barbell Bent-Over Row', sortOrder: 2, targetSets: 4, targetRepsMin: 6, targetRepsMax: 8, restSeconds: 120 },
              { id: 'pl3', exerciseId: 'ex_18', exerciseName: 'Face Pull', sortOrder: 3, targetSets: 3, targetRepsMin: 12, targetRepsMax: 15, restSeconds: 60 },
              { id: 'pl4', exerciseId: 'ex_19', exerciseName: 'Barbell Bicep Curl', sortOrder: 4, targetSets: 3, targetRepsMin: 8, targetRepsMax: 10, restSeconds: 60 },
            ],
          },
          {
            id: `v_legs_${Date.now()}`,
            name: 'Legs (Quads & Hamstrings)',
            sortOrder: 3,
            exercises: [
              { id: 'l1', exerciseId: 'ex_26', exerciseName: 'Barbell Squat', sortOrder: 1, targetSets: 4, targetRepsMin: 6, targetRepsMax: 8, restSeconds: 150 },
              { id: 'l2', exerciseId: 'ex_27', exerciseName: 'Romanian Deadlift (Barbell)', sortOrder: 2, targetSets: 3, targetRepsMin: 8, targetRepsMax: 10, restSeconds: 120 },
              { id: 'l3', exerciseId: 'ex_28', exerciseName: 'Leg Press', sortOrder: 3, targetSets: 3, targetRepsMin: 10, targetRepsMax: 12, restSeconds: 90 },
            ],
          },
        ];
      } else {
        programName = 'Upper / Lower Hypertrophy (4-Day)';
        programDesc = 'Optimal frequency powerbuilding program for balanced whole-body development.';
        days = [
          {
            id: `ul_up_${Date.now()}`,
            name: 'Upper Body Power',
            sortOrder: 1,
            exercises: [
              { id: 'u1', exerciseId: 'ex_1', exerciseName: 'Barbell Bench Press', sortOrder: 1, targetSets: 4, targetRepsMin: 6, targetRepsMax: 8, restSeconds: 120 },
              { id: 'u2', exerciseId: 'ex_8', exerciseName: 'Barbell Bent-Over Row', sortOrder: 2, targetSets: 4, targetRepsMin: 6, targetRepsMax: 8, restSeconds: 120 },
              { id: 'u3', exerciseId: 'ex_15', exerciseName: 'Overhead Press (Barbell)', sortOrder: 3, targetSets: 3, targetRepsMin: 6, targetRepsMax: 8, restSeconds: 90 },
            ],
          },
          {
            id: `ul_lo_${Date.now()}`,
            name: 'Lower Body Power',
            sortOrder: 2,
            exercises: [
              { id: 'l1', exerciseId: 'ex_26', exerciseName: 'Barbell Squat', sortOrder: 1, targetSets: 4, targetRepsMin: 6, targetRepsMax: 8, restSeconds: 150 },
              { id: 'l2', exerciseId: 'ex_27', exerciseName: 'Romanian Deadlift (Barbell)', sortOrder: 2, targetSets: 3, targetRepsMin: 8, targetRepsMax: 10, restSeconds: 120 },
            ],
          },
        ];
      }

      await createSplit({
        userId: user?.id || '',
        name: programName,
        description: programDesc,
        isTemplate: false,
        isActive: true,
        days,
      });

      onClose();
      navigate('/workouts');
    } catch (err) {
      console.error('Failed to create wizard split:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Build My Program"
      description={`Step ${step} of ${totalSteps} • Customized VYQOR Training Generator`}
      maxWidth="lg"
    >
      <div className="space-y-6 pt-2">
        {/* Step Progress Bar */}
        <div className="w-full bg-border-default h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-accent-primary h-full transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>

        {/* Step 1: Experience */}
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="font-heading font-extrabold text-lg text-text-primary">
              What is your lifting experience level?
            </h3>
            <div className="space-y-2.5">
              {[
                { id: 'beginner', title: 'Under 6 Months', desc: 'Focus on foundational motor patterns and linear progression' },
                { id: 'intermediate', title: '6 Months – 2 Years', desc: 'Comfortable with compounds, ready for systematic double progressive overload' },
                { id: 'advanced', title: '2+ Years', desc: 'Periodized training, higher volume thresholds, targeted weak points' },
              ].map((opt) => (
                <div
                  key={opt.id}
                  onClick={() => setExperience(opt.id as any)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    experience === opt.id
                      ? 'bg-accent-primary-muted border-accent-primary text-text-primary'
                      : 'bg-bg-secondary border-border-default hover:bg-bg-elevated'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm">{opt.title}</span>
                    {experience === opt.id && <CheckCircle2 size={18} className="text-accent-primary" />}
                  </div>
                  <p className="text-xs text-text-secondary mt-1">{opt.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Frequency */}
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="font-heading font-extrabold text-lg text-text-primary">
              How many days per week can you consistently train?
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[3, 4, 5, 6].map((num) => (
                <div
                  key={num}
                  onClick={() => setDaysPerWeek(num)}
                  className={`p-4 rounded-xl border text-center cursor-pointer transition-all ${
                    daysPerWeek === num
                      ? 'bg-accent-primary-muted border-accent-primary text-text-primary'
                      : 'bg-bg-secondary border-border-default hover:bg-bg-elevated'
                  }`}
                >
                  <span className="font-heading font-extrabold text-2xl text-accent-primary block mb-1">
                    {num} Days
                  </span>
                  <span className="text-xs text-text-secondary">
                    {num === 6 ? 'Push / Pull / Legs split' : num === 4 ? 'Upper / Lower split' : 'Full Body split'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Aesthetic & Goal */}
        {step === 3 && (
          <div className="space-y-4">
            <h3 className="font-heading font-extrabold text-lg text-text-primary">
              What is your primary physique & aesthetic goal?
            </h3>
            <div className="space-y-2.5">
              {[
                { id: 'vtaper', title: 'V-Taper Hypertrophy (Back & Shoulders)', desc: 'Prioritizes lat width and lateral delts to create the coveted wide-shoulder aesthetic' },
                { id: 'upperlower', title: 'Classic Upper / Lower Hypertrophy', desc: 'Balanced muscle mass across upper torso, legs, and arms with 2x weekly frequency' },
                { id: 'powerbuilding', title: 'Powerbuilding (Strength + Mass)', desc: 'Heavy barbell squat, bench, and deadlift progression combined with bodybuilding isolation' },
                { id: 'fatloss', title: 'Fat Loss & Density Conditioning', desc: 'Higher density sets with active recovery to preserve lean tissue during cutting' },
              ].map((opt) => (
                <div
                  key={opt.id}
                  onClick={() => setPhysiqueGoal(opt.id as any)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    physiqueGoal === opt.id
                      ? 'bg-accent-primary-muted border-accent-primary text-text-primary'
                      : 'bg-bg-secondary border-border-default hover:bg-bg-elevated'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm">{opt.title}</span>
                    {physiqueGoal === opt.id && <CheckCircle2 size={18} className="text-accent-primary" />}
                  </div>
                  <p className="text-xs text-text-secondary mt-1">{opt.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Equipment */}
        {step === 4 && (
          <div className="space-y-4">
            <h3 className="font-heading font-extrabold text-lg text-text-primary">
              What training equipment do you have access to?
            </h3>
            <div className="space-y-2.5">
              {[
                { id: 'full_gym', title: 'Full Commercial Gym', desc: 'Barbells, dumbbells, cables, leg press, lat pulldown, machines' },
                { id: 'home_gym', title: 'Home Gym (Dumbbells & Bench)', desc: 'Adjustable dumbbells, flat/incline bench, pull-up bar' },
                { id: 'bodyweight', title: 'Calisthenics & Bodyweight', desc: 'Pull-up bar, dip bars, gymnastic rings, push-ups' },
              ].map((opt) => (
                <div
                  key={opt.id}
                  onClick={() => setEquipment(opt.id as any)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    equipment === opt.id
                      ? 'bg-accent-primary-muted border-accent-primary text-text-primary'
                      : 'bg-bg-secondary border-border-default hover:bg-bg-elevated'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm">{opt.title}</span>
                    {equipment === opt.id && <CheckCircle2 size={18} className="text-accent-primary" />}
                  </div>
                  <p className="text-xs text-text-secondary mt-1">{opt.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 5: Session Duration */}
        {step === 5 && (
          <div className="space-y-4">
            <h3 className="font-heading font-extrabold text-lg text-text-primary">
              How long do you prefer each workout session to last?
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {[45, 60, 75].map((mins) => (
                <div
                  key={mins}
                  onClick={() => setDuration(mins)}
                  className={`p-4 rounded-xl border text-center cursor-pointer transition-all ${
                    duration === mins
                      ? 'bg-accent-primary-muted border-accent-primary text-text-primary'
                      : 'bg-bg-secondary border-border-default hover:bg-bg-elevated'
                  }`}
                >
                  <Clock size={20} className="mx-auto text-accent-primary mb-2" />
                  <span className="font-heading font-extrabold text-xl text-text-primary block">
                    {mins} min
                  </span>
                  <span className="text-[11px] text-text-muted">
                    {mins === 45 ? 'Fast & Intense' : mins === 60 ? 'Optimal Hypertrophy' : 'High Volume'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 6: Summary & Launch */}
        {step === 6 && (
          <div className="space-y-4 bg-bg-secondary p-5 rounded-2xl border border-border-default">
            <div className="flex items-center gap-3 border-b border-border-default pb-3">
              <div className="w-10 h-10 rounded-xl bg-accent-primary flex items-center justify-center text-black font-extrabold">
                <Sparkles size={20} className="fill-black" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-base text-text-primary">
                  {physiqueGoal === 'vtaper' ? 'V-Taper Push Pull Legs (6-Day Split)' : 'Upper / Lower Hypertrophy'}
                </h4>
                <p className="text-xs text-text-muted">Tailored to your {experience} training baseline</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-bg-card border border-border-subtle">
                <span className="text-text-muted block text-[10px] uppercase font-semibold">Frequency</span>
                <strong className="text-text-primary font-bold">{daysPerWeek} Days / Week</strong>
              </div>
              <div className="p-3 rounded-xl bg-bg-card border border-border-subtle">
                <span className="text-text-muted block text-[10px] uppercase font-semibold">Duration</span>
                <strong className="text-text-primary font-bold">{duration} Minutes / Session</strong>
              </div>
              <div className="p-3 rounded-xl bg-bg-card border border-border-subtle">
                <span className="text-text-muted block text-[10px] uppercase font-semibold">Equipment</span>
                <strong className="text-text-primary font-bold capitalize">{equipment.replace('_', ' ')}</strong>
              </div>
              <div className="p-3 rounded-xl bg-bg-card border border-border-subtle">
                <span className="text-text-muted block text-[10px] uppercase font-semibold">Overload Rule</span>
                <strong className="text-text-primary font-bold">Double Progression (Auto)</strong>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-border-default">
          {step > 1 ? (
            <Button
              type="button"
              variant="secondary"
              size="sm"
              icon={<ArrowLeft size={14} />}
              onClick={() => setStep((s) => s - 1)}
            >
              Previous
            </Button>
          ) : (
            <div />
          )}

          {step < totalSteps ? (
            <Button
              type="button"
              variant="primary"
              size="sm"
              icon={<ArrowRight size={14} />}
              onClick={() => setStep((s) => s + 1)}
            >
              Next Step
            </Button>
          ) : (
            <Button
              type="button"
              variant="primary"
              size="md"
              icon={<Sparkles size={16} className="fill-black" />}
              onClick={handleFinish}
              isLoading={isGenerating}
            >
              Generate & Activate Program
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
}
