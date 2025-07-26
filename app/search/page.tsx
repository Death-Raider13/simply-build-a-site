"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { AdvancedSearch } from "@/components/search/advanced-search"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, ShoppingCart } from "lucide-react"
import Link from "next/link"

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  image: string
  vendor: string
  location: string
  category: string
  inStock: boolean
  featured: boolean
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Premium Chin Chin (500g)",
    price: 2500,
    originalPrice: 3000,
    rating: 4.8,
    reviews: 124,
    image: "/placeholder.svg?height=300&width=300&text=Premium+Chin+Chin",
    vendor: "Sweet Lagos Confectionery",
    location: "Lagos",
    category: "nigerian-confectioneries",
    inStock: true,
    featured: true,
  },
  {
    id: 2,
    name: "Ankara Handbag - Floral Design",
    price: 8500,
    rating: 4.9,
    reviews: 89,
    image: "/placeholder.svg?height=300&width=300&text=Ankara+Handbag",
    vendor: "Ankara Crafts Nigeria",
    location: "Abuja",
    category: "crocheted-bags-purses",
    inStock: true,
    featured: false,
  },
  {
    id: 3,
    name: "Traditional Agbada - White",
    price: 15000,
    originalPrice: 18000,
    rating: 4.7,
    reviews: 67,
    image: "/placeholder.svg?height=300&width=300&text=Traditional+Agbada",
    vendor: "Nigerian Fashion House",
    location: "Kano",
    category: "nigerian-clothing",
    inStock: true,
    featured: true,
  },
  {
    id: 4,
    name: "Handmade Beaded Necklace",
    price: 4500,
    rating: 5.0,
    reviews: 43,
    image: "/placeholder.svg?height=300&width=300&text=Beaded+Necklace",
    vendor: "Kano Traditional Crafts",
    location: "Kano",
    category: "nigerian-accessories",
    inStock: false,
    featured: false,
  },
  {
    id: 5,
    name: "Puff Puff Mix (1kg)",
    price: 1800,
    rating: 4.6,
    reviews: 156,
    image: "/placeholder.svg?height=300&width=300&text=Puff+Puff+Mix",
    vendor: "Sweet Lagos Confectionery",
    location: "Lagos",
    category: "nigerian-confectioneries",
    inStock: true,
    featured: false,
  },
  {
    id: 6,
    name: "Crocheted Tote Bag",
    price: 6500,
    originalPrice: 7500,
    rating: 4.8,
    reviews: 92,
    image: "/placeholder.svg?height=300&width=300&text=Crocheted+Tote",
    vendor: "Craft Corner Lagos",
    location: "Lagos",
    category: "crocheted-bags-purses",
    inStock: true,
    featured: true,
  },
]

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const query = searchParams.get("q")
    if (query) {
      handleSearch({
        query,
        category: "all",
        priceRange: [0, 50000],
        location: "all",
        vendor: "",
        inStock: false,
        featured: false,
        sortBy: "relevance",
      })
    }
  }, [searchParams])

  const handleSearch = (filters: any) => {
    setIsLoading(true)

    setTimeout(() => {
      let filtered = [...products]

      // Filter by query
      if (filters.query) {
        filtered = filtered.filter(
          (product) =>
            product.name.toLowerCase().includes(filters.query.toLowerCase()) ||
            product.vendor.toLowerCase().includes(filters.query.toLowerCase()) ||
            product.category.toLowerCase().includes(filters.query.toLowerCase()),
        )
      }

      // Filter by category
      if (filters.category && filters.category !== "all") {
        filtered = filtered.filter((product) => product.category === filters.category)
      }

      // Filter by price range
      filtered = filtered.filter(
        (product) => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1],
      )

      // Filter by location
      if (filters.location && filters.location !== "all") {
        filtered = filtered.filter((product) => product.location.toLowerCase() === filters.location.replace("-", " "))
      }

      // Filter by vendor
      if (filters.vendor) {
        filtered = filtered.filter((product) => product.vendor.toLowerCase().includes(filters.vendor.toLowerCase()))
      }

      // Filter by stock
      if (filters.inStock) {
        filtered = filtered.filter((product) => product.inStock)
      }

      // Filter by featured
      if (filters.featured) {
        filtered = filtered.filter((product) => product.featured)
      }

      // Sort results
      switch (filters.sortBy) {
        case "price-low":
          filtered.sort((a, b) => a.price - b.price)
          break
        case "price-high":
          filtered.sort((a, b) => b.price - a.price)
          break
        case "rating":
          filtered.sort((a, b) => b.rating - a.rating)
          break
        case "popular":
          filtered.sort((a, b) => b.reviews - a.reviews)
          break
        default:
          // Keep original order for relevance
          break
      }

      setFilteredProducts(filtered)
      setIsLoading(false)
    }, 500)
  }

  const handleClearSearch = () => {
    setFilteredProducts(products)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Search Nigerian Products</h1>
            <p className="text-muted-foreground">
              Discover authentic Nigerian products from local artisans and vendors
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Search Filters */}
            <div className="lg:col-span-1">
              <AdvancedSearch onSearch={handleSearch} onClear={handleClearSearch} />
            </div>

            {/* Search Results */}
            <div className="lg:col-span-3">
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">
                    {isLoading ? "Searching..." : `${filteredProducts.length} Products Found`}
                  </h2>
                </div>
              </div>

              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <Card key={i} className="animate-pulse">
                      <div className="aspect-square bg-gray-200 rounded-t-lg"></div>
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <div className="h-4 bg-gray-200 rounded"></div>
                          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold mb-2">No products found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search criteria or browse our categories
                  </p>
                  <Button className="bg-green-600 hover:bg-green-700" asChild>
                    <Link href="/">Browse All Products</Link>
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <Card
                      key={product.id}
                      className="group hover:shadow-lg transition-all duration-300 overflow-hidden"
                    >
                      <div className="relative aspect-square overflow-hidden">
                        {product.featured && (
                          <Badge className="absolute top-3 left-3 z-10 bg-green-600">Featured</Badge>
                        )}
                        {!product.inStock && (
                          <Badge className="absolute top-3 right-3 z-10" variant="destructive">
                            Out of Stock
                          </Badge>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-3 right-3 z-10 bg-white/80 hover:bg-white"
                        >
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
                          disabled={!product.inStock}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          {product.inStock ? "Add to Cart" : "Out of Stock"}
                        </Button>
                      </div>

                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <div className="text-xs text-muted-foreground flex items-center justify-between">
                            <span>{product.vendor}</span>
                            <span>{product.location}</span>
                          </div>
                          <h3 className="font-semibold text-sm leading-tight hover:text-green-600 transition-colors">
                            <Link href={`/products/${product.id}`}>{product.name}</Link>
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
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
