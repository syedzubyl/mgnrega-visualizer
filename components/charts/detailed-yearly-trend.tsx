"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Bar,
  ReferenceLine,
  LabelList,
  BarChart as RechartsBarChart,
  Bar as RechartsBar,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, IndianRupee } from "lucide-react"
import { useState } from "react"

interface DetailedYearlyTrendProps {
  data: any[]
}

export default function DetailedYearlyTrend({ data }: DetailedYearlyTrendProps) {
  const [wageChartType, setWageChartType] = useState<'line' | 'bar'>('line')

  // Derived helpers for better UX in Wage Distribution Analysis
  const formatCrores = (num?: number) => {
    if (typeof num !== 'number') return '-'
    return `${(num / 10000000).toFixed(1)} Cr`
  }

  const maxWageYear = data.reduce(
    (acc: any, d: any) => (d.total_wages > acc.value ? { year: d.year, value: d.total_wages } : acc),
    { year: null, value: -Infinity }
  )
  const first = data[0]
  const last = data[data.length - 1]
  const cagr = (() => {
    if (!first || !last) return null
    const n = last.year - first.year
    if (n <= 0 || first.total_wages <= 0) return null
    const rate = Math.pow(last.total_wages / first.total_wages, 1 / n) - 1
    return Math.round(rate * 100)
  })()

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
            Employment Trends Over Time (2005-2025)
          </CardTitle>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="outline">Applications</Badge>
            <Badge variant="outline">Work Provided</Badge>
            <Badge variant="outline">Completion Rate</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip
                formatter={(value, name) => [typeof value === "number" ? value.toLocaleString() : value, name]}
              />
              <Legend />
              <Bar yAxisId="left" dataKey="applied" fill="#3B82F6" name="Applications" opacity={0.7} />
              <Bar yAxisId="left" dataKey="worked" fill="#10B981" name="Work Provided" opacity={0.7} />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="avg_wage_rate"
                stroke="#F59E0B"
                strokeWidth={3}
                name="Avg Wage Rate (₹)"
              />
            </ComposedChart>
          </ResponsiveContainer>

          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">📊 Chart Explanation:</h4>
            <p className="text-blue-700 text-sm">
              This chart shows the evolution of MGNREGA in Tamil Nadu over 20 years. The bars represent the number of
              job applications (blue) and actual work provided (green), while the orange line shows the average wage
              rate progression. Notice the steady increase in both demand and wage rates, reflecting the scheme's
              growing importance and inflation adjustments.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <IndianRupee className="h-5 w-5 mr-2 text-green-600" />
            Wage Distribution Analysis
          </CardTitle>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="text-xs">Peak: {maxWageYear.year} · ₹{formatCrores(maxWageYear.value)}</Badge>
            <Badge variant="secondary" className="text-xs">CAGR: {cagr !== null ? `${cagr}%` : '-'}</Badge>
            {last?.avg_wage_rate ? (
              <Badge variant="secondary" className="text-xs">Avg Wage (₹/day): {last.avg_wage_rate}</Badge>
            ) : null}
            <span className="ml-auto"></span>
            <button
              className={`px-3 py-1 rounded border text-sm font-medium transition-colors ${wageChartType === 'line' ? 'bg-green-600 text-white' : 'bg-white text-green-700 border-green-600'}`}
              onClick={() => setWageChartType('line')}
            >
              Line Chart
            </button>
            <button
              className={`px-3 py-1 rounded border text-sm font-medium transition-colors ${wageChartType === 'bar' ? 'bg-green-600 text-white' : 'bg-white text-green-700 border-green-600'}`}
              onClick={() => setWageChartType('bar')}
            >
              Bar Chart
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            {wageChartType === 'line' ? (
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis tickFormatter={(v) => `₹${(v / 10000000).toFixed(0)}Cr`} />
                <Tooltip
                  formatter={(value, name, props) => {
                    if (props && props.dataKey === 'total_wages') {
                      return [`₹${formatCrores(value as number)}`, 'Total Wages']
                    }
                    return [typeof value === 'number' ? value.toLocaleString() : String(value), name as string]
                  }}
                  labelFormatter={(label) => `Year: ${label}`}
                />
                <Legend />
                <ReferenceLine x={2020} stroke="#EF4444" strokeDasharray="4 2" label={{ value: 'Pandemic', position: 'top', fill: '#EF4444', fontWeight: 'bold', fontSize: 12 }} />
                <Line
                  type="monotone"
                  dataKey="total_wages"
                  stroke="#059669"
                  strokeWidth={3}
                  name="Total Wages Distributed"
                >
                  <LabelList dataKey="total_wages" position="top" formatter={v => `₹${formatCrores(v as number)}`} />
                </Line>
                {data?.[0]?.avg_wage_rate ? (
                  <Line
                    type="monotone"
                    dataKey="avg_wage_rate"
                    stroke="#2563EB"
                    strokeWidth={2}
                    dot={false}
                    name="Avg Wage Rate (₹/day)"
                  />
                ) : null}
              </LineChart>
            ) : (
              <RechartsBarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis tickFormatter={(v) => `₹${(v / 10000000).toFixed(0)}Cr`} />
                <Tooltip
                  formatter={(value) => [`₹${formatCrores(value as number)}`, "Total Wages"]}
                  labelFormatter={(label) => `Year: ${label}`}
                />
                <Legend />
                <ReferenceLine x={2020} stroke="#EF4444" strokeDasharray="4 2" label={{ value: 'Pandemic', position: 'top', fill: '#EF4444', fontWeight: 'bold', fontSize: 12 }} />
                <RechartsBar dataKey="total_wages" fill="#059669" name="Total Wages Distributed">
                  <LabelList dataKey="total_wages" position="top" formatter={v => `₹${formatCrores(v as number)}`} />
                </RechartsBar>
              </RechartsBarChart>
            )}
          </ResponsiveContainer>

          <div className="mt-4 p-4 bg-green-50 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">💰 Wage Analysis:</h4>
            <ul className="text-green-700 text-sm list-disc pl-5 space-y-1">
              <li>Total wages are shown in crores (₹Cr) for easier comparison across years.</li>
              <li>Blue line shows average daily wage rate (₹/day); green shows total wages distributed.</li>
              <li>Red marker highlights 2020 (Pandemic) for context.</li>
              <li>Peak year: {maxWageYear.year}, Total wages: ₹{formatCrores(maxWageYear.value)}{last?.avg_wage_rate ? `, Latest avg wage: ₹${last.avg_wage_rate}/day` : ''}.</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
