import type { JobCardData, FilterState } from "./types"

export function filterData(data: JobCardData[], filters: FilterState): JobCardData[] {
  return data.filter((item) => {
    const yearMatch = filters.years.length === 0 || filters.years.includes(item.year)
    const districtMatch = filters.districts.length === 0 || filters.districts.includes(item.district)
    const genderMatch = filters.gender === "All" || item.gender === filters.gender

    return yearMatch && districtMatch && genderMatch
  })
}

// --- Data Normalization and Rolling Average Utilities ---

/**
 * Normalize a value per 1000 people (or any base)
 */
export function normalizePer(value: number, base: number, per: number = 1000) {
  if (!base || isNaN(value) || isNaN(base)) return null
  return +(value / base * per).toFixed(2)
}

/**
 * Calculate rolling average for an array of objects by key
 * @param arr Array of objects
 * @param key Key to average
 * @param window Number of years for rolling window
 * @returns Array with .rollingAvg_{key} field
 */
export function addRollingAverage(arr: any[], key: string, window: number = 3) {
  return arr.map((item, idx) => {
    const start = Math.max(0, idx - window + 1)
    const windowItems = arr.slice(start, idx + 1)
    const valid = windowItems.map((d) => d[key]).filter((v) => typeof v === 'number' && !isNaN(v))
    const avg = valid.length ? valid.reduce((a, b) => a + b, 0) / valid.length : null
    return { ...item, [`rollingAvg_${key}`]: avg !== null ? +avg.toFixed(2) : null }
  })
}

/**
 * Check for missing/invalid data
 */
export function isMissing(value: any) {
  return value === null || value === undefined || (typeof value === 'number' && isNaN(value))
}

export function getYearlyTrends(data: JobCardData[]) {
  const yearlyData = data.reduce(
    (acc, item) => {
      const year = item.year
      if (!acc[year]) {
        acc[year] = {
          year,
          applied: 0,
          worked: 0,
          not_worked: 0,
          total_wages: 0,
          avg_days_worked: 0,
          avg_wage_rate: 0,
        }
      }
      acc[year].applied += item.applied
      acc[year].worked += item.worked
      acc[year].not_worked += item.not_worked
      acc[year].total_wages += item.total_wages
      acc[year].avg_days_worked += item.days_worked
      acc[year].avg_wage_rate += item.wage_rate
      return acc
    },
    {} as Record<number, any>,
  )

  let yearlyArr = Object.values(yearlyData)
    .map((item: any) => ({
      ...item,
      avg_days_worked: Math.round(item.avg_days_worked / data.filter((d) => d.year === item.year).length),
      avg_wage_rate: Math.round(item.avg_wage_rate / data.filter((d) => d.year === item.year).length),
    }))
    .sort((a: any, b: any) => a.year - b.year)

  // Add rolling average for avg_wage_rate
  yearlyArr = addRollingAverage(yearlyArr, 'avg_wage_rate', 3)

  // Flag missing data
  yearlyArr = yearlyArr.map((item: any) => ({
    ...item,
    missing: Object.values(item).some(isMissing),
  }))

  return yearlyArr
}

export function getDistrictWiseData(data: JobCardData[]) {
  const districtData = data.reduce(
    (acc, item) => {
      const district = item.district
      if (!acc[district]) {
        acc[district] = {
          name: district,
          applied: 0,
          worked: 0,
          not_worked: 0,
          total_wages: 0,
          avg_days_worked: 0,
          work_completion_rate: 0,
        }
      }
      acc[district].applied += item.applied
      acc[district].worked += item.worked
      acc[district].not_worked += item.not_worked
      acc[district].total_wages += item.total_wages
      acc[district].avg_days_worked += item.days_worked
      return acc
    },
    {} as Record<string, any>,
  )

  return Object.values(districtData).map((item: any) => ({
    ...item,
    work_completion_rate: item.applied > 0 ? Math.round((item.worked / item.applied) * 100) : 0,
    avg_days_worked: Math.round(item.avg_days_worked / data.filter((d) => d.district === item.name).length),
  }))
}

export function getGenderWiseData(data: JobCardData[]) {
  const genderData = data.reduce(
    (acc, item) => {
      const gender = item.gender
      if (!acc[gender]) {
        acc[gender] = {
          name: gender,
          value: 0,
          worked: 0,
          total_wages: 0,
          avg_days_worked: 0,
        }
      }
      acc[gender].value += item.applied
      acc[gender].worked += item.worked
      acc[gender].total_wages += item.total_wages
      acc[gender].avg_days_worked += item.days_worked
      return acc
    },
    {} as Record<string, any>,
  )

  return Object.values(genderData).map((item: any) => ({
    ...item,
    avg_days_worked: Math.round(item.avg_days_worked / data.filter((d) => d.gender === item.name).length),
  }))
}

export function getWageAnalysis(data: JobCardData[]) {
  const wageData = data.reduce(
    (acc, item) => {
      const year = item.year
      if (!acc[year]) {
        acc[year] = {
          year,
          total_wages: 0,
          avg_wage_rate: 0,
          total_days: 0,
          beneficiaries: 0,
        }
      }
      acc[year].total_wages += item.total_wages
      acc[year].avg_wage_rate += item.wage_rate
      acc[year].total_days += item.days_worked * item.worked
      acc[year].beneficiaries += item.worked
      return acc
    },
    {} as Record<number, any>,
  )

  let wageArr = Object.values(wageData)
    .map((item: any) => ({
      ...item,
      avg_wage_rate: Math.round(item.avg_wage_rate / data.filter((d) => d.year === item.year).length),
      avg_days_per_beneficiary: item.beneficiaries > 0 ? Math.round(item.total_days / item.beneficiaries) : 0,
    }))
    .sort((a: any, b: any) => a.year - b.year)

  // Add rolling average for avg_wage_rate
  wageArr = addRollingAverage(wageArr, 'avg_wage_rate', 3)

  // Flag missing data
  wageArr = wageArr.map((item: any) => ({
    ...item,
    missing: Object.values(item).some(isMissing),
  }))

  return wageArr
}

export function exportToCSV(data: JobCardData[], filename: string) {
  const headers = [
    "Year",
    "State",
    "District",
    "Gender",
    "Applied",
    "Worked",
    "Not Worked",
    "Days Worked",
    "Wage Rate",
    "Total Wages",
  ]
  const csvContent = [
    headers.join(","),
    ...data.map((row) =>
      [
        row.year,
        row.state,
        row.district,
        row.gender,
        row.applied,
        row.worked,
        row.not_worked,
        row.days_worked,
        row.wage_rate,
        row.total_wages,
      ].join(","),
    ),
  ].join("\n")

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const link = document.createElement("a")
  const url = URL.createObjectURL(blob)
  link.setAttribute("href", url)
  link.setAttribute("download", filename)
  link.style.visibility = "hidden"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
