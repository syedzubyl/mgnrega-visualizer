"use client"

import { useState, useEffect } from "react"
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

export default function DashboardPage() {
  const [data, setData] = useState<JobCardData[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<FilterState>({
    years: [],
    districts: [],
    gender: "All",
  })

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch("/data/tn-jobcards.json")
        const jsonData = await response.json()
        setData(jsonData)
      } catch (error) {
        console.error("Error loading data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Tamil Nadu MGNREGA data...</p>
        </div>
      </div>
    )
  }

  const filteredData = filterData(data, filters)
  const yearlyTrends = getYearlyTrends(filteredData)
  const districtData = getDistrictWiseData(filteredData)
  const genderData = getGenderWiseData(filteredData)
  const wageAnalysis = getWageAnalysis(filteredData)

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
        </div>
      </div>
    </div>
  )
}
