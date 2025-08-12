import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";


export default function Cart() {
  const { cart, subtotal, discountAmount, total, removeItem, updateQuantity, clearCart, coupon, removeCoupon } = useCart();

  if (cart.length === 0) {
    return <div className="p-8 text-center text-gray-600 text-xl font-semibold">Your cart is empty.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-extrabold mb-8 text-pink-600 text-center">Your Cart</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-1 space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition-shadow"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 rounded-lg object-cover mr-6"
              />

              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900">{item.name}</h2>
                <p className="text-gray-600 mt-1">Rs {item.price} each</p>

                {/* Quantity Controls */}
                <div className="mt-3 flex items-center space-x-4">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                  >
                    -
                  </button>
                  <span className="font-medium text-lg">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-3 py-1 rounded bg-pink-500 text-white hover:bg-pink-600"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="text-right">
                <div className="text-lg font-bold text-gray-900">Rs {item.price * item.quantity}</div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="mt-3 text-red-500 hover:text-red-700 font-semibold"
                  aria-label={`Remove ${item.name} from cart`}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={clearCart}
            className="mt-6 w-full bg-red-500 text-white font-bold py-3 rounded-lg hover:bg-red-600 transition"
          >
            Clear Cart
          </button>
        </div>

        {/* Order Summary */}
        <aside className="w-full md:w-96 bg-white rounded-lg shadow-lg p-6 flex flex-col">
          <h2 className="text-2xl font-extrabold mb-6 text-pink-600">Order Summary</h2>

          <div className="flex justify-between mb-3 text-gray-700">
            <span>Subtotal</span>
            <span>Rs {subtotal}</span>
          </div>
          <div className="flex justify-between mb-3 text-gray-700">
            <span>Discount {coupon ? `(${coupon.id})` : ""}</span>
            <span>- Rs {discountAmount}</span>
          </div>
          <div className="border-t border-gray-300 pt-4 text-xl font-bold flex justify-between">
            <span>Total</span>
            <span>Rs {total}</span>
          </div>

          {coupon && (
            <button
              onClick={removeCoupon}
              className="mt-4 text-sm text-red-500 underline self-start"
            >
              Remove Coupon
            </button>
          )}

          <button
            disabled={cart.length === 0}
            className="mt-auto bg-pink-600 text-white py-3 rounded-lg font-bold hover:bg-pink-700 transition"
            // Add your checkout navigation handler here
          >
            <Link
  to="/checkout"
  className="mt-auto block bg-pink-600 text-white py-3 rounded-lg font-bold text-center hover:bg-pink-700 transition"
>
  Proceed to Checkout
</Link>

          </button>
        </aside>
      </div>
    </div>
  );
}
