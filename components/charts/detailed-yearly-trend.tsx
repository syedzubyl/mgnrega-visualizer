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
          <div className="mt-2 flex gap-2">
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
                <YAxis />
                <Tooltip formatter={(value) => [`₹${(value as number).toLocaleString()}`, "Total Wages"]} />
                <Legend />
                <ReferenceLine x={2020} stroke="#EF4444" strokeDasharray="4 2" label={{ value: 'Pandemic', position: 'top', fill: '#EF4444', fontWeight: 'bold', fontSize: 12 }} />
                <Line
                  type="monotone"
                  dataKey="total_wages"
                  stroke="#059669"
                  strokeWidth={3}
                  name="Total Wages Distributed"
                >
                  <LabelList dataKey="total_wages" position="top" formatter={v => `₹${(v as number).toLocaleString()}`} />
                </Line>
              </LineChart>
            ) : (
              <RechartsBarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip formatter={(value) => [`₹${(value as number).toLocaleString()}`, "Total Wages"]} />
                <Legend />
                <ReferenceLine x={2020} stroke="#EF4444" strokeDasharray="4 2" label={{ value: 'Pandemic', position: 'top', fill: '#EF4444', fontWeight: 'bold', fontSize: 12 }} />
                <RechartsBar dataKey="total_wages" fill="#059669" name="Total Wages Distributed">
                  <LabelList dataKey="total_wages" position="top" formatter={v => `₹${(v as number).toLocaleString()}`} />
                </RechartsBar>
              </RechartsBarChart>
            )}
          </ResponsiveContainer>

          <div className="mt-4 p-4 bg-green-50 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">💰 Wage Analysis:</h4>
            <p className="text-green-700 text-sm">
              The total wage distribution has grown exponentially from ₹2-3 crores in 2005 to over ₹300 crores in recent
              years. This reflects both increased participation and significant wage rate improvements, demonstrating
              MGNREGA's substantial economic impact on Tamil Nadu's rural economy.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
