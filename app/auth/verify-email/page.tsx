"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { useToast } from "@/hooks/use-toast"
import { sendVerificationEmailAction, verifyUserAccountAction } from "@/actions/email" // Import server actions

// Mock user database - In production, this would be in your database
// This is a simplified mock for client-side operations.
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

export default function VerifyEmailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const emailFromQuery = searchParams?.get("email") || ""
  const codeFromQuery = searchParams?.get("code") || ""
  const emailFailedFromQuery = searchParams?.get("email_failed") === "true"

  const [verificationCode, setVerificationCode] = useState("")
  const [status, setStatus] = useState<"idle" | "verifying" | "success" | "error" | "resending">("idle")
  const [message, setMessage] = useState("")
  const [pendingVerification, setPendingVerification] = useState<any>(null)
  const { toast } = useToast()

  useEffect(() => {
    const storedPending = localStorage.getItem("pendingVerification")
    if (storedPending) {
      const data = JSON.parse(storedPending)
      // Check if the stored data matches the email from query or if it's recent
      if (data.email === emailFromQuery || Date.now() - data.timestamp < 900000) {
        // 15 minutes
        setPendingVerification(data)
        if (codeFromQuery && data.verificationCode === codeFromQuery) {
          // Auto-verify if code is in URL and matches
          handleVerify(codeFromQuery, data.email)
        }
      } else {
        // Clear stale data
        localStorage.removeItem("pendingVerification")
      }
    } else if (emailFromQuery && codeFromQuery) {
      // If no pending data but code in URL, try to verify directly (less secure for demo)
      // In a real app, this would require server-side lookup of the code.
      setPendingVerification({ email: emailFromQuery, verificationCode: codeFromQuery, userName: "User" })
      handleVerify(codeFromQuery, emailFromQuery)
    } else {
      setMessage("No pending verification found. Please sign up again.")
      setStatus("error")
    }
  }, [emailFromQuery, codeFromQuery])

  const handleVerify = async (code: string, email: string) => {
    setStatus("verifying")
    setMessage("")
    try {
      const result = await verifyUserAccountAction(email, code)

      if (result.success) {
        setStatus("success")
        setMessage(result.message || "Email verified successfully!")
        toast({
          title: "Verification Successful! 🎉",
          description: "Your account has been activated. Redirecting...",
        })
        // In a real app, the session would be managed server-side.
        // For this demo, we store the session data returned by the server action.
        if (result.sessionData) {
          localStorage.setItem("currentUser", JSON.stringify(result.sessionData))
        }
        localStorage.removeItem("pendingVerification") // Clear pending data
        setTimeout(() => {
          if (result.sessionData?.type === "vendor") {
            router.push("/vendor/dashboard")
          } else {
            router.push("/account/dashboard")
          }
        }, 2000)
      } else {
        setStatus("error")
        setMessage(result.error || "Invalid or expired verification code.")
        toast({
          title: "Verification Failed",
          description: result.error || "Please try again or request a new code.",
          variant: "destructive",
        })
      }
    } catch (error: any) {
      setStatus("error")
      setMessage(error.message || "An unexpected error occurred during verification.")
      toast({
        title: "Verification Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleResend = async () => {
    if (!pendingVerification) {
      setMessage("No account found to resend verification email. Please sign up.")
      setStatus("error")
      return
    }

    setStatus("resending")
    setMessage("")
    try {
      const result = await sendVerificationEmailAction(
        pendingVerification.email,
        pendingVerification.userName,
        pendingVerification.accountType,
        pendingVerification.userId,
      )

      if (result.success) {
        setStatus("idle") // Back to idle, waiting for new code
        setMessage(`New verification email sent via ${result.provider}. Check your inbox!`)
        toast({
          title: "Verification Email Resent! 📧",
          description: `A new code has been sent to ${pendingVerification.email}.`,
        })
        // Update pending verification with new code and timestamp
        localStorage.setItem(
          "pendingVerification",
          JSON.stringify({
            ...pendingVerification,
            verificationCode: result.verificationCode,
            timestamp: Date.now(),
            emailFailed: false, // Reset email failed status
          }),
        )
      } else {
        setStatus("error")
        setMessage(result.error || "Failed to resend verification email. Please try again later.")
        toast({
          title: "Resend Failed",
          description: result.error || "Could not resend verification email.",
          variant: "destructive",
        })
      }
    } catch (error: any) {
      setStatus("error")
      setMessage(error.message || "An unexpected error occurred during resend.")
      toast({
        title: "Resend Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    }
  }

  const isVerifying = status === "verifying" || status === "resending"
  const isSuccess = status === "success"
  const isError = status === "error"

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Verify Your Email</CardTitle>
            <CardDescription>
              A verification code has been sent to <span className="font-medium text-green-600">{emailFromQuery}</span>.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {emailFailedFromQuery && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Email Delivery Failed</AlertTitle>
                <AlertDescription>
                  We had trouble sending the verification email. Please check your spam folder or try resending.
                </AlertDescription>
              </Alert>
            )}

            {isSuccess && (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-800">Success!</AlertTitle>
                <AlertDescription className="text-green-800">{message}</AlertDescription>
              </Alert>
            )}

            {isError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Verification Failed</AlertTitle>
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            )}

            {!isSuccess && (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleVerify(verificationCode, emailFromQuery)
                }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="code">Verification Code</Label>
                  <Input
                    id="code"
                    placeholder="Enter 6-digit code"
                    maxLength={6}
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.toUpperCase())}
                    disabled={isVerifying}
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isVerifying}>
                  {isVerifying ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying...
                    </>
                  ) : (
                    "Verify Account"
                  )}
                </Button>
              </form>
            )}

            {!isSuccess && (
              <div className="text-center text-sm text-muted-foreground">
                Didn't receive the code?{" "}
                <Button variant="link" onClick={handleResend} disabled={isVerifying}>
                  {status === "resending" ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Resending...
                    </>
                  ) : (
                    "Resend Code"
                  )}
                </Button>
              </div>
            )}
          </CardContent>
          <CardFooter className="text-center">
            <p className="text-sm text-muted-foreground">
              <Link href="/auth/signup" className="text-green-600 hover:underline">
                Go back to Sign Up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
