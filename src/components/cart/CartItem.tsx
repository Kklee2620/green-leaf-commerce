
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem as CartItemType } from "@/types";
import { useCart } from "@/contexts/CartContext";
import { formatCurrency } from "@/utils/format";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();
  
  const handleIncrement = () => {
    updateQuantity(item.id, item.quantity + 1);
  };
  
  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };
  
  const handleRemove = () => {
    removeFromCart(item.id);
  };
  
  return (
    <div className="flex py-4 border-b">
      {/* Product Image */}
      <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded">
        <img 
          src={item.imageUrl} 
          alt={item.name}
          className="w-full h-full object-cover rounded"
        />
      </div>
      
      {/* Product Info */}
      <div className="ml-4 flex-grow">
        <div className="flex justify-between">
          <h3 className="text-sm font-medium line-clamp-2">{item.name}</h3>
          <button 
            onClick={handleRemove}
            className="text-gray-400 hover:text-destructive"
          >
            <Trash2 size={16} />
          </button>
        </div>
        
        <div className="mt-1 text-sm text-gray-500">
          {formatCurrency(item.price)} x {item.quantity}
        </div>
        
        {/* Quantity Controls */}
        <div className="mt-2 flex justify-between items-center">
          <div className="flex items-center border rounded">
            <button 
              onClick={handleDecrement}
              className="px-2 py-1 text-gray-600 hover:text-primary disabled:opacity-50"
              disabled={item.quantity <= 1}
            >
              <Minus size={14} />
            </button>
            <span className="px-2 py-1 text-sm">{item.quantity}</span>
            <button 
              onClick={handleIncrement}
              className="px-2 py-1 text-gray-600 hover:text-primary"
            >
              <Plus size={14} />
            </button>
          </div>
          
          <span className="font-medium">
            {formatCurrency(item.price * item.quantity)}
          </span>
        </div>
      </div>
    </div>
  );
}
