import React, { createContext, useContext, useState, useEffect } from 'react';
import { BRAND } from '../config/brand';
import { UNIT_PRICE_PAISE, calculateTotalPaise } from '../utils/currency';

export interface CartItem {
  id: string;
  name: string;
  milkSource: string;
  unit: string;
  weightKg: number;
  unitPricePaise: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  totalQuantity: number;
  subtotalPaise: number;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (quantity?: number) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  toastMessage: string | null;
  clearToast: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'aavrit_cart_state_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch {
      // LocalStorage access failure fallback
    }
    return [];
  });

  const [isOpen, setIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore write errors
    }
  }, [items]);

  // Compute total quantity and subtotal in paise
  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotalPaise = items.reduce((acc, item) => acc + calculateTotalPaise(item.quantity), 0);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen((prev) => !prev);
  const clearToast = () => setToastMessage(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
  };

  const addToCart = (quantity = 1) => {
    if (quantity <= 0) return;

    setItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === BRAND.product.id);
      if (existing) {
        return prevItems.map((item) =>
          item.id === BRAND.product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          {
            id: BRAND.product.id,
            name: BRAND.product.name,
            milkSource: BRAND.product.milkSource,
            unit: BRAND.product.unit,
            weightKg: BRAND.product.weightKg,
            unitPricePaise: UNIT_PRICE_PAISE,
            quantity: quantity,
            image: BRAND.product.images.showcase,
          },
        ];
      }
    });

    triggerToast(`Added ${quantity} kg ${BRAND.product.name} to your bag`);
    openCart();
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.min(quantity, 50) } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        totalQuantity,
        subtotalPaise,
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        toastMessage,
        clearToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
