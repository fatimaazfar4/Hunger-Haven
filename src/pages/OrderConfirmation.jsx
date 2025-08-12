import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function OrderConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const orderId = location.state?.orderId || "UNKNOWN";

  return (
    <div className="p-6 text-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.45 }}
      >
        <h2 className="text-3xl font-bold mb-2">Rider’s on the way!</h2>
        <p className="mb-4">
          Order <span className="font-semibold">#{orderId}</span> confirmed.
          Estimated arrival: 25–35 mins
        </p>

        <motion.img
          src="/images/rider.png"
          alt="rider"
          className="mx-auto w-48 h-48 object-contain"
          animate={{ x: [0, 40, -20, 60, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        />

        <div className="mt-6">
          <button
            onClick={() => navigate("/orders")}
            className="bg-pink-500 text-white px-6 py-2 rounded mr-3"
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
  );
}
