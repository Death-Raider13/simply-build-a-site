
"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Loader2, RefreshCw, Mail, CheckCircle, XCircle } from "lucide-react"
import { getEmailLogsAction, testEmailConfigurationAction, sendTestEmailAction } from "@/actions/email"
import { useToast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface EmailLog {
  id: number
  timestamp: string
  to: string
  subject: string
  provider: string
  attempts?: number
  status: "sent" | "failed"
  error?: string
}

interface ProviderTestResult {
  name: string
  status: string
  responseTime: number
}

export function EmailSystemMonitor() {
  const [emailLogs, setEmailLogs] = useState<EmailLog[]>([])
  const [loadingLogs, setLoadingLogs] = useState(true)
  const [testResults, setTestResults] = useState<ProviderTestResult[]>([])
  const [testingConfig, setTestingConfig] = useState(false)
  const [overallTestStatus, setOverallTestStatus] = useState<string>("Unknown")
  const [testEmailRecipient, setTestEmailRecipient] = useState("")
  const [isSendingTestEmail, setIsSendingTestEmail] = useState(false)
  const { toast } = useToast()

  const fetchEmailLogs = async () => {
    setLoadingLogs(true)
    try {
      const result = await getEmailLogsAction()
      // Ensure proper typing for email logs
      const typedLogs: EmailLog[] = result.recentLogs.map((log: any) => ({
        ...log,
        status: log.status === "sent" ? "sent" as const : "failed" as const
      }))
      setEmailLogs(typedLogs)
      toast({
        title: "Email Logs Refreshed",
        description: "Latest email delivery logs fetched.",
      })
    } catch (error) {
      console.error("Failed to fetch email logs:", error)
      toast({
        title: "Error Fetching Logs",
        description: "Could not retrieve email logs from the server.",
        variant: "destructive",
      })
    } finally {
      setLoadingLogs(false)
    }
  }

  const testEmailConfig = async () => {
    setTestingConfig(true)
    setTestResults([])
    setOverallTestStatus("Testing...")
    try {
      const result = await testEmailConfigurationAction()
      setTestResults(result.providers)
      setOverallTestStatus(result.overallStatus)
      toast({
        title: "Email Configuration Test Complete",
        description: "Results for all providers are available.",
      })
    } catch (error) {
      console.error("Failed to test email configuration:", error)
      setOverallTestStatus("Error during test")
      toast({
        title: "Error Testing Configuration",
        description: "An error occurred while testing email providers.",
        variant: "destructive",
      })
    } finally {
      setTestingConfig(false)
    }
  }

  const handleSendTestEmail = async () => {
    if (!testEmailRecipient) {
      toast({
        title: "Recipient Required",
        description: "Please enter an email address to send a test email.",
        variant: "destructive",
      })
      return
    }
    setIsSendingTestEmail(true)
    try {
      const result = await sendTestEmailAction(
        testEmailRecipient,
        "KNITTED_GOURMET Test Email",
        "This is a test email sent from the KNITTED_GOURMET admin panel to verify email delivery.",
      )
      if (result.success) {
        toast({
          title: "Test Email Sent!",
          description: `Test email sent successfully${result.provider ? ` via ${result.provider}` : ""}. Check your inbox!`,
        })
      } else {
        toast({
          title: "Test Email Failed",
          description: result.error || "Failed to send test email. Check server logs for details.",
          variant: "destructive",
        })
      }
      fetchEmailLogs() // Refresh logs after sending test email
    } catch (error: any) {
      toast({
        title: "Error Sending Test Email",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive",
      })
    } finally {
      setIsSendingTestEmail(false)
    }
  }

  useEffect(() => {
    fetchEmailLogs()
    testEmailConfig()
  }, [])

  const totalSent = emailLogs.filter((log) => log.status === "sent").length
  const totalFailed = emailLogs.filter((log) => log.status === "failed").length

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-6 w-6" /> Email System Monitor
        </CardTitle>
        <CardDescription>Monitor the health and delivery status of your email services.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Summary Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Emails Sent</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalSent}</div>
              <p className="text-xs text-muted-foreground">Successfully delivered</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Emails Failed</CardTitle>
              <XCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalFailed}</div>
              <p className="text-xs text-muted-foreground">Delivery attempts failed</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Provider Status</CardTitle>
              {overallTestStatus.includes("✅") ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : overallTestStatus.includes("❌") ? (
                <XCircle className="h-4 w-4 text-red-500" />
              ) : (
                <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overallTestStatus}</div>
              <p className="text-xs text-muted-foreground">Current status of email providers</p>
            </CardContent>
          </Card>
        </div>

        {/* Provider Configuration Test */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Email Provider Configuration Test</h3>
            <Button onClick={testEmailConfig} disabled={testingConfig} size="sm">
              {testingConfig ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="mr-2 h-4 w-4" />
              )}
              Test Providers
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Provider</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Response Time (ms)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {testResults.length === 0 && testingConfig && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-muted-foreground">
                    <Loader2 className="inline mr-2 h-4 w-4 animate-spin" /> Testing...
                  </TableCell>
                </TableRow>
              )}
              {testResults.length === 0 && !testingConfig && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-muted-foreground">
                    Click "Test Providers" to check configuration.
                  </TableCell>
                </TableRow>
              )}
              {testResults.map((result, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{result.name}</TableCell>
                  <TableCell>
                    <Badge variant={result.status.includes("✅") ? "default" : "destructive"}>{result.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">{result.responseTime}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Send Test Email Section */}
        <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
          <h3 className="text-lg font-semibold">Send Manual Test Email</h3>
          <p className="text-sm text-muted-foreground">
            Use this to send a test email to any address to verify delivery.
          </p>
          <div className="space-y-2">
            <Label htmlFor="test-email-recipient">Recipient Email</Label>
            <Input
              id="test-email-recipient"
              type="email"
              placeholder="e.g., your-email@example.com"
              value={testEmailRecipient}
              onChange={(e) => setTestEmailRecipient(e.target.value)}
            />
          </div>
          <Button onClick={handleSendTestEmail} disabled={isSendingTestEmail} className="w-full">
            {isSendingTestEmail ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending Test Email...
              </>
            ) : (
              "Send Test Email"
            )}
          </Button>
        </div>

        {/* Recent Email Logs */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Recent Email Logs</h3>
            <Button onClick={fetchEmailLogs} disabled={loadingLogs} size="sm">
              {loadingLogs ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
              Refresh Logs
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Attempts</TableHead>
                <TableHead>Error</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loadingLogs && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground">
                    <Loader2 className="inline mr-2 h-4 w-4 animate-spin" /> Loading logs...
                  </TableCell>
                </TableRow>
              )}
              {!loadingLogs && emailLogs.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground">
                    No email logs available.
                  </TableCell>
                </TableRow>
              )}
              {!loadingLogs &&
                emailLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
                    <TableCell>{log.to}</TableCell>
                    <TableCell>{log.subject}</TableCell>
                    <TableCell>{log.provider}</TableCell>
                    <TableCell>
                      <Badge variant={log.status === "sent" ? "default" : "destructive"}>{log.status}</Badge>
                    </TableCell>
                    <TableCell>{log.attempts || 1}</TableCell>
                    <TableCell className="text-red-500 text-sm">{log.error || "-"}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
