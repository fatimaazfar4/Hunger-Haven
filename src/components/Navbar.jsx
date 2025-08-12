import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaUtensils, FaShoppingCart, FaInfoCircle, FaUserCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext"; // adjust path as needed

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const navItems = [
    { name: "Home", path: "/", icon: <FaHome /> },
    { name: "Menu", path: "/orders", icon: <FaUtensils /> },
    { name: "Cart", path: "/cart", icon: <FaShoppingCart /> },
    { name: "About", path: "/about", icon: <FaInfoCircle /> },
  ];

  // Close profile dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    navigate("/login");
  };

  return (
    <nav className="bg-pink-500 text-white shadow-lg sticky top-0 z-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
          <img src="/HungerHaven.jpeg" alt="logo" className="w-8 h-8" />
          Hunger Haven
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-2 text-lg hover:text-yellow-300 transition 
                 ${isActive ? "border-b-2 border-yellow-300 font-semibold" : ""}`
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}

          {/* Profile or Login/Register */}
          {!user && (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? "underline font-semibold ml-6" : "ml-6 hover:underline"
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive ? "underline font-semibold ml-4" : "ml-4 hover:underline"
                }
              >
                Register
              </NavLink>
            </>
          )}

          {user && (
            <div className="relative ml-6" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 focus:outline-none"
                aria-haspopup="true"
                aria-expanded={profileOpen}
                aria-label="User menu"
              >
                <FaUserCircle className="text-2xl" />
                <span className="font-semibold">{user.name}</span>
                <svg
                  className={`w-5 h-5 transition-transform duration-200 ${
                    profileOpen ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>

              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-44 bg-white rounded-md shadow-lg text-gray-900 z-50"
                >
                  <Link
  to="/profile"
  onClick={() => setProfileOpen(false)}
  className="block px-4 py-2 hover:bg-pink-100"
>
  Order History
</Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-pink-100"
                  >
                    Logout
                  </button>
                </motion.div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          className="md:hidden bg-pink-400 flex flex-col gap-4 px-4 py-3"
        >
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-2 py-2 hover:text-yellow-200 
                 ${isActive ? "font-semibold" : ""}`
              }
              onClick={() => setIsOpen(false)}
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}

          {/* Mobile Profile menu */}
          {!user && (
            <>
              <NavLink
                to="/login"
                className="py-2 hover:text-yellow-200"
                onClick={() => setIsOpen(false)}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="py-2 hover:text-yellow-200"
                onClick={() => setIsOpen(false)}
              >
                Register
              </NavLink>
            </>
          )}
          {user && (
  <>
    <NavLink
      to="/profile"
      className="py-2 hover:text-yellow-200"
      onClick={() => setIsOpen(false)}
    >
      Order History
    </NavLink>
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                  navigate("/login");
                }}
                className="py-2 text-left hover:text-yellow-200"
              >
                Logout
              </button>
            </>
          )}
        </motion.div>
      )}
    </nav>
  );
}
