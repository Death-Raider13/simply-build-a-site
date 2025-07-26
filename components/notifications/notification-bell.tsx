"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, BellRing } from "lucide-react"
import { NotificationCenter } from "./notification-center"
import { notificationManager } from "@/lib/notification-system"

interface NotificationBellProps {
  userId: string
}

export function NotificationBell({ userId }: NotificationBellProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const [hasNewNotification, setHasNewNotification] = useState(false)

  useEffect(() => {
    // Initialize and get initial count
    notificationManager.initialize()
    const count = notificationManager.getUnreadCount(userId)
    setUnreadCount(count)

    // Subscribe to new notifications
    const unsubscribe = notificationManager.subscribe(userId, (notification) => {
      setUnreadCount((prev) => prev + 1)
      setHasNewNotification(true)

      // Reset animation after 3 seconds
      setTimeout(() => setHasNewNotification(false), 3000)
    })

    return unsubscribe
  }, [userId])

  const handleToggle = () => {
    setIsOpen(!isOpen)
    setHasNewNotification(false)
  }

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className={`relative ${hasNewNotification ? "animate-pulse" : ""}`}
        onClick={handleToggle}
      >
        {hasNewNotification ? <BellRing className="h-5 w-5 text-green-600" /> : <Bell className="h-5 w-5" />}
        {unreadCount > 0 && (
          <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-green-600">
            {unreadCount > 99 ? "99+" : unreadCount}
          </Badge>
        )}
      </Button>

      <NotificationCenter userId={userId} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
