
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function CategoryGrid() {
  const categories = [
    {
      name: "Nigerian Confectioneries",
      description: "Traditional sweets, cakes, and treats",
      href: "/categories/nigerian-confectioneries",
      image: "/placeholder.svg",
      count: "150+ products"
    },
    {
      name: "Crocheted Bags & Purses",
      description: "Handcrafted bags and accessories",
      href: "/categories/crocheted-bags-purses",
      image: "/placeholder.svg",
      count: "80+ products"
    },
    {
      name: "Nigerian Clothing",
      description: "Traditional and modern Nigerian wear",
      href: "/categories/nigerian-clothing",
      image: "/placeholder.svg",
      count: "200+ products"
    },
    {
      name: "Nigerian Accessories",
      description: "Jewelry, beads, and traditional accessories",
      href: "/categories/nigerian-accessories",
      image: "/placeholder.svg",
      count: "120+ products"
    }
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our diverse collection of authentic Nigerian products across different categories
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <a key={category.name} href={category.href} className="group">
              <Card className="h-full transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="aspect-square bg-muted rounded-lg mb-4 flex items-center justify-center">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
                  <Badge variant="secondary" className="text-xs">
                    {category.count}
                  </Badge>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
