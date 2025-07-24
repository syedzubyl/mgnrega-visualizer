export interface JobCardData {
  year: number
  state: string
  district: string
  gender: "Male" | "Female"
  applied: number
  worked: number
  not_worked: number
  days_worked: number
  wage_rate: number
  total_wages: number
}

export interface FilterState {
  years: number[]
  districts: string[]
  gender: "All" | "Male" | "Female"
}

export interface ChartData {
  name: string
  applied: number
  worked: number
  not_worked: number
  days_worked?: number
  wage_rate?: number
  total_wages?: number
}

export interface DistrictProfile {
  name: string
  population: number
  ruralPopulation: number
  totalHouseholds: number
  description: string
  keyIndustries: string[]
  challenges: string[]
}
