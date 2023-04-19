// Import necessary components and hooks
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { DashBody } from "../components/DashBody";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Define UserDash component
export function UserDash() {
  // Get user id from URL parameter
  const { id } = useParams();
  // Set up state variables for user information
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState(0);

  // Function to get access token from local storage
  const getToken = () =>
    localStorage.getItem("access_token")
      ? JSON.parse(localStorage.getItem("access_token"))
      : null;

  // Fetch user information from backend API using useEffect hook
  useEffect(() => {
    fetch(`http://localhost:5000/users/user/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setFirstName(data.data.first_name);
        setLastName(data.data.last_name);
        setEmail(data.data.email);
        setContact(data.data.contact);
      });
  });

  // Render Nav, DashBody, and Footer components
  return (
    <div className="dashboard">
      <Nav />
      <DashBody
        firstName={firstName}
        lastName={lastName}
        email={email}
        contact={contact}
        id={id}
      />
      <Footer />
    </div>
  );
}
