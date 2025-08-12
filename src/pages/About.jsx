import { motion } from "framer-motion";
import { FaLeaf, FaTruck, FaSmile } from "react-icons/fa";

export default function About() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
          alt="Restaurant"
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold"
          >
            Serving Happiness Since 2010 🍔
          </motion.h1>
          <p className="mt-4 text-lg">Fresh • Fast • Flavorful</p>
        </div>
      </div>

      {/* Our Story */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10 items-center">
        <motion.img
          src="/motion.jpeg"
          alt="Chef cooking"
          className="rounded-lg shadow-lg w-full h-64 object-cover md:w-96 md:h-auto"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        />
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>
          <p className="text-gray-700 leading-relaxed">
            At Hunger Haven, our passion for food drives everything we do. Since opening in 2010, 
            we have been dedicated to crafting delicious meals using only the freshest ingredients. 
            From our kitchen to your table, every bite tells a story of love, care, and flavor.
          </p>
        </motion.div>
      </section>

      {/* Core Values */}
      <section className="bg-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-white shadow rounded-lg"
          >
            <FaLeaf className="text-green-500 text-4xl mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">Fresh Ingredients</h3>
            <p className="text-gray-600">
              We source locally to bring you the freshest produce and flavors.
            </p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-white shadow rounded-lg"
          >
            <FaTruck className="text-blue-500 text-4xl mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">Fast Delivery</h3>
            <p className="text-gray-600">
              Your favorite meals delivered to your doorstep in no time.
            </p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-white shadow rounded-lg"
          >
            <FaSmile className="text-yellow-500 text-4xl mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">Friendly Service</h3>
            <p className="text-gray-600">
              Our team ensures every visit leaves you smiling and satisfied.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Visit Us Today</h2>
        <p className="mb-6 text-gray-700">
          Experience the taste of happiness in every bite.
        </p>
        <a
          href="https://goo.gl/maps"
          target="_blank"
          rel="noreferrer"
          className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition"
        >
          Find Us on Map
        </a>
      </section>
    </div>
  );
}
