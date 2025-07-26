"use server"

import { EmailService, type EmailContent } from "@/lib/email-service"

// Mock user database - In production, this would be in your database
// This is a simplified mock for server-side operations.
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

// In a real application, you would fetch/update user data from a database here.
// For this example, we'll simulate updates to the mockUsers array.
interface PendingVerificationData {
  userId: number
  email: string
  verificationCode: string
  accountType: "customer" | "vendor"
  userName: string
  timestamp: number
  emailFailed?: boolean
}

// This would typically interact with a database to store/retrieve pending verifications
const pendingVerifications: Record<string, PendingVerificationData> = {}

export async function sendVerificationEmailAction(
  email: string,
  userName: string,
  accountType: "customer" | "vendor",
  userId: number,
) {
  console.log(`Server Action: sendVerificationEmailAction called for ${email}`)
  try {
    const verificationCode = Math.random().toString(36).substr(2, 6).toUpperCase()
    console.log(`Server Action: Generated verification code: ${verificationCode}`)

    const emailService = EmailService.getInstance()
    const emailContent = emailService.generateVerificationEmail(email, verificationCode, userName)

    const emailResult = await emailService.sendEmail(emailContent)
    console.log("Server Action: Email sending result:", emailResult)

    const pendingData: PendingVerificationData = {
      userId,
      email,
      verificationCode,
      accountType,
      userName,
      timestamp: Date.now(),
      emailFailed: !emailResult.success,
    }

    // Store pending verification data (in a real app, this would be a database entry)
    pendingVerifications[email] = pendingData
    console.log(`Server Action: Pending verification stored for ${email}`)

    return {
      success: emailResult.success,
      provider: emailResult.provider,
      attempts: emailResult.attempts,
      error: emailResult.error,
      verificationCode: verificationCode, // Send back for client-side storage (for demo purposes)
    }
  } catch (error: any) {
    console.error("Server Action: Failed to send verification email:", error.message || error)
    return {
      success: false,
      attempts: 0,
      error: error.message || "Failed to send verification email due to server error.",
    }
  }
}

export async function verifyUserAccountAction(email: string, code: string) {
  console.log(`Server Action: verifyUserAccountAction called for ${email} with code ${code}`)
  const pendingData = pendingVerifications[email]

  if (!pendingData) {
    console.warn(`Server Action: No pending verification found for ${email}`)
    return { success: false, error: "No pending verification found for this email." }
  }

  const isCodeValid = pendingData.verificationCode === code
  const isExpired = Date.now() - pendingData.timestamp > 15 * 60 * 1000 // 15 minutes

  if (!isCodeValid) {
    console.warn(`Server Action: Invalid code for ${email}. Expected ${pendingData.verificationCode}, got ${code}`)
    return { success: false, error: "Invalid verification code." }
  }
  if (isExpired) {
    console.warn(`Server Action: Code expired for ${email}.`)
    // Clean up expired data
    delete pendingVerifications[email]
    return { success: false, error: "Verification code has expired. Please request a new one." }
  }

  // In a real app, update user's 'verified' status in the database
  const userIndex = mockUsers.findIndex((u) => u.email === email)
  if (userIndex !== -1) {
    mockUsers[userIndex].verified = true
    console.log(`Server Action: User ${email} marked as verified.`)
    // Simulate session creation for the verified user
    const verifiedUser = mockUsers[userIndex]
    const sessionData = {
      id: verifiedUser.id,
      email: verifiedUser.email,
      type: verifiedUser.type,
      name: verifiedUser.name,
      businessName: (verifiedUser as any).businessName, // Cast to any to access businessName
      verified: true,
      signedUpAt: new Date().toISOString(),
    }
    // In a real app, this would be a server-side session management (e.g., cookies, JWT)
    // For this demo, we'll return it to the client to store in localStorage.
    return { success: true, message: "Account verified successfully!", sessionData }
  } else {
    console.error(`Server Action: User ${email} not found in mockUsers during verification.`)
    return { success: false, error: "User not found." }
  }
}

