
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { formatCurrency } from "@/utils/format";
import { nanoid } from 'nanoid';
import { Product } from "@/types";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  slug: string;
}

// Add an alternative constructor that accepts a product object
const ProductCard = (props: ProductCardProps | { product: Product }) => {
  const { addToCart } = useCart();

  // Extract properties based on whether we received a product object or individual props
  const id = 'product' in props ? props.product.id : props.id;
  const name = 'product' in props ? props.product.name : props.name;
  const price = 'product' in props ? props.product.price : props.price;
  const imageUrl = 'product' in props ? props.product.imageUrl : props.imageUrl;
  const slug = 'product' in props ? props.product.slug : props.slug;

  const handleAddToCart = () => {
    addToCart({
      id: nanoid(), // Generate a unique ID for the cart item
      productId: id,
      name,
      price,
      quantity: 1,
      imageUrl
    });
  };

  return (
    <div className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/products/${slug}`} className="block">
        <div className="aspect-square overflow-hidden bg-gray-100">
          <img 
            src={imageUrl || "/placeholder.svg"} 
            alt={name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">{name}</h3>
          <p className="font-bold text-green-600">{formatCurrency(price)}</p>
        </div>
      </Link>
      <div className="px-4 pb-4">
        <Button 
          variant="default" 
          className="w-full bg-green-600 hover:bg-green-700"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Thêm vào giỏ
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
