import { useParams } from "react-router-dom";
import { restaurants } from "../data/fooditems";
import { useCart } from "../context/CartContext";

export default function Menu() {
  const { id } = useParams();
  const restaurant = restaurants.find((r) => r.id === parseInt(id));
  const { addToCart } = useCart();

  if (!restaurant) {
    return <p className="p-6">Restaurant not found</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">{restaurant.name}</h2>
      <div className="space-y-4">
        {restaurant.menu.map((item) => (
          <div key={item.id} className="flex justify-between items-center border p-3 rounded-lg">
            <span>{item.name}</span>
            <span className="font-bold">Rs {item.price}</span>
            <button
              onClick={() => addToCart(item)}
              className="bg-pink-500 text-white px-4 py-1 rounded"
            >
              Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
