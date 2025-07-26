"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, MapPin, Package, Search, Filter } from "lucide-react"
import Link from "next/link"

interface Vendor {
  id: number
  name: string
  description: string
  location: string
  rating: number
  reviews: number
  products: number
  image: string
  badge: string
  specialties: string[]
  category: string
}

const mockVendors: Vendor[] = [
  {
    id: 1,
    name: "Sweet Lagos Confectionery",
    description: "Premium Nigerian confectioneries and traditional sweets made with local ingredients.",
    location: "Lagos",
    rating: 4.9,
    reviews: 342,
    products: 45,
    image: "/placeholder.svg?height=200&width=200&text=Sweet+Lagos",
    badge: "Top Rated",
    specialties: ["Chin Chin", "Puff Puff", "Meat Pie"],
    category: "confectioneries",
  },
  {
    id: 2,
    name: "Ankara Crafts Nigeria",
    description: "Beautiful handwoven bags and accessories made with authentic Nigerian Ankara fabrics.",
    location: "Abuja",
    rating: 4.8,
    reviews: 198,
    products: 67,
    image: "/placeholder.svg?height=200&width=200&text=Ankara+Crafts",
    badge: "Eco-Friendly",
    specialties: ["Ankara Bags", "Traditional Bags", "Accessories"],
    category: "bags",
  },
  {
    id: 3,
    name: "Nigerian Beads & Jewelry",
    description: "Unique handcrafted jewelry pieces featuring traditional Nigerian beads.",
    location: "Kano",
    rating: 5.0,
    reviews: 156,
    products: 89,
    image: "/placeholder.svg?height=200&width=200&text=Nigerian+Beads",
    badge: "Premium",
    specialties: ["Beads", "Necklaces", "Bracelets"],
    category: "accessories",
  },
  {
    id: 4,
    name: "Kano Traditional Crafts",
    description: "Authentic traditional Nigerian crafts and accessories from skilled artisans.",
    location: "Kano",
    rating: 4.7,
    reviews: 234,
    products: 123,
    image: "/placeholder.svg?height=200&width=200&text=Kano+Crafts",
    badge: "Verified",
    specialties: ["Traditional Crafts", "Accessories", "Art"],
    category: "accessories",
  },
  {
    id: 5,
    name: "Ogun Fashion House",
    description: "Modern and traditional Nigerian clothing with contemporary designs.",
    location: "Ogun",
    rating: 4.6,
    reviews: 178,
    products: 56,
    image: "/placeholder.svg?height=200&width=200&text=Ogun+Fashion",
    badge: "New",
    specialties: ["Agbada", "Dashiki", "Modern Wear"],
    category: "clothing",
  },
  {
    id: 6,
    name: "Rivers Delicacies",
    description: "Authentic Nigerian confectioneries and snacks from the Niger Delta region.",
    location: "Rivers",
    rating: 4.5,
    reviews: 145,
    products: 34,
    image: "/placeholder.svg?height=200&width=200&text=Rivers+Delicacies",
    badge: "Local Favorite",
    specialties: ["Local Snacks", "Traditional Sweets", "Plantain Chips"],
    category: "confectioneries",
  },
]

const nigerianStates = [
  "All States",
  "Lagos",
  "Abuja",
  "Kano",
  "Rivers",
  "Oyo",
  "Kaduna",
  "Ogun",
  "Anambra",
  "Imo",
  "Delta",
  "Edo",
  "Plateau",
  "Cross River",
]

const categories = [
  { value: "all", label: "All Categories" },
  { value: "confectioneries", label: "Confectioneries" },
  { value: "bags", label: "Bags & Purses" },
  { value: "clothing", label: "Clothing" },
  { value: "accessories", label: "Accessories" },
]

export default function VendorsPage() {
  const [vendors, setVendors] = useState<Vendor[]>(mockVendors)
  const [filteredVendors, setFilteredVendors] = useState<Vendor[]>(mockVendors)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("rating")

  const handleSearch = () => {
    let filtered = [...vendors]

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (vendor) =>
          vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          vendor.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          vendor.specialties.some((specialty) => specialty.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    // Filter by location
    if (selectedLocation !== "all") {
      filtered = filtered.filter((vendor) => vendor.location.toLowerCase() === selectedLocation.toLowerCase())
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((vendor) => vendor.category === selectedCategory)
    }

    // Sort results
    switch (sortBy) {
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "reviews":
        filtered.sort((a, b) => b.reviews - a.reviews)
        break
      case "products":
        filtered.sort((a, b) => b.products - a.products)
        break
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
    }

    setFilteredVendors(filtered)
  }

  const handleClear = () => {
    setSearchQuery("")
    setSelectedLocation("all")
    setSelectedCategory("all")
    setSortBy("rating")
    setFilteredVendors(vendors)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-green-600">Nigerian Vendors</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover talented artisans and creators from across Nigeria. Support local businesses and find authentic
              handcrafted products.
            </p>
          </div>

          {/* Search and Filters */}
          <Card className="mb-8 border-green-100">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="lg:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search vendors, products, or specialties..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    {nigerianStates.map((state) => (
                      <SelectItem key={state} value={state.toLowerCase().replace(/\s+/g, "-")}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="reviews">Most Reviews</SelectItem>
                    <SelectItem value="products">Most Products</SelectItem>
                    <SelectItem value="name">Name A-Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex space-x-4 mt-4">
                <Button onClick={handleSearch} className="bg-green-600 hover:bg-green-700">
                  <Filter className="h-4 w-4 mr-2" />
                  Apply Filters
                </Button>
                <Button
                  variant="outline"
                  onClick={handleClear}
                  className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
                >
                  Clear All
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="mb-6">
            <p className="text-muted-foreground">
              Showing {filteredVendors.length} of {vendors.length} vendors
            </p>
          </div>

          {filteredVendors.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🏪</div>
              <h3 className="text-xl font-semibold mb-2">No vendors found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your search criteria or browse all vendors</p>
              <Button onClick={handleClear} className="bg-green-600 hover:bg-green-700">
                Show All Vendors
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVendors.map((vendor) => (
                <Card
                  key={vendor.id}
                  className="group hover:shadow-lg transition-all duration-300 border-green-100 hover:border-green-200"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="relative">
                        <img
                          src={vendor.image || "/placeholder.svg"}
                          alt={vendor.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <Badge className="absolute -top-2 -right-2 text-xs px-2 py-1 bg-green-600">
                          {vendor.badge}
                        </Badge>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-1">{vendor.name}</h3>
                        <div className="flex items-center space-x-1 mb-2">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{vendor.location}, Nigeria</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < Math.floor(vendor.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {vendor.rating} ({vendor.reviews} reviews)
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{vendor.description}</p>

                    <div className="flex items-center space-x-4 mb-4 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Package className="h-3 w-3" />
                        <span>{vendor.products} products</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {vendor.specialties.slice(0, 3).map((specialty) => (
                        <Badge key={specialty} variant="secondary" className="text-xs bg-green-50 text-green-700">
                          {specialty}
                        </Badge>
                      ))}
                      {vendor.specialties.length > 3 && (
                        <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                          +{vendor.specialties.length - 3} more
                        </Badge>
                      )}
                    </div>

                    <Button
                      variant="outline"
                      className="w-full bg-transparent border-green-600 text-green-600 hover:bg-green-50"
                      asChild
                    >
                      <Link href={`/vendors/${vendor.id}`}>View Store</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
