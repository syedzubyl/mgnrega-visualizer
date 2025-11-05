"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { FilterState, JobCardData } from "@/lib/types"

interface DashboardFiltersProps {
  data: JobCardData[]
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
}

export default function DashboardFilters({ data, filters, onFiltersChange }: DashboardFiltersProps) {
  // Generate all years from 2005 to 2025
  const availableYears = Array.from({ length: 21 }, (_, i) => 2005 + i)
  const availableDistricts = [...new Set(data.map((item) => item.district))].sort()

  const handleYearChange = (year: number, checked: boolean) => {
    const newYears = checked ? [...filters.years, year] : filters.years.filter((y) => y !== year)

    onFiltersChange({ ...filters, years: newYears })
  }

  const handleDistrictChange = (district: string, checked: boolean) => {
    const newDistricts = checked ? [...filters.districts, district] : filters.districts.filter((d) => d !== district)

    onFiltersChange({ ...filters, districts: newDistricts })
  }

  const handleGenderChange = (gender: "All" | "Male" | "Female") => {
    onFiltersChange({ ...filters, gender })
  }

  const resetFilters = () => {
    onFiltersChange({ years: [], districts: [], gender: "All" })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Gender Filter */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Gender</Label>
          <Select value={filters.gender} onValueChange={handleGenderChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Year Filter */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Years (2005-2025)</Label>
          <div className="grid grid-cols-3 gap-2 max-h-60 overflow-y-auto p-1 border rounded-md">
            {availableYears.map((year) => (
              <div key={year} className="flex items-center space-x-2">
                <Checkbox
                  id={`year-${year}`}
                  checked={filters.years.includes(year)}
                  onCheckedChange={(checked) => handleYearChange(year, checked as boolean)}
                />
                <Label htmlFor={`year-${year}`} className="text-sm cursor-pointer">
                  {year}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* District Filter */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Districts</Label>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {availableDistricts.map((district) => (
              <div key={district} className="flex items-center space-x-2">
                <Checkbox
                  id={`district-${district}`}
                  checked={filters.districts.includes(district)}
                  onCheckedChange={(checked) => handleDistrictChange(district, checked as boolean)}
                />
                <Label htmlFor={`district-${district}`} className="text-sm">
                  {district}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Button onClick={resetFilters} variant="outline" className="w-full bg-transparent">
          Reset Filters
        </Button>
      </CardContent>
    </Card>
  )
}
