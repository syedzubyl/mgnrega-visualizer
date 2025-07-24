import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Users, Target, BookOpen, Database } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">About Tamil Nadu MGNREGA Visualizer</h1>
        <p className="text-xl text-gray-600">
          Comprehensive data visualization platform for analyzing MGNREGA implementation across Tamil Nadu
        </p>
      </div>

      <div className="space-y-8">
        {/* About MGNREGA in Tamil Nadu */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <MapPin className="h-6 w-6 text-red-600 mr-2" />
              MGNREGA in Tamil Nadu: A Success Story
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              Tamil Nadu has emerged as one of India's most successful states in implementing the Mahatma Gandhi
              National Rural Employment Guarantee Act (MGNREGA) since its launch in 2005. With 38 districts and a
              significant rural population of over 2.5 crores, the state has consistently demonstrated excellence in
              program delivery, transparency, and rural development impact.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="p-4 bg-red-50 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-2">State Achievements</h4>
                <ul className="space-y-1 text-red-700 text-sm">
                  <li>• Consistent 85-90% work completion rates</li>
                  <li>• Strong female participation (40-45%)</li>
                  <li>• Effective digital governance systems</li>
                  <li>• Timely wage payments (95%+ within 15 days)</li>
                  <li>• Quality asset creation and maintenance</li>
                </ul>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Key Focus Areas</h4>
                <ul className="space-y-1 text-blue-700 text-sm">
                  <li>• Water conservation and drought proofing</li>
                  <li>• Rural road connectivity improvement</li>
                  <li>• Agricultural productivity enhancement</li>
                  <li>• Natural resource management</li>
                  <li>• Climate resilient infrastructure</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dataset Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <Database className="h-6 w-6 text-green-600 mr-2" />
              Comprehensive Dataset Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              Our visualization platform utilizes an extensive dataset covering 20 years of MGNREGA implementation
              across all 38 districts of Tamil Nadu. The data includes detailed metrics on employment generation, wage
              distribution, gender participation, and performance indicators.
            </p>

            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-3 text-green-800">Data Fields & Metrics:</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="list-disc list-inside space-y-1 text-green-700 text-sm">
                  <li>
                    <strong>Temporal:</strong> Year-wise data (2005-2025)
                  </li>
                  <li>
                    <strong>Geographic:</strong> All 38 Tamil Nadu districts
                  </li>
                  <li>
                    <strong>Demographic:</strong> Gender-wise breakdown
                  </li>
                  <li>
                    <strong>Employment:</strong> Applications, work provided, completion rates
                  </li>
                </ul>
                <ul className="list-disc list-inside space-y-1 text-green-700 text-sm">
                  <li>
                    <strong>Economic:</strong> Wage rates, total wages distributed
                  </li>
                  <li>
                    <strong>Performance:</strong> Days worked, efficiency metrics
                  </li>
                  <li>
                    <strong>Trends:</strong> Year-over-year growth patterns
                  </li>
                  <li>
                    <strong>Comparative:</strong> District-wise performance analysis
                  </li>
                </ul>
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-4 mt-4">
              <div className="text-center p-3 bg-gray-50 rounded">
                <div className="text-2xl font-bold text-gray-800">38</div>
                <div className="text-sm text-gray-600">Districts Covered</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded">
                <div className="text-2xl font-bold text-gray-800">20</div>
                <div className="text-sm text-gray-600">Years of Data</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded">
                <div className="text-2xl font-bold text-gray-800">1000+</div>
                <div className="text-sm text-gray-600">Data Points</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded">
                <div className="text-2xl font-bold text-gray-800">10+</div>
                <div className="text-sm text-gray-600">Key Metrics</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Visualization Features */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <Target className="h-6 w-6 text-purple-600 mr-2" />
              Advanced Visualization Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-lg mb-3 text-purple-600">Interactive Charts</h4>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>
                    • <strong>Yearly Trend Analysis:</strong> 20-year employment and wage progression
                  </li>
                  <li>
                    • <strong>District Performance:</strong> Comparative analysis across all 38 districts
                  </li>
                  <li>
                    • <strong>Gender Participation:</strong> Male vs female employment patterns
                  </li>
                  <li>
                    • <strong>Economic Impact:</strong> Wage distribution and economic multiplier effects
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-3 text-blue-600">Advanced Analytics</h4>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>
                    • <strong>Performance Metrics:</strong> Work completion rates and efficiency scores
                  </li>
                  <li>
                    • <strong>Seasonal Analysis:</strong> Employment patterns across different seasons
                  </li>
                  <li>
                    • <strong>Correlation Studies:</strong> Relationship between various performance indicators
                  </li>
                  <li>
                    • <strong>Predictive Insights:</strong> Trend projections and policy impact analysis
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technology Stack */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <BookOpen className="h-6 w-6 text-orange-600 mr-2" />
              Technology & Implementation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-2 text-orange-600">Frontend Technologies</h4>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• Next.js 14 (App Router)</li>
                  <li>• React 18 with TypeScript</li>
                  <li>• Tailwind CSS for styling</li>
                  <li>• shadcn/ui component library</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-green-600">Data Visualization</h4>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• Recharts for interactive charts</li>
                  <li>• Custom data processing utilities</li>
                  <li>• Real-time filtering and sorting</li>
                  <li>• CSV export functionality</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-purple-600">Features</h4>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• Responsive design</li>
                  <li>• Server-side rendering</li>
                  <li>• SEO optimization</li>
                  <li>• Performance optimization</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Usage Guidelines */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <Users className="h-6 w-6 text-pink-600 mr-2" />
              Usage Guidelines & Data Sources
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              This visualization platform is designed for researchers, policymakers, students, and citizens interested
              in understanding MGNREGA's impact in Tamil Nadu. The data presented here is for educational and analytical
              purposes.
            </p>

            <div className="bg-pink-50 p-4 rounded-lg">
              <h4 className="font-semibold text-pink-800 mb-2">Important Notes:</h4>
              <ul className="space-y-1 text-pink-700 text-sm">
                <li>• This is a demonstration dataset created for visualization purposes</li>
                <li>• For official MGNREGA data, refer to Ministry of Rural Development, Government of India</li>
                <li>• Data patterns are based on realistic trends but may not reflect exact official figures</li>
                <li>• The platform is designed to showcase data visualization capabilities and analytical insights</li>
              </ul>
            </div>

            <div className="mt-6">
              <h4 className="font-semibold text-lg mb-2">Recommended Usage:</h4>
              <ul className="space-y-1 text-gray-700 text-sm">
                <li>• Academic research and policy analysis</li>
                <li>• Understanding MGNREGA implementation patterns</li>
                <li>• Comparative studies across districts and time periods</li>
                <li>• Training and educational purposes</li>
                <li>• Data visualization technique demonstration</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
