import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Star } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-green-50 to-red-50 py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">Trusted by 50,000+ Nigerians</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
                Discover Authentic
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-red-600">
                  {" "}
                  Nigerian{" "}
                </span>
                Treasures
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                From traditional confectioneries to beautiful crocheted bags, clothing, and accessories. Support local
                Nigerian creators and find authentic handcrafted items.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg px-8 bg-green-600 hover:bg-green-700" asChild>
                <Link href="/products">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 bg-transparent border-green-600 text-green-600 hover:bg-green-50"
                asChild
              >
                <Link href="/vendor/signup">Become a Vendor</Link>
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">1,000+</div>
                <div className="text-sm text-muted-foreground">Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">200+</div>
                <div className="text-sm text-muted-foreground">Vendors</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">36</div>
                <div className="text-sm text-muted-foreground">States</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <img
                    src="/placeholder.svg?height=300&width=300&text=Nigerian+Chin+Chin"
                    alt="Nigerian chin chin"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <img
                    src="/placeholder.svg?height=300&width=300&text=Ankara+Bag"
                    alt="Ankara bag"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <img
                    src="/placeholder.svg?height=300&width=300&text=Nigerian+Fashion"
                    alt="Nigerian fashion"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <img
                    src="/placeholder.svg?height=300&width=300&text=Nigerian+Accessories"
                    alt="Nigerian accessories"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
