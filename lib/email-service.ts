import { Resend } from "resend"
import * as SibApiV3Sdk from "@sendinblue/client" // Brevo SDK
import nodemailer from "nodemailer"

export interface EmailContent {
  to: string
  subject: string
  html: string
  text: string
  from?: string // Optional, will default to EMAIL_FROM env
}

export interface EmailResult {
  success: boolean
  provider?: string
  attempts: number
  error?: string
}

export class EmailService {
  private static instance: EmailService
  private resend: Resend | null = null
  private brevoApiInstance: SibApiV3Sdk.TransactionalEmailsApi | null = null
  private smtpTransporter: nodemailer.Transporter | null = null
  private defaultFromEmail: string

  private constructor() {
    this.defaultFromEmail = process.env.EMAIL_FROM || "no-reply@example.com"
    console.log(`EmailService: Initializing with defaultFromEmail: ${this.defaultFromEmail}`)

    // Initialize Resend
    if (process.env.RESEND_API_KEY) {
      this.resend = new Resend(process.env.RESEND_API_KEY)
      console.log("EmailService: Resend initialized.")
    } else {
      console.warn("EmailService: RESEND_API_KEY not found. Resend will not be used.")
    }

    // Initialize Brevo (Sendinblue)
    if (process.env.BREVO_API_KEY) {
      this.brevoApiInstance = new SibApiV3Sdk.TransactionalEmailsApi()
      this.brevoApiInstance.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY)
      console.log("EmailService: Brevo initialized.")
    } else {
      console.warn("EmailService: BREVO_API_KEY not found. Brevo will not be used.")
    }

    // Initialize SMTP (Nodemailer)
    if (process.env.SMTP_HOST && process.env.SMTP_PORT && process.env.SMTP_USER && process.env.SMTP_PASS) {
      this.smtpTransporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number.parseInt(process.env.SMTP_PORT, 10),
        secure: Number.parseInt(process.env.SMTP_PORT, 10) === 465, // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      })
      console.log("EmailService: SMTP transporter initialized.")
    } else {
      console.warn("EmailService: SMTP environment variables not fully configured. SMTP will not be used.")
    }

