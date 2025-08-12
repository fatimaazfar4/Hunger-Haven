import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="p-6 text-center">
      <h2 className="text-3xl font-bold mb-2">404</h2>
      <p className="mb-4">Page not found</p>
      <Link to="/" className="text-pink-500 underline">Go back home</Link>
    </div>
  );
}