export async function getUserVerificationStatusAction(email: string) {
  console.log(`Server Action: getUserVerificationStatusAction called for ${email}`)
  const user = mockUsers.find((u) => u.email === email)
  if (user) {
    return { success: true, isVerified: user.verified, accountType: user.type }
  }
  return { success: false, isVerified: false, error: "User not found." }
}

// This action would be used by the admin monitor to fetch logs from a database
export async function getEmailLogsAction() {
  console.log("Server Action: getEmailLogsAction called.")
  // In a real application, fetch logs from your database
  // For this demo, we'll return a simplified mock.
  const recentLogs = Object.values(pendingVerifications)
    .map((data, index) => ({
      id: index + 1,
      to: data.email,
      subject: "Verification Email",
      provider: data.emailFailed ? "Failed" : "Unknown", // Cannot determine provider from pending data
      attempts: 1, // Cannot determine attempts from pending data
      status: data.emailFailed ? "failed" : "sent", // Assuming 'sent' if not failed
      error: data.emailFailed ? "Email delivery failed during signup" : undefined,
      timestamp: new Date(data.timestamp).toISOString(),
    }))
    .reverse() // Show most recent first

  return {
    totalSent: recentLogs.filter((log) => log.status === "sent").length,
    totalFailed: recentLogs.filter((log) => log.status === "failed").length,
    recentLogs: recentLogs.slice(0, 10), // Limit to 10 for demo
  }
}

export async function testEmailConfigurationAction() {
  console.log("Server Action: testEmailConfigurationAction called.")
  const emailService = EmailService.getInstance()
  const testEmail: EmailContent = {
    to: "test@example.com", // This email won't actually be sent, just for provider test
    subject: "Test Email Configuration",
    html: "<p>This is a test email to verify configuration.</p>",
    text: "This is a test email to verify configuration.",
  }

  const testResults = []
  // Simulate testing each provider
  // Note: Directly calling private methods for testing purposes.
  if (emailService["resend"]) {
    const startTime = Date.now()
    const success = await emailService["sendViaResend"](testEmail)
    testResults.push({
      name: "Resend",
      status: success ? "✅ Working" : "❌ Failed",
      responseTime: Date.now() - startTime,
    })
  }
  if (emailService["brevoApiInstance"]) {
    const startTime = Date.now()
    const success = await emailService["sendViaBrevo"](testEmail)
    testResults.push({
      name: "Brevo",
      status: success ? "✅ Working" : "❌ Failed",
      responseTime: Date.now() - startTime,
    })
  }
  if (emailService["smtpTransporter"]) {
    const startTime = Date.now()
    const success = await emailService["sendViaSMTP"](testEmail)
    testResults.push({
      name: "SMTP",
      status: success ? "✅ Working" : "❌ Failed",
      responseTime: Date.now() - startTime,
    })
  }

  const overallStatus = testResults.some((r) => r.status.includes("✅")) ? "✅ Ready" : "❌ All providers failed"
  console.log("Server Action: Email configuration test results:", { providers: testResults, overallStatus })
  return { providers: testResults, overallStatus }
}

export async function sendTestEmailAction(toEmail: string, subject: string, body: string) {
  console.log(`Server Action: sendTestEmailAction called to ${toEmail} with subject "${subject}"`)
  try {
    const emailService = EmailService.getInstance()
    const emailContent: EmailContent = {
      to: toEmail,
      subject: subject,
      html: `<p>${body}</p>`,
      text: body,
    }
    const emailResult = await emailService.sendEmail(emailContent)
    console.log("Server Action: Test email sending result:", emailResult)
    return emailResult
  } catch (error: any) {
    console.error("Server Action: Failed to send test email:", error.message || error)
    return { success: false, attempts: 0, error: error.message || "Failed to send test email." }
  }
}
