import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, ShoppingCart, X } from "lucide-react"

export default function WishlistPage() {
  const wishlistItems = [
    {
      id: 1,
      name: "Handwoven Ankara Bag",
      price: "₦8,500",
      originalPrice: "₦10,000",
      rating: 4.9,
      reviews: 87,
      vendor: "Kemi's Crochet Corner",
      image: "/placeholder.svg?height=200&width=200&text=Ankara+Bag",
      inStock: true,
    },
    {
      id: 2,
      name: "Traditional Chin Chin",
      price: "₦2,500",
      rating: 4.8,
      reviews: 124,
      vendor: "Lagos Sweet Treats",
      image: "/placeholder.svg?height=200&width=200&text=Chin+Chin",
      inStock: true,
    },
    {
      id: 3,
      name: "Coral Bead Necklace",
      price: "₦35,000",
      rating: 4.9,
      reviews: 23,
      vendor: "Benin Royal Beads",
      image: "/placeholder.svg?height=200&width=200&text=Coral+Beads",
      inStock: false,
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-green-600 mb-2">My Wishlist</h1>
            <p className="text-muted-foreground">Items you've saved for later ({wishlistItems.length} items)</p>
          </div>

          {wishlistItems.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">Your wishlist is empty</h3>
                <p className="text-muted-foreground mb-4">Start adding items you love to your wishlist</p>
                <Button asChild className="bg-green-600 hover:bg-green-700">
                  <a href="/">Continue Shopping</a>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistItems.map((item) => (
                <Card key={item.id} className="group hover:shadow-lg transition-shadow">
                  <CardHeader className="p-0">
                    <div className="relative">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <Button size="icon" variant="ghost" className="absolute top-2 right-2 bg-white/80 hover:bg-white">
                        <X className="h-4 w-4" />
                      </Button>
                      {!item.inStock && <Badge className="absolute top-2 left-2 bg-red-600">Out of Stock</Badge>}
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">by {item.vendor}</p>

                      <div className="flex items-center space-x-1">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(item.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {item.rating} ({item.reviews})
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-green-600">{item.price}</span>
                        {item.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">{item.originalPrice}</span>
                        )}
                      </div>

                      <Button className="w-full bg-green-600 hover:bg-green-700" disabled={!item.inStock}>
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        {item.inStock ? "Add to Cart" : "Out of Stock"}
                      </Button>
                    </div>
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
