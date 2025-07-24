"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Target } from "lucide-react"
import { useState } from "react"
import { LabelList } from "recharts"
import dynamic from 'next/dynamic'

const DistrictPerformanceBarChartClient = dynamic(() => import('./district-performance-bar-chart-client'), { ssr: false })

interface DistrictPerformanceAnalysisProps {
  data: any[]
}

export default function DistrictPerformanceAnalysis({ data }: DistrictPerformanceAnalysisProps) {
  const [sortBy, setSortBy] = useState<'work_completion_rate' | 'avg_days_worked' | 'name'>('work_completion_rate')
  const [metric, setMetric] = useState<'work_completion_rate' | 'avg_days_worked'>('work_completion_rate')

  // Defensive: fallback to [] if data is missing
  const safeData = Array.isArray(data) ? data : []

  // Sort data based on user selection
  const sortedData = [...safeData].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name)
    }
    return b[sortBy] - a[sortBy]
  })
  // Show top 10 for clarity
  const topPerformers = sortedData.slice(0, 10)

  const performanceData = safeData.map((item) => ({
    ...item,
    efficiency_score: (item.work_completion_rate + (item.avg_days_worked / 100) * 100) / 2,
  }))

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <Target className="h-5 w-5 mr-2 text-purple-600" />
            District Work Completion Rates
          </CardTitle>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="outline">Top Performers</Badge>
            <Badge variant="outline">Completion %</Badge>
            <Badge variant="outline">Days Worked</Badge>
          </div>
          <div className="mt-4 flex flex-wrap gap-4 items-center">
            <label className="text-sm font-medium">Sort by:</label>
            <select
              className="border rounded px-2 py-1 text-sm"
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
            >
              <option value="work_completion_rate">Completion %</option>
              <option value="avg_days_worked">Avg Days Worked</option>
              <option value="name">District Name</option>
            </select>
            <label className="text-sm font-medium ml-4">Metric:</label>
            <select
              className="border rounded px-2 py-1 text-sm"
              value={metric}
              onChange={e => setMetric(e.target.value as any)}
            >
              <option value="work_completion_rate">Completion %</option>
              <option value="avg_days_worked">Avg Days Worked</option>
            </select>
          </div>
        </CardHeader>
        <CardContent>
          <DistrictPerformanceBarChartClient topPerformers={topPerformers} metric={metric} />
          <div className="mt-4 p-4 bg-purple-50 rounded-lg">
            <h4 className="font-semibold text-purple-800 mb-2">🎯 Performance Analysis:</h4>
            <p className="text-purple-700 text-sm">
              This chart ranks districts by their work completion rates - the percentage of job applicants who actually
              received employment. Higher rates indicate better implementation efficiency and demand-supply matching.
              Districts like Thanjavur and Nagapattinam typically show high completion rates due to strong agricultural
              base and effective local governance.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <MapPin className="h-5 w-5 mr-2 text-red-600" />
            District Efficiency vs Scale Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="applied" name="Total Applications" />
              <YAxis dataKey="work_completion_rate" name="Completion Rate %" />
              <Tooltip
                formatter={(value, name) => [typeof value === "number" ? value.toLocaleString() : value, name]}
                labelFormatter={(label) => `District: ${label}`}
              />
              <Scatter dataKey="work_completion_rate" fill="#EF4444" />
            </ScatterChart>
          </ResponsiveContainer>

          <div className="mt-4 p-4 bg-red-50 rounded-lg">
            <h4 className="font-semibold text-red-800 mb-2">📈 Efficiency vs Scale:</h4>
            <p className="text-red-700 text-sm">
              This scatter plot reveals the relationship between district size (total applications) and efficiency
              (completion rate). Larger districts don't necessarily have lower efficiency, indicating that MGNREGA
              implementation can scale effectively. Some smaller districts achieve very high completion rates, while
              larger ones maintain good performance through better resource management.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Highest Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {Math.max(...data.map((d) => d.work_completion_rate))}%
            </div>
            <p className="text-sm text-gray-600">
              {data.find((d) => d.work_completion_rate === Math.max(...data.map((d) => d.work_completion_rate)))?.name}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Average Days Worked</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {safeData.length > 0
                ? Math.round(safeData.reduce((sum, d) => sum + d.avg_days_worked, 0) / safeData.length).toString()
                : "—"}
            </div>
            <p className="text-sm text-gray-600">Days per beneficiary</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Beneficiaries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {(data.reduce((sum, d) => sum + d.worked, 0) / 100000).toFixed(1)}L
            </div>
            <p className="text-sm text-gray-600">Across all districts</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
