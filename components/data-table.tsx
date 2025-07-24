"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { JobCardData } from "@/lib/types"
import { exportToCSV } from "@/lib/data-utils"
import { Download, ChevronUp, ChevronDown } from "lucide-react"

interface DataTableProps {
  data: JobCardData[]
}

type SortField = keyof JobCardData
type SortDirection = "asc" | "desc"

export default function DataTable({ data }: DataTableProps) {
  const [sortField, setSortField] = useState<SortField>("year")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortField]
    const bValue = b[sortField]

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue
    }

    return 0
  })

  const handleExport = () => {
    exportToCSV(data, "mgnrega-data.csv")
  }

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null
    return sortDirection === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Data Table ({data.length} records)</CardTitle>
        <Button onClick={handleExport} variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="cursor-pointer hover:bg-gray-50" onClick={() => handleSort("year")}>
                  <div className="flex items-center">
                    Year <SortIcon field="year" />
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer hover:bg-gray-50" onClick={() => handleSort("state")}>
                  <div className="flex items-center">
                    State <SortIcon field="state" />
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer hover:bg-gray-50" onClick={() => handleSort("district")}>
                  <div className="flex items-center">
                    District <SortIcon field="district" />
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer hover:bg-gray-50" onClick={() => handleSort("gender")}>
                  <div className="flex items-center">
                    Gender <SortIcon field="gender" />
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer hover:bg-gray-50" onClick={() => handleSort("applied")}>
                  <div className="flex items-center">
                    Applied <SortIcon field="applied" />
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer hover:bg-gray-50" onClick={() => handleSort("worked")}>
                  <div className="flex items-center">
                    Worked <SortIcon field="worked" />
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer hover:bg-gray-50" onClick={() => handleSort("not_worked")}>
                  <div className="flex items-center">
                    Not Worked <SortIcon field="not_worked" />
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.year}</TableCell>
                  <TableCell>{row.state}</TableCell>
                  <TableCell>{row.district}</TableCell>
                  <TableCell>{row.gender}</TableCell>
                  <TableCell>{row.applied.toLocaleString()}</TableCell>
                  <TableCell>{row.worked.toLocaleString()}</TableCell>
                  <TableCell>{row.not_worked.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
