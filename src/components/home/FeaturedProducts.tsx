
import { Product } from "@/types";
import ProductCard from "../products/ProductCard";

interface FeaturedProductsProps {
  title: string;
  products: Product[];
}

export default function FeaturedProducts({ title, products }: FeaturedProductsProps) {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
