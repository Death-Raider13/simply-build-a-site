"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Truck, CheckCircle, MapPin, Clock } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function OrderTrackingPage() {
  const [trackingNumber, setTrackingNumber] = useState("")
  const [trackingData, setTrackingData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock tracking data with Nigerian locations
    setTrackingData({
      orderNumber: "ORD-NG-2024-001",
      trackingNumber: trackingNumber,
      status: "in_transit",
      estimatedDelivery: "January 20, 2024",
      carrier: "GIG Logistics",
      currentLocation: "Ibadan, Oyo State",
      events: [
        {
          status: "Order Placed",
          description: "Your order has been placed and is being prepared",
          location: "Sweet Lagos Confectionery - Lagos State",
          timestamp: "January 17, 2024 at 10:30 AM",
          completed: true,
        },
        {
          status: "Order Confirmed",
          description: "Your order has been confirmed by the vendor",
          location: "Sweet Lagos Confectionery - Lagos State",
          timestamp: "January 17, 2024 at 11:15 AM",
          completed: true,
        },
        {
          status: "Shipped",
          description: "Your package has been shipped via GIG Logistics",
          location: "Lagos State",
          timestamp: "January 18, 2024 at 2:45 PM",
          completed: true,
        },
        {
          status: "In Transit",
          description: "Your package is on its way to your location",
          location: "Ibadan, Oyo State",
          timestamp: "January 19, 2024 at 8:20 AM",
          completed: true,
        },
        {
          status: "Out for Delivery",
          description: "Your package is out for delivery in your area",
          location: "Your City",
          timestamp: "Estimated: January 20, 2024",
          completed: false,
        },
        {
          status: "Delivered",
          description: "Your package has been delivered",
          location: "Your Address",
          timestamp: "Estimated: January 20, 2024",
          completed: false,
        },
      ],
      items: [
        {
          name: "Premium Chin Chin (500g)",
          quantity: 2,
          price: 2500,
          vendor: "Sweet Lagos Confectionery",
        },
        {
          name: "Nigerian Meat Pie (6 pieces)",
          quantity: 1,
          price: 3000,
          vendor: "Sweet Lagos Confectionery",
        },
      ],
    })

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Track Your Order</h1>
            <p className="text-lg text-muted-foreground">
              Enter your tracking number to get real-time updates on your Nigerian shipment
            </p>
          </div>

          <Card className="mb-8 border-green-100">
            <CardHeader>
              <CardTitle className="text-green-600">Enter Tracking Information</CardTitle>
              <CardDescription>You can find your tracking number in your order confirmation email</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleTrack} className="flex space-x-4">
                <div className="flex-1">
                  <Label htmlFor="tracking" className="sr-only">
                    Tracking Number
                  </Label>
                  <Input
                    id="tracking"
                    placeholder="Enter tracking number (e.g., GIG123456789)"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" disabled={isLoading} className="bg-green-600 hover:bg-green-700">
                  <Search className="h-4 w-4 mr-2" />
                  {isLoading ? "Tracking..." : "Track Package"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {trackingData && (
            <div className="space-y-6">
              {/* Order Summary */}
              <Card className="border-green-100">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-green-600">Order #{trackingData.orderNumber}</CardTitle>
                      <CardDescription>Tracking: {trackingData.trackingNumber}</CardDescription>
                    </div>
                    <Badge
                      variant={
                        trackingData.status === "delivered"
                          ? "default"
                          : trackingData.status === "in_transit"
                            ? "secondary"
                            : "outline"
                      }
                      className={
                        trackingData.status === "delivered"
                          ? "bg-green-600"
                          : trackingData.status === "in_transit"
                            ? "bg-blue-100 text-blue-800"
                            : ""
                      }
                    >
                      {trackingData.status.replace("_", " ").toUpperCase()}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2">
                      <Truck className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="text-sm font-medium">Carrier</p>
                        <p className="text-sm text-muted-foreground">{trackingData.carrier}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="text-sm font-medium">Current Location</p>
                        <p className="text-sm text-muted-foreground">{trackingData.currentLocation}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="text-sm font-medium">Estimated Delivery</p>
                        <p className="text-sm text-muted-foreground">{trackingData.estimatedDelivery}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tracking Timeline */}
              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle className="text-green-600">Tracking History</CardTitle>
                  <CardDescription>Follow your package's journey across Nigeria</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {trackingData.events.map((event: any, index: number) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div
                          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                            event.completed ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                          }`}
                        >
                          {event.completed ? <CheckCircle className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{event.status}</p>
                          <p className="text-sm text-muted-foreground">{event.description}</p>
                          <p className="text-sm text-muted-foreground">Location: {event.location}</p>
                          <p className="text-sm text-muted-foreground">Timestamp: {event.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
