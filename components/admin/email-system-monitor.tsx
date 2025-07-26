
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertCircle, CheckCircle, RefreshCw, Mail, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react"

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
  const [stats, setStats] = useState({
    totalSent: 0,
    totalFailed: 0,
    successRate: 0,
    avgAttempts: 0,
  })

  useEffect(() => {
    loadEmailLogs()
  }, [])

  const loadEmailLogs = () => {
    // Mock data for demonstration
    const mockLogs: EmailLog[] = [
      {
        id: 1,
        to: "user@example.com",
        subject: "Welcome to KNITTED_GOURMET",
        provider: "Resend",
        attempts: 1,
        status: "sent",
        timestamp: new Date().toISOString(),
      },
      {
        id: 2,
        to: "vendor@example.com",
        subject: "Order Confirmation",
        provider: "Nodemailer",
        attempts: 2,
        status: "failed",
        error: "SMTP timeout",
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      },
    ]
    
    setEmailLogs(mockLogs)
    
    // Calculate stats
    const totalSent = mockLogs.filter(log => log.status === "sent").length
    const totalFailed = mockLogs.filter(log => log.status === "failed").length
    const successRate = mockLogs.length > 0 ? (totalSent / mockLogs.length) * 100 : 0
    const avgAttempts = mockLogs.reduce((sum, log) => sum + log.attempts, 0) / mockLogs.length || 0

    setStats({
      totalSent,
      totalFailed,
      successRate: Math.round(successRate),
      avgAttempts: Math.round(avgAttempts * 10) / 10,
    })
  }

  const testEmailSystem = async () => {
    setIsLoading(true)
    try {
      // Mock email test
      const result: EmailResult = {
        success: true,
        attempts: 1,
        provider: "Resend"
      }

      if (result.success) {
        const newLog: EmailLog = {
          id: emailLogs.length + 1,
          to: "test@example.com",
          subject: "System Test Email",
          provider: result.provider || "Unknown",
          attempts: result.attempts,
          status: "sent",
          timestamp: new Date().toISOString(),
        }

        setEmailLogs(prev => [newLog, ...prev])
        loadEmailLogs()
      }
    } catch (error) {
      console.error("Email test failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusBadge = (status: EmailLog["status"]) => {
    if (status === "sent") {
      return <Badge className="bg-green-100 text-green-800 border-green-200">Sent</Badge>
    }
    return <Badge variant="destructive">Failed</Badge>
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-green-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Emails Sent</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.totalSent}</div>
            <div className="flex items-center space-x-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <p className="text-xs text-muted-foreground">Success rate: {stats.successRate}%</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed Emails</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.totalFailed}</div>
            <div className="flex items-center space-x-1 mt-1">
              <TrendingDown className="h-3 w-3 text-red-600" />
              <p className="text-xs text-muted-foreground">Failure rate: {100 - stats.successRate}%</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Attempts</CardTitle>
            <RefreshCw className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.avgAttempts}</div>
            <p className="text-xs text-muted-foreground">Per email delivery</p>
          </CardContent>
        </Card>

        <Card className="border-yellow-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {stats.successRate >= 95 ? "Excellent" : stats.successRate >= 85 ? "Good" : "Needs Attention"}
            </div>
            <p className="text-xs text-muted-foreground">Overall status</p>
          </CardContent>
        </Card>
      </div>

      {/* Email System Controls */}
      <Card className="border-green-100">
        <CardHeader>
          <CardTitle className="text-green-600 flex items-center space-x-2">
            <Mail className="h-5 w-5" />
            <span>Email System Controls</span>
          </CardTitle>
          <CardDescription>Test and monitor email delivery system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Button onClick={testEmailSystem} disabled={isLoading} className="bg-green-600 hover:bg-green-700">
              {isLoading ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Mail className="h-4 w-4 mr-2" />
              )}
              Test Email System
            </Button>
            <Button variant="outline" onClick={loadEmailLogs} className="border-green-600 text-green-600 bg-transparent">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Logs
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Email Logs */}
      <Tabs defaultValue="recent" className="space-y-4">
        <TabsList className="bg-green-50">
          <TabsTrigger value="recent" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
            Recent Emails
          </TabsTrigger>
          <TabsTrigger value="failed" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
            Failed Emails
          </TabsTrigger>
        </TabsList>

        <TabsContent value="recent">
          <Card className="border-green-100">
            <CardHeader>
              <CardTitle className="text-green-600">Recent Email Activity</CardTitle>
              <CardDescription>Latest email delivery attempts and status</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <div className="space-y-4">
                  {emailLogs.map((log) => (
                    <div key={log.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4">
                          <div className="flex-1">
                            <h3 className="font-semibold">{log.subject}</h3>
                            <p className="text-sm text-muted-foreground">To: {log.to}</p>
                            <p className="text-sm text-muted-foreground">
                              Provider: {log.provider} | Attempts: {log.attempts}
                            </p>
                            {log.error && <p className="text-sm text-red-600">Error: {log.error}</p>}
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground">Status</p>
                            {getStatusBadge(log.status)}
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground">Time</p>
                            <p className="text-sm">
                              {new Date(log.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="failed">
          <Card className="border-green-100">
            <CardHeader>
              <CardTitle className="text-green-600">Failed Email Deliveries</CardTitle>
              <CardDescription>Emails that failed to send and require attention</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <div className="space-y-4">
                  {emailLogs
                    .filter(log => log.status === "failed")
                    .map((log) => (
                      <div key={log.id} className="flex items-center justify-between p-4 border rounded-lg border-red-200 bg-red-50">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4">
                            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                            <div className="flex-1">
                              <h3 className="font-semibold text-red-900">{log.subject}</h3>
                              <p className="text-sm text-red-700">To: {log.to}</p>
                              <p className="text-sm text-red-700">
                                Provider: {log.provider} | Attempts: {log.attempts}
                              </p>
                              {log.error && <p className="text-sm text-red-800 font-medium">Error: {log.error}</p>}
                            </div>
                            <Button size="sm" variant="outline" className="border-red-600 text-red-600">
                              Retry
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
