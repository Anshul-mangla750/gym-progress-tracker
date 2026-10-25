import { format, formatDistanceToNow, isToday, isYesterday, startOfWeek, endOfWeek, subDays, parseISO, startOfDay, endOfDay, isSameDay } from 'date-fns';

export function formatDate(date: string | Date, fmt = 'MMM d, yyyy'): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, fmt);
}

export function formatDateShort(date: string | Date): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  if (isToday(d)) return 'Today';
  if (isYesterday(d)) return 'Yesterday';
  return format(d, 'MMM d');
}

export function formatTimeAgo(date: string | Date): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return formatDistanceToNow(d, { addSuffix: true });
}

export function formatDuration(seconds: number): string {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hrs > 0) return `${hrs}h ${mins}m`;
  if (mins > 0) return `${mins}m ${secs}s`;
  return `${secs}s`;
}

export function formatDurationCompact(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export function getTodayString(): string {
  return format(new Date(), 'yyyy-MM-dd');
}

export function getDayOfWeek(): number {
  return new Date().getDay();
}

export function getWeekRange() {
  const now = new Date();
  return {
    start: startOfWeek(now, { weekStartsOn: 1 }),
    end: endOfWeek(now, { weekStartsOn: 1 }),
  };
}

export function getDateRangeStart(range: '7d' | '30d' | '90d'): Date {
  const daysMap = { '7d': 7, '30d': 30, '90d': 90 };
  return subDays(new Date(), daysMap[range]);
}

export function isDateInRange(date: string | Date, start: Date, end: Date): boolean {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return d >= startOfDay(start) && d <= endOfDay(end);
}

export function getPastDates(days: number): string[] {
  const dates: string[] = [];
  const now = new Date();
  for (let i = days - 1; i >= 0; i--) {
    dates.push(format(subDays(now, i), 'yyyy-MM-dd'));
  }
  return dates;
}

export function isSameDateString(a: string, b: string): boolean {
  return isSameDay(parseISO(a), parseISO(b));
}

export { isToday, parseISO, format, startOfDay, endOfDay, subDays, isSameDay };
