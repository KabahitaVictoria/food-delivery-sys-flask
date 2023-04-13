// import { useParams } from "react-router-dom"
// import { useEffect } from "react";
import { Nav } from "../components/Nav"
import { Footer } from "../components/Footer";
import { UpdateInfo } from "../components/UpdateInfo"

export function ProfilePage() {
    // const { id } = useParams();

    return (
      <div className="profile">
        <div className="content-container">
          <Nav />
          <h1>Profile info</h1>
          <UpdateInfo />
        </div>
        <Footer />
      </div>
    );
}