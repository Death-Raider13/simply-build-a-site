
import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import { 
  Search, 
  ShoppingCart, 
  Heart, 
  User, 
  Menu,
  MapPin,
  Phone,
  Mail
} from "lucide-react"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top Bar */}
      <div className="hidden lg:block bg-green-600 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>Nigeria-wide delivery</span>
            </div>
            <div className="flex items-center space-x-1">
              <Phone className="h-4 w-4" />
              <span>+234 803 123 4567</span>
            </div>
            <div className="flex items-center space-x-1">
              <Mail className="h-4 w-4" />
              <span>support@knittedgourmet.ng</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/vendor/signup" className="hover:underline">
              Become a Vendor
            </Link>
            <Link to="/orders/track" className="hover:underline">
              Track Order
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-green-600 to-red-600" />
              <span className="text-2xl font-bold">KNITTED_GOURMET</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link to="/categories/nigerian-confectioneries" className="text-sm font-medium hover:text-green-600 transition-colors">
                Confectioneries
              </Link>
              <Link to="/categories/crocheted-bags-purses" className="text-sm font-medium hover:text-green-600 transition-colors">
                Bags & Purses
              </Link>
              <Link to="/categories/nigerian-clothing" className="text-sm font-medium hover:text-green-600 transition-colors">
                Clothing
              </Link>
              <Link to="/categories/nigerian-accessories" className="text-sm font-medium hover:text-green-600 transition-colors">
                Accessories
              </Link>
              <Link to="/vendors" className="text-sm font-medium hover:text-green-600 transition-colors">
                Vendors
              </Link>
            </nav>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl mx-8 relative hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for authentic Nigerian items..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg bg-muted/50 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              />
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="hidden md:inline-flex" asChild>
              <Link to="/search">
                <Search className="h-5 w-5" />
              </Link>
            </Button>

            <Button variant="ghost" size="icon" asChild>
              <Link to="/wishlist" className="relative">
                <Heart className="h-5 w-5" />
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500">
                  3
                </Badge>
              </Link>
            </Button>

            <Button variant="ghost" size="icon" asChild>
              <Link to="/cart" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-green-600">
                  5
                </Badge>
              </Link>
            </Button>

            <Button variant="ghost" size="icon" asChild>
              <Link to="/account/dashboard">
                <User className="h-5 w-5" />
              </Link>
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4 mt-6">
                  <Link
                    to="/categories/nigerian-confectioneries"
                    className="text-lg font-medium hover:text-green-600 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Confectioneries
                  </Link>
                  <Link
                    to="/categories/crocheted-bags-purses"
                    className="text-lg font-medium hover:text-green-600 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Bags & Purses
                  </Link>
                  <Link
                    to="/categories/nigerian-clothing"
                    className="text-lg font-medium hover:text-green-600 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Clothing
                  </Link>
                  <Link
                    to="/categories/nigerian-accessories"
                    className="text-lg font-medium hover:text-green-600 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Accessories
                  </Link>
                  <Link
                    to="/vendors"
                    className="text-lg font-medium hover:text-green-600 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Vendors
                  </Link>
                  <div className="pt-4 border-t">
                    <Link
                      to="/vendor/signup"
                      className="text-lg font-medium text-green-600 hover:text-green-700 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Become a Vendor
                    </Link>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
