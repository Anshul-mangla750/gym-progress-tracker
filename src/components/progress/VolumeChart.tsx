import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import type { WorkoutSession, WeightUnit } from '../../types';
import { Card, CardHeader } from '../ui/Card';
import { formatDate } from '../../lib/date-utils';

interface VolumeChartProps {
  sessions: WorkoutSession[];
  unit: WeightUnit;
}

export function VolumeChart({ sessions, unit }: VolumeChartProps) {
  const chartData = [...sessions]
    .filter((s) => s.status === 'completed' && s.totalVolume)
    .reverse()
    .map((s) => ({
      date: formatDate(s.startedAt, 'MMM d'),
      volume: s.totalVolume || 0,
      name: s.dayName || s.splitName || 'Workout',
    }));

  if (chartData.length === 0) {
    return (
      <Card>
        <CardHeader title="Training Volume History" subtitle={`Cumulative volume (${unit}) across logged sessions`} />
        <div className="py-12 text-center text-xs text-text-muted">
          Complete your first workout to generate volume trends!
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader
        title="Training Volume Progression"
        subtitle={`Cumulative workout volume per session (${unit})`}
      />
      <div className="h-64 w-full pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
            <XAxis
              dataKey="date"
              stroke="#6B7280"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#2A2A2A' }}
            />
            <YAxis
              stroke="#6B7280"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${(v / 1000).toFixed(1)}k`}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload || !payload.length) return null;
                const data = payload[0].payload;
                return (
                  <div className="bg-bg-elevated border border-border-default p-2.5 rounded-xl shadow-xl text-xs">
                    <p className="font-bold text-text-primary">{data.name}</p>
                    <p className="text-text-secondary mt-0.5">{data.date}</p>
                    <p className="font-extrabold text-accent-primary mt-1">
                      {data.volume.toLocaleString()} {unit}
                    </p>
                  </div>
                );
              }}
            />
            <Bar
              dataKey="volume"
              fill="#22C55E"
              radius={[6, 6, 0, 0]}
              animationDuration={800}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
