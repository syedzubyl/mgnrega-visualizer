import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, TrendingUp, Users, MapPin, IndianRupee, Calendar, Target } from "lucide-react"

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="flex justify-center mb-4">
          <Badge variant="secondary" className="text-lg px-4 py-2">
            தமிழ்நாடு • Tamil Nadu
          </Badge>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Tamil Nadu MGNREGA Job Card Visualizer</h1>
        <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto">
          Comprehensive analysis of Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA) implementation
          across all 38 districts of Tamil Nadu from 2005 to 2025. Explore employment patterns, wage trends, gender
          participation, and district-wise performance with detailed visualizations.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/dashboard">
            <Button size="lg" className="bg-red-600 hover:bg-red-700">
              Explore Dashboard
            </Button>
          </Link>
          <Link href="/districts">
            <Button size="lg" variant="outline">
              View Districts
            </Button>
          </Link>
        </div>
      </div>

      {/* Key Statistics */}
      <div className="grid md:grid-cols-4 gap-6 mb-16">
        <Card className="text-center">
          <CardHeader>
            <MapPin className="h-12 w-12 text-red-600 mx-auto mb-2" />
            <CardTitle className="text-2xl font-bold">38</CardTitle>
            <CardDescription>Districts Covered</CardDescription>
          </CardHeader>
        </Card>
        <Card className="text-center">
          <CardHeader>
            <Calendar className="h-12 w-12 text-blue-600 mx-auto mb-2" />
            <CardTitle className="text-2xl font-bold">20</CardTitle>
            <CardDescription>Years of Data</CardDescription>
          </CardHeader>
        </Card>
        <Card className="text-center">
          <CardHeader>
            <Users className="h-12 w-12 text-green-600 mx-auto mb-2" />
            <CardTitle className="text-2xl font-bold">50L+</CardTitle>
            <CardDescription>Job Applications</CardDescription>
          </CardHeader>
        </Card>
        <Card className="text-center">
          <CardHeader>
            <IndianRupee className="h-12 w-12 text-purple-600 mx-auto mb-2" />
            <CardTitle className="text-2xl font-bold">₹5000Cr+</CardTitle>
            <CardDescription>Wages Distributed</CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="text-center">
            <BarChart3 className="h-12 w-12 text-red-600 mx-auto mb-2" />
            <CardTitle className="text-lg">Interactive Visualizations</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Comprehensive charts including yearly trends, district comparisons, gender analysis, wage patterns, and
              employment completion rates with detailed explanations.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="text-center">
            <TrendingUp className="h-12 w-12 text-blue-600 mx-auto mb-2" />
            <CardTitle className="text-lg">20-Year Trend Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Track MGNREGA evolution from 2005 to 2025, analyzing employment patterns, wage growth, policy impacts, and
              seasonal variations across Tamil Nadu.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="text-center">
            <Users className="h-12 w-12 text-purple-600 mx-auto mb-2" />
            <CardTitle className="text-lg">Gender & Demographics</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Detailed analysis of male vs female participation, work completion rates, wage equality, and demographic
              trends across different districts.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="text-center">
            <MapPin className="h-12 w-12 text-green-600 mx-auto mb-2" />
            <CardTitle className="text-lg">District-wise Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Compare all 38 districts of Tamil Nadu with detailed profiles, performance metrics, challenges, and
              success stories in MGNREGA implementation.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="text-center">
            <IndianRupee className="h-12 w-12 text-orange-600 mx-auto mb-2" />
            <CardTitle className="text-lg">Wage & Economic Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Track wage rate evolution, total wage distribution, economic impact assessment, and purchasing power
              analysis across different time periods.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="text-center">
            <Target className="h-12 w-12 text-pink-600 mx-auto mb-2" />
            <CardTitle className="text-lg">Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Analyze work completion rates, average days worked, employment guarantee fulfillment, and efficiency
              metrics with benchmarking across districts.
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      {/* About Tamil Nadu MGNREGA */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
            <MapPin className="h-6 w-6 text-red-600 mr-2" />
            MGNREGA in Tamil Nadu
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            Tamil Nadu has been one of the most successful states in implementing MGNREGA since its inception in 2005.
            With 38 districts and a significant rural population, the state has consistently achieved high employment
            generation and wage distribution rates. The scheme has played a crucial role in providing livelihood
            security to rural households, especially during agricultural lean seasons and economic downturns.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div>
              <h4 className="font-semibold text-lg mb-2 text-red-600">Key Achievements</h4>
              <ul className="space-y-1 text-gray-700">
                <li>• High work completion rates across districts</li>
                <li>• Strong female participation (40-45%)</li>
                <li>• Timely wage payments through digital systems</li>
                <li>• Effective social audit mechanisms</li>
                <li>• Integration with other rural development schemes</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-2 text-red-600">Focus Areas</h4>
              <ul className="space-y-1 text-gray-700">
                <li>• Water conservation and drought proofing</li>
                <li>• Rural infrastructure development</li>
                <li>• Agricultural productivity enhancement</li>
                <li>• Natural resource management</li>
                <li>• Climate resilient asset creation</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <div className="text-center bg-gradient-to-r from-red-50 to-orange-50 p-8 rounded-lg">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Tamil Nadu's MGNREGA Journey</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Dive deep into 20 years of MGNREGA data across all 38 districts of Tamil Nadu. Discover insights, trends, and
          stories that showcase the impact of India's largest rural employment guarantee scheme.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/dashboard">
            <Button size="lg" className="bg-red-600 hover:bg-red-700">
              Start Analyzing Data
            </Button>
          </Link>
          <Link href="/insights">
            <Button size="lg" variant="outline">
              View Key Insights
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
