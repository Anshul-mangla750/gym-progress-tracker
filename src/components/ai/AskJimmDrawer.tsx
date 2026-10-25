import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useActiveWorkout } from '../../hooks/useActiveWorkout';
import { useWorkout } from '../../hooks/useWorkout';
import { useAuth } from '../../hooks/useAuth';
import { getTodayString } from '../../lib/date-utils';
import { mockApi } from '../../api/mock-adapter';
import { Button } from '../ui/Button';
import { X, Send, Bot, Sparkles, Dumbbell, ArrowRight } from 'lucide-react';
import type { WorkoutDay, PlanExercise } from '../../types';

interface Message {
  id: string;
  sender: 'user' | 'jimm';
  text: string;
  workoutPlan?: {
    name: string;
    exercises: { name: string; sets: number; reps: string; rest: number }[];
  };
  timestamp: string;
}

interface AskJimmDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const PRESET_PROMPTS = [
  'Generate a 45-min Chest & Triceps hypertrophy workout',
  'How do I break through a bench press plateau?',
  'Calculate my cutting calorie deficit for fat loss',
  'Suggest high-protein vegetarian meal ideas',
];

async function coachFromLocalData(question: string, athleteName: string, experience: string) {
  const [split, sessions, goals, meals] = await Promise.all([
    mockApi.getActiveSplit(),
    mockApi.getSessions(),
    mockApi.getNutritionGoals(),
    mockApi.getMealsByDate(getTodayString()),
  ]);
  const q = question.toLowerCase();
  const recent = sessions.slice(0, 3).map((session) => session.dayName || session.splitName).filter(Boolean);
  const mealTotals = meals.reduce((total, meal) => ({
    calories: total.calories + meal.totalCalories,
    protein: total.protein + meal.totalProtein,
  }), { calories: 0, protein: 0 });
  const context = `${athleteName} is ${experience}; daily targets are ${goals.calorieTarget} kcal and ${goals.proteinTarget} g protein. Today's food log: ${mealTotals.calories} kcal and ${mealTotals.protein} g protein. Active plan: ${split?.name || 'none'}${recent.length ? `; recent sessions: ${recent.join(', ')}` : ''}.`;

  if (/(calorie|cut|deficit|surplus|macro|protein|carb|fat|meal|diet|nutrition)/.test(q)) {
    const remaining = Math.max(0, goals.proteinTarget - mealTotals.protein);
    return `Coach check-in: ${context}\n\nAim to stay near your calorie target and spread protein across 3–5 meals. You have about ${remaining} g of your protein target left based on today's log. For fat loss, use a modest 300–500 kcal daily deficit and adjust from 2–3 weeks of weight trends; avoid aggressive cuts that hurt training and recovery.`;
  }
  if (/(workout|chest|back|leg|arm|shoulder|routine|train|exercise)/.test(q)) {
    return `Let's build this around quality reps and recoverable volume. ${context}\n\nUse 3–4 main movements, 3 working sets each, and finish with 2–3 accessories. Keep most sets at 1–3 reps in reserve, rest 2–3 minutes on compound lifts, and add reps before adding load. Allow at least 48 hours before training the same muscle hard again.`;
  }
  if (/(plateau|stuck|progress|overload|bench|strength)/.test(q)) {
    return `For a plateau, check technique, sleep, nutrition, and whether reps or load have moved over the last few weeks. ${context}\n\nKeep the same lift for another 2–3 exposures, add reps within your target range, then increase load by the smallest available step. If performance is falling across sessions, take a deload week at roughly half your usual sets.`;
  }
  return `Hi ${athleteName}. I can help with training, recovery, or nutrition using your locally saved profile and logs. ${context}\n\nTell me your goal and available equipment, and I'll suggest a practical next step. Keep every set controlled and stop if you feel sharp pain.`;
}

