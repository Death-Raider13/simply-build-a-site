"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Copy, ExternalLink, Key, Mail, Settings, CheckCircle, AlertCircle } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function EmailSetupGuide() {
  const [copiedText, setCopiedText] = useState("")
  const { toast } = useToast()

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopiedText(label)
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    })
    setTimeout(() => setCopiedText(""), 2000)
  }

  const EnvVarCard = ({ name, description, example }: { name: string; description: string; example: string }) => (
    <div className="p-4 border rounded-lg space-y-2">
      <div className="flex items-center justify-between">
        <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">{name}</code>
        <Button variant="ghost" size="sm" onClick={() => copyToClipboard(name, name)} className="h-8 w-8 p-0">
          <Copy className="h-3 w-3" />
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
      <div className="text-xs text-gray-500">
        Example: <code>{example}</code>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">📧 Email Service Setup Guide</h1>
          <p className="text-lg text-gray-600">
            Complete guide to configure email providers for KNITTED_GOURMET Nigeria
          </p>
        </div>

        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Quick Start:</strong> You only need to set up ONE email provider to get started. Resend is
            recommended for beginners as it's the easiest to configure.
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="resend" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="resend" className="flex items-center gap-2">
              <Badge className="bg-blue-100 text-blue-800">Recommended</Badge>
              Resend
            </TabsTrigger>
            <TabsTrigger value="sendgrid">SendGrid</TabsTrigger>
            <TabsTrigger value="smtp">SMTP</TabsTrigger>
            <TabsTrigger value="testing">Testing</TabsTrigger>
          </TabsList>

          {/* Resend Setup */}
          <TabsContent value="resend">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-blue-600" />
                  Resend Email Service
                  <Badge className="bg-blue-100 text-blue-800">Recommended</Badge>
                </CardTitle>
                <CardDescription>
                  Modern email API with excellent deliverability. Free tier includes 3,000 emails/month.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">📋 Step-by-Step Setup</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          1
                        </div>
                        <div>
                          <p className="font-medium">Create Resend Account</p>
                          <p className="text-sm text-muted-foreground">Sign up for free at resend.com</p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-2 bg-transparent"
                            onClick={() => window.open("https://resend.com/signup", "_blank")}
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Sign Up for Resend
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          2
                        </div>
                        <div>
                          <p className="font-medium">Verify Your Domain (Optional)</p>
                          <p className="text-sm text-muted-foreground">Add your domain or use resend.dev for testing</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          3
                        </div>
                        <div>
                          <p className="font-medium">Generate API Key</p>
                          <p className="text-sm text-muted-foreground">
                            Go to API Keys → Create API Key → Copy the key
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-2 bg-transparent"
                            onClick={() => window.open("https://resend.com/api-keys", "_blank")}
                          >
                            <Key className="h-4 w-4 mr-2" />
                            Get API Key
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          4
                        </div>
                        <div>
                          <p className="font-medium">Add to Environment Variables</p>
                          <p className="text-sm text-muted-foreground">Copy the API key to your .env file</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">🔑 Environment Variable</h3>
                    <EnvVarCard
                      name="RESEND_API_KEY"
                      description="Your Resend API key for sending emails"
                      example="re_123abc456def789ghi012jkl345mno678pqr"
                    />

                    <Alert>
                      <CheckCircle className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Free Tier:</strong> 3,000 emails/month, 100 emails/day. Perfect for getting started!
                      </AlertDescription>
                    </Alert>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">💡 Pro Tips for Resend:</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Use your own domain for better deliverability</li>
                    <li>• Set up SPF, DKIM, and DMARC records</li>
                    <li>• Monitor your sending reputation in the dashboard</li>
                    <li>• Use webhooks to track email events</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SendGrid Setup */}
          <TabsContent value="sendgrid">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-blue-600" />
                  SendGrid Email Service
                </CardTitle>
                <CardDescription>
                  Enterprise-grade email service by Twilio. Free tier includes 100 emails/day.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">📋 Step-by-Step Setup</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          1
                        </div>
                        <div>
                          <p className="font-medium">Create SendGrid Account</p>
                          <p className="text-sm text-muted-foreground">Sign up for free at sendgrid.com</p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-2 bg-transparent"
                            onClick={() => window.open("https://signup.sendgrid.com/", "_blank")}
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Sign Up for SendGrid
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          2
                        </div>
                        <div>
                          <p className="font-medium">Complete Account Verification</p>
                          <p className="text-sm text-muted-foreground">Verify your email and complete onboarding</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          3
                        </div>
                        <div>
                          <p className="font-medium">Create API Key</p>
                          <p className="text-sm text-muted-foreground">
                            Settings → API Keys → Create API Key → Full Access
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-2 bg-transparent"
                            onClick={() => window.open("https://app.sendgrid.com/settings/api_keys", "_blank")}
                          >
                            <Key className="h-4 w-4 mr-2" />
                            Create API Key
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          4
                        </div>
                        <div>
                          <p className="font-medium">Verify Sender Identity</p>
                          <p className="text-sm text-muted-foreground">Add and verify your sender email address</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">🔑 Environment Variable</h3>
                    <EnvVarCard
                      name="SENDGRID_API_KEY"
                      description="Your SendGrid API key for sending emails"
                      example="SG.abc123def456ghi789jkl012mno345pqr678stu901vwx234yz"
                    />

                    <Alert>
                      <CheckCircle className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Free Tier:</strong> 100 emails/day forever. Great for small applications!
                      </AlertDescription>
                    </Alert>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">💡 Pro Tips for SendGrid:</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Complete sender authentication for better deliverability</li>
                    <li>• Use dynamic templates for consistent branding</li>
                    <li>• Monitor your sender reputation score</li>
                    <li>• Set up event webhooks for tracking</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SMTP Setup */}
          <TabsContent value="smtp">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-gray-600" />
                  SMTP Configuration
                </CardTitle>
                <CardDescription>
                  Use any SMTP server including Gmail, Outlook, or your hosting provider's SMTP.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">📧 Gmail SMTP Setup</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          1
                        </div>
                        <div>
                          <p className="font-medium">Enable 2-Factor Authentication</p>
                          <p className="text-sm text-muted-foreground">Required for app passwords</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          2
                        </div>
                        <div>
                          <p className="font-medium">Generate App Password</p>
                          <p className="text-sm text-muted-foreground">
                            Google Account → Security → App passwords → Mail
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-2 bg-transparent"
                            onClick={() => window.open("https://myaccount.google.com/apppasswords", "_blank")}
                          >
                            <Key className="h-4 w-4 mr-2" />
                            Generate App Password
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          3
                        </div>
                        <div>
                          <p className="font-medium">Use Gmail SMTP Settings</p>
                          <div className="text-sm text-muted-foreground space-y-1">
                            <p>Host: smtp.gmail.com</p>
                            <p>Port: 587</p>
                            <p>Security: STARTTLS</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">🔑 Environment Variables</h3>
                    <div className="space-y-3">
                      <EnvVarCard name="SMTP_HOST" description="SMTP server hostname" example="smtp.gmail.com" />
                      <EnvVarCard name="SMTP_PORT" description="SMTP server port" example="587" />
                      <EnvVarCard name="SMTP_USER" description="Your email address" example="your-email@gmail.com" />
                      <EnvVarCard
                        name="SMTP_PASS"
                        description="App password (not your regular password)"
                        example="abcd efgh ijkl mnop"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">📧 Other SMTP Providers:</h4>
                    <div className="text-sm space-y-2">
                      <div>
                        <strong>Outlook/Hotmail:</strong>
                        <br />
                        Host: smtp-mail.outlook.com, Port: 587
                      </div>
                      <div>
                        <strong>Yahoo:</strong>
                        <br />
                        Host: smtp.mail.yahoo.com, Port: 587
                      </div>
                      <div>
                        <strong>Custom Domain:</strong>
                        <br />
                        Check with your hosting provider
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">⚠️ Important Notes:</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Never use your regular password</li>
                      <li>• Always use app-specific passwords</li>
                      <li>• Enable 2FA for better security</li>
                      <li>• SMTP has lower sending limits</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Testing Tab */}
          <TabsContent value="testing">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Testing Your Email Setup
                </CardTitle>
                <CardDescription>How to test your email configuration and troubleshoot common issues.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">🧪 Testing Methods</h3>
                    <div className="space-y-3">
                      <div className="p-3 border rounded-lg">
                        <h4 className="font-medium">1. No API Keys (Mock Mode)</h4>
                        <p className="text-sm text-muted-foreground">
                          The system works without any API keys - emails are logged to console for testing.
                        </p>
                      </div>

                      <div className="p-3 border rounded-lg">
                        <h4 className="font-medium">2. Demo Verification Codes</h4>
                        <p className="text-sm text-muted-foreground">
                          Use these codes for testing: <code>123456</code>, <code>VERIFY</code>, <code>TEST123</code>
                        </p>
                      </div>

                      <div className="p-3 border rounded-lg">
                        <h4 className="font-medium">3. Admin Email Monitor</h4>
                        <p className="text-sm text-muted-foreground">
                          Check the admin panel for email delivery status and logs.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">🔧 Troubleshooting</h3>
                    <div className="space-y-3">
                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          <strong>Emails not sending?</strong>
                          <br />
                          Check browser console for error messages and verify your API keys.
                        </AlertDescription>
                      </Alert>

                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          <strong>Emails going to spam?</strong>
                          <br />
                          Set up proper DNS records (SPF, DKIM, DMARC) for your domain.
                        </AlertDescription>
                      </Alert>

                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          <strong>Rate limits exceeded?</strong>
                          <br />
                          The system automatically switches to backup providers when limits are hit.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">✅ Quick Test Checklist:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium mb-2">Before Adding API Keys:</p>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>□ Sign up for new account</li>
                        <li>□ Test with mock emails (check console)</li>
                        <li>□ Verify demo codes work</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium mb-2">After Adding API Keys:</p>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>□ Send test email from admin panel</li>
                        <li>□ Check email delivery logs</li>
                        <li>□ Verify emails arrive in inbox</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Environment Variables Summary */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>📝 Environment Variables Summary</CardTitle>
            <CardDescription>Copy these to your .env.local file (you only need one email provider)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
              <div className="space-y-1">
                <div className="text-green-400"># Email Configuration (choose one or more providers)</div>
                <div className="text-gray-400"># Resend (Recommended)</div>
                <div>RESEND_API_KEY=your_resend_api_key_here</div>
                <div className="text-gray-400 mt-2"># SendGrid (Alternative)</div>
                <div>SENDGRID_API_KEY=your_sendgrid_api_key_here</div>
                <div className="text-gray-400 mt-2"># SMTP (Fallback)</div>
                <div>SMTP_HOST=smtp.gmail.com</div>
                <div>SMTP_PORT=587</div>
                <div>SMTP_USER=your-email@gmail.com</div>
                <div>SMTP_PASS=your_app_password_here</div>
              </div>
            </div>
            <Button
              className="mt-4"
              onClick={() =>
                copyToClipboard(
                  `# Email Configuration (choose one or more providers)
# Resend (Recommended)
RESEND_API_KEY=your_resend_api_key_here

# SendGrid (Alternative)  
SENDGRID_API_KEY=your_sendgrid_api_key_here

# SMTP (Fallback)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your_app_password_here`,
                  "Environment variables",
                )
              }
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy All Environment Variables
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
