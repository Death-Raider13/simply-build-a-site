"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

function SearchContent() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState("")
  const [results, setResults] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const query = searchParams?.get("q") || ""
    if (query) {
      setSearchQuery(query)
      // Simulate search API call
      setIsLoading(true)
      setTimeout(() => {
        // Mock search results
        const mockResults = [
          {
            id: 1,
            name: `Search result for "${query}"`,
            price: "₦5,500",
            vendor: "Test Vendor",
            image: "/placeholder.svg?height=200&width=200",
            rating: 4.5,
            reviews: 23
          }
        ]
        setResults(mockResults)
        setIsLoading(false)
      }, 1000)
    }
  }, [searchParams])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-green-600 mb-4">Search Results</h1>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter your search query"
              className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-green-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {isLoading ? (
            <div>Loading...</div>
          ) : results.length > 0 ? (
            <ul>
              {results.map((result) => (
                <li key={result.id} className="mb-2">
                  <Link href={`/product/${result.id}`} className="text-green-600 hover:underline">
                    {result.name} - {result.price}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div>No results found for "{searchQuery}"</div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading search...</div>}>
      <SearchContent />
    </Suspense>
  )
}
