import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Users, Package, Award, MapPin, Phone, Mail } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-50 to-red-50 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              About{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-red-600">
                KNITTED_GOURMET
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Nigeria's premier marketplace connecting local artisans with customers who appreciate authentic,
              handcrafted Nigerian products. From traditional confectioneries to beautiful crocheted bags, we celebrate
              the rich heritage of Nigerian craftsmanship.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-green-600">Our Mission</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  To empower Nigerian artisans and small business owners by providing them with a platform to showcase
                  and sell their authentic, handcrafted products to customers across Nigeria and beyond.
                </p>
                <p className="text-lg text-muted-foreground">
                  We believe in preserving Nigerian traditions while embracing modern e-commerce technology to create
                  sustainable livelihoods for our vendors and deliver exceptional products to our customers.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="/placeholder.svg?height=200&width=200&text=Nigerian+Artisan"
                  alt="Nigerian artisan at work"
                  className="rounded-lg"
                />
                <img
                  src="/placeholder.svg?height=200&width=200&text=Traditional+Crafts"
                  alt="Traditional Nigerian crafts"
                  className="rounded-lg mt-8"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">200+</div>
                <div className="text-muted-foreground">Active Vendors</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">1,000+</div>
                <div className="text-muted-foreground">Products</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">50,000+</div>
                <div className="text-muted-foreground">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">36</div>
                <div className="text-muted-foreground">States Covered</div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-green-600">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-center border-green-100">
                <CardContent className="p-6">
                  <Heart className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Authenticity</h3>
                  <p className="text-sm text-muted-foreground">
                    We celebrate genuine Nigerian craftsmanship and traditional methods
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-green-100">
                <CardContent className="p-6">
                  <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Community</h3>
                  <p className="text-sm text-muted-foreground">
                    Building strong connections between artisans and customers
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-green-100">
                <CardContent className="p-6">
                  <Package className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Quality</h3>
                  <p className="text-sm text-muted-foreground">
                    Ensuring every product meets our high standards of excellence
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-green-100">
                <CardContent className="p-6">
                  <Award className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Excellence</h3>
                  <p className="text-sm text-muted-foreground">
                    Striving for the best in customer service and user experience
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-green-600">Our Story</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-muted-foreground mb-6">
                KNITTED_GOURMET was born from a passion for Nigerian culture and a desire to support local artisans.
                Founded in 2024, we recognized the incredible talent of Nigerian craftspeople and the growing demand for
                authentic, handmade products.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Starting with a small group of vendors in Lagos, we've grown to support artisans across all 36 states of
                Nigeria. Our platform has become a bridge between traditional craftsmanship and modern commerce, helping
                preserve Nigerian heritage while creating economic opportunities.
              </p>
              <p className="text-lg text-muted-foreground">
                Today, we're proud to be Nigeria's leading marketplace for authentic handcrafted products, supporting
                hundreds of vendors and serving thousands of customers who value quality, authenticity, and the rich
                cultural heritage of Nigeria.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-green-600">Get in Touch</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card className="text-center border-green-100">
                <CardContent className="p-6">
                  <MapPin className="h-8 w-8 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Address</h3>
                  <p className="text-sm text-muted-foreground">
                    123 Victoria Island
                    <br />
                    Lagos, Nigeria
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-green-100">
                <CardContent className="p-6">
                  <Phone className="h-8 w-8 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Phone</h3>
                  <p className="text-sm text-muted-foreground">
                    +234 800 KNITTED
                    <br />
                    +234 803 123 4567
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-green-100">
                <CardContent className="p-6">
                  <Mail className="h-8 w-8 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Email</h3>
                  <p className="text-sm text-muted-foreground">
                    support@knittedgourmet.ng
                    <br />
                    vendors@knittedgourmet.ng
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
