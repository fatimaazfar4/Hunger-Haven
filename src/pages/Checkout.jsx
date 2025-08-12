import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Validation schema without payment and deliveryTime
const schema = yup.object().shape({
  name: yup.string().required("Name required"),
  email: yup.string().email("Invalid email").required("Email required"),
  phone: yup.string().required("Phone required"),
  address: yup.string().required("Delivery address required"),
  // Removed payment and deliveryTime validations
});

export default function Checkout() {
  const {
    cart,
    subtotal,
    discountAmount,
    total,
    clearCart,
    coupon,
    removeCoupon,
  } = useCart();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const [placed, setPlaced] = useState(false);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onSubmit = (data) => {
    if (cart.length === 0) return;

    const id = `ORD${Date.now().toString().slice(-6)}`;
    const orderPayload = {
      id,
      date: new Date().toLocaleString(),
      items: cart.map((it) => ({
        id: it.id,
        name: it.name,
        price: it.price,
        quantity: it.quantity,
      })),
      subtotal,
      discount: discountAmount,
      total,
      // Removed delivery and payment info
      customer: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
      },
      status: "On the way",
    };

    // Save order history locally
    const history = JSON.parse(localStorage.getItem("orderHistory") || "[]");
    history.push(orderPayload);
    localStorage.setItem("orderHistory", JSON.stringify(history));

    setOrderId(id);
    setPlaced(true);

    setTimeout(() => {
      clearCart();
      removeCoupon && removeCoupon();
    }, 300);

    setTimeout(() => {
      navigate("/");
    }, 5000);
  };

  if (cart.length === 0 && !placed) {
    return <div className="p-6">Your cart is empty.</div>;
  }

  return (
    <div className="relative p-6 grid md:grid-cols-2 gap-6">
      {/* Form */}
      <form
  onSubmit={handleSubmit(onSubmit)}
  className="bg-white p-8 rounded-xl shadow-lg max-w-3xl mx-auto font-sans space-y-8"
  style={{ filter: placed ? "blur(4px)" : "none", pointerEvents: placed ? "none" : "auto" }}
>
  <h2 className="text-3xl font-extrabold text-pink-600 mb-8 text-center">
    Delivery Details
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    {/* Name */}
    <div className="flex flex-col">
      <label className="mb-2 font-semibold text-gray-700 tracking-wide">Name</label>
      <input
        {...register("name")}
        placeholder="Enter your full name"
        className="rounded-lg border border-gray-300 p-3 text-gray-900 text-lg
                   shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500
                   transition duration-200"
      />
      <p className="text-red-600 text-sm mt-1">{errors.name?.message}</p>
    </div>

    {/* Email */}
    <div className="flex flex-col">
      <label className="mb-2 font-semibold text-gray-700 tracking-wide">Email</label>
      <input
        {...register("email")}
        placeholder="your.email@example.com"
        type="email"
        className="rounded-lg border border-gray-300 p-3 text-gray-900 text-lg
                   shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500
                   transition duration-200"
      />
      <p className="text-red-600 text-sm mt-1">{errors.email?.message}</p>
    </div>

    {/* Phone */}
    <div className="flex flex-col">
      <label className="mb-2 font-semibold text-gray-700 tracking-wide">Phone</label>
      <input
        {...register("phone")}
        placeholder="+92 300 1234567"
        className="rounded-lg border border-gray-300 p-3 text-gray-900 text-lg
                   shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500
                   transition duration-200"
      />
      <p className="text-red-600 text-sm mt-1">{errors.phone?.message}</p>
    </div>

    {/* Empty div for spacing */}
    <div></div>

    {/* Address */}
    <div className="md:col-span-2 flex flex-col">
      <label className="mb-2 font-semibold text-gray-700 tracking-wide">Address</label>
      <textarea
        {...register("address")}
        placeholder="Enter delivery address"
        rows={4}
        className="rounded-lg border border-gray-300 p-3 text-gray-900 text-lg
                   shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500
                   transition duration-200 resize-none"
      />
      <p className="text-red-600 text-sm mt-1">{errors.address?.message}</p>
    </div>
  </div>

  <button
    type="submit"
    className="w-full bg-pink-600 text-white text-xl font-bold py-4 rounded-xl
               shadow-md hover:bg-pink-700 transition duration-300"
  >
    Place Order
  </button>
</form>



      {/* Order Summary */}
      <aside
        className="bg-white p-6 rounded-lg shadow"
        style={{ filter: placed ? "blur(4px)" : "none", pointerEvents: placed ? "none" : "auto" }}
      >
        <h3 className="text-lg font-semibold">Order Summary</h3>

        <div className="mt-4 divide-y">
          {cart.map((it) => (
            <div key={it.id} className="py-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <img src={it.image} alt={it.name} className="w-14 h-14 rounded object-cover" />
                <div>
                  <div className="font-medium">{it.name}</div>
                  <div className="text-sm text-gray-500">Qty: {it.quantity}</div>
                </div>
              </div>
              <div className="font-semibold">Rs {it.price * it.quantity}</div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>Rs {subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Discount {coupon ? `(${coupon.id})` : ""}</span>
            <span>- Rs {discountAmount}</span>
          </div>
          <div className="flex justify-between text-xl font-bold mt-2">
            <span>Total</span>
            <span>Rs {total}</span>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-600 flex items-center justify-between">
          <div>
            <button onClick={removeCoupon} className="text-red-500 underline">
              Remove coupon
            </button>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500">Secure checkout</div>
            <div className="text-xs text-gray-500">No real payment processed (demo)</div>
          </div>
        </div>
      </aside>

      {/* Modal Popup after order placed */}
      {placed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => {
            setPlaced(false);
            navigate("/");
          }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg p-8 max-w-md w-full text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-3xl font-bold mb-2">Rider’s on the way!</h2>
            <p className="mb-4">
              Order <span className="font-semibold">#{orderId}</span> confirmed. Estimated arrival: 25–35 mins
            </p>

            <motion.img
              src="/rider.jpeg"
              alt="rider"
              className="mx-auto w-48 h-48 object-contain"
              animate={{ x: [0, 40, -20, 60, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            />

            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={() => navigate("/orders")}
                className="bg-pink-500 text-white px-6 py-2 rounded"
              >
                Order More
              </button>
              <button
                onClick={() => navigate("/")}
                className="border px-6 py-2 rounded"
              >
                Back Home
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
