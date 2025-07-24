import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { tamilNaduDistricts } from "@/lib/tn-districts"
import { MapPin, Users, Building, AlertTriangle } from "lucide-react"

export default function DistrictsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Tamil Nadu Districts Profile</h1>
        <p className="text-xl text-gray-600">
          Comprehensive overview of all 38 districts in Tamil Nadu with their MGNREGA implementation context
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tamilNaduDistricts.map((district) => (
          <Card key={district.name} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <MapPin className="h-5 w-5 text-red-600 mr-2" />
                {district.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 text-sm">{district.description}</p>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="flex items-center text-gray-600 mb-1">
                    <Users className="h-4 w-4 mr-1" />
                    Population
                  </div>
                  <div className="font-semibold">{(district.population / 100000).toFixed(1)}L</div>
                </div>
                <div>
                  <div className="flex items-center text-gray-600 mb-1">
                    <Building className="h-4 w-4 mr-1" />
                    Rural Pop.
                  </div>
                  <div className="font-semibold">{(district.ruralPopulation / 100000).toFixed(1)}L</div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-sm text-gray-800 mb-2">Key Industries</h4>
                <div className="flex flex-wrap gap-1">
                  {district.keyIndustries.map((industry) => (
                    <Badge key={industry} variant="secondary" className="text-xs">
                      {industry}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-sm text-gray-800 mb-2 flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-1 text-orange-500" />
                  Challenges
                </h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  {district.challenges.map((challenge, index) => (
                    <li key={index}>• {challenge}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
