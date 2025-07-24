"use client"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts"
import React from "react"

interface DistrictPerformanceBarChartClientProps {
  topPerformers: any[]
  metric: 'work_completion_rate' | 'avg_days_worked'
}

export default function DistrictPerformanceBarChartClient({ topPerformers, metric }: DistrictPerformanceBarChartClientProps) {
  if (!topPerformers.length) {
    return <div className="text-center text-gray-500 py-12">No district data available.</div>
  }
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={topPerformers} layout="horizontal">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" domain={metric === 'work_completion_rate' ? [0, 100] : [0, 'dataMax']} />
        <YAxis dataKey="name" type="category" width={100} />
        <Tooltip formatter={(value, name) => [value, metric === 'work_completion_rate' ? 'Completion %' : 'Avg Days Worked']} />
        <Bar dataKey={metric} fill="#8B5CF6" name={metric === 'work_completion_rate' ? 'Completion Rate %' : 'Avg Days Worked'}>
          <LabelList dataKey={metric} position="right" formatter={v => metric === 'work_completion_rate' ? `${v}%` : v} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
} 