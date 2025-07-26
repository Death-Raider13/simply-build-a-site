export interface Notification {
  id: string
  type: "ORDER" | "INVENTORY" | "MESSAGE" | "SYSTEM" | "PAYMENT" | "SHIPPING"
  title: string
  message: string
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT"
  userId: string
  userType: "CUSTOMER" | "VENDOR" | "ADMIN"
  read: boolean
  actionUrl?: string
  actionLabel?: string
  metadata?: Record<string, any>
  createdAt: Date
  readAt?: Date
  expiresAt?: Date
}

export interface NotificationPreferences {
  userId: string
  email: boolean
  push: boolean
  sms: boolean
  inApp: boolean
  orderUpdates: boolean
  inventoryAlerts: boolean
  promotions: boolean
  systemMessages: boolean
  frequency: "IMMEDIATE" | "HOURLY" | "DAILY" | "WEEKLY"
}

export interface NotificationChannel {
  type: "EMAIL" | "PUSH" | "SMS" | "IN_APP"
  send(notification: Notification, preferences: NotificationPreferences): Promise<boolean>
}

export class NotificationSystem {
  private static instance: NotificationSystem
  private notifications: Map<string, Notification> = new Map()
  private preferences: Map<string, NotificationPreferences> = new Map()
  private channels: Map<string, NotificationChannel> = new Map()
  private subscribers: Map<string, Array<(notification: Notification) => void>> = new Map()

  static getInstance(): NotificationSystem {
    if (!NotificationSystem.instance) {
      NotificationSystem.instance = new NotificationSystem()
    }
    return NotificationSystem.instance
  }

  constructor() {
    this.initializeChannels()
    this.initializeSampleData()
    this.startCleanupTimer()
  }

  private initializeChannels() {
    // Email Channel
    this.channels.set("EMAIL", {
      type: "EMAIL",
      async send(notification: Notification, preferences: NotificationPreferences): Promise<boolean> {
        if (!preferences.email) return false

        // Mock email sending
        console.log(`📧 Email sent to user ${notification.userId}:`, notification.title)
        return true
      },
    })

    // Push Notification Channel
    this.channels.set("PUSH", {
      type: "PUSH",
      async send(notification: Notification, preferences: NotificationPreferences): Promise<boolean> {
        if (!preferences.push) return false

        // Mock push notification
        console.log(`🔔 Push notification sent to user ${notification.userId}:`, notification.title)
        return true
      },
    })

    // SMS Channel
    this.channels.set("SMS", {
      type: "SMS",
      async send(notification: Notification, preferences: NotificationPreferences): Promise<boolean> {
        if (!preferences.sms) return false

        // Mock SMS sending
        console.log(`📱 SMS sent to user ${notification.userId}:`, notification.message)
        return true
      },
    })

    // In-App Channel
    this.channels.set("IN_APP", {
      type: "IN_APP",
      async send(notification: Notification, preferences: NotificationPreferences): Promise<boolean> {
        if (!preferences.inApp) return false

        // In-app notifications are handled by the notification system itself
        return true
      },
    })
  }

