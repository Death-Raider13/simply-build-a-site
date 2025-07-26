
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, Users } from "lucide-react"

export function VendorSpotlight() {
  const vendors = [
    {
      id: 1,
      name: "Mama Kemi's Kitchen",
      specialty: "Traditional Nigerian Confectioneries",
      location: "Lagos, Nigeria",
      rating: 4.9,
      products: 45,
      customers: 1200,
      image: "/placeholder-user.jpg",
      verified: true
    },
    {
      id: 2,
      name: "Adunni Crafts",
      specialty: "Handcrafted Bags & Accessories",
      location: "Ibadan, Nigeria",
      rating: 4.8,
      products: 32,
      customers: 850,
      image: "/placeholder-user.jpg",
      verified: true
    },
    {
      id: 3,
      name: "Royal Nigerian Wear",
      specialty: "Traditional & Modern Clothing",
      location: "Abuja, Nigeria",
      rating: 4.7,
      products: 67,
      customers: 2100,
      image: "/placeholder-user.jpg",
      verified: true
    }
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Vendors</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Meet our talented Nigerian artisans and entrepreneurs creating authentic products with passion
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {vendors.map((vendor) => (
            <Card key={vendor.id} className="text-center hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="relative inline-block mb-4">
                  <img
                    src={vendor.image}
                    alt={vendor.name}
                    className="w-20 h-20 rounded-full mx-auto object-cover"
                  />
                  {vendor.verified && (
                    <Badge className="absolute -bottom-1 -right-1 bg-green-600 text-xs px-2 py-1">
                      ✓
                    </Badge>
                  )}
                </div>
                <h3 className="font-bold text-xl mb-2">{vendor.name}</h3>
                <p className="text-muted-foreground mb-4">{vendor.specialty}</p>
                
                <div className="flex items-center justify-center gap-2 mb-4 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {vendor.location}
                </div>

                <div className="flex items-center justify-center gap-4 mb-6 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>{vendor.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>{vendor.products} Products</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{vendor.customers.toLocaleString()}</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  Visit Store
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button size="lg" className="bg-green-600 hover:bg-green-700">
            <Users className="h-4 w-4 mr-2" />
            Become a Vendor
          </Button>
        </div>
      </div>
    </section>
  )
}
