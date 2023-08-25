import { AdminNav } from "../components/AdminNav";
import "../css/AdminDashboardPage.css";

export function Dashboard() {

  return (
    <div className="admin-dashboard">
      <AdminNav />
      <h1>Welcome, Admin!</h1>
      <h2>What will you do today?</h2>
    </div>
  );
}
