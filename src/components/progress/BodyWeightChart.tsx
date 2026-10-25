import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import type { BodyWeightEntry, WeightUnit } from '../../types';
import { Card, CardHeader } from '../ui/Card';
import { formatDate } from '../../lib/date-utils';

interface BodyWeightChartProps {
  entries: BodyWeightEntry[];
  unit: WeightUnit;
}

export function BodyWeightChart({ entries, unit }: BodyWeightChartProps) {
  const chartData = [...entries]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((e) => ({
      date: formatDate(e.date, 'MMM d'),
      rawDate: e.date,
      weight: e.weight,
    }));

  if (chartData.length === 0) {
    return (
      <Card>
        <CardHeader title="Body Weight Trend" subtitle="Log daily or weekly weigh-ins" />
        <div className="py-12 text-center text-xs text-text-muted">
          No weigh-in data logged yet.
        </div>
      </Card>
    );
  }

  const weights = chartData.map((d) => d.weight);
  const minWeight = Math.floor(Math.min(...weights) - 1);
  const maxWeight = Math.ceil(Math.max(...weights) + 1);

  return (
    <Card>
      <CardHeader
        title="Body Weight Trend"
        subtitle={`Fluctuation and progression over time (${unit})`}
      />
      <div className="h-64 w-full pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="weightGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F97316" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E8EEE9" vertical={false} />
            <XAxis
              dataKey="date"
              stroke="#6B7280"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#DDE5DF' }}
            />
            <YAxis
              domain={[minWeight, maxWeight]}
              stroke="#6B7280"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${v}`}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload || !payload.length) return null;
                const data = payload[0].payload;
                return (
                  <div className="bg-bg-elevated border border-border-default p-2.5 rounded-xl shadow-xl text-xs">
                    <p className="text-text-secondary">{data.date}</p>
                    <p className="font-extrabold text-accent-secondary mt-0.5 text-sm">
                      {data.weight} {unit}
                    </p>
                  </div>
                );
              }}
            />
            <Area
              type="monotone"
              dataKey="weight"
              stroke="#F97316"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#weightGrad)"
              animationDuration={800}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
