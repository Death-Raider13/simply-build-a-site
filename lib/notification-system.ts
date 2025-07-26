
export interface Notification {
  id: string
  type: "ORDER" | "INVENTORY" | "MESSAGE" | "SYSTEM" | "PAYMENT" | "SHIPPING"
  title: string
  message: string
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT"
  read: boolean
  timestamp: string
  actionUrl?: string
  actionText?: string
}

class NotificationSystem {
  private notifications: Notification[] = []
  private subscribers: Array<(notification: Notification) => void> = []

  addNotification(notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      read: false
    }

    this.notifications.unshift(newNotification)
    this.notifySubscribers(newNotification)
    
    return newNotification.id
  }

  getNotifications(): Notification[] {
    return this.notifications
  }

  markAsRead(id: string) {
    const notification = this.notifications.find(n => n.id === id)
    if (notification) {
      notification.read = true
    }
  }

  markAllAsRead() {
    this.notifications.forEach(n => n.read = true)
  }

  subscribe(callback: (notification: Notification) => void) {
    this.subscribers.push(callback)
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== callback)
    }
  }

  private notifySubscribers(notification: Notification) {
    this.subscribers.forEach(callback => callback(notification))
  }

  // Inventory-specific notifications
  createLowStockAlert(productName: string, currentStock: number, minStock: number) {
    return this.addNotification({
      type: "INVENTORY",
      title: "Low Stock Alert",
      message: `${productName} is running low (${currentStock} remaining, minimum: ${minStock})`,
      priority: currentStock === 0 ? "URGENT" : "HIGH",
      actionUrl: "/vendor/inventory",
      actionText: "Restock Now"
    })
  }

  createOrderNotification(orderId: string, customerName: string, amount: number) {
    return this.addNotification({
      type: "ORDER",
      title: "New Order Received",
      message: `New order #${orderId} from ${customerName} for ₦${amount.toLocaleString()}`,
      priority: "HIGH",
      actionUrl: `/orders/${orderId}`,
      actionText: "View Order"
    })
  }
}

export const notificationSystem = new NotificationSystem()
