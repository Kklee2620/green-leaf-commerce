
import React, { createContext, useState, useContext } from 'react';
import { toast } from "sonner";
import { CartItem, Cart } from "@/types";

export type CartContextType = {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  // New properties for drawer
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  cart: Cart;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Calculate subtotal whenever items change
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  
  // Create cart object that matches the Cart type
  const cart: Cart = {
    items,
    subtotal
  };

  const addToCart = (item: CartItem) => {
    setItems((prevItems) => {
      // Check if item already exists by productId (not id)
      const existingItemIndex = prevItems.findIndex((i) => i.productId === item.productId);
      
      if (existingItemIndex > -1) {
        // Update quantity of existing item
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += item.quantity;
        toast.success(`Cập nhật số lượng ${item.name} trong giỏ hàng!`);
        return newItems;
      } else {
        // Add new item
        toast.success(`Đã thêm ${item.name} vào giỏ hàng!`);
        return [...prevItems, item];
      }
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    setItems((prevItems) => {
      return prevItems.map((item) => 
        item.id === id ? { ...item, quantity } : item
      );
    });
  };

  const removeFromCart = (id: string) => {
    setItems((prevItems) => {
      const itemToRemove = prevItems.find(item => item.id === id);
      if (itemToRemove) {
        toast.success(`Đã xóa ${itemToRemove.name} khỏi giỏ hàng`);
      }
      return prevItems.filter((item) => item.id !== id);
    });
  };

  const clearCart = () => {
    setItems([]);
    toast.success("Giỏ hàng đã được xóa");
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };
  
  const openCart = () => {
    setIsCartOpen(true);
  };
  
  const closeCart = () => {
    setIsCartOpen(false);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getTotalPrice,
        getTotalItems,
        isCartOpen,
        openCart,
        closeCart,
        cart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === null) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
