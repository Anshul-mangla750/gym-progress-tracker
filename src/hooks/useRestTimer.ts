import { useState, useEffect, useRef, useCallback } from 'react';

interface UseRestTimerOptions {
  onComplete?: () => void;
}

export function useRestTimer(options?: UseRestTimerOptions) {
  const [totalSeconds, setTotalSeconds] = useState<number>(90);
  const [remainingSeconds, setRemainingSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const onCompleteRef = useRef(options?.onComplete);

  useEffect(() => {
    onCompleteRef.current = options?.onComplete;
  }, [options?.onComplete]);

  const startTimer = useCallback((seconds: number = 90) => {
    setTotalSeconds(seconds);
    setRemainingSeconds(seconds);
    setIsRunning(true);
  }, []);

  const pauseTimer = useCallback(() => {
    setIsRunning(false);
  }, []);

  const resumeTimer = useCallback(() => {
    if (remainingSeconds > 0) {
      setIsRunning(true);
    }
  }, [remainingSeconds]);

  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setRemainingSeconds(0);
  }, []);

  const addSeconds = useCallback((sec: number) => {
    setRemainingSeconds((prev) => Math.max(0, prev + sec));
    setTotalSeconds((prev) => Math.max(prev, prev + sec));
  }, []);

  useEffect(() => {
    if (!isRunning || remainingSeconds <= 0) return;

    const interval = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsRunning(false);
          if (onCompleteRef.current) {
            onCompleteRef.current();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, remainingSeconds]);

  const progress = totalSeconds > 0 ? ((totalSeconds - remainingSeconds) / totalSeconds) * 100 : 0;

  return {
    remainingSeconds,
    totalSeconds,
    isRunning,
    isCompleted: remainingSeconds === 0 && totalSeconds > 0,
    progress,
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
    addSeconds,
  };
}
