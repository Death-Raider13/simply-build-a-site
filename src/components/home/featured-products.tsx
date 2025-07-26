
import { Link } from "react-router-dom"
import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Star, Heart, ShoppingCart } from "lucide-react"

const featuredProducts = [
  {
    id: 1,
    name: "Premium Chin Chin (500g)",
    price: 2500,
    originalPrice: 3000,
    rating: 4.8,
    reviews: 124,
    image: "/placeholder.svg?height=300&width=300&text=Premium+Chin+Chin",
    vendor: "Sweet Lagos Confectionery",
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Ankara Handbag - Floral Design",
    price: 8500,
    rating: 4.9,
    reviews: 89,
    image: "/placeholder.svg?height=300&width=300&text=Ankara+Handbag",
    vendor: "Ankara Crafts Nigeria",
    badge: "New",
  },
  {
    id: 3,
    name: "Traditional Woven Bag",
    price: 6500,
    originalPrice: 7500,
    rating: 4.7,
    reviews: 156,
    image: "/placeholder.svg?height=300&width=300&text=Traditional+Bag",
    vendor: "Craft Corner Lagos",
  },
  {
    id: 4,
    name: "Nigerian Meat Pie (6 pieces)",
    price: 3000,
    rating: 5.0,
    reviews: 43,
    image: "/placeholder.svg?height=300&width=300&text=Meat+Pie",
    vendor: "Sweet Lagos Confectionery",
    badge: "Featured",
  },
]

export function FeaturedProducts() {
  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Featured Products</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of exceptional Nigerian items from our most talented vendors
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="relative aspect-square overflow-hidden">
                {product.badge && <Badge className="absolute top-3 left-3 z-10 bg-green-600">{product.badge}</Badge>}
                <Button variant="ghost" size="icon" className="absolute top-3 right-3 z-10 bg-white/80 hover:bg-white">
                  <Heart className="h-4 w-4" />
                </Button>
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                <Button
                  size="sm"
                  className="absolute bottom-3 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-green-600 hover:bg-green-700"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>

              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="text-xs text-muted-foreground">{product.vendor}</div>
                  <h3 className="font-semibold text-sm leading-tight hover:text-green-600 transition-colors">
                    <Link to={`/search?product=${product.id}`}>{product.name}</Link>
                  </h3>

                  <div className="flex items-center space-x-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-lg text-green-600">₦{product.price.toLocaleString()}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ₦{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
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
            <Link to="/search">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
