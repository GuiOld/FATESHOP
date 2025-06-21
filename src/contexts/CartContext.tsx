import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Product } from "../services/productService";

type CartItem = Product & { quantity: number };

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  clearCart: () => void;
  setUserEmail: (email: string | null) => Promise<void>;
  decreaseQuantity: (ProductId: number) => void;
  removeFromCart: (productId: number) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [userEmail, setUserEmailState] = useState<string | null>(null);

  // Atualiza o carrinho com base no usuário
  const loadCart = async (email: string | null) => {
    if (email) {
      const storedCart = await AsyncStorage.getItem(`cart_${email}`);
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      } else {
        setCart([]);
      }
    } else {
      setCart([]);
    }
  };

  const setUserEmail = async (email: string | null) => {
    setUserEmailState(email);
    await loadCart(email);
  };

  // Sempre que o carrinho mudar, salvamos para o usuário atual
  useEffect(() => {
    if (userEmail) {
      AsyncStorage.setItem(`cart_${userEmail}`, JSON.stringify(cart));
    }
  }, [cart, userEmail]);

 const addToCart = (product: Product) => {
  setCart((prev) => {
    const index = prev.findIndex((item) => item.id === product.id);
    const newCart = [...prev];

    if (index !== -1) {
      newCart[index].quantity += 1;
    } else {
      newCart.push({ ...product, quantity: 1 });
    }

    // Salvar imediatamente com base no userEmail atual
    if (userEmail) {
      AsyncStorage.setItem(`cart_${userEmail}`, JSON.stringify(newCart));
    }

    return newCart;
  });
};

  const decreaseQuantity = (productId: number) => {
    setCart((prev) => 
        prev.map((item) => item.id === productId ? {
            ...item, quantity: Math.max(1, item.quantity - 1)
        } : item)
    );
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  }

  const clearCart = () => {
  setCart([]);
};

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart, setUserEmail, decreaseQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
