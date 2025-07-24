"use client"

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Award } from "lucide-react"

interface GenderDetailedAnalysisProps {
  data: any[]
  yearlyGenderData?: any[]
}

const COLORS = ["#3B82F6", "#EC4899"]

export default function GenderDetailedAnalysis({ data, yearlyGenderData = [] }: GenderDetailedAnalysisProps) {
  const participationData = data.map((item) => ({
    ...item,
    participation_rate: item.value > 0 ? Math.round((item.worked / item.value) * 100) : 0,
  }))

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Users className="h-5 w-5 mr-2 text-blue-600" />
              Gender-wise Participation
            </CardTitle>
            <div className="flex gap-2 mt-2">
              <Badge variant="outline">Applications</Badge>
              <Badge variant="outline">Work Provided</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [value.toLocaleString(), "Applications"]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>

            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">👥 Participation Insights:</h4>
              <p className="text-blue-700 text-sm">
                Tamil Nadu shows strong female participation in MGNREGA, typically ranging from 40-45% of total
                applications. This is higher than the national average and reflects the state's progressive approach to
                women's employment and the scheme's appeal to female workers seeking flexible, local employment
                opportunities.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Award className="h-5 w-5 mr-2 text-pink-600" />
              Work Completion by Gender
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={participationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value, name) => [`${value}%`, "Completion Rate"]} />
                <Bar dataKey="participation_rate" fill="#EC4899" name="Work Completion Rate %" />
              </BarChart>
            </ResponsiveContainer>

            <div className="mt-4 p-4 bg-pink-50 rounded-lg">
              <h4 className="font-semibold text-pink-800 mb-2">⚖️ Gender Equality Analysis:</h4>
              <p className="text-pink-700 text-sm">
                Work completion rates are generally similar between genders, indicating fair allocation of employment
                opportunities. Any variations often reflect seasonal work patterns, with women sometimes showing higher
                completion rates during agricultural lean seasons when they have more availability for MGNREGA work.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gender Statistics Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Female Participation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-pink-600">
              {data.find((d) => d.name === "Female")
                ? Math.round(
                    (data.find((d) => d.name === "Female")!.value / data.reduce((sum, d) => sum + d.value, 0)) * 100,
                  )
                : 0}
              %
            </div>
            <p className="text-sm text-gray-600">Of total applications</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Female Employment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {data.find((d) => d.name === "Female")
                ? Math.round(
                    (data.find((d) => d.name === "Female")!.worked / data.reduce((sum, d) => sum + d.worked, 0)) * 100,
                  )
                : 0}
              %
            </div>
            <p className="text-sm text-gray-600">Of total employment</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Avg Days (Female)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {data.find((d) => d.name === "Female")?.avg_days_worked || 0}
            </div>
            <p className="text-sm text-gray-600">Days per beneficiary</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Avg Days (Male)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {data.find((d) => d.name === "Male")?.avg_days_worked || 0}
            </div>
            <p className="text-sm text-gray-600">Days per beneficiary</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
