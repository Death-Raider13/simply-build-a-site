
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-green-50 to-red-50 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-4 bg-green-600">🇳🇬 Made in Nigeria</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Authentic Nigerian
            <span className="text-green-600"> Handcrafted </span>
            Marketplace
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover premium confectioneries, handcrafted bags, traditional clothing, and unique accessories
            from talented Nigerian vendors across the country.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              Shop Now
            </Button>
            <Button size="lg" variant="outline">
              Become a Vendor
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
