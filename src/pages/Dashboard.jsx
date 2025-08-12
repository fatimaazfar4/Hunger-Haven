
import React from "react";
import { offers } from "../data/offers";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const { applyCoupon, coupon, subtotal, discountAmount } = useCart();

  // demo data (in a real app you would compute these from orders)
  const salesByCategory = {
    labels: ["Savory", "Sweets", "Drinks"],
    datasets: [
      {
        label: "Sales (Rs)",
        data: [subtotal * 0.6 || 8500, subtotal * 0.25 || 4300, subtotal * 0.15 || 3200],
        backgroundColor: ["#F97316", "#EF4444", "#06B6D4"],
      },
    ],
  };

  const weeklyOrders = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Orders",
        data: [12, 19, 8, 17, 24, 29, 32],
        borderColor: "#DB2777",
        backgroundColor: "rgba(219,39,119,0.12)",
        tension: 0.35,
        fill: true,
        pointRadius: 4,
      },
    ],
  };

  const navigate = useNavigate();


  const [notifications, setNotifications] = React.useState([
  { id: 1, message: "Your order #1234 has been delivered.", read: false },
  { id: 2, message: "New offer: 20% off on desserts!", read: false },
  { id: 3, message: "Order #1235 is on the way.", read: true },
]);

  // Read recent orders from localStorage
  const orders = JSON.parse(localStorage.getItem("orderHistory") || "[]").slice().reverse(); // newest first

  return (
    <div className="p-6 space-y-8">
      {/* Hero */}
      <div className="rounded-lg bg-gradient-to-r from-pink-600 to-violet-600 text-white p-8 flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">Crave it. Order it. Love it.</h1>
          <p className="mt-4 text-lg opacity-90">Delicious food, blazing-fast delivery, and exclusive offers just for you.</p>
          <div className="mt-6 flex gap-4">
            <button
        onClick={() => navigate("/orders")}
        className="bg-white text-pink-600 px-6 py-3 rounded-lg font-semibold shadow"
      >
        See Menu
      </button>
      <button
        onClick={() => navigate("/orders")}
        className="border border-white text-white px-6 py-3 rounded-lg"
      >
        Explore
      </button>
      </div>
        </div>

        <div className="w-full md:w-1/3">
          <img src="/HungerHaven.jpeg" alt="hero" className="rounded-lg shadow-lg object-cover w-full h-56" />
        </div>
      </div>

      {/* Hot Offers */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Hot Offers</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {offers.map((o) => (
            <motion.div
              key={o.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative border rounded-lg overflow-hidden shadow-lg flex bg-white"
            >
              <img src={o.image} alt={o.title} className="w-36 object-cover" />
              <div className="p-4 flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-xl font-bold">{o.title}</div>
                    <div className="text-sm text-gray-600">{o.subtitle}</div>
                    <div className="mt-3 text-sm text-gray-700">Code: <span className="font-medium">{o.id}</span></div>
                  </div>
                  <div>
                    <button
                      className="bg-pink-500 text-white px-3 py-1 rounded-md shadow"
                      onClick={() => applyCoupon(o)}
                    >
                      Avail
                    </button>
                  </div>
                </div>
                {coupon?.id === o.id && <div className="mt-3 text-green-600 font-semibold">Coupon applied ✓</div>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats + Charts */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm text-gray-500">Subtotal</h3>
          <div className="text-2xl font-bold mt-2">Rs {subtotal}</div>
          <div className="text-sm text-green-600 mt-2">Discount: Rs {discountAmount}</div>
          {coupon && <div className="mt-3 text-sm">Coupon: <span className="font-medium">{coupon.id}</span></div>}
        </div>

        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm text-gray-500">This week orders</h3>
          <div className="mt-4">
            <Line data={weeklyOrders} options={{ plugins: { legend: { display: false } } }} />
          </div>
        </div>
      </div>

<div className="bg-white p-6 rounded-lg shadow mb-8 max-w-md mx-auto md:mx-0">
  <div className="flex justify-between items-center mb-4">
    <h3 className="text-lg font-semibold">Notifications</h3>
    <div className="flex items-center gap-2">
      <span className="bg-pink-500 text-white rounded-full px-3 py-1 text-sm font-bold">
        {notifications.filter((n) => !n.read).length}
      </span>
      <button
        className="text-sm text-pink-600 hover:underline"
        onClick={() =>
          setNotifications(notifications.map((n) => ({ ...n, read: true })))
        }
      >
        Mark all as read
      </button>
    </div>
  </div>

  {notifications.length === 0 ? (
    <p className="text-gray-600">No notifications</p>
  ) : (
    <ul className="divide-y max-h-48 overflow-auto">
      {notifications.map(({ id, message, read }) => (
        <li
          key={id}
          className={`py-2 px-3 ${
            read ? "text-gray-500" : "font-semibold text-pink-600"
          }`}
        >
          {message}
        </li>
      ))}
    </ul>
  )}
</div>


    </div>
  );
}
