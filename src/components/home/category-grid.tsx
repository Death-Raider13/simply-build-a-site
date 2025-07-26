
import { Link } from "react-router-dom"
import { Card, CardContent } from "../ui/card"
import { ArrowRight } from "lucide-react"

const categories = [
  {
    name: "Nigerian Confectioneries",
    slug: "nigerian-confectioneries",
    description: "Chin chin, puff puff, meat pie & more",
    image: "/placeholder.svg?height=300&width=400&text=Nigerian+Confectioneries",
    itemCount: "300+ items",
  },
  {
    name: "Crocheted Bags & Purses",
    slug: "crocheted-bags-purses",
    description: "Handmade Ankara & traditional bags",
    image: "/placeholder.svg?height=300&width=400&text=Crocheted+Bags",
    itemCount: "150+ items",
  },
  {
    name: "Nigerian Clothing",
    slug: "nigerian-clothing",
    description: "Ankara, Agbada, Dashiki & modern fashion",
    image: "/placeholder.svg?height=300&width=400&text=Nigerian+Clothing",
    itemCount: "400+ items",
  },
  {
    name: "Nigerian Accessories",
    slug: "nigerian-accessories",
    description: "Beads, jewelry & fashion accessories",
    image: "/placeholder.svg?height=300&width=400&text=Nigerian+Accessories",
    itemCount: "250+ items",
  },
]

export function CategoryGrid() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Shop by Category</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our curated collection of authentic Nigerian handcrafted items from talented artisans across Nigeria
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.slug} to={`/categories/${category.slug}`}>
              <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden border-green-100 hover:border-green-200">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold group-hover:text-green-600 transition-colors">
                      {category.name}
                    </h3>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
                  <div className="text-xs font-medium text-green-600">{category.itemCount}</div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
