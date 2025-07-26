import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, ShoppingCart } from "lucide-react"

export default function NigerianAccessoriesPage() {
  const products = [
    {
      id: 1,
      name: "Coral Bead Necklace",
      price: "₦35,000",
      originalPrice: "₦40,000",
      rating: 4.9,
      reviews: 23,
      vendor: "Benin Royal Beads",
      image: "/placeholder.svg?height=200&width=200&text=Coral+Beads",
      badge: "Authentic",
    },
    {
      id: 2,
      name: "Brass Bangles Set",
      price: "₦8,500",
      rating: 4.6,
      reviews: 67,
      vendor: "Hausa Metalworks",
      image: "/placeholder.svg?height=200&width=200&text=Brass+Bangles",
    },
    {
      id: 3,
      name: "Wooden Carved Earrings",
      price: "₦4,200",
      rating: 4.7,
      reviews: 89,
      vendor: "Yoruba Wood Crafts",
      image: "/placeholder.svg?height=200&width=200&text=Wood+Earrings",
      badge: "Eco-Friendly",
    },
    {
      id: 4,
      name: "Leather Wristband",
      price: "₦3,500",
      rating: 4.5,
      reviews: 45,
      vendor: "Kano Leather Works",
      image: "/placeholder.svg?height=200&width=200&text=Leather+Band",
    },
    {
      id: 5,
      name: "Beaded Hair Accessories",
      price: "₦6,800",
      rating: 4.8,
      reviews: 34,
      vendor: "Igbo Bead Makers",
      image: "/placeholder.svg?height=200&width=200&text=Hair+Beads",
      badge: "Trending",
    },
    {
      id: 6,
      name: "Traditional Anklets",
      price: "₦5,200",
      rating: 4.4,
      reviews: 56,
      vendor: "Delta Crafts",
      image: "/placeholder.svg?height=200&width=200&text=Anklets",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-green-600 mb-2">Nigerian Accessories</h1>
            <p className="text-muted-foreground">
              Unique traditional and contemporary accessories crafted by Nigerian artisans
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                <CardHeader className="p-0">
                  <div className="relative">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    {product.badge && <Badge className="absolute top-2 left-2 bg-green-600">{product.badge}</Badge>}
                    <Button size="icon" variant="ghost" className="absolute top-2 right-2 bg-white/80 hover:bg-white">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">by {product.vendor}</p>

                    <div className="flex items-center space-x-1">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-green-600">{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">{product.originalPrice}</span>
                      )}
                    </div>

                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
