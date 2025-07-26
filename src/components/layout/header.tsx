
"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Search, ShoppingCart, User, Menu, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentUser, setCurrentUser] = useState<any>(null)
  const cartItemCount = 2 // This would come from your cart state

  useEffect(() => {
    // Check for current user in localStorage
    const user = localStorage.getItem("currentUser")
    if (user) {
      setCurrentUser(JSON.parse(user))
    }
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("currentUser")
    localStorage.removeItem("rememberUser")
    setCurrentUser(null)
    window.location.href = "/"
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-green-600 to-red-600" />
            <span className="text-xl font-bold text-primary">KNITTED_GOURMET</span>
            <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">Nigeria</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a
              href="/categories/nigerian-confectioneries"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Confectioneries
            </a>
            <a
              href="/categories/crocheted-bags-purses"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Bags & Purses
            </a>
            <a
              href="/categories/nigerian-clothing"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Clothing
            </a>
            <a
              href="/categories/nigerian-accessories"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Accessories
            </a>
            <a href="/vendors" className="text-sm font-medium hover:text-primary transition-colors">
              Vendors
            </a>
            <a href="/about" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </a>
            <a href="/contact" className="text-sm font-medium hover:text-primary transition-colors">
              Contact
            </a>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <form onSubmit={handleSearch} className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search Nigerian products..."
                className="pl-10 pr-4"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-2">
            {/* Mobile Search */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsSearchOpen(!isSearchOpen)}>
              <Search className="h-5 w-5" />
            </Button>

            {/* Wishlist */}
            <Button variant="ghost" size="icon">
              <a href="/wishlist">
                <Heart className="h-5 w-5" />
              </a>
            </Button>

            {/* Cart */}
            <Button variant="ghost" size="icon" className="relative">
              <a href="/cart">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {cartItemCount}
                  </Badge>
                )}
              </a>
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {currentUser ? (
                  <>
                    <DropdownMenuItem>
                      <a
                        href={
                          currentUser.type === "admin"
                            ? "/admin/dashboard"
                            : currentUser.type === "vendor"
                              ? "/vendor/dashboard"
                              : "/account/dashboard"
                        }
                      >
                        Dashboard
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <a href="/account">My Account</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <a href="/orders">My Orders</a>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>Sign Out</DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem>
                      <a href="/auth/signin">Sign In</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <a href="/auth/signup">Sign Up</a>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <a href="/vendor/signup">Become a Vendor</a>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 mt-6">
                  <a href="/categories/nigerian-confectioneries" className="text-lg font-medium">
                    Confectioneries
                  </a>
                  <a href="/categories/crocheted-bags-purses" className="text-lg font-medium">
                    Bags & Purses
                  </a>
                  <a href="/categories/nigerian-clothing" className="text-lg font-medium">
                    Clothing
                  </a>
                  <a href="/categories/nigerian-accessories" className="text-lg font-medium">
                    Accessories
                  </a>
                  <a href="/vendors" className="text-lg font-medium">
                    Vendors
                  </a>
                  <a href="/about" className="text-lg font-medium">
                    About
                  </a>
                  <a href="/contact" className="text-lg font-medium">
                    Contact
                  </a>
                  <div className="border-t pt-4">
                    {currentUser ? (
                      <>
                        <a
                          href={
                            currentUser.type === "admin"
                              ? "/admin/dashboard"
                              : currentUser.type === "vendor"
                                ? "/vendor/dashboard"
                                : "/account/dashboard"
                          }
                          className="text-lg font-medium block mb-2"
                        >
                          Dashboard
                        </a>
                        <Button
                          onClick={handleLogout}
                          variant="ghost"
                          className="text-lg font-medium w-full justify-start p-0"
                        >
                          Sign Out
                        </Button>
                      </>
                    ) : (
                      <>
                        <a href="/auth/signin" className="text-lg font-medium block mb-2">
                          Sign In
                        </a>
                        <a href="/auth/signup" className="text-lg font-medium">
                          Sign Up
                        </a>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="md:hidden py-4 border-t">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search Nigerian products..."
                className="pl-10 pr-4"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>
        )}
      </div>
    </header>
  )
}
