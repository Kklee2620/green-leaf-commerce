import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useCart } from "@/contexts/CartContext";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { formatCurrency } from "@/utils/format";
import { Home, Minus, Plus, X, ShoppingBag } from "lucide-react";

export default function Cart() {
  const { items, updateQuantity, removeFromCart, getTotalPrice } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  
  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(itemId, newQuantity);
  };
  
  const handleRemoveItem = (itemId: string) => {
    removeFromCart(itemId);
  };
  
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) {
      toast.error("Vui lòng nhập mã giảm giá.");
      return;
    }
    
    setIsApplyingCoupon(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsApplyingCoupon(false);
      
      // Simulate coupon validation (in a real app, this would be done on the server)
      if (couponCode.toUpperCase() === "GIAMGIA10") {
        toast.success("Áp dụng mã giảm giá thành công. Bạn được giảm 10% tổng đơn hàng.");
      } else {
        toast.error("Mã giảm giá không hợp lệ. Vui lòng kiểm tra lại hoặc thử mã khác.");
      }
    }, 800);
  };
  
  // Calculate cart totals
  const subtotal = getTotalPrice();
  const shipping = subtotal > 300000 ? 0 : 30000; // Free shipping over 300k
  const discount = 0; // In a real app, this would be calculated based on applied coupons
  const total = subtotal + shipping - discount;
  
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
              <BreadcrumbLink>Giỏ hàng</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Giỏ hàng của bạn</h1>
        
        {items.length === 0 ? (
          <div className="text-center py-12">
            <div className="flex justify-center mb-4">
              <ShoppingBag className="h-16 w-16 text-gray-300" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Giỏ hàng của bạn đang trống</h2>
            <p className="text-gray-600 mb-6">Hãy thêm một số sản phẩm vào giỏ hàng của bạn.</p>
            <Link to="/products">
              <Button>Tiếp tục mua sắm</Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-md shadow-sm overflow-hidden">
                <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b font-medium text-gray-600">
                  <div className="col-span-6">Sản phẩm</div>
                  <div className="col-span-2 text-center">Giá</div>
                  <div className="col-span-2 text-center">Số lượng</div>
                  <div className="col-span-2 text-center">Tổng</div>
                </div>
                
                {items.map(item => (
                  <div key={item.id} className="border-b last:border-b-0 p-4">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                      {/* Product info */}
                      <div className="md:col-span-6 flex items-start space-x-4">
                        <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded">
                          <img 
                            src={item.imageUrl} 
                            alt={item.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">
                            <Link to={`/products/${item.productId}`} className="hover:text-primary">
                              {item.name}
                            </Link>
                          </h3>
                          <div className="md:hidden mt-1 text-gray-600">
                            {formatCurrency(item.price)}
                          </div>
                        </div>
                      </div>
                      
                      {/* Price */}
                      <div className="hidden md:block md:col-span-2 text-center text-gray-600">
                        {formatCurrency(item.price)}
                      </div>
                      
                      {/* Quantity */}
                      <div className="md:col-span-2 flex justify-start md:justify-center">
                        <div className="flex items-center">
                          <button 
                            className="p-1 border rounded-l-md"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                            className="p-1 border-t border-b w-12 text-center"
                          />
                          <button 
                            className="p-1 border rounded-r-md"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      
                      {/* Total */}
                      <div className="md:col-span-2 text-left md:text-center font-medium">
                        {formatCurrency(item.price * item.quantity)}
                      </div>
                      
                      {/* Remove button */}
                      <div className="flex justify-end">
                        <button 
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Continue shopping */}
              <div className="mt-6">
                <Link to="/products">
                  <Button variant="outline">
                    Tiếp tục mua sắm
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Cart Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-md shadow-sm p-6">
                <h2 className="text-lg font-bold mb-4">Tóm tắt đơn hàng</h2>
                
                {/* Coupon */}
                <div className="mb-6">
                  <form onSubmit={handleApplyCoupon} className="flex">
                    <Input
                      type="text"
                      placeholder="Mã giảm giá"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 rounded-r-none"
                    />
                    <Button 
                      type="submit"
                      variant="outline"
                      className="rounded-l-none border-l-0"
                      disabled={isApplyingCoupon}
                    >
                      {isApplyingCoupon ? "Đang áp dụng..." : "Áp dụng"}
                    </Button>
                  </form>
                </div>
                
                {/* Order details */}
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between">
                    <span>Tạm tính:</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Phí vận chuyển:</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-green-600">Miễn phí</span>
                      ) : (
                        formatCurrency(shipping)
                      )}
                    </span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between">
                      <span>Giảm giá:</span>
                      <span className="text-green-600">- {formatCurrency(discount)}</span>
                    </div>
                  )}
                </div>
                
                <div className="border-t mt-4 pt-4 mb-6">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Tổng cộng:</span>
                    <span>{formatCurrency(total)}</span>
                  </div>
                </div>
                
                <Link to="/checkout">
                  <Button className="w-full h-12 text-base">
                    Thanh toán
                  </Button>
                </Link>
                
                <div className="mt-4 text-xs text-gray-500 text-center">
                  Đơn hàng trên 300.000đ được miễn phí vận chuyển
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
