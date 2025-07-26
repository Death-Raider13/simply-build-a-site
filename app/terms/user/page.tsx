import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function UserTermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 text-green-600">Terms of Service</h1>
            <p className="text-lg text-muted-foreground">
              Terms and conditions for customers using KNITTED_GOURMET Nigeria
            </p>
            <p className="text-sm text-muted-foreground mt-2">Last updated: January 15, 2024</p>
          </div>

          <Card className="border-green-100">
            <CardContent className="p-8 space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4 text-green-600">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground mb-4">
                  Welcome to KNITTED_GOURMET Nigeria. By accessing and using our website and services, you accept and
                  agree to be bound by the terms and provision of this agreement.
                </p>
                <p className="text-muted-foreground">
                  If you do not agree to abide by the above, please do not use this service. You must be at least 18
                  years old to use our services.
                </p>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-bold mb-4 text-green-600">2. Description of Service</h2>
                <p className="text-muted-foreground mb-4">
                  KNITTED_GOURMET Nigeria is an online marketplace that connects customers with Nigerian vendors selling
                  authentic handcrafted products including confectioneries, crocheted bags, clothing, and accessories.
                </p>
                <p className="text-muted-foreground">
                  We provide the platform for transactions but are not directly involved in the actual sale of products.
                  Each vendor is responsible for their own products and services.
                </p>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-bold mb-4 text-green-600">3. User Account</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">3.1 Account Creation</h3>
                    <p className="text-muted-foreground">
                      To make purchases, you must create an account with accurate and complete information. You are
                      responsible for maintaining the confidentiality of your account credentials.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">3.2 Account Security</h3>
                    <p className="text-muted-foreground">
                      You are responsible for all activities that occur under your account. Please notify us immediately
                      of any unauthorized use of your account.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">3.3 Account Termination</h3>
                    <p className="text-muted-foreground">
                      We reserve the right to terminate accounts that violate these terms or engage in fraudulent or
                      harmful activities.
                    </p>
                  </div>
                </div>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-bold mb-4 text-green-600">4. Orders and Payments</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">4.1 Order Placement</h3>
                    <p className="text-muted-foreground">
                      When you place an order, you are making an offer to purchase the product(s) at the listed price.
                      Orders are subject to acceptance by the vendor.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">4.2 Payment Methods</h3>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>Nigerian bank cards (Debit/Credit)</li>
                      <li>Bank transfers</li>
                      <li>USSD payments</li>
                      <li>Mobile money</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">4.3 Pricing and Currency</h3>
                    <p className="text-muted-foreground">
                      All prices are displayed in Nigerian Naira (₦) and include applicable taxes. Shipping costs are
                      calculated separately and displayed before checkout.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">4.4 Order Confirmation</h3>
                    <p className="text-muted-foreground">
                      You will receive an email confirmation once your order is placed and another when it's accepted by
                      the vendor. Payment is processed immediately upon order placement.
                    </p>
                  </div>
                </div>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-bold mb-4 text-green-600">5. Shipping and Delivery</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">5.1 Shipping Areas</h3>
                    <p className="text-muted-foreground">
                      We currently ship to all 36 states in Nigeria and the Federal Capital Territory (FCT).
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">5.2 Delivery Times</h3>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>Lagos/Abuja: 2-3 business days</li>
                      <li>Other major cities: 3-5 business days</li>
                      <li>Remote areas: 5-7 business days</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">5.3 Shipping Costs</h3>
                    <p className="text-muted-foreground">
                      Shipping costs vary by location and are calculated at checkout. Free shipping is available for
                      orders over ₦10,000.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">5.4 Delivery Issues</h3>
                    <p className="text-muted-foreground">
                      If your package is lost or damaged during shipping, please contact us within 48 hours of the
                      expected delivery date. We will work with the vendor and shipping company to resolve the issue.
                    </p>
                  </div>
                </div>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-bold mb-4 text-green-600">6. Returns and Refunds</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">6.1 Return Policy</h3>
                    <p className="text-muted-foreground">
                      You may return items within 7 days of delivery if they are defective, damaged, or significantly
                      different from the description. Items must be in original condition with all packaging.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">6.2 Non-Returnable Items</h3>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>Perishable goods (confectioneries with short shelf life)</li>
                      <li>Personalized or custom-made items</li>
                      <li>Items damaged by misuse</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">6.3 Refund Process</h3>
                    <p className="text-muted-foreground">
                      Approved refunds are processed within 5-7 business days and credited back to your original payment
                      method. Shipping costs are non-refundable unless the item was defective or incorrectly sent.
                    </p>
                  </div>
                </div>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-bold mb-4 text-green-600">7. User Conduct</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">7.1 Prohibited Activities</h3>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>Using the platform for illegal activities</li>
                      <li>Attempting to defraud vendors or other users</li>
                      <li>Posting false or misleading reviews</li>
                      <li>Harassing or threatening other users or vendors</li>
                      <li>Attempting to circumvent our payment system</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">7.2 Reviews and Ratings</h3>
                    <p className="text-muted-foreground">
                      You may leave honest reviews and ratings for products you have purchased. Reviews must be based on
                      your actual experience and must not contain offensive language or personal attacks.
                    </p>
                  </div>
                </div>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-bold mb-4 text-green-600">8. Privacy and Data Protection</h2>
                <p className="text-muted-foreground mb-4">
                  We are committed to protecting your privacy and personal data in accordance with the Nigeria Data
                  Protection Regulation (NDPR). Please review our Privacy Policy for detailed information about how we
                  collect, use, and protect your data.
                </p>
                <p className="text-muted-foreground">
                  By using our services, you consent to the collection and use of your information as described in our
                  Privacy Policy.
                </p>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-bold mb-4 text-green-600">9. Intellectual Property</h2>
                <p className="text-muted-foreground mb-4">
                  All content on the KNITTED_GOURMET Nigeria website, including text, graphics, logos, images, and
                  software, is the property of KNITTED_GOURMET Nigeria or its content suppliers and is protected by
                  Nigerian and international copyright laws.
                </p>
                <p className="text-muted-foreground">
                  You may not reproduce, distribute, or create derivative works from our content without explicit
                  written permission.
                </p>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-bold mb-4 text-green-600">10. Limitation of Liability</h2>
                <p className="text-muted-foreground mb-4">
                  KNITTED_GOURMET Nigeria acts as a marketplace platform and is not responsible for the quality, safety,
                  or legality of products sold by vendors. Our liability is limited to the amount you paid for the
                  specific transaction in question.
                </p>
                <p className="text-muted-foreground">
                  We are not liable for any indirect, incidental, special, or consequential damages arising from your
                  use of our platform or purchase of products.
                </p>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-bold mb-4 text-green-600">11. Dispute Resolution</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">11.1 Customer Service</h3>
                    <p className="text-muted-foreground">
                      For any issues with your order, please first contact the vendor directly. If the issue cannot be
                      resolved, contact our customer service team.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">11.2 Mediation</h3>
                    <p className="text-muted-foreground">
                      KNITTED_GOURMET Nigeria will mediate disputes between customers and vendors to reach a fair
                      resolution. Our decision in such matters is final.
                    </p>
                  </div>
                </div>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-bold mb-4 text-green-600">12. Modifications to Terms</h2>
                <p className="text-muted-foreground mb-4">
                  We reserve the right to modify these terms at any time. Changes will be posted on this page with an
                  updated "Last modified" date. Significant changes will be communicated via email.
                </p>
                <p className="text-muted-foreground">
                  Your continued use of our services after changes are posted constitutes acceptance of the modified
                  terms.
                </p>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-bold mb-4 text-green-600">13. Governing Law</h2>
                <p className="text-muted-foreground mb-4">
                  These terms are governed by the laws of the Federal Republic of Nigeria. Any legal disputes will be
                  resolved in the courts of Lagos State, Nigeria.
                </p>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-bold mb-4 text-green-600">14. Contact Information</h2>
                <p className="text-muted-foreground mb-4">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="space-y-2 text-muted-foreground">
                  <p>
                    <strong>Email:</strong> support@knittedgourmet.ng
                  </p>
                  <p>
                    <strong>Phone:</strong> +234 800 KNITTED
                  </p>
                  <p>
                    <strong>Address:</strong> 123 Victoria Island, Lagos, Nigeria
                  </p>
                  <p>
                    <strong>Business Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM (WAT)
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
