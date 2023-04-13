import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { DashBody } from "../components/DashBody";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export function UserDash() {
  const { id } = useParams(); // get single user based on id
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState(0);

  const getToken = () =>
    localStorage.getItem("access_token")
      ? JSON.parse(localStorage.getItem("access_token"))
      : null;

  useEffect(() => {
    fetch(`http://localhost:5000/users/user/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setFirstName(data.data.first_name);
        setLastName(data.data.last_name);
        setEmail(data.data.email);
        setContact(data.data.contact);
        console.log(data.data.contact);
      });
  });

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
