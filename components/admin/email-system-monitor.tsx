"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Upload, FileText, Building, CreditCard, Mail, Store } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { emailService } from "@/lib/email-service"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "@radix-ui/react-icons"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { useSearchParams } from "next/navigation"
import { DateRange } from "react-day-picker"
import * as React from "react"

interface EmailLog {
  id: number
  to: string
  subject: string
  provider: string
  attempts: number
  status: "sent" | "failed"
  error?: string
  timestamp: string
}

interface EmailResult {
  success: boolean
  attempts: number
  error?: any
  provider?: string
}

export function EmailSystemMonitor() {
  const [emailLogs, setEmailLogs] = useState<EmailLog[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchEmailLogs = async () => {
      setIsLoading(true)
      try {
        // Simulate fetching email logs from a database or API
        // Replace this with your actual data fetching logic
        const logs: EmailLog[] = [
          {
            id: 1,
            to: "user1@example.com",
            subject: "Welcome to KNITTED_GOURMET Nigeria",
            provider: "SendGrid",
            attempts: 1,
            status: "sent",
            timestamp: new Date(Date.now() - 86400000).toISOString(), // Yesterday
          },
          {
            id: 2,
            to: "user2@example.com",
            subject: "Order Confirmation",
            provider: "Mailgun",
            attempts: 2,
            status: "failed",
            error: "Invalid API key",
            timestamp: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
          },
          {
            id: 3,
            to: "user3@example.com",
            subject: "Password Reset",
            provider: "SendGrid",
            attempts: 1,
            status: "sent",
            timestamp: new Date().toISOString(), // Now
          },
        ]
        setEmailLogs(logs)
      } catch (error) {
        console.error("Failed to fetch email logs:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchEmailLogs()
  }, [])

  const sendTestEmail = async () => {
    setIsLoading(true)
    try {
      const result: EmailResult = await emailService.sendEmail(
        "test@example.com",
        "Test Email",
        "This is a test email from KNITTED_GOURMET Nigeria",
        "<p>This is a test email from <strong>KNITTED_GOURMET Nigeria</strong></p>"
      )

      const newLog: EmailLog = {
        id: Date.now(),
        to: "test@example.com",
        subject: "Test Email",
        provider: result.provider || "unknown",
        attempts: result.attempts || 1,
        status: result.success ? "sent" : "failed",
        error: result.error?.message || undefined,
        timestamp: new Date().toISOString(),
      }

      setEmailLogs(prev => [newLog, ...prev])
    } catch (error) {
      console.error("Failed to send test email:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Email System Monitor</CardTitle>
        <CardDescription>Monitor the status of emails sent from your application.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Button onClick={sendTestEmail} disabled={isLoading}>
            {isLoading ? "Sending..." : "Send Test Email"}
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>To</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Provider</TableHead>
              <TableHead>Attempts</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Timestamp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {emailLogs.map(log => (
              <TableRow key={log.id}>
                <TableCell>{log.to}</TableCell>
                <TableCell>{log.subject}</TableCell>
                <TableCell>{log.provider}</TableCell>
                <TableCell>{log.attempts}</TableCell>
                <TableCell>{log.status}</TableCell>
                <TableCell>{log.timestamp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
