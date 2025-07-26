"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Mail, Lock, User, Phone, AlertCircle, CheckCircle } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { sendVerificationEmailAction } from "@/actions/email" // Import the server action

// Mock user database - In production, this would be in your database
// NOTE: For a real application, this data should be stored in a secure database,
// and verification codes/pending user data should also be stored server-side, not localStorage.
const mockUsers = [
  {
    id: 1,
    email: "lateefedidi4@gmail.com",
    password: "lovers@1203",
    type: "admin",
    name: "Admin User",
    verified: true,
  },
  {
    id: 2,
    email: "vendor@example.com",
    password: "password123",
    type: "vendor",
    name: "Test Vendor",
    businessName: "Test Business",
    verified: true,
  },
  {
    id: 3,
    email: "customer@example.com",
    password: "password123",
    type: "customer",
    name: "Test Customer",
    verified: true,
  },
]

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [emailStatus, setEmailStatus] = useState<{
    sending: boolean
    sent: boolean
    failed: boolean
    provider?: string
    attempts?: number
    error?: string
  }>({
    sending: false,
    sent: false,
    failed: false,
  })
  const [accountType, setAccountType] = useState<"customer" | "vendor">("customer")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    businessName: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  })
  const router = useRouter()
  const { toast } = useToast()

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const validateForm = () => {
    if (!formData.firstName.trim()) {
      throw new Error("First name is required")
    }
    if (!formData.lastName.trim()) {
      throw new Error("Last name is required")
    }
    if (!formData.email.trim()) {
      throw new Error("Email is required")
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      throw new Error("Please enter a valid email address")
    }
    if (formData.password.length < 6) {
      throw new Error("Password must be at least 6 characters long")
    }
    if (formData.password !== formData.confirmPassword) {
      throw new Error("Passwords do not match")
    }
    if (!formData.agreeToTerms) {
      throw new Error("Please agree to the terms of service")
    }
    if (accountType === "vendor" && !formData.businessName.trim()) {
      throw new Error("Business name is required for vendor accounts")
    }

    // Check if email already exists
    const existingUser = mockUsers.find((u) => u.email.toLowerCase() === formData.email.toLowerCase())
    if (existingUser) {
      throw new Error("An account with this email already exists")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setEmailStatus({ sending: false, sent: false, failed: false })

    try {
      // Validate form
      validateForm()

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Create new user (initially unverified)
      const newUser = {
        id: mockUsers.length + 1,
        email: formData.email.toLowerCase(),
        password: formData.password,
        type: accountType,
        name: `${formData.firstName} ${formData.lastName}`,
        businessName: accountType === "vendor" ? formData.businessName : undefined,
        phone: formData.phone,
        verified: false, // User is unverified until email confirmation
        createdAt: new Date().toISOString(),
      }

      // Add to mock database
      mockUsers.push(newUser)

      // Send verification email via Server Action
      setEmailStatus({ sending: true, sent: false, failed: false })

      const emailResult = await sendVerificationEmailAction(
        formData.email,
        `${formData.firstName} ${formData.lastName}`,
        accountType,
        newUser.id, // Pass userId to server action
      )

      if (emailResult.success) {
        setEmailStatus({
          sending: false,
          sent: true,
          failed: false,
          provider: emailResult.provider,
          attempts: emailResult.attempts,
        })

        // Store temporary user data for verification (client-side for demo)
        localStorage.setItem(
          "pendingVerification",
          JSON.stringify({
            userId: newUser.id,
            email: formData.email,
            verificationCode: emailResult.verificationCode, // Get code from server action
            accountType: accountType,
            userName: `${formData.firstName} ${formData.lastName}`,
            timestamp: Date.now(),
          }),
        )

        toast({
          title: "Account Created Successfully! 🎉",
          description: `Verification email sent via ${emailResult.provider}. Check your inbox!`,
        })

        // Redirect to verification page
        router.push("/auth/verify-email?email=" + encodeURIComponent(formData.email))
      } else {
        setEmailStatus({
          sending: false,
          sent: false,
          failed: true,
          attempts: emailResult.attempts,
          error: emailResult.error,
        })

        // Still allow user to proceed with manual verification if email failed
        localStorage.setItem(
          "pendingVerification",
          JSON.stringify({
            userId: newUser.id,
            email: formData.email,
            verificationCode: emailResult.verificationCode, // Still get code for manual entry
            accountType: accountType,
            userName: `${formData.firstName} ${formData.lastName}`,
            timestamp: Date.now(),
            emailFailed: true, // Indicate that email delivery failed
          }),
        )

        toast({
          title: "Account Created - Email Issue",
          description: "Account created but email delivery failed. You can still verify manually.",
          variant: "destructive",
        })

        // Still redirect to verification page
        router.push("/auth/verify-email?email=" + encodeURIComponent(formData.email) + "&email_failed=true")
      }
    } catch (error: any) {
      setEmailStatus({ sending: false, sent: false, failed: false })
      toast({
        title: "Registration Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialSignup = async (provider: string) => {
    toast({
      title: "Social Signup",
      description: `${provider} signup will be implemented with OAuth integration.`,
    })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Create Account</CardTitle>
            <CardDescription>Join KNITTED_GOURMET Nigeria and start your journey</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Email Status Alerts */}
            {emailStatus.sending && (
              <Alert className="mb-4">
                <Mail className="h-4 w-4 animate-pulse" />
                <AlertDescription>Sending verification email... This may take a moment.</AlertDescription>
              </Alert>
            )}

            {emailStatus.sent && (
              <Alert className="mb-4 border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  ✅ Verification email sent successfully via {emailStatus.provider}!
                  {emailStatus.attempts && emailStatus.attempts > 1 && ` (${emailStatus.attempts} attempts)`}
                </AlertDescription>
              </Alert>
            )}

            {emailStatus.failed && (
              <Alert className="mb-4 border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  ⚠️ Email delivery failed after {emailStatus.attempts} attempts. You can still verify your account
                  manually.
                  {emailStatus.error && <div className="text-xs mt-1">Error: {emailStatus.error}</div>}
                </AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-2 gap-4 mb-6">
              <Button
                type="button"
                variant={accountType === "customer" ? "default" : "outline"}
                onClick={() => setAccountType("customer")}
                className={
                  accountType === "customer"
                    ? "bg-green-600 hover:bg-green-700"
                    : "border-green-600 text-green-600 hover:bg-green-50"
                }
              >
                Customer
              </Button>
              <Button
                type="button"
                variant={accountType === "vendor" ? "default" : "outline"}
                onClick={() => setAccountType("vendor")}
                className={
                  accountType === "vendor"
                    ? "bg-green-600 hover:bg-green-700"
                    : "border-green-600 text-green-600 hover:bg-green-50"
                }
              >
                Vendor
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="firstName"
                      placeholder="First name"
                      className="pl-10"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="e.g., +234 803 123 4567"
                    className="pl-10"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                </div>
              </div>

              {accountType === "vendor" && (
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input
                    id="businessName"
                    placeholder="Enter your business name"
                    value={formData.businessName}
                    onChange={(e) => handleInputChange("businessName", e.target.value)}
                    required
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password (min. 6 characters)"
                    className="pl-10 pr-10"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className="pl-10 pr-10"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked)}
                  required
                />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the{" "}
                  <Link
                    href={accountType === "vendor" ? "/terms/vendor" : "/terms/user"}
                    className="text-green-600 hover:underline"
                    target="_blank"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-green-600 hover:underline" target="_blank">
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={isLoading || emailStatus.sending}
              >
                {isLoading
                  ? "Creating account..."
                  : emailStatus.sending
                    ? "Sending verification email..."
                    : `Create ${accountType} Account`}
              </Button>
            </form>

            <div className="mt-6">
              <Separator className="my-4" />
              <div className="text-center text-sm text-muted-foreground">Or continue with</div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <Button
                  variant="outline"
                  className="border-green-200 hover:bg-green-50 bg-transparent"
                  onClick={() => handleSocialSignup("Google")}
                  disabled={isLoading}
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </Button>
                <Button
                  variant="outline"
                  className="border-green-200 hover:bg-green-50 bg-transparent"
                  onClick={() => handleSocialSignup("Facebook")}
                  disabled={isLoading}
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/auth/signin" className="text-green-600 hover:underline">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
