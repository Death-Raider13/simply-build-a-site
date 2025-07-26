// Comprehensive Inventory Management System
export interface InventoryItem {
  id: string
  productId: string
  productName: string
  sku: string
  vendorId: string
  vendorName: string
  category: string
  currentStock: number
  reservedStock: number
  availableStock: number
  reorderPoint: number
  reorderQuantity: number
  minStockLevel: number
  unitCost: number
  unitPrice: number
  lastUpdated: Date
  location?: string
  supplier?: string
  expiryDate?: Date
  batchNumber?: string
  status: "active" | "inactive" | "discontinued"
}

export interface StockMovement {
  id: string
  inventoryItemId: string
  type: "IN" | "OUT" | "ADJUSTMENT" | "RESERVED" | "RELEASED"
  quantity: number
  previousStock: number
  newStock: number
  reason: string
  reference?: string
  userId: string
  userName: string
  timestamp: Date
  notes?: string
}

export interface LowStockAlert {
  id: string
  inventoryItemId: string
  productId: string
  productName: string
  currentStock: number
  minStockLevel: number
  reorderPoint: number
  severity: "LOW" | "CRITICAL" | "OUT_OF_STOCK"
  vendorId: string
  vendorName: string
  createdAt: Date
  acknowledged: boolean
  acknowledgedBy?: string
  acknowledgedAt?: Date
}

export interface InventoryStats {
  totalProducts: number
  totalValue: number
  lowStockItems: number
  outOfStockItems: number
  totalMovements: number
  averageStockLevel: number
  topSellingProducts: Array<{
    productId: string
    productName: string
    quantitySold: number
    revenue: number
  }>
  categoryBreakdown: Array<{
    category: string
    itemCount: number
    totalValue: number
  }>
}

export class InventoryManager {
  private static instance: InventoryManager
  private inventory: Map<string, InventoryItem> = new Map()
  private movements: StockMovement[] = []
  private alerts: LowStockAlert[] = []
  private subscribers: Array<(alert: LowStockAlert) => void> = []

  static getInstance(): InventoryManager {
    if (!InventoryManager.instance) {
      InventoryManager.instance = new InventoryManager()
    }
    return InventoryManager.instance
  }

  // Initialize with sample data
  constructor() {
    this.initializeSampleData()
  }

  // Initialize method for external calls
  initialize() {
    // Already initialized in constructor, but keeping for compatibility
    return true
  }

  private initializeSampleData() {
    const sampleItems: InventoryItem[] = [
      {
        id: "inv-001",
        productId: "prod-001",
        productName: "Handwoven Ankara Bag",
        sku: "BAG-ANK-001",
        vendorId: "vendor-001",
        vendorName: "Lagos Craft Store",
        category: "Bags",
        currentStock: 15,
        reservedStock: 3,
        availableStock: 12,
        reorderPoint: 10,
        reorderQuantity: 25,
        minStockLevel: 8,
        unitCost: 5000,
        unitPrice: 8500,
        lastUpdated: new Date(),
        location: "Warehouse A-1",
        status: "active",
      },
      {
        id: "inv-002",
        productId: "prod-002",
        productName: "Nigerian Chin Chin Pack",
        sku: "FOOD-CC-001",
        vendorId: "vendor-002",
        vendorName: "Abuja Snacks Co",
        category: "Confectioneries",
        currentStock: 5,
        reservedStock: 2,
        availableStock: 3,
        reorderPoint: 20,
        reorderQuantity: 50,
        minStockLevel: 15,
        unitCost: 1500,
        unitPrice: 2500,
        lastUpdated: new Date(),
        location: "Warehouse B-2",
        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        status: "active",
      },
      {
        id: "inv-003",
        productId: "prod-003",
        productName: "Crocheted Phone Case",
        sku: "ACC-CPC-001",
        vendorId: "vendor-003",
        vendorName: "Kano Crafts",
        category: "Accessories",
        currentStock: 0,
        reservedStock: 0,
        availableStock: 0,
        reorderPoint: 15,
        reorderQuantity: 30,
        minStockLevel: 10,
        unitCost: 2000,
        unitPrice: 3200,
        lastUpdated: new Date(),
        location: "Warehouse C-1",
        status: "active",
      },
      {
        id: "inv-004",
        productId: "prod-004",
        productName: "Traditional Gele Headwrap",
        sku: "CLO-GEL-001",
        vendorId: "vendor-001",
        vendorName: "Lagos Craft Store",
        category: "Clothing",
        currentStock: 8,
        reservedStock: 1,
        availableStock: 7,
        reorderPoint: 12,
        reorderQuantity: 20,
        minStockLevel: 10,
        unitCost: 3500,
        unitPrice: 6000,
        lastUpdated: new Date(),
        location: "Warehouse A-2",
        status: "active",
      },
    ]

    sampleItems.forEach((item) => {
      this.inventory.set(item.id, item)
    })

    // Generate alerts for low stock items
    this.checkLowStock()
  }

  // Get all inventory items - renamed from getAllItems for compatibility
  getAllInventoryItems(): InventoryItem[] {
    return Array.from(this.inventory.values())
  }

