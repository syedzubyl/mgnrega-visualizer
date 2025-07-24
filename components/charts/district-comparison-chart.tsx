"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DistrictComparisonChartProps {
  data: any[]
}

export default function DistrictComparisonChart({ data }: DistrictComparisonChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>District-wise Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="applied" fill="#8884d8" name="Applied" />
            <Bar dataKey="worked" fill="#82ca9d" name="Worked" />
            <Bar dataKey="not_worked" fill="#ffc658" name="Not Worked" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
