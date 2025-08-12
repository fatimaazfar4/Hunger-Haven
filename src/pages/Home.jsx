import { Link } from "react-router-dom";
import { restaurants } from "../data/fooditems";

export default function Home() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Restaurants</h2>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {restaurants.map((res) => (
          <Link
            key={res.id}
            to={`/menu/${res.id}`}
            className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
          >
            <img src={res.image} alt={res.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold text-lg">{res.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
