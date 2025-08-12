import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [coupon, setCoupon] = useState(null); // { id, discountPercent?, discountFlat?, minAmount?, maxDiscount? }

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      if (existing) {
        return prev.map((p) => (p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p));
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id, quantity) => {
    setCart((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)));
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((item) => item.id !== id));
  const clearCart = () => {
    setCart([]);
    setCoupon(null);
  };

  const applyCoupon = (couponObj) => {
    setCoupon(couponObj);
  };

  const removeCoupon = () => setCoupon(null);

  const subtotal = cart.reduce((acc, i) => acc + i.price * i.quantity, 0);

  // compute discount amount from coupon
  const discountAmount = (() => {
    if (!coupon) return 0;
    if (subtotal < (coupon.minAmount || 0)) return 0; // not eligible
    if (coupon.discountFlat) return Math.min(coupon.discountFlat, subtotal);
    if (coupon.discountPercent) {
      const raw = (subtotal * coupon.discountPercent) / 100;
      if (coupon.maxDiscount) return Math.min(raw, coupon.maxDiscount);
      return raw;
    }
    return 0;
  })();

  const total = Math.max(0, subtotal - discountAmount);

  return (
    <CartContext.Provider value={{
      cart, addToCart, updateQuantity, removeFromCart, clearCart,
      coupon, applyCoupon, removeCoupon,
      subtotal, discountAmount, total
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