  private initializeSampleData() {
    // Sample notifications
    const sampleNotifications: Omit<Notification, "id" | "createdAt">[] = [
      {
        type: "ORDER",
        title: "Order Confirmed",
        message: "Your order #ORD-001 has been confirmed and is being processed.",
        priority: "MEDIUM",
        userId: "user-001",
        userType: "CUSTOMER",
        read: false,
        actionUrl: "/orders/ORD-001",
        actionLabel: "View Order",
        metadata: { orderId: "ORD-001", amount: 15500 },
      },
      {
        type: "INVENTORY",
        title: "Low Stock Alert",
        message: "Nigerian Chin Chin Pack is running low (5 units remaining).",
        priority: "HIGH",
        userId: "vendor-002",
        userType: "VENDOR",
        read: false,
        actionUrl: "/vendor/inventory",
        actionLabel: "Manage Inventory",
        metadata: { productId: "prod-002", currentStock: 5 },
      },
      {
        type: "SHIPPING",
        title: "Package Shipped",
        message: "Your order has been shipped and is on its way to you.",
        priority: "MEDIUM",
        userId: "user-001",
        userType: "CUSTOMER",
        read: true,
        actionUrl: "/orders/track/TRK-001",
        actionLabel: "Track Package",
        metadata: { trackingNumber: "TRK-001" },
      },
      {
        type: "PAYMENT",
        title: "Payment Received",
        message: "Payment of ₦8,500 has been received for order #ORD-002.",
        priority: "MEDIUM",
        userId: "vendor-001",
        userType: "VENDOR",
        read: false,
        actionUrl: "/vendor/orders/ORD-002",
        actionLabel: "View Order",
        metadata: { orderId: "ORD-002", amount: 8500 },
      },
      {
        type: "SYSTEM",
        title: "Welcome to KNITTED_GOURMET",
        message: "Welcome to Nigeria's premier marketplace for authentic Nigerian products!",
        priority: "LOW",
        userId: "user-001",
        userType: "CUSTOMER",
        read: false,
        actionUrl: "/explore",
        actionLabel: "Start Shopping",
      },
    ]

    sampleNotifications.forEach((notification) => {
      const id = this.generateId()
      const fullNotification: Notification = {
        ...notification,
        id,
        createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000), // Random time in last 7 days
        readAt: notification.read ? new Date() : undefined,
      }
      this.notifications.set(id, fullNotification)
    })

    // Sample preferences
    const samplePreferences: NotificationPreferences[] = [
      {
        userId: "user-001",
        email: true,
        push: true,
        sms: false,
        inApp: true,
        orderUpdates: true,
        inventoryAlerts: false,
        promotions: true,
        systemMessages: true,
        frequency: "IMMEDIATE",
      },
      {
        userId: "vendor-001",
        email: true,
        push: true,
        sms: true,
        inApp: true,
        orderUpdates: true,
        inventoryAlerts: true,
        promotions: false,
        systemMessages: true,
        frequency: "IMMEDIATE",
      },
      {
        userId: "vendor-002",
        email: true,
        push: false,
        sms: false,
        inApp: true,
        orderUpdates: true,
        inventoryAlerts: true,
        promotions: false,
        systemMessages: false,
        frequency: "HOURLY",
      },
    ]