  // Alias for backward compatibility
  getAllItems(): InventoryItem[] {
    return this.getAllInventoryItems()
  }

  // Get inventory by vendor - renamed for compatibility
  getInventoryByVendor(vendorId: string): InventoryItem[] {
    return Array.from(this.inventory.values()).filter((item) => item.vendorId === vendorId)
  }

  // Alias for backward compatibility
  getItemsByVendor(vendorId: string): InventoryItem[] {
    return this.getInventoryByVendor(vendorId)
  }

  // Get single inventory item
  getItem(inventoryId: string): InventoryItem | undefined {
    return this.inventory.get(inventoryId)
  }

  // Update stock levels - fixed signature
  updateStock(
    inventoryId: string,
    quantity: number,
    type: StockMovement["type"],
    reason: string,
    userId: string,
    userName?: string,
    reference?: string,
  ): boolean {
    const item = this.inventory.get(inventoryId)
    if (!item) return false

    const previousStock = item.currentStock
    let newStock = previousStock

    switch (type) {
      case "IN":
        newStock = previousStock + quantity
        break
      case "OUT":
        newStock = Math.max(0, previousStock - quantity)
        break
      case "ADJUSTMENT":
        newStock = quantity
        break
      case "RESERVED":
        item.reservedStock += quantity
        break
      case "RELEASED":
        item.reservedStock = Math.max(0, item.reservedStock - quantity)
        break
    }

    if (type !== "RESERVED" && type !== "RELEASED") {
      item.currentStock = newStock
    }

    item.availableStock = item.currentStock - item.reservedStock
    item.lastUpdated = new Date()

    // Record movement
    const movement: StockMovement = {
      id: `mov-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      inventoryItemId: inventoryId,
      type,
      quantity,
      previousStock,
      newStock: item.currentStock,
      reason,
      reference,
      userId,
      userName: userName || "System",
      timestamp: new Date(),
    }

    this.movements.unshift(movement)

    // Check for low stock alerts
    this.checkLowStockForItem(item)

    return true
  }

  // Reserve stock for orders
  reserveStock(inventoryId: string, quantity: number, userId: string, userName: string, orderId: string): boolean {
    const item = this.inventory.get(inventoryId)
    if (!item || item.availableStock < quantity) return false

    return this.updateStock(inventoryId, quantity, "RESERVED", "Order reservation", userId, userName, orderId)
  }

  // Release reserved stock
  releaseStock(inventoryId: string, quantity: number, userId: string, userName: string, orderId: string): boolean {
    const item = this.inventory.get(inventoryId)
    if (!item || item.reservedStock < quantity) return false

    return this.updateStock(inventoryId, quantity, "RELEASED", "Order cancellation/return", userId, userName, orderId)
  }

  // Fulfill order (convert reserved to sold)
  fulfillOrder(inventoryId: string, quantity: number, userId: string, userName: string, orderId: string): boolean {
    const item = this.inventory.get(inventoryId)
    if (!item || item.reservedStock < quantity) return false

    // Release reservation and reduce stock
    this.updateStock(inventoryId, quantity, "RELEASED", "Order fulfillment", userId, userName, orderId)
    return this.updateStock(inventoryId, quantity, "OUT", "Order fulfillment", userId, userName, orderId)
  }

  // Check low stock for all items
  private checkLowStock() {
    Array.from(this.inventory.values()).forEach((item) => {
      this.checkLowStockForItem(item)
    })
  }

  // Check low stock for specific item
  private checkLowStockForItem(item: InventoryItem) {
    let severity: LowStockAlert["severity"] | null = null

    if (item.currentStock === 0) {
      severity = "OUT_OF_STOCK"
    } else if (item.currentStock <= item.reorderPoint * 0.5) {
      severity = "CRITICAL"
    } else if (item.currentStock <= item.reorderPoint) {
      severity = "LOW"
    }

    if (severity) {
      // Check if alert already exists
      const existingAlert = this.alerts.find(
        (alert) => alert.inventoryItemId === item.id && !alert.acknowledged && alert.severity === severity,
      )

      if (!existingAlert) {
        const alert: LowStockAlert = {
          id: `alert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          inventoryItemId: item.id,
          productId: item.productId,
          productName: item.productName,
          currentStock: item.currentStock,
          minStockLevel: item.minStockLevel,
          reorderPoint: item.reorderPoint,
          severity,
          vendorId: item.vendorId,
          vendorName: item.vendorName,
          createdAt: new Date(),
          acknowledged: false,
        }

        this.alerts.unshift(alert)
        this.notifySubscribers(alert)
      }
    }
  }

  // Get stock movements
  getMovements(inventoryId?: string, limit = 50): StockMovement[] {
    let movements = this.movements

    if (inventoryId) {
      movements = movements.filter((m) => m.inventoryItemId === inventoryId)
    }

    return movements.slice(0, limit)
  }

  // Get low stock alerts
  getLowStockAlerts(vendorId?: string, acknowledged?: boolean): LowStockAlert[] {
    let alerts = this.alerts

    if (vendorId) {
      alerts = alerts.filter((alert) => alert.vendorId === vendorId)
    }

    if (acknowledged !== undefined) {
      alerts = alerts.filter((alert) => alert.acknowledged === acknowledged)
    }

    return alerts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  }

  // Acknowledge alert
  acknowledgeAlert(alertId: string, userId: string): boolean {
    const alert = this.alerts.find((a) => a.id === alertId)
    if (!alert) return false

    alert.acknowledged = true
    alert.acknowledgedBy = userId
    alert.acknowledgedAt = new Date()

    return true
  }

  // Get inventory statistics - added method
  getInventoryStats(vendorId?: string): InventoryStats {
    return this.getStats(vendorId)
  }

  // Get inventory statistics
  getStats(vendorId?: string): InventoryStats {
    let items = Array.from(this.inventory.values())

    if (vendorId) {
      items = items.filter((item) => item.vendorId === vendorId)
    }

    const totalProducts = items.length
    const totalValue = items.reduce((sum, item) => sum + item.currentStock * item.unitCost, 0)
    const lowStockItems = items.filter((item) => item.currentStock <= item.reorderPoint && item.currentStock > 0).length
    const outOfStockItems = items.filter((item) => item.currentStock === 0).length
    const totalMovements = this.movements.length
    const averageStockLevel =
      items.length > 0 ? items.reduce((sum, item) => sum + item.currentStock, 0) / items.length : 0

    // Category breakdown
    const categoryMap = new Map<string, { itemCount: number; totalValue: number }>()
    items.forEach((item) => {
      const existing = categoryMap.get(item.category) || { itemCount: 0, totalValue: 0 }
      categoryMap.set(item.category, {
        itemCount: existing.itemCount + 1,
        totalValue: existing.totalValue + item.currentStock * item.unitCost,
      })
    })

    const categoryBreakdown = Array.from(categoryMap.entries()).map(([category, data]) => ({
      category,
      ...data,
    }))

    // Mock top selling products (in real app, this would come from sales data)
    const topSellingProducts = items.slice(0, 5).map((item) => ({
      productId: item.productId,
      productName: item.productName,
      quantitySold: Math.floor(Math.random() * 50) + 10,
      revenue: (Math.floor(Math.random() * 50) + 10) * item.unitPrice,
    }))

    return {
      totalProducts,
      totalValue,
      lowStockItems,
      outOfStockItems,
      totalMovements,
      averageStockLevel,
      topSellingProducts,
      categoryBreakdown,
    }
  }

  // Get items that need reordering
  getReorderList(vendorId?: string): InventoryItem[] {
    let items = Array.from(this.inventory.values())

    if (vendorId) {
      items = items.filter((item) => item.vendorId === vendorId)
    }

    return items.filter((item) => item.currentStock <= item.reorderPoint)
  }

  // Bulk update stock
  bulkUpdateStock(
    updates: Array<{
      inventoryId: string
      quantity: number
      type: StockMovement["type"]
      reason: string
    }>,
    userId: string,
    userName: string,
  ): { success: number; failed: number } {
    let success = 0
    let failed = 0

    updates.forEach((update) => {
      const result = this.updateStock(update.inventoryId, update.quantity, update.type, update.reason, userId, userName)

      if (result) {
        success++
      } else {
        failed++
      }
    })

    return { success, failed }
  }

  // Subscribe to low stock alerts - renamed for compatibility
  onLowStockAlert(callback: (alert: LowStockAlert) => void) {
    this.subscribers.push(callback)
    // Return unsubscribe function
    return () => {
      const index = this.subscribers.indexOf(callback)
      if (index > -1) {
        this.subscribers.splice(index, 1)
      }
    }
  }

  // Unsubscribe from alerts
  unsubscribeFromAlerts(callback: (alert: LowStockAlert) => void) {
    const index = this.subscribers.indexOf(callback)
    if (index > -1) {
      this.subscribers.splice(index, 1)
    }
  }

  // Notify subscribers of new alerts
  private notifySubscribers(alert: LowStockAlert) {
    this.subscribers.forEach((callback) => {
      try {
        callback(alert)
      } catch (error) {
        console.error("Error notifying alert subscriber:", error)
      }
    })
  }

  // Add new inventory item
  addItem(item: Omit<InventoryItem, "id" | "lastUpdated">): string {
    const id = `inv-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    const newItem: InventoryItem = {
      ...item,
      id,
      lastUpdated: new Date(),
    }

    this.inventory.set(id, newItem)
    this.checkLowStockForItem(newItem)

    return id
  }

  // Update inventory item details
  updateItem(inventoryId: string, updates: Partial<Omit<InventoryItem, "id" | "lastUpdated">>): boolean {
    const item = this.inventory.get(inventoryId)
    if (!item) return false

    Object.assign(item, updates, { lastUpdated: new Date() })
    this.checkLowStockForItem(item)

    return true
  }

  // Delete inventory item
  deleteItem(inventoryId: string): boolean {
    return this.inventory.delete(inventoryId)
  }
}

// Export singleton instance
export const inventoryManager = InventoryManager.getInstance()
