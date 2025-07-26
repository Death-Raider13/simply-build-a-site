
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart } from "lucide-react"

export function FeaturedProducts() {
  const products = [
    {
      id: 1,
      name: "Traditional Chin Chin Mix",
      price: "₦2,500",
      originalPrice: "₦3,000",
      image: "/placeholder.svg",
      vendor: "Mama Kemi's Kitchen",
      rating: 4.8,
      category: "Confectioneries"
    },
    {
      id: 2,
      name: "Handcrafted Ankara Bag",
      price: "₦8,500",
      image: "/placeholder.svg",
      vendor: "Adunni Crafts",
      rating: 4.9,
      category: "Bags & Purses"
    },
    {
      id: 3,
      name: "Agbada Traditional Wear",
      price: "₦25,000",
      image: "/placeholder.svg",
      vendor: "Royal Nigerian Wear",
      rating: 4.7,
      category: "Clothing"
    },
    {
      id: 4,
      name: "Coral Bead Necklace",
      price: "₦12,000",
      image: "/placeholder.svg",
      vendor: "Heritage Beads",
      rating: 4.6,
      category: "Accessories"
    }
  ]

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Handpicked premium products from our most trusted Nigerian vendors
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Button
                    size="sm"
                    variant="secondary"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                  {product.originalPrice && (
                    <Badge className="absolute top-2 left-2 bg-red-600">Sale</Badge>
                  )}
                </div>
                <div className="p-4">
                  <Badge variant="outline" className="mb-2 text-xs">
                    {product.category}
                  </Badge>
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{product.vendor}</p>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg">{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          {product.originalPrice}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm">{product.rating}</span>
                    </div>
                  </div>
                  <Button className="w-full" size="sm">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  )
}
