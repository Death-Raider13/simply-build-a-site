"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Truck, MapPin, Phone, Mail, Lock, CheckCircle } from "lucide-react"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  vendor: string
  image: string
}

const nigerianStates = [
  "Lagos",
  "Abuja",
  "Kano",
  "Rivers",
  "Oyo",
  "Kaduna",
  "Ogun",
  "Anambra",
  "Imo",
  "Delta",
  "Edo",
  "Plateau",
  "Cross River",
  "Bauchi",
  "Benue",
]

export default function CheckoutPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  const [cartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Premium Chin Chin (500g)",
      price: 2500,
      quantity: 2,
      vendor: "Sweet Lagos Confectionery",
      image: "/placeholder.svg?height=80&width=80&text=Chin+Chin",
    },
    {
      id: 2,
      name: "Ankara Handbag - Floral Design",
      price: 8500,
      quantity: 1,
      vendor: "Ankara Crafts Nigeria",
      image: "/placeholder.svg?height=80&width=80&text=Ankara+Bag",
    },
  ])

  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    landmark: "",
    postalCode: "",
  })

  const [paymentMethod, setPaymentMethod] = useState("card")
  const [cardInfo, setCardInfo] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  })

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 10000 ? 0 : 1500
  const total = subtotal + shipping

  const handleShippingChange = (field: string, value: string) => {
    setShippingInfo((prev) => ({ ...prev, [field]: value }))
  }

  const handleCardChange = (field: string, value: string) => {
    setCardInfo((prev) => ({ ...prev, [field]: value }))
  }

  const handlePlaceOrder = async () => {
    setIsLoading(true)

    try {
      // Simulate order processing
      await new Promise((resolve) => setTimeout(resolve, 3000))

      const orderNumber = `ORD-NG-${Date.now()}`
      const trackingNumber = `GIG${Math.random().toString(36).substr(2, 9).toUpperCase()}`

      // Store order in localStorage (in a real app, this would be sent to your backend)
      const orderData = {
        orderNumber,
        trackingNumber,
        items: cartItems,
        total,
        shippingInfo,
        paymentMethod,
        orderDate: new Date().toISOString(),
        status: "confirmed",
      }

      localStorage.setItem(`order_${orderNumber}`, JSON.stringify(orderData))

      // Redirect to success page
      router.push(`/checkout/success?order=${orderNumber}`)
    } catch (error) {
      console.error("Order failed:", error)
      alert("Order failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const isStepComplete = (step: number) => {
    switch (step) {
      case 1:
        return (
          shippingInfo.firstName &&
          shippingInfo.lastName &&
          shippingInfo.email &&
          shippingInfo.phone &&
          shippingInfo.address &&
          shippingInfo.city &&
          shippingInfo.state
        )
      case 2:
        return paymentMethod === "transfer" || (cardInfo.number && cardInfo.expiry && cardInfo.cvv && cardInfo.name)
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 text-green-600">Checkout</h1>
            <p className="text-muted-foreground">Complete your order for authentic Nigerian products</p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      currentStep >= step
                        ? "bg-green-600 text-white"
                        : isStepComplete(step)
                          ? "bg-green-100 text-green-600"
                          : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {isStepComplete(step) && currentStep > step ? <CheckCircle className="h-4 w-4" /> : step}
                  </div>
                  <span className="ml-2 text-sm font-medium">
                    {step === 1 ? "Shipping" : step === 2 ? "Payment" : "Review"}
                  </span>
                  {step < 3 && <div className="w-16 h-px bg-gray-300 ml-4" />}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Step 1: Shipping Information */}
              {currentStep === 1 && (
                <Card className="border-green-100">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-green-600">
                      <Truck className="h-5 w-5" />
                      <span>Shipping Information</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          value={shippingInfo.firstName}
                          onChange={(e) => handleShippingChange("firstName", e.target.value)}
                          placeholder="Enter first name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={shippingInfo.lastName}
                          onChange={(e) => handleShippingChange("lastName", e.target.value)}
                          placeholder="Enter last name"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            value={shippingInfo.email}
                            onChange={(e) => handleShippingChange("email", e.target.value)}
                            placeholder="Enter email address"
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="phone"
                            type="tel"
                            value={shippingInfo.phone}
                            onChange={(e) => handleShippingChange("phone", e.target.value)}
                            placeholder="+234 803 123 4567"
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Street Address *</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Textarea
                          id="address"
                          value={shippingInfo.address}
                          onChange={(e) => handleShippingChange("address", e.target.value)}
                          placeholder="Enter your complete address"
                          className="pl-10 min-h-[80px]"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City/LGA *</Label>
                        <Input
                          id="city"
                          value={shippingInfo.city}
                          onChange={(e) => handleShippingChange("city", e.target.value)}
                          placeholder="Enter city or LGA"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State *</Label>
                        <Select
                          value={shippingInfo.state}
                          onValueChange={(value) => handleShippingChange("state", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            {nigerianStates.map((state) => (
                              <SelectItem key={state} value={state.toLowerCase()}>
                                {state}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="postalCode">Postal Code</Label>
                        <Input
                          id="postalCode"
                          value={shippingInfo.postalCode}
                          onChange={(e) => handleShippingChange("postalCode", e.target.value)}
                          placeholder="Enter postal code"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="landmark">Landmark (Optional)</Label>
                      <Input
                        id="landmark"
                        value={shippingInfo.landmark}
                        onChange={(e) => handleShippingChange("landmark", e.target.value)}
                        placeholder="Nearest landmark for easy delivery"
                      />
                    </div>

                    <Button
                      onClick={() => setCurrentStep(2)}
                      className="w-full bg-green-600 hover:bg-green-700"
                      disabled={!isStepComplete(1)}
                    >
                      Continue to Payment
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Step 2: Payment Information */}
              {currentStep === 2 && (
                <Card className="border-green-100">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-green-600">
                      <CreditCard className="h-5 w-5" />
                      <span>Payment Information</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="flex items-center space-x-2 p-4 border rounded-lg">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex-1">
                          <div className="flex items-center space-x-2">
                            <CreditCard className="h-4 w-4" />
                            <span>Debit/Credit Card</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Pay securely with your Nigerian bank card
                          </p>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2 p-4 border rounded-lg">
                        <RadioGroupItem value="transfer" id="transfer" />
                        <Label htmlFor="transfer" className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span>Bank Transfer</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">Transfer to our Nigerian bank account</p>
                        </Label>
                      </div>
                    </RadioGroup>

                    {paymentMethod === "card" && (
                      <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number *</Label>
                          <Input
                            id="cardNumber"
                            value={cardInfo.number}
                            onChange={(e) => handleCardChange("number", e.target.value)}
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiry">Expiry Date *</Label>
                            <Input
                              id="expiry"
                              value={cardInfo.expiry}
                              onChange={(e) => handleCardChange("expiry", e.target.value)}
                              placeholder="MM/YY"
                              maxLength={5}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV *</Label>
                            <Input
                              id="cvv"
                              value={cardInfo.cvv}
                              onChange={(e) => handleCardChange("cvv", e.target.value)}
                              placeholder="123"
                              maxLength={4}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="cardName">Cardholder Name *</Label>
                          <Input
                            id="cardName"
                            value={cardInfo.name}
                            onChange={(e) => handleCardChange("name", e.target.value)}
                            placeholder="Name as it appears on card"
                          />
                        </div>
                      </div>
                    )}

                    {paymentMethod === "transfer" && (
                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <h4 className="font-semibold text-green-800 mb-2">Bank Transfer Details</h4>
                        <div className="space-y-1 text-sm">
                          <p>
                            <strong>Bank:</strong> First Bank of Nigeria
                          </p>
                          <p>
                            <strong>Account Name:</strong> KNITTED_GOURMET Nigeria Ltd
                          </p>
                          <p>
                            <strong>Account Number:</strong> 2034567890
                          </p>
                          <p>
                            <strong>Amount:</strong> ₦{total.toLocaleString()}
                          </p>
                        </div>
                        <p className="text-xs text-green-700 mt-2">
                          Please use your order number as the transfer reference
                        </p>
                      </div>
                    )}

                    <div className="flex space-x-4">
                      <Button
                        variant="outline"
                        onClick={() => setCurrentStep(1)}
                        className="flex-1 border-green-600 text-green-600 hover:bg-green-50"
                      >
                        Back to Shipping
                      </Button>
                      <Button
                        onClick={() => setCurrentStep(3)}
                        className="flex-1 bg-green-600 hover:bg-green-700"
                        disabled={!isStepComplete(2)}
                      >
                        Review Order
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 3: Order Review */}
              {currentStep === 3 && (
                <Card className="border-green-100">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-green-600">
                      <CheckCircle className="h-5 w-5" />
                      <span>Review Your Order</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Shipping Details */}
                    <div>
                      <h4 className="font-semibold mb-2">Shipping Address</h4>
                      <div className="p-3 bg-gray-50 rounded-lg text-sm">
                        <p>
                          {shippingInfo.firstName} {shippingInfo.lastName}
                        </p>
                        <p>{shippingInfo.address}</p>
                        <p>
                          {shippingInfo.city}, {shippingInfo.state}
                        </p>
                        <p>{shippingInfo.phone}</p>
                        <p>{shippingInfo.email}</p>
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div>
                      <h4 className="font-semibold mb-2">Payment Method</h4>
                      <div className="p-3 bg-gray-50 rounded-lg text-sm">
                        {paymentMethod === "card" ? (
                          <p>Card ending in ****{cardInfo.number.slice(-4)}</p>
                        ) : (
                          <p>Bank Transfer</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" required />
                      <Label htmlFor="terms" className="text-sm">
                        I agree to the{" "}
                        <a href="/terms" className="text-green-600 hover:underline">
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="/privacy" className="text-green-600 hover:underline">
                          Privacy Policy
                        </a>
                      </Label>
                    </div>

                    <div className="flex space-x-4">
                      <Button
                        variant="outline"
                        onClick={() => setCurrentStep(2)}
                        className="flex-1 border-green-600 text-green-600 hover:bg-green-50"
                      >
                        Back to Payment
                      </Button>
                      <Button
                        onClick={handlePlaceOrder}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-lg py-6"
                        disabled={isLoading}
                      >
                        <Lock className="h-4 w-4 mr-2" />
                        {isLoading ? "Processing..." : `Place Order - ₦${total.toLocaleString()}`}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4 border-green-100">
                <CardHeader>
                  <CardTitle className="text-green-600">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Items */}
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center space-x-3">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-12 h-12 rounded object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.vendor}</p>
                          <p className="text-xs">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-sm font-medium">₦{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Totals */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>₦{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Shipping</span>
                      <span>
                        {shipping === 0 ? (
                          <span className="text-green-600">Free</span>
                        ) : (
                          `₦${shipping.toLocaleString()}`
                        )}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-green-600">₦{total.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 text-xs text-muted-foreground">
                      <Lock className="h-3 w-3" />
                      <span>Secure checkout</span>
                    </div>
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
