
import Link from "next/link"
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
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/about" className="block text-sm text-muted-foreground hover:text-foreground">
                About Us
              </Link>
              <Link href="/contact" className="block text-sm text-muted-foreground hover:text-foreground">
                Contact
              </Link>
              <Link href="/vendors" className="block text-sm text-muted-foreground hover:text-foreground">
                Our Vendors
              </Link>
              <Link href="/vendor/signup" className="block text-sm text-muted-foreground hover:text-foreground">
                Become a Vendor
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Categories</h3>
            <div className="space-y-2">
              <Link href="/categories/nigerian-confectioneries" className="block text-sm text-muted-foreground hover:text-foreground">
                Confectioneries
              </Link>
              <Link href="/categories/crocheted-bags-purses" className="block text-sm text-muted-foreground hover:text-foreground">
                Bags & Purses
              </Link>
              <Link href="/categories/nigerian-clothing" className="block text-sm text-muted-foreground hover:text-foreground">
                Clothing
              </Link>
              <Link href="/categories/nigerian-accessories" className="block text-sm text-muted-foreground hover:text-foreground">
                Accessories
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Support</h3>
            <div className="space-y-2">
              <Link href="/terms/user" className="block text-sm text-muted-foreground hover:text-foreground">
                Terms of Service
              </Link>
              <Link href="/terms/vendor" className="block text-sm text-muted-foreground hover:text-foreground">
                Vendor Terms
              </Link>
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
