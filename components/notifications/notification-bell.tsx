"use client"

import { useState, useEffect } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { notificationSystem } from "@/lib/notification-system"

export function NotificationBell() {
  const [notifications, setNotifications] = useState<any[]>([])
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    // Initialize notifications
    const updateNotifications = () => {
      const allNotifications = notificationSystem.getNotifications()
      setNotifications(allNotifications)
      setUnreadCount(allNotifications.filter((n: any) => !n.read).length)
    }

    // Listen for new notifications
    const unsubscribe = notificationSystem.subscribe((notification: any) => {
      updateNotifications()
    })

    updateNotifications()
    return unsubscribe
  }, [])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="flex flex-col space-y-2">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div key={notification.id} className="p-2 hover:bg-secondary rounded-md cursor-pointer">
                <div className="text-sm font-medium">{notification.title}</div>
                <div className="text-xs text-muted-foreground">{notification.message}</div>
              </div>
            ))
          ) : (
            <div className="text-sm text-muted-foreground p-2">No notifications</div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
