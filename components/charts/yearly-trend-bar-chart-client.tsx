"use client"
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import React from 'react'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface YearlyTrendBarChartClientProps {
  data: any[]
}

export default function YearlyTrendBarChartClient({ data }: YearlyTrendBarChartClientProps) {
  const years = data.map((d) => d.year)
  const applied = data.map((d) => d.applied)
  const worked = data.map((d) => d.worked)
  const notWorked = data.map((d) => d.not_worked)

  const chartData = {
    labels: years,
    datasets: [
      {
        label: 'Applied',
        data: applied,
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
      },
      {
        label: 'Worked',
        data: worked,
        backgroundColor: 'rgba(16, 185, 129, 0.7)',
      },
      {
        label: 'Not Worked',
        data: notWorked,
        backgroundColor: 'rgba(251, 191, 36, 0.7)',
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Year-wise Data Comparison',
        font: { size: 18 },
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: ${context.parsed.y.toLocaleString()}`
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Year',
          font: { size: 16 },
        },
        grid: { display: false },
      },
      y: {
        title: {
          display: true,
          text: 'Data Value',
          font: { size: 16 },
        },
        beginAtZero: true,
        grid: { color: '#e5e7eb' },
      },
    },
    barPercentage: 0.7,
    categoryPercentage: 0.7,
  }

  return (
    <div className="w-full h-[350px]">
      <Bar data={chartData} options={options} />
    </div>
  )
} 