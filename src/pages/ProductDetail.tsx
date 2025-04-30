
import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import Layout from "@/components/layout/Layout";
import { toast } from "@/hooks/use-toast";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Home, Minus, Plus, Heart, Share2, Check, AlertTriangle, Truck, Loader2 } from "lucide-react";
import { formatCurrency } from "@/utils/format";
import { Product } from "@/types";
import ProductCard from "@/components/products/ProductCard";
import { useProductBySlug, useRelatedProducts } from "@/hooks/useProducts";
import { nanoid } from "nanoid";

export default function ProductDetail() {
  const { slug } = useParams<{slug: string}>();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  
  // Fetch product data
  const { 
    data: product, 
    isLoading: isProductLoading, 
    error: productError 
  } = useProductBySlug(slug || '');
  
  // Fetch related products once we have the product id
  const { 
    data: relatedProducts = [], 
    isLoading: isRelatedLoading 
  } = useRelatedProducts(product?.id || '');
  
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };
  
  const handleAddToCart = () => {
    if (!product) return;
    
    addToCart({
      id: nanoid(),
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      imageUrl: product.imageUrl
    });
    
    toast({
      title: "Thêm vào giỏ hàng thành công",
      description: `Đã thêm ${quantity} ${product.name} vào giỏ hàng.`,
    });
  };
  
  const handleAddToWishlist = () => {
    toast({
      title: "Đã thêm vào danh sách yêu thích",
      description: "Sản phẩm đã được thêm vào danh sách yêu thích của bạn.",
    });
  };
  
  if (isProductLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2 animate-pulse bg-gray-200 h-96 rounded-md"></div>
            <div className="md:w-1/2">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-6 animate-pulse"></div>
              <div className="h-10 bg-gray-200 rounded w-1/3 mb-6 animate-pulse"></div>
              <div className="h-24 bg-gray-200 rounded mb-6 animate-pulse"></div>
              <div className="h-12 bg-gray-200 rounded mb-4 animate-pulse"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (productError || !product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Không tìm thấy sản phẩm</h1>
          <p className="text-gray-600 mb-8">
            Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
          </p>
          <Link to="/products" className="btn-primary">
            Tiếp tục mua sắm
          </Link>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                <Home className="h-4 w-4 mr-1" />
                Trang chủ
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/products">Sản phẩm</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/categories/${product.category}`}>
                {product.category}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>
                {product.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        {/* Product main section */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Product Images */}
          <div className="md:w-1/2">
            <div className="mb-4">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[...Array(4)].map((_, idx) => (
                <div 
                  key={idx}
                  className={`cursor-pointer border-2 rounded-md overflow-hidden ${selectedImage === idx ? 'border-primary' : 'border-transparent'}`}
                  onClick={() => setSelectedImage(idx)}
                >
                  <img 
                    src={product.imageUrl} 
                    alt={`${product.name} thumbnail ${idx+1}`} 
                    className="w-full h-auto object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div className="md:w-1/2">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400 mr-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>
                    {i < (product.averageRating || 0) ? "★" : "☆"}
                  </span>
                ))}
              </div>
              <span className="text-gray-600 text-sm">
                {product.reviewCount || 0} đánh giá
              </span>
            </div>
            
            {/* Price */}
            <div className="mb-6">
              <div className="flex items-center">
                <span className="text-2xl font-bold text-primary mr-2">
                  {formatCurrency(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-gray-500 line-through">
                    {formatCurrency(product.originalPrice)}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="ml-2 bg-red-100 text-red-600 text-sm px-2 py-1 rounded">
                    {Math.round(100 - (product.price / product.originalPrice * 100))}% giảm
                  </span>
                )}
              </div>
            </div>
            
            {/* Stock status */}
            <div className="mb-4">
              {product.stockStatus === 'in_stock' && (
                <div className="flex items-center text-green-600">
                  <Check className="h-5 w-5 mr-1" />
                  <span>Còn hàng</span>
                </div>
              )}
              {product.stockStatus === 'low_stock' && (
                <div className="flex items-center text-yellow-600">
                  <AlertTriangle className="h-5 w-5 mr-1" />
                  <span>Sắp hết hàng</span>
                </div>
              )}
              {product.stockStatus === 'out_of_stock' && (
                <div className="flex items-center text-red-600">
                  <AlertTriangle className="h-5 w-5 mr-1" />
                  <span>Hết hàng</span>
                </div>
              )}
            </div>
            
            {/* Description */}
            <div className="mb-6">
              <p className="text-gray-700">{product.description}</p>
            </div>
            
            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Số lượng</label>
              <div className="flex items-center">
                <button 
                  className="p-2 border rounded-l-md"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="p-2 border-t border-b w-16 text-center"
                />
                <button 
                  className="p-2 border rounded-r-md"
                  onClick={incrementQuantity}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            {/* Add to cart */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Button 
                className="flex-1 h-12 text-base" 
                onClick={handleAddToCart}
                disabled={product.stockStatus === 'out_of_stock'}
              >
                Thêm vào giỏ hàng
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                onClick={handleAddToWishlist}
              >
                <Heart className="h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="icon"
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
            
            {/* Shipping */}
            <div className="border rounded-md p-3 mb-4 bg-gray-50">
              <div className="flex items-start">
                <Truck className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <div>
                  <p className="font-medium">Miễn phí vận chuyển</p>
                  <p className="text-sm text-gray-600">cho đơn hàng từ 300.000₫</p>
                </div>
              </div>
            </div>
            
            {/* Guarantee */}
            <div className="border rounded-md p-3 mb-6 bg-gray-50">
              <div className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <div>
                  <p className="font-medium">Bảo đảm chất lượng</p>
                  <p className="text-sm text-gray-600">Đổi trả trong 7 ngày nếu không hài lòng</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product details tabs */}
        <div className="mt-10 mb-12">
          <Tabs defaultValue="description">
            <TabsList className="w-full border-b flex justify-start overflow-x-auto">
              <TabsTrigger value="description" className="text-base px-6 py-3">
                Mô tả
              </TabsTrigger>
              <TabsTrigger value="specs" className="text-base px-6 py-3">
                Thông số kỹ thuật
              </TabsTrigger>
              <TabsTrigger value="reviews" className="text-base px-6 py-3">
                Đánh giá ({product.reviewCount || 0})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="py-6">
              <div className="prose max-w-none">
                <h4 className="text-lg font-semibold mb-2">Giới thiệu sản phẩm</h4>
                <p className="mb-4">{product.description}</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae eros in nisl fringilla feugiat. Nullam facilisis mauris eu lorem ultrices, id tincidunt nisl dictum. Vivamus auctor, nisi vel ultricies eleifend, nisi nulla posuere nisi, id aliquam nisl nisl sit amet nisl.</p>
              </div>
            </TabsContent>
            <TabsContent value="specs" className="py-6">
              <table className="w-full border-collapse">
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 pr-4 font-medium w-1/3">Xuất xứ</td>
                    <td className="py-2">Việt Nam</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-4 font-medium">Thương hiệu</td>
                    <td className="py-2">GreenLeaf</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-4 font-medium">Trọng lượng</td>
                    <td className="py-2">500g</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-4 font-medium">Bảo quản</td>
                    <td className="py-2">Nhiệt độ mát, tránh ánh nắng trực tiếp</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium">Hạn sử dụng</td>
                    <td className="py-2">Xem trên bao bì</td>
                  </tr>
                </tbody>
              </table>
            </TabsContent>
            <TabsContent value="reviews" className="py-6">
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="sm:w-1/3 p-4 bg-gray-50 rounded-md">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-primary mb-2">{product.averageRating || 0}</div>
                      <div className="flex justify-center text-yellow-400 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <span key={i}>
                            {i < (product.averageRating || 0) ? "★" : "☆"}
                          </span>
                        ))}
                      </div>
                      <div className="text-gray-600 text-sm">Dựa trên {product.reviewCount || 0} đánh giá</div>
                    </div>
                  </div>
                  <div className="sm:w-2/3">
                    {/* If there are reviews, show them here */}
                    <div className="text-center py-8">
                      <p className="text-gray-600">Chưa có đánh giá nào cho sản phẩm này.</p>
                      <Button className="mt-3">Viết đánh giá đầu tiên</Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Related products */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Sản phẩm liên quan</h2>
          {isRelatedLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="bg-gray-100 rounded-md p-4 h-72 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
