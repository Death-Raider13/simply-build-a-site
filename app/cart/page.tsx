"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Heart } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

interface CartItem {
  id: number
  name: string
  price: number
  originalPrice?: number
  quantity: number
  image: string
  vendor: string
  inStock: boolean
  maxQuantity: number
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Premium Chin Chin (500g)",
      price: 2500,
      originalPrice: 3000,
      quantity: 2,
      image: "/placeholder.svg?height=150&width=150&text=Chin+Chin",
      vendor: "Sweet Lagos Confectionery",
      inStock: true,
      maxQuantity: 10,
    },
    {
      id: 2,
      name: "Ankara Handbag - Floral Design",
      price: 8500,
      quantity: 1,
      image: "/placeholder.svg?height=150&width=150&text=Ankara+Bag",
      vendor: "Ankara Crafts Nigeria",
      inStock: true,
      maxQuantity: 5,
    },
  ])

  const [promoCode, setPromoCode] = useState("")
  const [isPromoApplied, setIsPromoApplied] = useState(false)

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems((items) =>
      items.map((item) => (item.id === id ? { ...item, quantity: Math.min(newQuantity, item.maxQuantity) } : item)),
    )
  }

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const moveToWishlist = (id: number) => {
    // Handle move to wishlist
    removeItem(id)
  }

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "nigeria10") {
      setIsPromoApplied(true)
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discount = isPromoApplied ? subtotal * 0.1 : 0
  const shipping = subtotal > 10000 ? 0 : 1500 // Free shipping over ₦10,000
  const total = subtotal - discount + shipping

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-12 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center py-16">
              <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
              <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Looks like you haven't added any Nigerian treasures to your cart yet.
              </p>
              <Button size="lg" className="bg-green-600 hover:bg-green-700" asChild>
                <Link href="/">
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Continue Shopping
                </Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
            <p className="text-muted-foreground">
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-24 h-24 rounded-lg object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
                            <p className="text-sm text-muted-foreground mb-2">Sold by {item.vendor}</p>
                            <div className="flex items-center space-x-2 mb-3">
                              <span className="text-lg font-bold text-green-600">₦{item.price.toLocaleString()}</span>
                              {item.originalPrice && (
                                <span className="text-sm text-muted-foreground line-through">
                                  ₦{item.originalPrice.toLocaleString()}
                                </span>
                              )}
                              {item.inStock ? (
                                <Badge variant="secondary" className="bg-green-50 text-green-700">
                                  In Stock
                                </Badge>
                              ) : (
                                <Badge variant="destructive">Out of Stock</Badge>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-col items-end space-y-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeItem(item.id)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => moveToWishlist(item.id)}
                              className="text-muted-foreground hover:text-green-600"
                            >
                              <Heart className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="h-8 w-8"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                              className="w-16 h-8 text-center"
                              min="1"
                              max={item.maxQuantity}
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              disabled={item.quantity >= item.maxQuantity}
                              className="h-8 w-8"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>

                          <div className="text-right">
                            <p className="text-lg font-bold">₦{(item.price * item.quantity).toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">₦{item.price.toLocaleString()} each</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <div className="flex justify-between items-center pt-4">
                <Button
                  variant="outline"
                  className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
                  asChild
                >
                  <Link href="/">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Continue Shopping
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  onClick={() => setCartItems([])}
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  Clear Cart
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal ({cartItems.length} items)</span>
                      <span>₦{subtotal.toLocaleString()}</span>
                    </div>

                    {isPromoApplied && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount (NIGERIA10)</span>
                        <span>-₦{discount.toLocaleString()}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>
                        {shipping === 0 ? (
                          <span className="text-green-600">Free</span>
                        ) : (
                          `₦${shipping.toLocaleString()}`
                        )}
                      </span>
                    </div>

                    {shipping > 0 && (
                      <p className="text-xs text-muted-foreground">Free shipping on orders over ₦10,000</p>
                    )}
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-green-600">₦{total.toLocaleString()}</span>
                  </div>

                  {!isPromoApplied && (
                    <div className="space-y-2">
                      <div className="flex space-x-2">
                        <Input
                          placeholder="Promo code"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          className="flex-1"
                        />
                        <Button
                          variant="outline"
                          onClick={applyPromoCode}
                          className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
                        >
                          Apply
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">Try "NIGERIA10" for 10% off</p>
                    </div>
                  )}

                  <Button className="w-full bg-green-600 hover:bg-green-700 text-lg py-6" asChild>
                    <Link href="/checkout">Proceed to Checkout</Link>
                  </Button>

                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Secure checkout powered by Nigerian payment systems</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
