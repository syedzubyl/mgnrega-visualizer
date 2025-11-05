"use client"

import { useState } from "react"
import type { JobCardData, FilterState } from "@/lib/types"
import { filterData, getYearlyTrends, getDistrictWiseData, getGenderWiseData, getWageAnalysis } from "@/lib/data-utils"
import DashboardFilters from "@/components/dashboard-filters"
import DetailedYearlyTrend from "@/components/charts/detailed-yearly-trend"
import DistrictPerformanceAnalysis from "@/components/charts/district-performance-analysis"
import GenderDetailedAnalysis from "@/components/charts/gender-detailed-analysis"
import DataTable from "@/components/data-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, IndianRupee, Calendar, Target, TrendingUp } from "lucide-react"
import jobcards from "@/app/data/tn-jobcards.json"
import jobcards2025 from "@/app/data/tn-jobcards-2025.json"

export default function DashboardPage() {
  const [data] = useState<JobCardData[]>(jobcards as JobCardData[])
  const [data2025] = useState<JobCardData[]>(jobcards2025 as JobCardData[])
  const [filters, setFilters] = useState<FilterState>({
    years: [],
    districts: [],
    gender: "All",
  })


  const filteredData = filterData(data, filters)
  const yearlyTrends = getYearlyTrends(filteredData)
  const districtData = getDistrictWiseData(filteredData)
  const genderData = getGenderWiseData(filteredData)
  const wageAnalysis = getWageAnalysis(filteredData)

  const filteredData2025 = filterData(data2025, filters)
  const districtData2025 = getDistrictWiseData(filteredData2025)
  const genderData2025 = getGenderWiseData(filteredData2025)
  const wageAnalysis2025 = getWageAnalysis(filteredData2025)

  // Calculate comprehensive statistics
  const totalApplied = filteredData.reduce((sum, item) => sum + item.applied, 0)
  const totalWorked = filteredData.reduce((sum, item) => sum + item.worked, 0)
  const totalNotWorked = filteredData.reduce((sum, item) => sum + item.not_worked, 0)
  const totalWages = filteredData.reduce((sum, item) => sum + item.total_wages, 0)
  const avgDaysWorked =
    filteredData.length > 0
      ? Math.round(filteredData.reduce((sum, item) => sum + item.days_worked, 0) / filteredData.length)
      : 0
  const workRate = totalApplied > 0 ? ((totalWorked / totalApplied) * 100).toFixed(1) : "0"
  const avgWageRate =
    filteredData.length > 0
      ? Math.round(filteredData.reduce((sum, item) => sum + item.wage_rate, 0) / filteredData.length)
      : 0

  // Calculate comprehensive statistics for 2025
  const totalApplied2025 = filteredData2025.reduce((sum, item) => sum + item.applied, 0)
  const totalWorked2025 = filteredData2025.reduce((sum, item) => sum + item.worked, 0)
  const totalNotWorked2025 = filteredData2025.reduce((sum, item) => sum + item.not_worked, 0)
  const totalWages2025 = filteredData2025.reduce((sum, item) => sum + item.total_wages, 0)
  const avgDaysWorked2025 =
    filteredData2025.length > 0
      ? Math.round(filteredData2025.reduce((sum, item) => sum + item.days_worked, 0) / filteredData2025.length)
      : 0
  const workRate2025 = totalApplied2025 > 0 ? ((totalWorked2025 / totalApplied2025) * 100).toFixed(1) : "0"
  const avgWageRate2025 =
    filteredData2025.length > 0
      ? Math.round(filteredData2025.reduce((sum, item) => sum + item.wage_rate, 0) / filteredData2025.length)
      : 0

  // Baseline for previous year (2024) with the same active filters for comparison
  const baseline2024 = filterData(
    data,
    { ...filters, years: [2024] },
  )
  const totalApplied2024 = baseline2024.reduce((sum, item) => sum + item.applied, 0)
  const totalWorked2024 = baseline2024.reduce((sum, item) => sum + item.worked, 0)
  const totalWages2024 = baseline2024.reduce((sum, item) => sum + item.total_wages, 0)
  const avgWageRate2024 =
    baseline2024.length > 0
      ? Math.round(baseline2024.reduce((sum, item) => sum + item.wage_rate, 0) / baseline2024.length)
      : 0
  const workRate2024 = totalApplied2024 > 0 ? (totalWorked2024 / totalApplied2024) * 100 : 0

  const pct = (curr: number, prev: number) => {
    if (!prev || prev === 0) return null
    return ((curr - prev) / prev) * 100
  }
  const deltaApplied = pct(totalApplied2025, totalApplied2024)
  const deltaWorked = pct(totalWorked2025, totalWorked2024)
  const deltaWages = pct(totalWages2025, totalWages2024)
  const deltaWageRate = pct(avgWageRate2025, avgWageRate2024)
  const deltaWorkRate = pct(parseFloat(workRate2025), workRate2024)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <MapPin className="h-8 w-8 text-red-600 mr-3" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tamil Nadu MGNREGA Dashboard</h1>
            <p className="text-gray-600">Comprehensive analysis of rural employment across all 38 districts</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">20 Years of Data</Badge>
          <Badge variant="secondary">38 Districts</Badge>
          <Badge variant="secondary">Gender Analysis</Badge>
          <Badge variant="secondary">Wage Trends</Badge>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <DashboardFilters data={data} filters={filters} onFiltersChange={setFilters} />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Enhanced Summary Cards */}
          <div className="grid md:grid-cols-6 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  Total Applied
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{(totalApplied / 100000).toFixed(1)}L</div>
                <p className="text-xs text-gray-500">Job applications</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                  <Target className="h-4 w-4 mr-1" />
                  Work Provided
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{(totalWorked / 100000).toFixed(1)}L</div>
                <p className="text-xs text-gray-500">Employment given</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  Success Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">{workRate}%</div>
                <p className="text-xs text-gray-500">Work completion</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                  <IndianRupee className="h-4 w-4 mr-1" />
                  Total Wages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">₹{(totalWages / 10000000).toFixed(0)}Cr</div>
                <p className="text-xs text-gray-500">Distributed</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Avg Days
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-pink-600">{avgDaysWorked}</div>
                <p className="text-xs text-gray-500">Per beneficiary</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                  <IndianRupee className="h-4 w-4 mr-1" />
                  Avg Wage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">₹{avgWageRate}</div>
                <p className="text-xs text-gray-500">Per day</p>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Charts */}
          <DetailedYearlyTrend data={yearlyTrends} />
          <DistrictPerformanceAnalysis data={districtData} />
          <GenderDetailedAnalysis data={genderData} />

          {/* Data Table */}
          <DataTable data={filteredData} />

          {/* 2025 Snapshot */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2025 Snapshot</h2>
            <div className="grid md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    Applied (2025)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{(totalApplied2025 / 100000).toFixed(1)}L</div>
                  <p className="text-xs text-gray-500">vs 2024: {deltaApplied === null ? '—' : `${deltaApplied >= 0 ? '+' : ''}${deltaApplied.toFixed(1)}%`}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                    <Target className="h-4 w-4 mr-1" />
                    Worked (2025)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{(totalWorked2025 / 100000).toFixed(1)}L</div>
                  <p className="text-xs text-gray-500">vs 2024: {deltaWorked === null ? '—' : `${deltaWorked >= 0 ? '+' : ''}${deltaWorked.toFixed(1)}%`}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                    <IndianRupee className="h-4 w-4 mr-1" />
                    Total Wages (2025)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">₹{(totalWages2025 / 10000000).toFixed(0)}Cr</div>
                  <p className="text-xs text-gray-500">vs 2024: {deltaWages === null ? '—' : `${deltaWages >= 0 ? '+' : ''}${deltaWages.toFixed(1)}%`}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    Rates (2025)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-700 space-y-1">
                    <div className="flex justify-between"><span>Avg Wage:</span><span className="font-semibold">₹{avgWageRate2025}</span></div>
                    <div className="flex justify-between text-xs text-gray-500"><span>vs 2024</span><span>{deltaWageRate === null ? '—' : `${deltaWageRate >= 0 ? '+' : ''}${deltaWageRate.toFixed(1)}%`}</span></div>
                    <div className="flex justify-between"><span>Success Rate:</span><span className="font-semibold">{workRate2025}%</span></div>
                    <div className="flex justify-between text-xs text-gray-500"><span>vs 2024</span><span>{deltaWorkRate === null ? '—' : `${deltaWorkRate >= 0 ? '+' : ''}${deltaWorkRate.toFixed(1)}%`}</span></div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="mt-3 text-xs text-gray-500">Snapshot uses current filters for districts/gender. Comparisons are against 2024 with the same filters.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
