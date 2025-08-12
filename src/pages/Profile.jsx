import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function Profile() {
  // Dummy sales by category data
  const salesByCategory = {
    labels: ["Pizza", "Burgers", "Desserts", "Drinks"],
    datasets: [
      {
        label: "Sales",
        data: [120, 90, 70, 40],
        backgroundColor: ["#f43f5e", "#f97316", "#3b82f6", "#10b981"],
        borderRadius: 4,
      },
    ],
  };

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Load orders from localStorage (or replace with API call)
    const storedOrders = JSON.parse(localStorage.getItem("orderHistory") || "[]");
    setOrders(storedOrders.reverse()); // Show latest orders first
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-pink-600">Profile - Order History</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Sales by Category Chart */}
        <div className="bg-white p-6 rounded-lg shadow" style={{ height: 300, position: "relative" }}>
  <h3 className="text-lg font-semibold mb-4">Sales by Category</h3>
  <Bar
    data={salesByCategory}
    options={{
      plugins: { legend: { display: false } },
      maintainAspectRatio: false,
    }}
    // Remove height prop here, container sets height
  />
</div>

        {/* Recent Orders List */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
          {orders.length === 0 ? (
            <p className="text-gray-600">No recent orders yet.</p>
          ) : (
            <div className="space-y-3 max-h-64 overflow-auto">
              {orders.slice(0, 8).map((ord, idx) => (
                <div
                  key={idx}
                  className="border rounded p-3 flex justify-between items-start"
                >
                  <div>
                    <div className="font-medium">
                      #{ord.id}{" "}
                      <span className="text-sm text-gray-500">• {ord.date}</span>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {ord.items
                        .map((i) => `${i.name} x${i.quantity}`)
                        .join(", ")}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">Rs {ord.total}</div>
                    <div
                      className={`text-sm mt-1 ${
                        ord.status === "Delivered"
                          ? "text-green-600"
                          : ord.status === "On the way"
                          ? "text-yellow-600"
                          : "text-blue-600"
                      }`}
                    >
                      {ord.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