    if (!this.resend && !this.brevoApiInstance && !this.smtpTransporter) {
      console.error("EmailService: No email providers configured. Email sending will fail.")
    }
  }

  public static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService()
    }
    return EmailService.instance
  }

  public async sendViaResend(content: EmailContent): Promise<boolean> {
    if (!this.resend) {
      console.log("Resend: Not initialized.")
      return false
    }
    try {
      console.log(`Resend: Attempting to send email to ${content.to} with subject "${content.subject}"`)
      const { data, error } = await this.resend.emails.send({
        from: content.from || this.defaultFromEmail,
        to: content.to,
        subject: content.subject,
        html: content.html,
        text: content.text,
      })

      if (error) {
        console.error("Resend: Email failed:", error)
        return false
      }
      console.log("Resend: Email sent successfully:", data)
      return true
    } catch (err: any) {
      console.error("Resend: Email exception:", err.message || err)
      return false
    }
  }

  public async sendViaBrevo(content: EmailContent): Promise<boolean> {
    if (!this.brevoApiInstance) {
      console.log("Brevo: Not initialized.")
      return false
    }
    try {
      console.log(`Brevo: Attempting to send email to ${content.to} with subject "${content.subject}"`)
      const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail()
      sendSmtpEmail.sender = { email: content.from || this.defaultFromEmail }
      sendSmtpEmail.to = [{ email: content.to }]
      sendSmtpEmail.subject = content.subject
      sendSmtpEmail.htmlContent = content.html
      sendSmtpEmail.textContent = content.text

      const response = await this.brevoApiInstance.sendTransacEmail(sendSmtpEmail)
      console.log("Brevo: Email sent successfully:", response.body)
      return true
    } catch (err: any) {
      console.error("Brevo: Email exception:", err.message || err)
      return false
    }
  }

  public async sendViaSMTP(content: EmailContent): Promise<boolean> {
    if (!this.smtpTransporter) {
      console.log("SMTP: Not initialized.")
      return false
    }
    try {
      console.log(`SMTP: Attempting to send email to ${content.to} with subject "${content.subject}"`)
      const info = await this.smtpTransporter.sendMail({
        from: content.from || this.defaultFromEmail,
        to: content.to,
        subject: content.subject,
        html: content.html,
        text: content.text,
      })
      console.log("SMTP: Email sent successfully:", info.messageId)
      return true
    } catch (err: any) {
      console.error("SMTP: Email exception:", err.message || err)
      return false
    }
  }

  public async sendEmail(content: EmailContent): Promise<EmailResult> {
    let attempts = 0
    let lastError: string | undefined

    console.log(`EmailService: Starting email send attempt for ${content.to}`)

    // Try Resend first
    if (this.resend) {
      attempts++
      console.log(`EmailService: Attempt ${attempts} via Resend.`)
      const success = await this.sendViaResend(content)
      if (success) return { success: true, provider: "Resend", attempts }
      lastError = "Resend failed"
    }

    // Try Brevo second
    if (this.brevoApiInstance) {
      attempts++
      console.log(`EmailService: Attempt ${attempts} via Brevo.`)
      const success = await this.sendViaBrevo(content)
      if (success) return { success: true, provider: "Brevo", attempts }
      lastError = "Brevo failed"
    }

    // Try SMTP last
    if (this.smtpTransporter) {
      attempts++
      console.log(`EmailService: Attempt ${attempts} via SMTP.`)
      const success = await this.sendViaSMTP(content)
      if (success) return { success: true, provider: "SMTP", attempts }
      lastError = "SMTP failed"
    }

    console.error(`EmailService: All email providers failed for ${content.to}. Last error: ${lastError}`)
    return { success: false, attempts, error: lastError || "No email providers configured or all failed." }
  }

  public generateVerificationEmail(toEmail: string, verificationCode: string, userName: string): EmailContent {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    const verificationLink = `${baseUrl}/auth/verify-email?email=${encodeURIComponent(toEmail)}&code=${verificationCode}`

    return {
      to: toEmail,
      subject: "Verify Your KNITTED_GOURMET Account",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <div style="text-align: center; margin-bottom: 20px;">
              <img src="${baseUrl}/placeholder-logo.png" alt="KNITTED_GOURMET Logo" style="max-width: 150px;">
            </div>
            <h2 style="color: #4CAF50;">Hello ${userName},</h2>
            <p>Thank you for registering with KNITTED_GOURMET Nigeria! To activate your account, please verify your email address by entering the code below on our verification page:</p>
            <p style="font-size: 24px; font-weight: bold; text-align: center; background-color: #f0f0f0; padding: 15px; border-radius: 5px; letter-spacing: 3px;">
              ${verificationCode}
            </p>
            <p>Alternatively, you can click the link below to verify your account:</p>
            <p style="text-align: center;">
              <a href="${verificationLink}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: #ffffff; text-decoration: none; border-radius: 5px;">Verify My Account</a>
            </p>
            <p>This code is valid for 15 minutes. If you did not request this, please ignore this email.</p>
            <p>Best regards,<br>The KNITTED_GOURMET Team</p>
            <hr style="border: none; border-top: 1px solid #eee; margin-top: 20px;">
            <p style="text-align: center; font-size: 12px; color: #888;">
              KNITTED_GOURMET Nigeria | Your destination for Nigerian confectioneries, crocheted bags, clothing, and accessories
            </p>
          </div>
        </div>
      `,
      text: `Hello ${userName},\n\nThank you for registering with KNITTED_GOURMET Nigeria! To activate your account, please verify your email address using the code: ${verificationCode}\n\nAlternatively, click the link: ${verificationLink}\n\nThis code is valid for 15 minutes. If you did not request this, please ignore this email.\n\nBest regards,\nThe KNITTED_GOURMET Team`,
    }
  }
}
