// Import necessary dependencies
import { Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { UserDash } from "./pages/DashboardPage";
import { OrdersPage } from "./pages/OrdersPage";
import { ProfilePage } from "./pages/ProfilePage";
import Categories from "./MenuComponents/categories";
import { CategoriesPage } from "./pages/CategoriesPage";
import "./App.css";

// Create a component for the index landing page
const IndexLandingPage = () => (
  <div>
    <LandingPage />
  </div>
);

function App() {
  // Define routes for the app using the React Router library
  return (
    <Routes>
      <Route path="/" index element={<IndexLandingPage />} />
      <Route path="/dashboard/:id" exact element={<UserDash />} />
      <Route path="/orders/:id" element={<OrdersPage />} />
      <Route path="/profile/:id" element={<ProfilePage />} />
      <Route path="/categories/:id" index element={<CategoriesPage />} />
      <Route
        path="/categories/:id/:categoryId"
        index
        element={<Categories />}
      />
    </Routes>
  );
}

// Export the App component as the default export
export default App;