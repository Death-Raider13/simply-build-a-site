"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Upload, FileText, Building, CreditCard, Mail, Store } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const ONBOARDING_STEPS = [
  { id: "verification", title: "Email Verification", icon: Mail },
  { id: "business", title: "Business Information", icon: Building },
  { id: "documents", title: "Document Upload", icon: FileText },
  { id: "banking", title: "Banking Details", icon: CreditCard },
  { id: "store", title: "Store Setup", icon: Store },
  { id: "review", title: "Review & Submit", icon: CheckCircle },
]

export default function VendorOnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    // Email verification
    email: "",
    verificationCode: "",

    // Business information
    businessName: "",
    businessType: "",
    businessAddress: "",
    city: "",
    state: "",
    postalCode: "",
    phoneNumber: "",
    website: "",
    businessDescription: "",

    // Documents
    businessRegistration: null,
    taxCertificate: null,
    identityDocument: null,

    // Banking
    bankName: "",
    accountNumber: "",
    accountName: "",
    bvn: "",

    // Store setup
    storeName: "",
    storeDescription: "",
    categories: [],
    shippingMethods: [],
    returnPolicy: "",

    // Agreements
    agreeToTerms: false,
    agreeToCommission: false,
  })

  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  useEffect(() => {
    const step = searchParams.get("step")
    if (step) {
      const stepIndex = ONBOARDING_STEPS.findIndex((s) => s.id === step)
      if (stepIndex !== -1) {
        setCurrentStep(stepIndex)
      }
    }
  }, [searchParams])

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleSubmit = async () => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Application Submitted!",
        description:
          "Your vendor application has been submitted for review. We'll contact you within 2-3 business days.",
      })

      router.push("/vendor/application-status")
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      })
    }
  }

  const renderStepContent = () => {
    const step = ONBOARDING_STEPS[currentStep]

    switch (step.id) {
      case "verification":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Mail className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Verify Your Email</h3>
              <p className="text-muted-foreground">
                We've sent a verification code to your email address. Please enter it below.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <Label htmlFor="verificationCode">Verification Code</Label>
                <Input
                  id="verificationCode"
                  value={formData.verificationCode}
                  onChange={(e) => handleInputChange("verificationCode", e.target.value)}
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                />
              </div>

              <Button variant="outline" className="w-full bg-transparent">
                Resend Code
              </Button>
            </div>
          </div>
        )

      case "business":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Building className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Business Information</h3>
              <p className="text-muted-foreground">Tell us about your business to help customers find you.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="businessName">Business Name *</Label>
                <Input
                  id="businessName"
                  value={formData.businessName}
                  onChange={(e) => handleInputChange("businessName", e.target.value)}
                  placeholder="Your Business Name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="businessType">Business Type *</Label>
                <Select
                  value={formData.businessType}
                  onValueChange={(value) => handleInputChange("businessType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sole_proprietorship">Sole Proprietorship</SelectItem>
                    <SelectItem value="partnership">Partnership</SelectItem>
                    <SelectItem value="limited_company">Limited Company</SelectItem>
                    <SelectItem value="cooperative">Cooperative</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="businessAddress">Business Address *</Label>
                <Input
                  id="businessAddress"
                  value={formData.businessAddress}
                  onChange={(e) => handleInputChange("businessAddress", e.target.value)}
                  placeholder="Street address"
                  required
                />
              </div>

              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  placeholder="City"
                  required
                />
              </div>

              <div>
                <Label htmlFor="state">State *</Label>
                <Select value={formData.state} onValueChange={(value) => handleInputChange("state", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lagos">Lagos</SelectItem>
                    <SelectItem value="abuja">FCT Abuja</SelectItem>
                    <SelectItem value="kano">Kano</SelectItem>
                    <SelectItem value="rivers">Rivers</SelectItem>
                    <SelectItem value="oyo">Oyo</SelectItem>
                    {/* Add more states */}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="phoneNumber">Phone Number *</Label>
                <Input
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                  placeholder="+234 803 123 4567"
                  required
                />
              </div>

              <div>
                <Label htmlFor="website">Website (Optional)</Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => handleInputChange("website", e.target.value)}
                  placeholder="https://yourwebsite.com"
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="businessDescription">Business Description *</Label>
                <Textarea
                  id="businessDescription"
                  value={formData.businessDescription}
                  onChange={(e) => handleInputChange("businessDescription", e.target.value)}
                  placeholder="Describe your business, products, and what makes you unique..."
                  rows={4}
                  required
                />
              </div>
            </div>
          </div>
        )

      case "documents":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <FileText className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Document Upload</h3>
              <p className="text-muted-foreground">Upload required documents to verify your business.</p>
            </div>

            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm font-medium">Business Registration Certificate</p>
                <p className="text-xs text-muted-foreground">Upload CAC certificate or business registration</p>
                <Button variant="outline" className="mt-2 bg-transparent">
                  Choose File
                </Button>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm font-medium">Tax Identification Number (TIN)</p>
                <p className="text-xs text-muted-foreground">Upload TIN certificate</p>
                <Button variant="outline" className="mt-2 bg-transparent">
                  Choose File
                </Button>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm font-medium">Valid ID Document</p>
                <p className="text-xs text-muted-foreground">
                  National ID, Driver's License, or International Passport
                </p>
                <Button variant="outline" className="mt-2 bg-transparent">
                  Choose File
                </Button>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> All documents must be clear, legible, and valid. Accepted formats: PDF, JPG, PNG
                (Max 5MB per file)
              </p>
            </div>
          </div>
        )

      case "banking":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <CreditCard className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Banking Details</h3>
              <p className="text-muted-foreground">Provide your banking information for payments.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="bankName">Bank Name *</Label>
                <Select value={formData.bankName} onValueChange={(value) => handleInputChange("bankName", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your bank" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="access">Access Bank</SelectItem>
                    <SelectItem value="gtb">Guaranty Trust Bank</SelectItem>
                    <SelectItem value="zenith">Zenith Bank</SelectItem>
                    <SelectItem value="first">First Bank</SelectItem>
                    <SelectItem value="uba">United Bank for Africa</SelectItem>
                    <SelectItem value="fidelity">Fidelity Bank</SelectItem>
                    {/* Add more banks */}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="accountNumber">Account Number *</Label>
                <Input
                  id="accountNumber"
                  value={formData.accountNumber}
                  onChange={(e) => handleInputChange("accountNumber", e.target.value)}
                  placeholder="1234567890"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="accountName">Account Name *</Label>
                <Input
                  id="accountName"
                  value={formData.accountName}
                  onChange={(e) => handleInputChange("accountName", e.target.value)}
                  placeholder="Account holder name"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="bvn">Bank Verification Number (BVN) *</Label>
                <Input
                  id="bvn"
                  value={formData.bvn}
                  onChange={(e) => handleInputChange("bvn", e.target.value)}
                  placeholder="12345678901"
                  maxLength={11}
                  required
                />
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Security Note:</strong> Your banking information is encrypted and secure. We use this
                information solely for processing your vendor payments.
              </p>
            </div>
          </div>
        )

      case "store":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Store className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Store Setup</h3>
              <p className="text-muted-foreground">Set up your store profile and policies.</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="storeName">Store Name *</Label>
                <Input
                  id="storeName"
                  value={formData.storeName}
                  onChange={(e) => handleInputChange("storeName", e.target.value)}
                  placeholder="Your store name as it will appear to customers"
                  required
                />
              </div>

              <div>
                <Label htmlFor="storeDescription">Store Description *</Label>
                <Textarea
                  id="storeDescription"
                  value={formData.storeDescription}
                  onChange={(e) => handleInputChange("storeDescription", e.target.value)}
                  placeholder="Describe your store and what customers can expect..."
                  rows={4}
                  required
                />
              </div>

              <div>
                <Label>Product Categories *</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {["Confectioneries", "Bags", "Clothing", "Accessories", "Home Decor", "Crafts"].map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={category}
                        checked={formData.categories.includes(category)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            handleInputChange("categories", [...formData.categories, category])
                          } else {
                            handleInputChange(
                              "categories",
                              formData.categories.filter((c) => c !== category),
                            )
                          }
                        }}
                      />
                      <Label htmlFor={category} className="text-sm">
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Shipping Methods *</Label>
                <div className="space-y-2 mt-2">
                  {[
                    "Standard Delivery (5-7 days)",
                    "Express Delivery (2-3 days)",
                    "Same Day Delivery (Lagos only)",
                  ].map((method) => (
                    <div key={method} className="flex items-center space-x-2">
                      <Checkbox
                        id={method}
                        checked={formData.shippingMethods.includes(method)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            handleInputChange("shippingMethods", [...formData.shippingMethods, method])
                          } else {
                            handleInputChange(
                              "shippingMethods",
                              formData.shippingMethods.filter((m) => m !== method),
                            )
                          }
                        }}
                      />
                      <Label htmlFor={method} className="text-sm">
                        {method}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="returnPolicy">Return Policy *</Label>
                <Textarea
                  id="returnPolicy"
                  value={formData.returnPolicy}
                  onChange={(e) => handleInputChange("returnPolicy", e.target.value)}
                  placeholder="Describe your return and refund policy..."
                  rows={3}
                  required
                />
              </div>
            </div>
          </div>
        )

      case "review":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Review & Submit</h3>
              <p className="text-muted-foreground">
                Please review your information before submitting your application.
              </p>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Business Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p>
                    <strong>Business Name:</strong> {formData.businessName}
                  </p>
                  <p>
                    <strong>Business Type:</strong> {formData.businessType}
                  </p>
                  <p>
                    <strong>Location:</strong> {formData.city}, {formData.state}
                  </p>
                  <p>
                    <strong>Phone:</strong> {formData.phoneNumber}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Store Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p>
                    <strong>Store Name:</strong> {formData.storeName}
                  </p>
                  <p>
                    <strong>Categories:</strong> {formData.categories.join(", ")}
                  </p>
                  <p>
                    <strong>Shipping Methods:</strong> {formData.shippingMethods.length} selected
                  </p>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked)}
                    required
                  />
                  <Label htmlFor="agreeToTerms" className="text-sm">
                    I agree to the{" "}
                    <a href="/terms/vendor" className="text-green-600 hover:underline" target="_blank" rel="noreferrer">
                      Vendor Terms of Service
                    </a>
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="agreeToCommission"
                    checked={formData.agreeToCommission}
                    onCheckedChange={(checked) => handleInputChange("agreeToCommission", checked)}
                    required
                  />
                  <Label htmlFor="agreeToCommission" className="text-sm">
                    I understand and agree to the 15% commission structure
                  </Label>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const progress = ((currentStep + 1) / ONBOARDING_STEPS.length) * 100

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4 text-green-600">Vendor Onboarding</h1>
            <p className="text-lg text-muted-foreground">
              Complete your vendor registration to start selling on KNITTED_GOURMET Nigeria
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              {ONBOARDING_STEPS.map((step, index) => {
                const Icon = step.icon
                const isActive = index === currentStep
                const isCompleted = index < currentStep

                return (
                  <div key={step.id} className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                        isCompleted
                          ? "bg-green-600 text-white"
                          : isActive
                            ? "bg-green-100 text-green-600 border-2 border-green-600"
                            : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <span
                      className={`text-xs text-center ${isActive ? "text-green-600 font-medium" : "text-gray-500"}`}
                    >
                      {step.title}
                    </span>
                  </div>
                )
              })}
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Step Content */}
          <Card className="border-green-100">
            <CardContent className="p-8">{renderStepContent()}</CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
            >
              Previous
            </Button>

            {currentStep === ONBOARDING_STEPS.length - 1 ? (
              <Button
                onClick={handleSubmit}
                className="bg-green-600 hover:bg-green-700"
                disabled={!formData.agreeToTerms || !formData.agreeToCommission}
              >
                Submit Application
              </Button>
            ) : (
              <Button onClick={handleNext} className="bg-green-600 hover:bg-green-700">
                Next
              </Button>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
