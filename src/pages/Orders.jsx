import { foodItems } from "../data/fooditems";
import { useCart } from "../context/CartContext";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Orders() {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedItem, setSelectedItem] = useState(null); // for details modal

  const categories = ["all", "drinks", "sweets", "savory"];

  const filteredItems =
    activeCategory === "all"
      ? foodItems
      : foodItems.filter((item) => item.category === activeCategory);

  return (
    <div className="p-6 bg-gradient-to-b from-pink-50 to-white min-h-screen">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-pink-600 tracking-wide">
        🍽 Our Delicious Menu
      </h2>

      {/* Category Tabs */}
      <div className="flex justify-center gap-4 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full border transition ${
              activeCategory === cat
                ? "bg-pink-500 text-white border-pink-500"
                : "bg-white text-pink-500 border-pink-300 hover:bg-pink-50"
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Food Items */}
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredItems.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ y: -6, scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl border border-pink-100"
          >
            <div className="relative">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-44 object-cover"
              />
            </div>

            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <div className="flex items-center gap-1 text-yellow-500">
                  <FaStar /> 4.5
                </div>
              </div>
              <p className="text-pink-500 font-bold text-lg mb-3">
                Rs {item.price}
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => addToCart(item)}
                  className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-md flex-1 transition"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => setSelectedItem(item)}
                  className="border border-pink-400 text-pink-500 px-4 py-2 rounded-md hover:bg-pink-50 flex-1 transition"
                >
                  Details
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Details Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative"
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
            >
              ✖
            </button>
            <img
              src={selectedItem.image}
              alt={selectedItem.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-2xl font-bold mb-2">{selectedItem.name}</h3>
            <p className="text-gray-600 mb-4">{selectedItem.description}</p>
            <p className="text-pink-500 font-bold text-lg mb-4">
              Rs {selectedItem.price}
            </p>
            <button
              onClick={() => {
                addToCart(selectedItem);
                setSelectedItem(null);
              }}
              className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-md w-full transition"
            >
              Add to Cart
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
