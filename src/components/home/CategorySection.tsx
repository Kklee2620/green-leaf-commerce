
import { Link } from "react-router-dom";
import { Category } from "@/types";

interface CategorySectionProps {
  categories: Category[];
}

export default function CategorySection({ categories }: CategorySectionProps) {
  return (
    <section className="py-10 bg-accent bg-opacity-20">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Danh mục sản phẩm</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              to={`/categories/${category.slug}`}
              className="group"
            >
              <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-shadow hover:shadow-md">
                <div className="h-32 bg-gray-100">
                  {category.imageUrl && (
                    <img 
                      src={category.imageUrl} 
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="p-3 text-center">
                  <h3 className="font-medium text-gray-800 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
