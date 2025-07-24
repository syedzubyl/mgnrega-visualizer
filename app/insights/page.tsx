import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, IndianRupee, Target, AlertCircle, CheckCircle } from "lucide-react"

export default function InsightsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Key Insights & Analysis</h1>
        <p className="text-xl text-gray-600">
          Deep dive into Tamil Nadu's MGNREGA performance with data-driven insights and policy implications
        </p>
      </div>

      <div className="space-y-8">
        {/* Performance Highlights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
              Performance Highlights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-lg mb-3 text-green-600">Success Stories</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>
                    • <strong>High Female Participation:</strong> Tamil Nadu consistently maintains 40-45% female
                    participation, above national average
                  </li>
                  <li>
                    • <strong>Wage Growth:</strong> Daily wages increased from ₹120 in 2005 to ₹275+ in 2024, outpacing
                    inflation
                  </li>
                  <li>
                    • <strong>Work Completion:</strong> Average work completion rate of 85-90% across districts
                  </li>
                  <li>
                    • <strong>Digital Integration:</strong> Successful implementation of digital wage payments and job
                    card management
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-3 text-blue-600">Key Achievements</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>
                    • <strong>Economic Impact:</strong> Over ₹5000 crores distributed as wages since 2005
                  </li>
                  <li>
                    • <strong>Employment Days:</strong> Average 90+ days of employment per beneficiary
                  </li>
                  <li>
                    • <strong>Asset Creation:</strong> Thousands of rural infrastructure projects completed
                  </li>
                  <li>
                    • <strong>Drought Resilience:</strong> Effective safety net during agricultural distress periods
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trend Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <TrendingUp className="h-6 w-6 text-blue-600 mr-2" />
              Trend Analysis (2005-2025)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Demand Evolution</h4>
                <p className="text-blue-700 text-sm">
                  Job applications have grown from 2-3 lakh in early years to 6-7 lakh annually, reflecting increased
                  awareness and rural economic needs.
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Wage Progression</h4>
                <p className="text-green-700 text-sm">
                  Daily wages have more than doubled, with regular revisions ensuring purchasing power maintenance and
                  rural income support.
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">Gender Inclusion</h4>
                <p className="text-purple-700 text-sm">
                  Steady female participation around 40-45% demonstrates MGNREGA's role in women's economic empowerment
                  in rural Tamil Nadu.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* District-wise Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Target className="h-6 w-6 text-purple-600 mr-2" />
              District-wise Performance Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-lg mb-3 text-purple-600">Top Performing Districts</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-purple-50 rounded">
                    <div className="font-semibold">Thanjavur</div>
                    <p className="text-sm text-gray-600">
                      High completion rates due to strong agricultural base and effective local governance
                    </p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded">
                    <div className="font-semibold">Nagapattinam</div>
                    <p className="text-sm text-gray-600">
                      Excellent performance in coastal area development and fishermen community engagement
                    </p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded">
                    <div className="font-semibold">Villupuram</div>
                    <p className="text-sm text-gray-600">
                      Large rural population with consistent high demand and good work provision
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-3 text-orange-600">Urban vs Rural Dynamics</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-orange-50 rounded">
                    <div className="font-semibold">Metro Districts</div>
                    <p className="text-sm text-gray-600">
                      Chennai, Coimbatore show lower rural participation but higher wage rates
                    </p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded">
                    <div className="font-semibold">Agricultural Districts</div>
                    <p className="text-sm text-gray-600">
                      Higher seasonal demand, better work completion rates, strong community participation
                    </p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded">
                    <div className="font-semibold">Industrial Districts</div>
                    <p className="text-sm text-gray-600">
                      MGNREGA complements industrial employment, provides safety net during downturns
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Challenges and Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <AlertCircle className="h-6 w-6 text-red-600 mr-2" />
              Challenges & Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-lg mb-3 text-red-600">Key Challenges</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>
                    • <strong>Seasonal Demand:</strong> High demand during agricultural lean seasons creates capacity
                    constraints
                  </li>
                  <li>
                    • <strong>Skill Development:</strong> Need for skill upgradation to improve asset quality and worker
                    productivity
                  </li>
                  <li>
                    • <strong>Climate Adaptation:</strong> Increasing focus needed on climate-resilient asset creation
                  </li>
                  <li>
                    • <strong>Technology Integration:</strong> Further digitization needed for better monitoring and
                    transparency
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-3 text-green-600">Recommendations</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>
                    • <strong>Capacity Building:</strong> Enhance local implementation capacity during peak demand
                    periods
                  </li>
                  <li>
                    • <strong>Convergence:</strong> Better integration with other rural development schemes
                  </li>
                  <li>
                    • <strong>Innovation:</strong> Promote innovative asset creation focusing on water conservation and
                    renewable energy
                  </li>
                  <li>
                    • <strong>Monitoring:</strong> Strengthen real-time monitoring systems for better program management
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Economic Impact */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <IndianRupee className="h-6 w-6 text-green-600 mr-2" />
              Economic Impact Assessment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600 mb-2">₹5000Cr+</div>
                <div className="text-sm text-gray-600">Total wages distributed since 2005</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">50L+</div>
                <div className="text-sm text-gray-600">Total job applications processed</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-3xl font-bold text-purple-600 mb-2">40L+</div>
                <div className="text-sm text-gray-600">Employment opportunities provided</div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Multiplier Effects</h4>
              <p className="text-gray-700 text-sm">
                MGNREGA wages have significant multiplier effects in rural Tamil Nadu economy. Every rupee spent
                generates additional economic activity through increased consumption, local business growth, and
                improved agricultural productivity through asset creation. The scheme has been particularly effective
                during economic downturns, providing crucial safety net support to rural households.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