    samplePreferences.forEach((pref) => {
      this.preferences.set(pref.userId, pref)
    })
  }

  private generateId(): string {
    return `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  // Send notification
  async sendNotification(notification: Omit<Notification, "id" | "createdAt" | "read">): Promise<string> {
    const id = this.generateId()
    const fullNotification: Notification = {
      ...notification,
      id,
      createdAt: new Date(),
      read: false,
    }

    this.notifications.set(id, fullNotification)

    // Get user preferences
    const preferences = this.preferences.get(notification.userId) || this.getDefaultPreferences(notification.userId)

    // Send through appropriate channels
    await this.deliverNotification(fullNotification, preferences)

    // Notify subscribers
    this.notifySubscribers(notification.userId, fullNotification)

    return id
  }

  // Deliver notification through channels
  private async deliverNotification(notification: Notification, preferences: NotificationPreferences) {
    const deliveryPromises: Promise<boolean>[] = []

    // Check if notification type is enabled
    const typeEnabled = this.isNotificationTypeEnabled(notification.type, preferences)
    if (!typeEnabled) return

    // Send through each enabled channel
    for (const [channelName, channel] of this.channels) {
      deliveryPromises.push(channel.send(notification, preferences))
    }

    try {
      await Promise.all(deliveryPromises)
    } catch (error) {
      console.error("Error delivering notification:", error)
    }
  }

  private isNotificationTypeEnabled(type: Notification["type"], preferences: NotificationPreferences): boolean {
    switch (type) {
      case "ORDER":
      case "PAYMENT":
      case "SHIPPING":
        return preferences.orderUpdates
      case "INVENTORY":
        return preferences.inventoryAlerts
      case "SYSTEM":
        return preferences.systemMessages
      case "MESSAGE":
        return true // Messages are always enabled
      default:
        return true
    }
  }

  // Get notifications for user
  getNotifications(
    userId: string,
    options: {
      limit?: number
      offset?: number
      unreadOnly?: boolean
      type?: Notification["type"]
      priority?: Notification["priority"]
    } = {},
  ): { notifications: Notification[]; total: number; unread: number } {
    let userNotifications = Array.from(this.notifications.values())
      .filter((n) => n.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

    // Apply filters
    if (options.unreadOnly) {
      userNotifications = userNotifications.filter((n) => !n.read)
    }

    if (options.type) {
      userNotifications = userNotifications.filter((n) => n.type === options.type)
    }

    if (options.priority) {
      userNotifications = userNotifications.filter((n) => n.priority === options.priority)
    }

    const total = userNotifications.length
    const unread = userNotifications.filter((n) => !n.read).length

    // Apply pagination
    const offset = options.offset || 0
    const limit = options.limit || 50
    const notifications = userNotifications.slice(offset, offset + limit)

    return { notifications, total, unread }
  }

  // Mark notification as read
  markAsRead(notificationId: string): boolean {
    const notification = this.notifications.get(notificationId)
    if (!notification || notification.read) return false

    notification.read = true
    notification.readAt = new Date()
    return true
  }

  // Mark all notifications as read for user
  markAllAsRead(userId: string): number {
    let count = 0
    for (const notification of this.notifications.values()) {
      if (notification.userId === userId && !notification.read) {
        notification.read = true
        notification.readAt = new Date()
        count++
      }
    }
    return count
  }

  // Delete notification
  deleteNotification(notificationId: string): boolean {
    return this.notifications.delete(notificationId)
  }

  // Get unread count for user
  getUnreadCount(userId: string): number {
    return Array.from(this.notifications.values()).filter((n) => n.userId === userId && !n.read).length
  }

  // Subscribe to real-time notifications
  subscribe(userId: string, callback: (notification: Notification) => void) {
    if (!this.subscribers.has(userId)) {
      this.subscribers.set(userId, [])
    }
    this.subscribers.get(userId)!.push(callback)
  }

  // Unsubscribe from notifications
  unsubscribe(userId: string, callback: (notification: Notification) => void) {
    const userSubscribers = this.subscribers.get(userId)
    if (userSubscribers) {
      const index = userSubscribers.indexOf(callback)
      if (index > -1) {
        userSubscribers.splice(index, 1)
      }
    }
  }

  // Notify subscribers
  private notifySubscribers(userId: string, notification: Notification) {
    const userSubscribers = this.subscribers.get(userId)
    if (userSubscribers) {
      userSubscribers.forEach((callback) => {
        try {
          callback(notification)
        } catch (error) {
          console.error("Error notifying subscriber:", error)
        }
      })
    }
  }

  // Get user preferences
  getPreferences(userId: string): NotificationPreferences {
    return this.preferences.get(userId) || this.getDefaultPreferences(userId)
  }

  // Update user preferences
  updatePreferences(userId: string, updates: Partial<NotificationPreferences>): boolean {
    const existing = this.preferences.get(userId) || this.getDefaultPreferences(userId)
    const updated = { ...existing, ...updates }
    this.preferences.set(userId, updated)
    return true
  }

  // Get default preferences
  private getDefaultPreferences(userId: string): NotificationPreferences {
    return {
      userId,
      email: true,
      push: true,
      sms: false,
      inApp: true,
      orderUpdates: true,
      inventoryAlerts: true,
      promotions: true,
      systemMessages: true,
      frequency: "IMMEDIATE",
    }
  }

  // Send bulk notifications
  async sendBulkNotifications(
    notifications: Array<Omit<Notification, "id" | "createdAt" | "read">>,
  ): Promise<string[]> {
    const ids: string[] = []

    for (const notification of notifications) {
      const id = await this.sendNotification(notification)
      ids.push(id)
    }

    return ids
  }

  // Get notification statistics
  getStats(userId?: string): {
    total: number
    unread: number
    byType: Record<string, number>
    byPriority: Record<string, number>
    recentActivity: number
  } {
    let notifications = Array.from(this.notifications.values())

    if (userId) {
      notifications = notifications.filter((n) => n.userId === userId)
    }

    const total = notifications.length
    const unread = notifications.filter((n) => !n.read).length

    // Group by type
    const byType: Record<string, number> = {}
    notifications.forEach((n) => {
      byType[n.type] = (byType[n.type] || 0) + 1
    })

    // Group by priority
    const byPriority: Record<string, number> = {}
    notifications.forEach((n) => {
      byPriority[n.priority] = (byPriority[n.priority] || 0) + 1
    })

    // Recent activity (last 24 hours)
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000)
    const recentActivity = notifications.filter((n) => n.createdAt > yesterday).length

    return {
      total,
      unread,
      byType,
      byPriority,
      recentActivity,
    }
  }

  // Clean up expired notifications
  private startCleanupTimer() {
    setInterval(
      () => {
        const now = new Date()
        for (const [id, notification] of this.notifications) {
          if (notification.expiresAt && notification.expiresAt < now) {
            this.notifications.delete(id)
          }
        }
      },
      60 * 60 * 1000,
    ) // Run every hour
  }

  // Send order notification
  async sendOrderNotification(
    userId: string,
    userType: "CUSTOMER" | "VENDOR",
    orderId: string,
    status: string,
    amount?: number,
  ) {
    const statusMessages = {
      confirmed: "Your order has been confirmed and is being processed.",
      shipped: "Your order has been shipped and is on its way.",
      delivered: "Your order has been delivered successfully.",
      cancelled: "Your order has been cancelled.",
      refunded: "Your refund has been processed.",
    }

    await this.sendNotification({
      type: "ORDER",
      title: `Order ${status.charAt(0).toUpperCase() + status.slice(1)}`,
      message: statusMessages[status as keyof typeof statusMessages] || `Order status updated to ${status}.`,
      priority: status === "cancelled" ? "HIGH" : "MEDIUM",
      userId,
      userType,
      actionUrl: userType === "CUSTOMER" ? `/orders/${orderId}` : `/vendor/orders/${orderId}`,
      actionLabel: "View Order",
      metadata: { orderId, status, amount },
    })
  }

  // Send inventory alert
  async sendInventoryAlert(vendorId: string, productName: string, currentStock: number, reorderPoint: number) {
    const priority = currentStock === 0 ? "URGENT" : currentStock <= reorderPoint * 0.5 ? "HIGH" : "MEDIUM"
    const message =
      currentStock === 0
        ? `${productName} is out of stock.`
        : `${productName} is running low (${currentStock} units remaining).`

    await this.sendNotification({
      type: "INVENTORY",
      title: currentStock === 0 ? "Out of Stock Alert" : "Low Stock Alert",
      message,
      priority,
      userId: vendorId,
      userType: "VENDOR",
      actionUrl: "/vendor/inventory",
      actionLabel: "Manage Inventory",
      metadata: { productName, currentStock, reorderPoint },
    })
  }

  // Send payment notification
  async sendPaymentNotification(
    userId: string,
    userType: "CUSTOMER" | "VENDOR",
    amount: number,
    orderId: string,
    type: "received" | "sent" | "refunded",
  ) {
    const titles = {
      received: "Payment Received",
      sent: "Payment Processed",
      refunded: "Refund Processed",
    }

    const messages = {
      received: `Payment of ₦${amount.toLocaleString()} has been received for order #${orderId}.`,
      sent: `Payment of ₦${amount.toLocaleString()} has been processed for order #${orderId}.`,
      refunded: `Refund of ₦${amount.toLocaleString()} has been processed for order #${orderId}.`,
    }

    await this.sendNotification({
      type: "PAYMENT",
      title: titles[type],
      message: messages[type],
      priority: "MEDIUM",
      userId,
      userType,
      actionUrl: userType === "CUSTOMER" ? `/orders/${orderId}` : `/vendor/orders/${orderId}`,
      actionLabel: "View Order",
      metadata: { orderId, amount, type },
    })
  }
}

// Export singleton instance
export const notificationSystem = NotificationSystem.getInstance()
