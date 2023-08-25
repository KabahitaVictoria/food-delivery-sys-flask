// Import the Nav component from "../components/Nav"
import { AdminNav } from "../components/AdminNav";

// Import the Footer component from "../components/Footer"
import { Footer } from "../components/Footer";

// Import the UpdateInfo component from "../components/UpdateInfo"
import { UpdateInfo } from "../components/UpdateInfo";

// Define the ProfilePage component
export function AdminProfilePage() {
  // Render the ProfilePage component
  return (
    <div className="profile">
      <div className="content-container">
        {/* Render the Nav component */}
        <AdminNav />
        {/* Render the heading for the profile info */}
        <h1>Profile info</h1>
        {/* Render the UpdateInfo component */}
        <UpdateInfo />
      </div>

      {/* Render the Footer component */}
      <Footer />
    </div>
  );
}
