// Import the Nav component from "../components/Nav"
import { Nav } from "../components/Nav";

// Import the Footer component from "../components/Footer"
import { Footer } from "../components/Footer";

// Import the UpdateInfo component from "../components/UpdateInfo"
import { UpdateInfo } from "../components/UpdateInfo";

// Define the ProfilePage component
export function ProfilePage() {
  // Render the ProfilePage component
  return (
    <div className="profile">
      <div className="content-container">
        {/* Render the Nav component */}
        <Nav />
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
