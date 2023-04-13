import { Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { UserDash } from "./pages/DashboardPage";
import { OrdersPage } from "./pages/OrdersPage";
import { ProfilePage } from "./pages/ProfilePage";
import Categories from "./MenuComponents/categories";
import { CategoriesPage } from "./pages/CategoriesPage"
import "./App.css";

const IndexLandingPage = () => (
  <div>
    <LandingPage />
  </div>
);

function App() {
  return (
    <Routes>
      <Route path="/" index element={<IndexLandingPage />} />
      <Route path="/dashboard/:id" exact element={<UserDash />} />
      <Route path="/orders/:id" element={<OrdersPage />} />
      <Route path="/profile/:id" element={<ProfilePage />} />
      <Route path="/categories/:id" index element={<CategoriesPage />} />
      <Route path="/categories/:id/:categoryId" index element={<Categories />} />
    </Routes>
  );
}

export default App;
