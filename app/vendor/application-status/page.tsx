"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, AlertCircle, Mail, Phone } from "lucide-react"

export default function VendorApplicationStatusPage() {
  const [applicationStatus] = useState({
    id: "APP-VND-2024-001",
    status: "under_review",
    submittedDate: "2024-01-15",
    estimatedReviewDate: "2024-01-18",
    steps: [
      { id: "submitted", title: "Application Submitted", status: "completed", date: "2024-01-15" },
      { id: "documents", title: "Document Verification", status: "completed", date: "2024-01-16" },
      { id: "review", title: "Application Review", status: "in_progress", date: null },
      { id: "approval", title: "Final Approval", status: "pending", date: null },
      { id: "setup", title: "Account Setup", status: "pending", date: null },
    ],
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-600"
      case "in_progress":
        return "bg-blue-600"
      case "pending":
        return "bg-gray-300"
      default:
        return "bg-gray-300"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "in_progress":
        return <Clock className="h-5 w-5 text-blue-600" />
      case "pending":
        return <Clock className="h-5 w-5 text-gray-400" />
      default:
        return <Clock className="h-5 w-5 text-gray-400" />
    }
  }

  const completedSteps = applicationStatus.steps.filter((step) => step.status === "completed").length
  const progress = (completedSteps / applicationStatus.steps.length) * 100

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4 text-green-600">Application Status</h1>
            <p className="text-lg text-muted-foreground">Track the progress of your vendor application</p>
          </div>

          {/* Status Overview */}
          <Card className="border-green-100 mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-green-600">Application #{applicationStatus.id}</CardTitle>
                  <CardDescription>Submitted on {applicationStatus.submittedDate}</CardDescription>
                </div>
                <Badge className="bg-blue-600">Under Review</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Application Progress</span>
                    <span className="text-sm text-muted-foreground">
                      {completedSteps} of {applicationStatus.steps.length} steps completed
                    </span>
                  </div>
                  <Progress value={progress} className="h-3" />
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-800">Estimated Review Completion</p>
                      <p className="text-sm text-blue-700">
                        Your application is expected to be reviewed by {applicationStatus.estimatedReviewDate}. We'll
                        notify you via email once the review is complete.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Application Steps */}
          <Card className="border-green-100 mb-8">
            <CardHeader>
              <CardTitle className="text-green-600">Application Timeline</CardTitle>
              <CardDescription>Track each step of your application process</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {applicationStatus.steps.map((step, index) => (
                  <div key={step.id} className="flex items-start space-x-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${getStatusColor(step.status)}`}
                      >
                        {getStatusIcon(step.status)}
                      </div>
                      {index < applicationStatus.steps.length - 1 && (
                        <div className="w-0.5 h-12 bg-gray-200 mt-2"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">{step.title}</h3>
                        {step.date && <span className="text-sm text-muted-foreground">{step.date}</span>}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {step.status === "completed" && "✓ Completed successfully"}
                        {step.status === "in_progress" && "Currently being processed by our team"}
                        {step.status === "pending" && "Waiting for previous steps to complete"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="border-green-100 mb-8">
            <CardHeader>
              <CardTitle className="text-green-600">What Happens Next?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-green-600">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Application Review</h4>
                    <p className="text-sm text-muted-foreground">
                      Our team is currently reviewing your application and documents. This typically takes 2-3 business
                      days.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-gray-600">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Approval Notification</h4>
                    <p className="text-sm text-muted-foreground">
                      Once approved, you'll receive an email with your vendor dashboard access and next steps.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-gray-600">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Start Selling</h4>
                    <p className="text-sm text-muted-foreground">
                      Complete your store setup and start listing your products on KNITTED_GOURMET Nigeria.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="border-green-100">
            <CardHeader>
              <CardTitle className="text-green-600">Need Help?</CardTitle>
              <CardDescription>Contact our vendor support team if you have any questions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium">Email Support</p>
                    <p className="text-sm text-muted-foreground">vendors@knittedgourmet.ng</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium">Phone Support</p>
                    <p className="text-sm text-muted-foreground">+234 800 KNITTED</p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Button className="bg-green-600 hover:bg-green-700">
                  <Mail className="h-4 w-4 mr-2" />
                  Contact Support
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
