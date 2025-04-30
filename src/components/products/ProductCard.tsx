
import { Link } from "react-router-dom";
import { ShoppingBag, Heart, Star } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/contexts/CartContext";
import { formatCurrency } from "@/utils/format";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      imageUrl: product.imageUrl
    });
  };
  
  const calculateDiscount = () => {
    if (!product.originalPrice) return null;
    const discount = Math.round(
      ((product.originalPrice - product.price) / product.originalPrice) * 100
    );
    return discount > 0 ? `-${discount}%` : null;
  };
  
  const discount = calculateDiscount();
  
  return (
    <div className="product-card group">
      {/* Product Image with Actions */}
      <div className="relative overflow-hidden">
        {/* Discount Badge */}
        {discount && (
          <span className="badge-discount">{discount}</span>
        )}
        
        <Link to={`/products/${product.slug}`}>
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        
        {/* Quick Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-black bg-opacity-20 backdrop-blur-sm transform translate-y-full transition-transform duration-300 group-hover:translate-y-0 flex justify-between">
          <button 
            onClick={handleAddToCart}
            className="flex-1 bg-primary text-white py-2 px-3 rounded-l-md hover:bg-primary/90 transition-colors flex items-center justify-center"
          >
            <ShoppingBag size={16} className="mr-1" />
            Thêm vào giỏ
          </button>
          <button className="bg-white text-gray-700 p-2 rounded-r-md hover:text-primary transition-colors">
            <Heart size={16} />
          </button>
        </div>
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        <Link to={`/products/${product.slug}`} className="block">
          <h3 className="font-medium text-gray-800 line-clamp-2 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        
        {/* Rating */}
        {product.averageRating && (
          <div className="flex items-center mt-1">
            <div className="flex items-center rating-stars">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={14}
                  fill={i < Math.floor(product.averageRating!) ? "currentColor" : "none"}
                  className={i < Math.floor(product.averageRating!) ? "" : "text-gray-300"}
                />
              ))}
            </div>
            {product.reviewCount && (
              <span className="text-xs text-gray-500 ml-1">
                ({product.reviewCount})
              </span>
            )}
          </div>
        )}
        
        {/* Price */}
        <div className="mt-2 flex items-center">
          <span className="font-bold text-gray-800">
            {formatCurrency(product.price)}
          </span>
          
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="ml-2 text-sm text-gray-500 line-through">
              {formatCurrency(product.originalPrice)}
            </span>
          )}
        </div>
        
        {/* Stock Status */}
        <div className="mt-2">
          {product.stockStatus === 'out_of_stock' ? (
            <span className="text-xs text-destructive">Hết hàng</span>
          ) : product.stockStatus === 'low_stock' ? (
            <span className="text-xs text-amber-500">Sắp hết hàng</span>
          ) : (
            <span className="text-xs text-emerald-600">Còn hàng</span>
          )}
        </div>
      </div>
    </div>
  );
}
