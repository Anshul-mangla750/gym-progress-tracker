import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useActiveWorkout } from '../../hooks/useActiveWorkout';
import { useWorkout } from '../../hooks/useWorkout';
import { useAuth } from '../../hooks/useAuth';
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

export function AskJimmDrawer({ isOpen, onClose }: AskJimmDrawerProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm_welcome',
      sender: 'jimm',
      text: "Hey! I'm Jimm, your VYQOR AI coach. I can build customized workouts, analyze your double progressive overload trends, fix form plateaus, or fine-tune your macros. What's on your mind today?",
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

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputValue;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      generateJimmResponse(query);
      setIsTyping(false);
    }, 900);
  };

  const generateJimmResponse = (userQuery: string) => {
    const q = userQuery.toLowerCase();
    let replyText = '';
    let planData: Message['workoutPlan'] | undefined = undefined;

    if (q.includes('chest') || q.includes('workout') || q.includes('routine')) {
      replyText =
        "Here is a high-stimulus 45-minute Chest & Triceps routine designed around double progression. Focus on taking your top set 1 rep shy of failure (RPE 9):";
      planData = {
        name: 'Jimm Custom: Chest & Triceps Blast',
        exercises: [
          { name: 'Barbell Bench Press', sets: 4, reps: '6-8', rest: 120 },
          { name: 'Incline Dumbbell Press', sets: 3, reps: '8-10', rest: 90 },
          { name: 'Cable Crossover (Upper to Lower)', sets: 3, reps: '12-15', rest: 60 },
          { name: 'Tricep Pushdown (Straight Bar)', sets: 3, reps: '10-12', rest: 60 },
          { name: 'Overhead Dumbbell Tricep Extension', sets: 3, reps: '10-12', rest: 75 },
        ],
      };
    } else if (q.includes('bench') || q.includes('plateau')) {
      replyText =
        "To break through a bench plateau, apply these 3 double progression rules:\n\n1. **Micro-load**: Jump by +1.25 kg to +2.5 kg rather than standard jumps.\n2. **Pause your reps**: Introduce a 1-second chest pause on the first 2 sets to eliminate rebound inertia.\n3. **Tricep lock-out volume**: Add 3 sets of close-grip bench or heavy cable extensions to strengthen the terminal lockout.";
    } else if (q.includes('deficit') || q.includes('cut') || q.includes('fat loss')) {
      replyText =
        "For optimal body recomposition and fat loss without muscle wasting:\n\n• **Calorie Deficit**: 350–500 kcal below maintenance (~0.4 to 0.5 kg loss/week).\n• **Protein Target**: 2.0g – 2.2g per kg of body weight to safeguard lean mass.\n• **Progression Rule**: Maintain heavy weights on your compounds — only drop volume if recovery lags.";
    } else {
      replyText =
        "Great question! For elite physique development, consistency and progressive overload trump everything. Every session you step into, aim to add either 1 rep or a micro-jump in weight over your previous log. Would you like me to build a targeted workout for you right now?";
    }

    const aiMsg: Message = {
      id: `jimm_${Date.now()}`,
      sender: 'jimm',
      text: replyText,
      workoutPlan: planData,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, aiMsg]);
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
      description: 'Custom split generated by Jimm AI Coach',
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
                  Jimm AI Coach
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
                            {ex.sets} × {ex.reps}
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
