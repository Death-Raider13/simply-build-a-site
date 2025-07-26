"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, MapPin, Package, Heart, ShoppingCart, Phone, Mail, MessageCircle } from "lucide-react"
import Link from "next/link"

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  image: string
  inStock: boolean
  featured: boolean
}

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
  phone: string
  email: string
  established: string
  responseTime: string
}

const mockVendor: Vendor = {
  id: 1,
  name: "Sweet Lagos Confectionery",
  description:
    "Premium Nigerian confectioneries and traditional sweets made with local ingredients and authentic recipes passed down through generations. We specialize in chin chin, puff puff, meat pie, and other beloved Nigerian treats.",
  location: "Lagos, Nigeria",
  rating: 4.9,
  reviews: 342,
  products: 45,
  image: "/placeholder.svg?height=200&width=200&text=Sweet+Lagos",
  badge: "Top Rated",
  specialties: ["Chin Chin", "Puff Puff", "Meat Pie", "Nigerian Cookies"],
  phone: "+234 803 123 4567",
  email: "info@sweetlagos.ng",
  established: "2020",
  responseTime: "Within 2 hours",
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
    inStock: true,
    featured: true,
  },
  {
    id: 2,
    name: "Sweet Puff Puff (12 pieces)",
    price: 1500,
    originalPrice: 1800,
    rating: 4.7,
    reviews: 89,
    image: "/placeholder.svg?height=300&width=300&text=Sweet+Puff+Puff",
    inStock: true,
    featured: false,
  },
  {
    id: 3,
    name: "Nigerian Meat Pie (6 pieces)",
    price: 3000,
    rating: 4.9,
    reviews: 156,
    image: "/placeholder.svg?height=300&width=300&text=Meat+Pie",
    inStock: true,
    featured: true,
  },
  {
    id: 4,
    name: "Traditional Biscuits (1kg)",
    price: 2200,
    rating: 4.6,
    reviews: 67,
    image: "/placeholder.svg?height=300&width=300&text=Traditional+Biscuits",
    inStock: false,
    featured: false,
  },
]

export default function VendorStorePage() {
  const params = useParams()
  const [activeTab, setActiveTab] = useState("products")

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Vendor Header */}
        <section className="bg-gradient-to-r from-green-50 to-red-50 py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-8">
              <div className="relative">
                <img
                  src={mockVendor.image || "/placeholder.svg"}
                  alt={mockVendor.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <Badge className="absolute -top-2 -right-2 bg-green-600">{mockVendor.badge}</Badge>
              </div>

              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2 text-green-600">{mockVendor.name}</h1>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{mockVendor.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(mockVendor.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {mockVendor.rating} ({mockVendor.reviews} reviews)
                    </span>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4 max-w-2xl">{mockVendor.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {mockVendor.specialties.map((specialty) => (
                    <Badge key={specialty} variant="secondary" className="bg-green-50 text-green-700">
                      {specialty}
                    </Badge>
                  ))}
                </div>

                <div className="flex space-x-4">
                  <Button className="bg-green-600 hover:bg-green-700">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contact Vendor
                  </Button>
                  <Button
                    variant="outline"
                    className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Follow Store
                  </Button>
                </div>
              </div>

              <div className="text-center md:text-right">
                <div className="space-y-2">
                  <div>
                    <div className="text-2xl font-bold text-green-600">{mockVendor.products}</div>
                    <div className="text-sm text-muted-foreground">Products</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold">Est. {mockVendor.established}</div>
                    <div className="text-sm text-muted-foreground">Established</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Store Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-green-50">
                <TabsTrigger
                  value="products"
                  className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
                >
                  Products ({mockProducts.length})
                </TabsTrigger>
                <TabsTrigger value="about" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                  About Store
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
                >
                  Reviews ({mockVendor.reviews})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="products" className="mt-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {mockProducts.map((product) => (
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
              </TabsContent>

              <TabsContent value="about" className="mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card className="border-green-100">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4 text-green-600">Store Information</h3>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <Phone className="h-5 w-5 text-green-600" />
                          <div>
                            <p className="font-medium">Phone</p>
                            <p className="text-sm text-muted-foreground">{mockVendor.phone}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Mail className="h-5 w-5 text-green-600" />
                          <div>
                            <p className="font-medium">Email</p>
                            <p className="text-sm text-muted-foreground">{mockVendor.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Package className="h-5 w-5 text-green-600" />
                          <div>
                            <p className="font-medium">Response Time</p>
                            <p className="text-sm text-muted-foreground">{mockVendor.responseTime}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-green-100">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4 text-green-600">Our Story</h3>
                      <p className="text-muted-foreground mb-4">
                        Sweet Lagos Confectionery was founded with a passion for preserving traditional Nigerian
                        confectionery recipes while meeting modern quality standards. Our journey began in 2020 when we
                        started making chin chin for family and friends.
                      </p>
                      <p className="text-muted-foreground">
                        Today, we're proud to serve customers across Nigeria with authentic, delicious treats made from
                        the finest local ingredients. Every product is crafted with love and attention to detail,
                        ensuring you get the best taste of Nigerian tradition.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-8">
                <div className="space-y-6">
                  {/* Review Summary */}
                  <Card className="border-green-100">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-8">
                        <div className="text-center">
                          <div className="text-4xl font-bold text-green-600">{mockVendor.rating}</div>
                          <div className="flex justify-center mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(mockVendor.rating)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <div className="text-sm text-muted-foreground">{mockVendor.reviews} reviews</div>
                        </div>
                        <div className="flex-1">
                          {[5, 4, 3, 2, 1].map((rating) => (
                            <div key={rating} className="flex items-center space-x-2 mb-1">
                              <span className="text-sm w-2">{rating}</span>
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-green-600 h-2 rounded-full"
                                  style={{
                                    width: `${rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 8 : rating === 2 ? 2 : 0}%`,
                                  }}
                                ></div>
                              </div>
                              <span className="text-sm text-muted-foreground w-8">
                                {rating === 5
                                  ? "70%"
                                  : rating === 4
                                    ? "20%"
                                    : rating === 3
                                      ? "8%"
                                      : rating === 2
                                        ? "2%"
                                        : "0%"}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Individual Reviews */}
                  <div className="space-y-4">
                    {[
                      {
                        name: "Adunni Okafor",
                        rating: 5,
                        date: "2 days ago",
                        comment:
                          "Amazing chin chin! Tastes just like my grandmother used to make. Will definitely order again.",
                        product: "Premium Chin Chin (500g)",
                      },
                      {
                        name: "Kemi Adebayo",
                        rating: 5,
                        date: "1 week ago",
                        comment: "Fast delivery and excellent packaging. The puff puff was fresh and delicious!",
                        product: "Sweet Puff Puff (12 pieces)",
                      },
                      {
                        name: "Emeka Nwankwo",
                        rating: 4,
                        date: "2 weeks ago",
                        comment: "Good quality meat pie. Could use a bit more seasoning but overall satisfied.",
                        product: "Nigerian Meat Pie (6 pieces)",
                      },
                    ].map((review, index) => (
                      <Card key={index} className="border-green-100">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="font-medium">{review.name}</p>
                              <div className="flex items-center space-x-2">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-3 w-3 ${
                                        i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-xs text-muted-foreground">{review.date}</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{review.comment}</p>
                          <p className="text-xs text-green-600">Purchased: {review.product}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
