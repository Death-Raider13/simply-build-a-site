import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function VendorTermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 text-green-600">Vendor Terms of Service</h1>
            <p className="text-lg text-muted-foreground">Terms and conditions for vendors on KNITTED_GOURMET Nigeria</p>
            <p className="text-sm text-muted-foreground mt-2">Last updated: January 15, 2024</p>
          </div>

          <Card className="border-green-100">
            <CardContent className="p-8 space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4 text-green-600">1. Vendor Agreement</h2>
                <p className="text-muted-foreground mb-4">
                  By registering as a vendor on KNITTED_GOURMET Nigeria, you agree to these terms and conditions. This
                  agreement governs your relationship with KNITTED_GOURMET Nigeria and your use of our platform to sell
                  your products.
                </p>
                <p className="text-muted-foreground">
                  You must be at least 18 years old and legally capable of entering into contracts to become a vendor.
                  If you are registering on behalf of a business, you must have the authority to bind that business to
                  these terms.
                </p>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-bold mb-4 text-green-600">2. Vendor Registration and Approval</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">2.1 Application Process</h3>
                    <p className="text-muted-foreground">
                      All vendor applications are subject to review and approval by KNITTED_GOURMET Nigeria. We reserve
                      the right to reject any application at our sole discretion.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">2.2 Required Information</h3>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>Valid business registration documents (if applicable)</li>
                      <li>Tax identification number (TIN)</li>
                      <li>Bank account details for payments</li>
                      <li>Valid government-issued ID</li>
                      <li>Business address and contact information</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">2.3 Verification Process</h3>
                    <p className="text-muted-foreground">
                      We may require additional documentation or verification steps to confirm your identity and
                      business legitimacy. This process typically takes 2-5 business days.
                    </p>
                  </div>
                </div>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-bold mb-4 text-green-600">3. Product Listings and Standards</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">3.1 Product Requirements</h3>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>Products must be authentic Nigerian-made or Nigerian-themed items</li>
                      <li>All products must comply with Nigerian laws and regulations</li>
                      <li>Products must be accurately described with clear, high-quality images</li>
                      <li>Pricing must be in Nigerian Naira (₦)</li>
                      <li>Products must be available for immediate shipment when listed as "in stock"</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">3.2 Prohibited Items</h3>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>Counterfeit or replica products</li>
                      <li>Illegal substances or products</li>
                      <li>Weapons or dangerous items</li>
                      <li>Adult content or services</li>
                      <li>Products that infringe on intellectual property rights</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">3.3 Quality Standards</h3>
                    <p className="text-muted-foreground">
                      All products must meet our quality standards. We reserve the right to remove listings that do not
                      meet these standards or receive consistent negative feedback.
                    </p>
                  </div>
                </div>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-bold mb-4 text-green-600">4. Commission and Fees</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">4.1 Commission Structure</h3>
                    <p className="text-muted-foreground mb-2">
                      KNITTED_GOURMET Nigeria charges a commission on each successful sale:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>Standard commission: 15% of the sale price</li>
                      <li>Featured product promotion: Additional 2% for featured listings</li>
                      <li>Payment processing fees: 2.5% of transaction value</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">4.2 Payment Terms</h3>
                    <p className="text-muted-foreground">
                      Payments are processed weekly, every Friday, for orders completed in the previous week. Funds are
                      transferred to your registered bank account within 2-3 business days.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">4.3 Refunds and Chargebacks</h3>
                    <p className="text-muted-foreground">
                      In case of refunds or chargebacks, the full amount including our commission will be deducted from
                      your next payment or charged to your account.
                    </p>
                  </div>
                </div>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-bold mb-4 text-green-600">5. Order Fulfillment and Shipping</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">5.1 Processing Time</h3>
                    <p className="text-muted-foreground">
                      Orders must be processed and shipped within 2 business days of confirmation. Failure to meet this
                      requirement may result in account penalties.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">5.2 Shipping Requirements</h3>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>Use approved shipping partners (GIG Logistics, DHL Nigeria, etc.)</li>
                      <li>Provide tracking information within 24 hours of shipment</li>
                      <li>Package items securely to prevent damage</li>
                      <li>Include invoice and return instructions</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">5.3 Delivery Standards</h3>
                    <p className="text-muted-foreground">
                      Standard delivery within Nigeria should be completed within 5-7 business days. Express delivery
                      options should be completed within 2-3 business days.
                    </p>
                  </div>
                </div>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-bold mb-4 text-green-600">6. Customer Service and Returns</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">6.1 Customer Communication</h3>
                    <p className="text-muted-foreground">
                      Vendors must respond to customer inquiries within 24 hours during business days. All communication
                      must be professional and courteous.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">6.2 Return Policy</h3>
                    <p className="text-muted-foreground">
                      Vendors must accept returns within 7 days of delivery for defective or significantly
                      misrepresented items. Return shipping costs for defective items are the vendor's responsibility.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">6.3 Dispute Resolution</h3>
                    <p className="text-muted-foreground">
                      KNITTED_GOURMET Nigeria will mediate disputes between vendors and customers. Vendors must
                      cooperate fully with our dispute resolution process.
                    </p>
                  </div>
                </div>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-bold mb-4 text-green-600">7. Performance Standards</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">7.1 Key Performance Indicators</h3>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>Order fulfillment rate: Minimum 95%</li>
                      <li>On-time shipping rate: Minimum 90%</li>
                      <li>Customer satisfaction rating: Minimum 4.0/5.0</li>
                      <li>Response time to customer inquiries: Maximum 24 hours</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">7.2 Performance Review</h3>
                    <p className="text-muted-foreground">
                      Vendor performance is reviewed monthly. Consistently poor performance may result in account
                      restrictions or termination.
                    </p>
                  </div>
                </div>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-bold mb-4 text-green-600">8. Account Suspension and Termination</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">8.1 Grounds for Suspension</h3>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>Violation of these terms of service</li>
                      <li>Selling prohibited items</li>
                      <li>Consistently poor performance metrics</li>
                      <li>Fraudulent activity or misrepresentation</li>
                      <li>Failure to respond to customer complaints</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">8.2 Termination Process</h3>
                    <p className="text-muted-foreground">
                      We may suspend or terminate vendor accounts with or without notice. Upon termination, all pending
                      payments will be processed according to our standard payment schedule, minus any applicable fees
                      or penalties.
                    </p>
                  </div>
                </div>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-bold mb-4 text-green-600">9. Intellectual Property</h2>
                <p className="text-muted-foreground mb-4">
                  Vendors retain ownership of their product images, descriptions, and brand materials. However, by
                  listing products on our platform, you grant KNITTED_GOURMET Nigeria a non-exclusive license to use
                  these materials for marketing and promotional purposes.
                </p>
                <p className="text-muted-foreground">
                  Vendors must ensure they have the right to sell all listed products and that their listings do not
                  infringe on any third-party intellectual property rights.
                </p>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-bold mb-4 text-green-600">10. Limitation of Liability</h2>
                <p className="text-muted-foreground mb-4">
                  KNITTED_GOURMET Nigeria acts as a marketplace platform connecting vendors with customers. We are not
                  responsible for the quality, safety, or legality of products sold by vendors.
                </p>
                <p className="text-muted-foreground">
                  Vendors are solely responsible for their products, customer service, and compliance with applicable
                  laws and regulations. KNITTED_GOURMET Nigeria's liability is limited to the fees paid by the vendor in
                  the preceding 12 months.
                </p>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-bold mb-4 text-green-600">11. Data Protection and Privacy</h2>
                <p className="text-muted-foreground mb-4">
                  Vendors must comply with applicable data protection laws, including the Nigeria Data Protection
                  Regulation (NDPR). Customer data shared through our platform must be used solely for order fulfillment
                  and customer service purposes.
                </p>
                <p className="text-muted-foreground">
                  Vendors may not use customer data for marketing purposes without explicit consent and may not share
                  customer data with third parties.
                </p>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-bold mb-4 text-green-600">12. Modifications to Terms</h2>
                <p className="text-muted-foreground mb-4">
                  KNITTED_GOURMET Nigeria reserves the right to modify these terms at any time. Vendors will be notified
                  of significant changes via email and through the vendor dashboard.
                </p>
                <p className="text-muted-foreground">
                  Continued use of the platform after modifications constitutes acceptance of the new terms.
                </p>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-bold mb-4 text-green-600">13. Governing Law</h2>
                <p className="text-muted-foreground mb-4">
                  These terms are governed by the laws of the Federal Republic of Nigeria. Any disputes arising from
                  these terms will be resolved through arbitration in Lagos, Nigeria.
                </p>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-bold mb-4 text-green-600">14. Contact Information</h2>
                <p className="text-muted-foreground mb-4">
                  For questions about these vendor terms of service, please contact us:
                </p>
                <div className="space-y-2 text-muted-foreground">
                  <p>
                    <strong>Email:</strong> vendors@knittedgourmet.ng
                  </p>
                  <p>
                    <strong>Phone:</strong> +234 800 KNITTED
                  </p>
                  <p>
                    <strong>Address:</strong> 123 Victoria Island, Lagos, Nigeria
                  </p>
                </div>
              </section>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
