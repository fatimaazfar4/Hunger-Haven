# Hunger Haven

A modern food ordering web application offering a delightful user experience with blazing-fast delivery, exclusive offers, and interactive dashboards. Hunger Haven is a full-featured React-based food ordering application. It allows users to browse the menu, add items to cart, apply coupons, view order history, and track real-time order notifications. The application emphasizes fast UI feedback, smooth animations, and a mobile-friendly responsive design.

---

## Features

- User authentication (Login/Register)
- Browse menu & add to cart
- Coupon application & discount calculations
- Order checkout and confirmation
- View order history with status updates
- Real-time notifications with mark-as-read functionality
- Interactive dashboard with sales and order charts
- Responsive navigation with profile dropdown
- Error handling and 404 page for unknown routes

---

## Tech Stack

- **Frontend:** React, React Router, React Context API
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Charts:** Chart.js (via react-chartjs-2)
- **Build Tool:** Vite

---

## Project Structure
src/
├── assets/           # Images and icons
├── components/       # Reusable UI components (Navbar, PublicRoute, PrivateRoute, etc.)
├── context/          # React Context providers (AuthContext, CartContext)
├── data/             # Static data such as offers and menu items
├── pages/            # Route pages (Dashboard, Orders, Cart, Profile, etc.)
├── App.jsx           # Root app component with router setup
├── main.jsx          # App entry point
tailwind.config.js    # Tailwind CSS configuration
vite.config.js        # Vite build configuration
package.json          # Project dependencies and scripts


---

