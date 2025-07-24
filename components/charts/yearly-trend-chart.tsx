"use client"
import dynamic from 'next/dynamic'
const YearlyTrendBarChartClient = dynamic(() => import('./yearly-trend-bar-chart-client'), { ssr: false })
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface YearlyTrendChartProps {
  data: any[]
}

export default function YearlyTrendChart({ data }: YearlyTrendChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Year-wise Data Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <YearlyTrendBarChartClient data={data} />
      </CardContent>
    </Card>
  )
}
