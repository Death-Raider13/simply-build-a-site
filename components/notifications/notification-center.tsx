"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, BellRing, Package, MessageCircle, ShoppingCart, AlertTriangle, Check, X, Settings } from "lucide-react"
import { notificationManager, type Notification } from "@/lib/notification-system"
import { formatDistanceToNow } from "date-fns"

interface NotificationCenterProps {
  userId: string
  isOpen: boolean
  onClose: () => void
}

export function NotificationCenter({ userId, isOpen, onClose }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    if (isOpen) {
      loadNotifications()
    }

    // Subscribe to real-time notifications
    const unsubscribe = notificationManager.subscribe(userId, (notification) => {
      setNotifications((prev) => [notification, ...prev])
      setUnreadCount((prev) => prev + 1)
    })

    return unsubscribe
  }, [userId, isOpen])

  const loadNotifications = () => {
    notificationManager.initialize()
    const allNotifications = notificationManager.getNotifications(userId)
    const unread = notificationManager.getUnreadCount(userId)

    setNotifications(allNotifications)
    setUnreadCount(unread)
  }

  const handleMarkAsRead = (notificationId: string) => {
    notificationManager.markAsRead(userId, notificationId)
    setNotifications((prev) => prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n)))
    setUnreadCount((prev) => Math.max(0, prev - 1))
  }

  const handleMarkAllAsRead = () => {
    const count = notificationManager.markAllAsRead(userId)
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
    setUnreadCount(0)
  }

  const handleDeleteNotification = (notificationId: string) => {
    notificationManager.deleteNotification(userId, notificationId)
    setNotifications((prev) => prev.filter((n) => n.id !== notificationId))

    const notification = notifications.find((n) => n.id === notificationId)
    if (notification && !notification.read) {
      setUnreadCount((prev) => Math.max(0, prev - 1))
    }
  }

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "order":
        return <ShoppingCart className="h-4 w-4" />
      case "message":
        return <MessageCircle className="h-4 w-4" />
      case "inventory":
        return <Package className="h-4 w-4" />
      case "system":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const getPriorityColor = (priority: Notification["priority"]) => {
    switch (priority) {
      case "urgent":
        return "text-red-600 bg-red-50 border-red-200"
      case "high":
        return "text-orange-600 bg-orange-50 border-orange-200"
      case "medium":
        return "text-blue-600 bg-blue-50 border-blue-200"
      case "low":
        return "text-gray-600 bg-gray-50 border-gray-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "all") return true
    if (activeTab === "unread") return !notification.read
    return notification.type === activeTab
  })

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50" onClick={onClose}>
      <div
        className="fixed right-4 top-16 w-96 max-h-[80vh] bg-white rounded-lg shadow-xl border"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2">
            <BellRing className="h-5 w-5 text-green-600" />
            <h2 className="text-lg font-semibold">Notifications</h2>
            {unreadCount > 0 && <Badge className="bg-green-600">{unreadCount}</Badge>}
          </div>
          <div className="flex items-center space-x-2">
            {unreadCount > 0 && (
              <Button
                size="sm"
                variant="ghost"
                onClick={handleMarkAllAsRead}
                className="text-green-600 hover:text-green-700"
              >
                <Check className="h-4 w-4 mr-1" />
                Mark all read
              </Button>
            )}
            <Button size="sm" variant="ghost" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-green-50 m-2">
            <TabsTrigger value="all" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              All
            </TabsTrigger>
            <TabsTrigger value="unread" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              Unread
            </TabsTrigger>
            <TabsTrigger value="order" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              Orders
            </TabsTrigger>
            <TabsTrigger value="message" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              Messages
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="h-96">
            <TabsContent value={activeTab} className="mt-0">
              <div className="p-2">
                {filteredNotifications.length === 0 ? (
                  <div className="text-center py-8">
                    <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No notifications</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {filteredNotifications.map((notification) => (
                      <Card
                        key={notification.id}
                        className={`cursor-pointer transition-colors ${
                          !notification.read ? "bg-green-50 border-green-200" : "hover:bg-gray-50"
                        } ${getPriorityColor(notification.priority)}`}
                      >
                        <CardContent className="p-3">
                          <div className="flex items-start space-x-3">
                            <div className={`p-2 rounded-full ${getPriorityColor(notification.priority)}`}>
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h4 className="text-sm font-semibold truncate">{notification.title}</h4>
                                <div className="flex items-center space-x-1">
                                  {!notification.read && <div className="w-2 h-2 bg-green-600 rounded-full"></div>}
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleDeleteNotification(notification.id)
                                    }}
                                    className="h-6 w-6 p-0"
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{notification.message}</p>
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-xs text-gray-500">
                                  {formatDistanceToNow(notification.createdAt, { addSuffix: true })}
                                </span>
                                {notification.actionUrl && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="h-6 text-xs border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      if (!notification.read) {
                                        handleMarkAsRead(notification.id)
                                      }
                                      window.location.href = notification.actionUrl!
                                    }}
                                  >
                                    {notification.actionText || "View"}
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>

        <div className="p-4 border-t">
          <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50 bg-transparent">
            <Settings className="h-4 w-4 mr-2" />
            Notification Settings
          </Button>
        </div>
      </div>
    </div>
  )
}
