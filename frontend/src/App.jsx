import { Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { UserDash } from "./pages/DashboardPage";
import { OrdersPage } from "./pages/OrdersPage";
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
    </Routes>
  );
}

export default App;