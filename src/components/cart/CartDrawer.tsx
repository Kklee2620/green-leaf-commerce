
import { X, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import { formatCurrency } from "@/utils/format";

export default function CartDrawer() {
  const { items, isCartOpen, closeCart, getTotalPrice } = useCart();
  
  return (
    <>
      {/* Backdrop */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeCart}
        />
      )}
      
      {/* Drawer */}
      <div className={`
        fixed top-0 right-0 w-full sm:w-96 h-full bg-white z-50 shadow-xl 
        transform transition-transform duration-300 ease-in-out
        ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold flex items-center">
            <ShoppingBag className="mr-2" size={20} />
            Giỏ hàng
            <span className="ml-2 text-sm font-normal text-gray-500">
              ({items.reduce((sum, item) => sum + item.quantity, 0)} sản phẩm)
            </span>
          </h2>
          <button
            onClick={closeCart}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Content */}
        <div className="flex flex-col h-[calc(100%-8rem)]">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-4">
              <ShoppingBag className="text-gray-300 mb-4" size={64} />
              <p className="text-gray-500 mb-4">Giỏ hàng của bạn đang trống</p>
              <button
                onClick={closeCart}
                className="btn-primary"
              >
                Tiếp tục mua sắm
              </button>
            </div>
          ) : (
            <div className="flex-1 overflow-auto p-4">
              {items.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
        
        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t p-4">
            <div className="flex justify-between mb-4">
              <span className="font-medium">Tạm tính:</span>
              <span className="font-bold">{formatCurrency(getTotalPrice())}</span>
            </div>
            <div className="space-y-2">
              <Link 
                to="/cart"
                onClick={closeCart}
                className="btn-outline block text-center"
              >
                Xem giỏ hàng
              </Link>
              <Link 
                to="/checkout"
                onClick={closeCart}
                className="btn-primary block text-center"
              >
                Thanh toán
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
