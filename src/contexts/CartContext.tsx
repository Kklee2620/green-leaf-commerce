
import { createContext, useState, useContext, ReactNode } from "react";
import { CartItem, Cart } from "@/types";
import { toast } from "@/hooks/use-toast";

interface CartContextType {
  cart: Cart;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (item: Omit<CartItem, "id">) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
}

const initialCart: Cart = {
  items: [],
  subtotal: 0
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart>(initialCart);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const calculateSubtotal = (items: CartItem[]) => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const addToCart = (item: Omit<CartItem, "id">) => {
    setCart(prevCart => {
      // Check if item already exists in cart
      const existingItemIndex = prevCart.items.findIndex(
        cartItem => cartItem.productId === item.productId
      );

      let newItems = [...prevCart.items];
      
      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + item.quantity
        };
        toast({
          title: "Đã cập nhật giỏ hàng",
          description: `Đã cập nhật số lượng: ${item.name}`
        });
      } else {
        // Add new item
        const newItem = {
          ...item,
          id: `cart-item-${Date.now()}`
        };
        newItems = [...newItems, newItem];
        toast({
          title: "Đã thêm vào giỏ hàng",
          description: `Đã thêm: ${item.name}`
        });
      }

      return {
        items: newItems,
        subtotal: calculateSubtotal(newItems)
      };
    });

    // Open cart drawer
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      return removeFromCart(id);
    }

    setCart(prevCart => {
      const newItems = prevCart.items.map(item =>
        item.id === id ? { ...item, quantity } : item
      );
      
      return {
        items: newItems,
        subtotal: calculateSubtotal(newItems)
      };
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prevCart => {
      const newItems = prevCart.items.filter(item => item.id !== id);
      
      return {
        items: newItems,
        subtotal: calculateSubtotal(newItems)
      };
    });
    
    toast({
      title: "Đã xóa sản phẩm",
      description: "Sản phẩm đã được xóa khỏi giỏ hàng"
    });
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <CartContext.Provider value={{
      cart,
      isCartOpen,
      openCart,
      closeCart,
      addToCart,
      updateQuantity,
      removeFromCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
