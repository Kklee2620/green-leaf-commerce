
import { createContext, useState, useContext, ReactNode } from "react";
import { Cart, CartItem } from "@/types";

interface CartContextType {
  cart: Cart;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (item: CartItem) => void;
  updateCartItemQuantity: (itemId: string, quantity: number) => void;
  removeCartItem: (itemId: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart>({
    items: [],
    subtotal: 0
  });
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const calculateSubtotal = (items: CartItem[]): number => {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };
  
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  
  const addToCart = (newItem: CartItem) => {
    setCart(prevCart => {
      // Check if the item already exists in the cart
      const existingItemIndex = prevCart.items.findIndex(item => item.productId === newItem.productId);
      
      let updatedItems: CartItem[];
      
      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        updatedItems = [...prevCart.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + newItem.quantity
        };
      } else {
        // Add new item if it doesn't exist
        updatedItems = [...prevCart.items, newItem];
      }
      
      return {
        items: updatedItems,
        subtotal: calculateSubtotal(updatedItems)
      };
    });
    
    openCart();
  };
  
  const updateCartItemQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCart(prevCart => {
      const updatedItems = prevCart.items.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
      
      return {
        items: updatedItems,
        subtotal: calculateSubtotal(updatedItems)
      };
    });
  };
  
  const removeCartItem = (itemId: string) => {
    setCart(prevCart => {
      const updatedItems = prevCart.items.filter(item => item.id !== itemId);
      
      return {
        items: updatedItems,
        subtotal: calculateSubtotal(updatedItems)
      };
    });
  };
  
  return (
    <CartContext.Provider value={{
      cart,
      isCartOpen,
      openCart,
      closeCart,
      addToCart,
      updateCartItemQuantity,
      removeCartItem
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
