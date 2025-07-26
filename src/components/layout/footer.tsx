
import { Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-green-600 to-red-600" />
              <span className="text-xl font-bold">KNITTED_GOURMET</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Nigeria's premier marketplace for authentic handcrafted confectioneries, bags, clothing, and accessories.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <a href="/about" className="block text-sm text-muted-foreground hover:text-foreground">
                About Us
              </a>
              <a href="/contact" className="block text-sm text-muted-foreground hover:text-foreground">
                Contact
              </a>
              <a href="/vendors" className="block text-sm text-muted-foreground hover:text-foreground">
                Our Vendors
              </a>
              <a href="/vendor/signup" className="block text-sm text-muted-foreground hover:text-foreground">
                Become a Vendor
              </a>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Categories</h3>
            <div className="space-y-2">
              <a href="/categories/nigerian-confectioneries" className="block text-sm text-muted-foreground hover:text-foreground">
                Confectioneries
              </a>
              <a href="/categories/crocheted-bags-purses" className="block text-sm text-muted-foreground hover:text-foreground">
                Bags & Purses
              </a>
              <a href="/categories/nigerian-clothing" className="block text-sm text-muted-foreground hover:text-foreground">
                Clothing
              </a>
              <a href="/categories/nigerian-accessories" className="block text-sm text-muted-foreground hover:text-foreground">
                Accessories
              </a>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Support</h3>
            <div className="space-y-2">
              <a href="/terms/user" className="block text-sm text-muted-foreground hover:text-foreground">
                Terms of Service
              </a>
              <a href="/terms/vendor" className="block text-sm text-muted-foreground hover:text-foreground">
                Vendor Terms
              </a>
              <p className="text-sm text-muted-foreground">
                Email: support@knittedgourmet.ng
              </p>
              <p className="text-sm text-muted-foreground">
                Phone: +234 803 123 4567
              </p>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 KNITTED_GOURMET Nigeria. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
