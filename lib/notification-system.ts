
export type NotificationType = "ORDER" | "INVENTORY" | "MESSAGE" | "SYSTEM" | "PAYMENT" | "SHIPPING"
export type NotificationPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT"

export interface Notification {
  id: string
  userId: string
  type: NotificationType
  title: string
  message: string
  priority: NotificationPriority
  read: boolean
  createdAt: Date
  actionUrl?: string
  actionLabel?: string
}

class NotificationSystem {
  private notifications: Notification[] = []
  private subscribers: Map<string, (notification: Notification) => void> = new Map()

  subscribe(userId: string, callback: (notification: Notification) => void) {
    const key = `${userId}_${Date.now()}`
    this.subscribers.set(key, callback)
    
    return () => {
      this.subscribers.delete(key)
    }
  }

  sendNotification(notification: Omit<Notification, 'id' | 'createdAt'>) {
    const newNotification: Notification = {
      ...notification,
      id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date()
    }
    
    this.notifications.push(newNotification)
    
    // Notify subscribers
    this.subscribers.forEach(callback => {
      if (callback) {
        callback(newNotification)
      }
    })
  }

  sendInventoryAlert(vendorId: string, productName: string, currentStock: number, reorderPoint: number) {
    this.sendNotification({
      userId: vendorId,
      type: "INVENTORY",
      title: "Low Stock Alert",
      message: `${productName} is running low. Current stock: ${currentStock}, Reorder point: ${reorderPoint}`,
      priority: currentStock === 0 ? "URGENT" : "HIGH",
      read: false,
      actionUrl: "/inventory",
      actionLabel: "View Inventory"
    })
  }

  getNotifications(userId: string) {
    const userNotifications = this.notifications.filter(n => n.userId === userId)
    const unread = userNotifications.filter(n => !n.read).length
    
    return {
      notifications: userNotifications.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()),
      unread
    }
  }

  markAsRead(notificationId: string) {
    const notification = this.notifications.find(n => n.id === notificationId)
    if (notification) {
      notification.read = true
    }
  }

  markAllAsRead(userId: string) {
    const userNotifications = this.notifications.filter(n => n.userId === userId && !n.read)
    userNotifications.forEach(n => n.read = true)
    return userNotifications.length
  }

  deleteNotification(notificationId: string) {
    const index = this.notifications.findIndex(n => n.id === notificationId)
    if (index > -1) {
      this.notifications.splice(index, 1)
    }
  }
}

export const notificationManager = new NotificationSystem()
export { notificationManager as notificationSystem }