export function AskJimmDrawer({ isOpen, onClose }: AskJimmDrawerProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm_welcome',
      sender: 'jimm',
      text: "Hey! I'm Jimm, your VYQOR training coach. I can suggest practical workouts and nutrition adjustments using the profile and logs saved in this browser. What's your goal today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { startWorkout } = useActiveWorkout();
  const { createSplit } = useWorkout();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isTyping) return;

    const userMsg: Message = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    try {
      const reply = await coachFromLocalData(
        query,
        user?.displayName || user?.name || 'Athlete',
        user?.experienceLevel || 'intermediate',
      );

      setMessages((prev) => [...prev, {
        id: `jimm_${Date.now()}`,
        sender: 'jimm',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }]);
    } catch (error) {
      const detail = error instanceof Error ? error.message : 'The coach is unavailable right now.';
      setMessages((prev) => [...prev, {
        id: `jimm_error_${Date.now()}`,
        sender: 'jimm',
        text: `I couldn't reach the coach service: ${detail}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }]);
    } finally {
      setIsTyping(false);
    }
  };
  const handleLoadWorkout = async (plan: NonNullable<Message['workoutPlan']>) => {
    const planExercises: PlanExercise[] = plan.exercises.map((e, idx) => ({
      id: `jimm_pe_${idx}_${Date.now()}`,
      exerciseId: `ex_${idx + 1}`,
      exerciseName: e.name,
      sortOrder: idx + 1,
      targetSets: e.sets,
      targetRepsMin: parseInt(e.reps.split('-')[0], 10) || 8,
      targetRepsMax: parseInt(e.reps.split('-')[1], 10) || 12,
      restSeconds: e.rest,
    }));

    const workoutDay: WorkoutDay = {
      id: `jimm_day_${Date.now()}`,
      name: plan.name,
      sortOrder: 1,
      exercises: planExercises,
    };

    await createSplit({
      userId: user?.id || '',
      name: `AI: ${plan.name}`,
      description: 'Custom split suggested by Jimm Fitness Coach',
      isTemplate: false,
      isActive: true,
      days: [workoutDay],
    });

    await startWorkout(workoutDay, `AI: ${plan.name}`);
    onClose();
    navigate('/active-workout');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-lg bg-bg-card border-l border-border-default h-full flex flex-col z-10 shadow-2xl animate-slide-left">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-border-default flex items-center justify-between bg-bg-secondary">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent-primary flex items-center justify-center text-black font-extrabold shadow-md shadow-accent-primary/20">
              <Bot size={22} className="stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-extrabold text-base text-text-primary">
                  Jimm Fitness Coach
                </h3>
                <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
              </div>
              <p className="text-xs text-text-muted">VYQOR Fitness & Overload Advisor</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-bg-elevated transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Messages Scroll Area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-accent-primary text-black font-semibold rounded-tr-none shadow-md shadow-accent-primary/20'
                    : 'bg-bg-secondary border border-border-default text-text-primary rounded-tl-none'
                }`}
              >
                <div className="whitespace-pre-line">{msg.text}</div>

                {/* Workout Plan Card within message */}
                {msg.workoutPlan && (
                  <div className="mt-3 p-3 rounded-xl bg-bg-card border border-border-default space-y-2 text-text-primary">
                    <div className="flex items-center justify-between border-b border-border-subtle pb-2">
                      <span className="font-heading font-bold text-xs text-accent-primary flex items-center gap-1.5">
                        <Dumbbell size={14} />
                        <span>{msg.workoutPlan.name}</span>
                      </span>
                      <span className="text-[10px] text-text-muted">
                        {msg.workoutPlan.exercises.length} Exercises
                      </span>
                    </div>

                    <div className="space-y-1 text-xs">
                      {msg.workoutPlan.exercises.map((ex, idx) => (
                        <div key={idx} className="flex justify-between text-text-secondary">
                          <span>{ex.name}</span>
                          <span className="font-mono text-text-muted">
                            {ex.sets} Ã— {ex.reps}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2">
                      <Button
                        variant="primary"
                        size="sm"
                        fullWidth
                        icon={<ArrowRight size={13} />}
                        onClick={() => msg.workoutPlan && handleLoadWorkout(msg.workoutPlan)}
                      >
                        Start this Workout Now
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <span className="text-[10px] text-text-muted mt-1 px-1">{msg.timestamp}</span>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-1.5 text-xs text-text-muted p-2 bg-bg-secondary rounded-xl w-24">
              <Bot size={14} className="text-accent-primary animate-spin" />
              <span>Thinking...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Preset Prompt Chips */}
        <div className="px-4 py-2 border-t border-border-default bg-bg-secondary/40 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {PRESET_PROMPTS.map((prompt, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSend(prompt)}
              className="text-[11px] whitespace-nowrap px-2.5 py-1 rounded-full bg-bg-elevated hover:bg-bg-input border border-border-default text-text-secondary hover:text-accent-primary transition-colors cursor-pointer flex items-center gap-1"
            >
              <Sparkles size={10} className="text-accent-primary" />
              <span>{prompt}</span>
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 border-t border-border-default bg-bg-secondary flex items-center gap-2">
          <input
            type="text"
            placeholder="Ask Jimm for workouts, progressive overload advice, or macros..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 h-10 px-3.5 rounded-xl bg-bg-input border border-border-default text-text-primary text-xs sm:text-sm focus:outline-none focus:border-accent-primary"
          />
          <Button
            variant="primary"
            size="sm"
            onClick={() => handleSend()}
            disabled={!inputValue.trim()}
          >
            <Send size={15} />
          </Button>
        </div>
      </div>
    </div>
  );
}
