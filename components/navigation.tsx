"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { useIsMobile } from "@/components/ui/use-mobile"
import { useState, useEffect } from "react"

export default function Navigation() {
  const pathname = usePathname()
  const isMobile = useIsMobile()
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/districts", label: "Districts" },
    { href: "/insights", label: "Insights" },
    { href: "/about", label: "About" },
  ]

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <MapPin className="h-8 w-8 text-red-600 mr-2" />
            <Link href="/" className="text-xl font-bold text-red-600">
              Tamil Nadu MGNREGA Visualizer
            </Link>
          </div>
          {/* Desktop Nav Links */}
          {(!isMobile || !mounted) && (
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-colors",
                    pathname === item.href
                      ? "border-red-500 text-gray-900"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}
          {/* Mobile Hamburger Menu */}
          {mounted && isMobile && (
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Open menu">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-64">
                  <div className="flex items-center px-4 py-4 border-b">
                    <MapPin className="h-7 w-7 text-red-600 mr-2" />
                    <span className="text-lg font-bold text-red-600">Tamil Nadu MGNREGA</span>
                  </div>
                  <div className="flex flex-col space-y-2 px-4 py-4">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "block px-2 py-2 rounded text-base font-medium transition-colors",
                          pathname === item.href
                            ? "bg-red-100 text-red-700"
                            : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                        )}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
