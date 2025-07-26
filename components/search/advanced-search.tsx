"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Search, Filter, X } from "lucide-react"

interface SearchFilters {
  query: string
  category: string
  priceRange: [number, number]
  location: string
  vendor: string
  inStock: boolean
  featured: boolean
  sortBy: string
}

interface AdvancedSearchProps {
  onSearch: (filters: SearchFilters) => void
  onClear: () => void
}

const categories = [
  { value: "all", label: "All Categories" },
  { value: "nigerian-confectioneries", label: "Nigerian Confectioneries" },
  { value: "crocheted-bags-purses", label: "Crocheted Bags & Purses" },
  { value: "nigerian-clothing", label: "Nigerian Clothing" },
  { value: "nigerian-accessories", label: "Nigerian Accessories" },
]

const nigerianStates = [
  "All States",
  "Lagos",
  "Abuja",
  "Kano",
  "Rivers",
  "Oyo",
  "Kaduna",
  "Ogun",
  "Anambra",
  "Imo",
  "Delta",
  "Edo",
  "Plateau",
  "Cross River",
]

const sortOptions = [
  { value: "relevance", label: "Most Relevant" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "newest", label: "Newest First" },
  { value: "rating", label: "Highest Rated" },
  { value: "popular", label: "Most Popular" },
]

export function AdvancedSearch({ onSearch, onClear }: AdvancedSearchProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    category: "all",
    priceRange: [0, 50000],
    location: "all",
    vendor: "",
    inStock: false,
    featured: false,
    sortBy: "relevance",
  })

  const [isExpanded, setIsExpanded] = useState(false)

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleSearch = () => {
    onSearch(filters)
  }

  const handleClear = () => {
    setFilters({
      query: "",
      category: "all",
      priceRange: [0, 50000],
      location: "all",
      vendor: "",
      inStock: false,
      featured: false,
      sortBy: "relevance",
    })
    onClear()
  }

  return (
    <Card className="w-full border-green-100">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2 text-green-600">
            <Search className="h-5 w-5" />
            <span>Search Nigerian Products</span>
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-green-600 hover:bg-green-50"
          >
            <Filter className="h-4 w-4 mr-2" />
            {isExpanded ? "Hide Filters" : "Show Filters"}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Main Search */}
        <div className="flex space-x-2">
          <div className="flex-1">
            <Input
              placeholder="Search for chin chin, ankara bags, clothing..."
              value={filters.query}
              onChange={(e) => handleFilterChange("query", e.target.value)}
              className="w-full"
            />
          </div>
          <Button onClick={handleSearch} className="bg-green-600 hover:bg-green-700">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>

        {/* Advanced Filters */}
        {isExpanded && (
          <div className="space-y-6 pt-4 border-t border-green-100">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Category */}
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={filters.category} onValueChange={(value) => handleFilterChange("category", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label>Vendor Location</Label>
                <Select value={filters.location} onValueChange={(value) => handleFilterChange("location", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {nigerianStates.map((state) => (
                      <SelectItem key={state} value={state.toLowerCase().replace(/\s+/g, "-")}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Sort By */}
              <div className="space-y-2">
                <Label>Sort By</Label>
                <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange("sortBy", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-3">
              <Label>Price Range (₦)</Label>
              <div className="px-3">
                <Slider
                  value={filters.priceRange}
                  onValueChange={(value) => handleFilterChange("priceRange", value)}
                  max={50000}
                  min={0}
                  step={500}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                  <span>₦{filters.priceRange[0].toLocaleString()}</span>
                  <span>₦{filters.priceRange[1].toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Vendor Name */}
            <div className="space-y-2">
              <Label>Vendor Name</Label>
              <Input
                placeholder="Search by vendor name..."
                value={filters.vendor}
                onChange={(e) => handleFilterChange("vendor", e.target.value)}
              />
            </div>

            {/* Checkboxes */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="inStock"
                  checked={filters.inStock}
                  onCheckedChange={(checked) => handleFilterChange("inStock", checked)}
                />
                <Label htmlFor="inStock">In Stock Only</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="featured"
                  checked={filters.featured}
                  onCheckedChange={(checked) => handleFilterChange("featured", checked)}
                />
                <Label htmlFor="featured">Featured Products</Label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2 pt-4">
              <Button onClick={handleSearch} className="bg-green-600 hover:bg-green-700">
                Apply Filters
              </Button>
              <Button
                variant="outline"
                onClick={handleClear}
                className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
              >
                <X className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
