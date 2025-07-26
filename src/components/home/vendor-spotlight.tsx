
import { Link } from "react-router-dom"
import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Star, MapPin, Package } from "lucide-react"

const spotlightVendors = [
  {
    id: 1,
    name: "Sweet Lagos Confectionery",
    description:
      "Premium Nigerian confectioneries and traditional sweets made with local ingredients and authentic recipes.",
    location: "Lagos, Nigeria",
    rating: 4.9,
    reviews: 342,
    products: 45,
    image: "/placeholder.svg?height=200&width=200&text=Sweet+Lagos",
    badge: "Top Rated",
    specialties: ["Chin Chin", "Puff Puff", "Meat Pie"],
  },
  {
    id: 2,
    name: "Ankara Crafts Nigeria",
    description:
      "Beautiful handwoven bags and accessories made with authentic Nigerian Ankara fabrics and traditional techniques.",
    location: "Abuja, Nigeria",
    rating: 4.8,
    reviews: 198,
    products: 67,
    image: "/placeholder.svg?height=200&width=200&text=Ankara+Crafts",
    badge: "Eco-Friendly",
    specialties: ["Ankara Bags", "Traditional Bags", "Accessories"],
  },
  {
    id: 3,
    name: "Nigerian Beads & Jewelry",
    description:
      "Unique handcrafted jewelry pieces featuring traditional Nigerian beads and ethically sourced materials.",
    location: "Kano, Nigeria",
    rating: 5.0,
    reviews: 156,
    products: 89,
    image: "/placeholder.svg?height=200&width=200&text=Nigerian+Beads",
    badge: "Premium",
    specialties: ["Beads", "Necklaces", "Bracelets"],
  },
]

export function VendorSpotlight() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Vendor Spotlight</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Meet the talented Nigerian artisans and creators behind our exceptional products
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {spotlightVendors.map((vendor) => (
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
                    <Badge className="absolute -top-2 -right-2 text-xs px-2 py-1 bg-green-600">{vendor.badge}</Badge>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">{vendor.name}</h3>
                    <div className="flex items-center space-x-1 mb-2">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{vendor.location}</span>
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

                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{vendor.description}</p>

                <div className="flex items-center space-x-4 mb-4 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Package className="h-3 w-3" />
                    <span>{vendor.products} products</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {vendor.specialties.map((specialty) => (
                    <Badge key={specialty} variant="secondary" className="text-xs bg-green-50 text-green-700">
                      {specialty}
                    </Badge>
                  ))}
                </div>

                <Button
                  variant="outline"
                  className="w-full bg-transparent border-green-600 text-green-600 hover:bg-green-50"
                  asChild
                >
                  <Link to={`/vendors/${vendor.id}`}>View Store</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
            asChild
          >
            <Link to="/vendors">Explore All Vendors</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
