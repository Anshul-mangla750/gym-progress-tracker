import { Play, Pause, RotateCcw, Plus, Minus, Bell } from 'lucide-react';
import { formatDuration } from '../../lib/date-utils';

interface RestTimerProps {
  remainingSeconds: number;
  totalSeconds: number;
  isRunning: boolean;
  progress: number;
  onPause: () => void;
  onResume: () => void;
  onReset: () => void;
  onAddSeconds: (sec: number) => void;
  className?: string;
}

export function RestTimer({
  remainingSeconds,
  isRunning,
  progress,
  onPause,
  onResume,
  onReset,
  onAddSeconds,
  className = '',
}: RestTimerProps) {
  if (remainingSeconds <= 0 && !isRunning) return null;

  return (
    <div
      className={`
        fixed bottom-16 sm:bottom-6 right-4 sm:right-6 z-50
        bg-bg-card/95 backdrop-blur-md border border-accent-primary/40 rounded-2xl p-3.5 shadow-2xl
        flex items-center gap-3 sm:gap-4 animate-slide-up max-w-sm
        ${className}
      `}
    >
      {/* Progress ring/icon */}
      <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
        <svg className="w-12 h-12 -rotate-90 transform" viewBox="0 0 36 36">
          <circle
            cx="18"
            cy="18"
            r="15"
            className="text-border-default stroke-current"
            strokeWidth="3"
            fill="none"
          />
          <circle
            cx="18"
            cy="18"
            r="15"
            className="text-accent-primary stroke-current transition-all duration-300"
            strokeWidth="3"
            strokeDasharray={94.2}
            strokeDashoffset={94.2 - (progress / 100) * 94.2}
            strokeLinecap="round"
            fill="none"
          />
        </svg>
        <Bell size={16} className={`absolute text-accent-primary ${isRunning ? 'animate-bounce' : ''}`} />
      </div>

      {/* Time & status */}
      <div className="flex flex-col">
        <span className="text-[10px] font-bold uppercase tracking-wider text-accent-primary">
          Rest Interval
        </span>
        <span className="font-heading font-extrabold text-xl text-text-primary tabular-nums tracking-tight">
          {formatDuration(remainingSeconds)}
        </span>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-1.5 ml-auto">
        <button
          onClick={() => onAddSeconds(-15)}
          className="p-1.5 rounded-lg bg-bg-elevated hover:bg-bg-input text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
          title="-15s"
        >
          <Minus size={14} />
        </button>
        <button
          onClick={() => onAddSeconds(15)}
          className="p-1.5 rounded-lg bg-bg-elevated hover:bg-bg-input text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
          title="+15s"
        >
          <Plus size={14} />
        </button>

        {isRunning ? (
          <button
            onClick={onPause}
            className="p-2 rounded-xl bg-accent-primary/20 text-accent-primary hover:bg-accent-primary/30 transition-colors cursor-pointer"
            title="Pause"
          >
            <Pause size={16} />
          </button>
        ) : (
          <button
            onClick={onResume}
            className="p-2 rounded-xl bg-accent-primary text-black hover:bg-accent-primary-hover transition-colors cursor-pointer"
            title="Resume"
          >
            <Play size={16} className="fill-black" />
          </button>
        )}

        <button
          onClick={onReset}
          className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-bg-elevated transition-colors cursor-pointer"
          title="Dismiss timer"
        >
          <RotateCcw size={14} />
        </button>
      </div>
    </div>
  );
}
