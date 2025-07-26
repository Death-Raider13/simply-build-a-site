
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Package, AlertTriangle, TrendingDown, TrendingUp, Search, Plus, Edit, Eye, RefreshCw } from "lucide-react"
import { inventoryManager, type InventoryItem, type LowStockAlert } from "@/lib/inventory-management"
import { notificationManager } from "@/lib/notification-system"

interface InventoryDashboardProps {
  vendorId?: string
}

export function InventoryDashboard({ vendorId }: InventoryDashboardProps) {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([])
  const [lowStockAlerts, setLowStockAlerts] = useState<LowStockAlert[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalValue: 0,
    lowStockItems: 0,
    outOfStockItems: 0,
    averageStockLevel: 0,
  })

  useEffect(() => {
    loadInventoryData()

    // Subscribe to low stock alerts
    const unsubscribe = inventoryManager.onLowStockAlert((alert: LowStockAlert) => {
      if (!vendorId || alert.vendorId === vendorId) {
        setLowStockAlerts((prev) => [alert, ...prev])

        // Create notification
        notificationManager.sendInventoryAlert(
          alert.vendorId,
          alert.productName,
          alert.currentStock,
          alert.reorderPoint,
        )
      }
    })

    return unsubscribe
  }, [vendorId])

  const loadInventoryData = () => {
    inventoryManager.initialize()

    const items = vendorId ? inventoryManager.getInventoryByVendor(vendorId) : inventoryManager.getAllInventoryItems()

    const alerts = inventoryManager.getLowStockAlerts(vendorId)
    const inventoryStats = inventoryManager.getInventoryStats(vendorId)

    setInventoryItems(items)
    setLowStockAlerts(alerts)
    setStats(inventoryStats)
  }

  const handleStockUpdate = (productId: string, newStock: number) => {
    const success = inventoryManager.updateStock(
      productId,
      newStock,
      "ADJUSTMENT",
      "Manual stock adjustment",
      vendorId || "admin",
      "Manual Update"
    )

    if (success) {
      loadInventoryData()
    }
  }

  const handleAcknowledgeAlert = (alertId: string) => {
    inventoryManager.acknowledgeAlert(alertId, vendorId || "admin")
    setLowStockAlerts((prev) => prev.filter((alert) => alert.id !== alertId))
  }

  const filteredItems = inventoryItems.filter((item) => {
    const matchesSearch =
      item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "low_stock" && item.availableStock <= item.minStockLevel) ||
      (filterStatus === "out_of_stock" && item.availableStock === 0) ||
      (filterStatus === "active" && item.status === "active")

    return matchesSearch && matchesFilter
  })

  const getStockStatus = (item: InventoryItem) => {
    if (item.availableStock === 0) return { status: "Out of Stock", color: "destructive" }
    if (item.availableStock <= item.reorderPoint) return { status: "Critical", color: "destructive" }
    if (item.availableStock <= item.minStockLevel) return { status: "Low Stock", color: "secondary" }
    return { status: "In Stock", color: "default" }
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="border-green-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.totalProducts}</div>
          </CardContent>
        </Card>

        <Card className="border-green-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">₦{stats.totalValue.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card className="border-yellow-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.lowStockItems}</div>
          </CardContent>
        </Card>

        <Card className="border-red-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.outOfStockItems}</div>
          </CardContent>
        </Card>

        <Card className="border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Stock Level</CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.averageStockLevel}</div>
          </CardContent>
        </Card>
      </div>

      {/* Low Stock Alerts */}
      {lowStockAlerts.length > 0 && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="text-yellow-800 flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5" />
              <span>Low Stock Alerts ({lowStockAlerts.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {lowStockAlerts.slice(0, 3).map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                  <div>
                    <p className="font-medium">{alert.productName}</p>
                    <p className="text-sm text-muted-foreground">
                      Current stock: {alert.currentStock} | Min level: {alert.minStockLevel}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={alert.severity === "CRITICAL" ? "destructive" : "secondary"}>
                      {alert.severity.toLowerCase()}
                    </Badge>
                    <Button size="sm" variant="outline" onClick={() => handleAcknowledgeAlert(alert.id)}>
                      Acknowledge
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="inventory" className="space-y-4">
        <TabsList className="bg-green-50">
          <TabsTrigger value="inventory" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
            Inventory Management
          </TabsTrigger>
          <TabsTrigger value="movements" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
            Stock Movements
          </TabsTrigger>
          <TabsTrigger value="reorder" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
            Reorder List
          </TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="space-y-4">
          {/* Search and Filters */}
          <Card className="border-green-100">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search products or SKU..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Products</SelectItem>
                    <SelectItem value="active">Active Only</SelectItem>
                    <SelectItem value="low_stock">Low Stock</SelectItem>
                    <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  onClick={loadInventoryData}
                  variant="outline"
                  className="border-green-600 text-green-600 bg-transparent"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Inventory Table */}
          <Card className="border-green-100">
            <CardHeader>
              <CardTitle className="text-green-600">Inventory Items</CardTitle>
              <CardDescription>Manage your product inventory and stock levels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredItems.map((item) => {
                  const stockStatus = getStockStatus(item)
                  return (
                    <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4">
                          <div className="flex-1">
                            <h3 className="font-semibold">{item.productName}</h3>
                            <p className="text-sm text-muted-foreground">SKU: {item.sku}</p>
                            <p className="text-sm text-muted-foreground">Location: {item.location}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground">Available</p>
                            <p className="text-2xl font-bold text-green-600">{item.availableStock}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground">Reserved</p>
                            <p className="text-lg font-semibold">{item.reservedStock}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground">Total</p>
                            <p className="text-lg font-semibold">{item.currentStock}</p>
                          </div>
                          <div className="text-center">
                            <Badge variant={stockStatus.color as any}>{stockStatus.status}</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Input
                          type="number"
                          placeholder="New stock"
                          className="w-24"
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              const target = e.target as HTMLInputElement
                              handleStockUpdate(item.productId, Number.parseInt(target.value))
                              target.value = ""
                            }
                          }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="movements" className="space-y-4">
          <Card className="border-green-100">
            <CardHeader>
              <CardTitle className="text-green-600">Stock Movements</CardTitle>
              <CardDescription>Track all inventory changes and movements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Package className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <p className="text-muted-foreground">Stock movement history would be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reorder" className="space-y-4">
          <Card className="border-green-100">
            <CardHeader>
              <CardTitle className="text-green-600">Reorder List</CardTitle>
              <CardDescription>Products that need to be restocked</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {inventoryManager.getReorderList(vendorId).map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 border rounded-lg border-yellow-200 bg-yellow-50"
                  >
                    <div>
                      <h3 className="font-semibold">{item.productName}</h3>
                      <p className="text-sm text-muted-foreground">
                        Current: {item.availableStock} | Reorder Point: {item.reorderPoint} | Suggested Quantity:{" "}
                        {item.reorderQuantity}
                      </p>
                    </div>
                    <Button className="bg-green-600 hover:bg-green-700">Create Purchase Order</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
