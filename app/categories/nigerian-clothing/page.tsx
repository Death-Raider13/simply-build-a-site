import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, ShoppingCart } from "lucide-react"

export default function NigerianClothingPage() {
  const products = [
    {
      id: 1,
      name: "Traditional Agbada",
      price: "₦25,000",
      originalPrice: "₦30,000",
      rating: 4.9,
      reviews: 45,
      vendor: "Royal Nigerian Attire",
      image: "/placeholder.svg?height=200&width=200&text=Agbada",
      badge: "Premium",
    },
    {
      id: 2,
      name: "Ankara Dress",
      price: "₦12,500",
      rating: 4.7,
      reviews: 89,
      vendor: "Lagos Fashion House",
      image: "/placeholder.svg?height=200&width=200&text=Ankara+Dress",
      badge: "Best Seller",
    },
    {
      id: 3,
      name: "Dashiki Shirt",
      price: "₦8,000",
      rating: 4.6,
      reviews: 67,
      vendor: "Kano Traditional Wear",
      image: "/placeholder.svg?height=200&width=200&text=Dashiki",
    },
    {
      id: 4,
      name: "Gele Head Wrap",
      price: "₦15,000",
      rating: 4.8,
      reviews: 34,
      vendor: "Yoruba Heritage",
      image: "/placeholder.svg?height=200&width=200&text=Gele",
      badge: "Handmade",
    },
    {
      id: 5,
      name: "Kaftan Robe",
      price: "₦18,500",
      rating: 4.5,
      reviews: 52,
      vendor: "Northern Elegance",
      image: "/placeholder.svg?height=200&width=200&text=Kaftan",
    },
    {
      id: 6,
      name: "Iro and Buba Set",
      price: "₦22,000",
      rating: 4.9,
      reviews: 28,
      vendor: "Igbo Traditional Wear",
      image: "/placeholder.svg?height=200&width=200&text=Iro+Buba",
      badge: "New",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-green-600 mb-2">Nigerian Clothing</h1>
            <p className="text-muted-foreground">
              Authentic traditional and modern Nigerian clothing from talented designers
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
