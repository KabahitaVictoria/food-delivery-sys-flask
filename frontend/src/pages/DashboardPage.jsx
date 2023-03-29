import { CategoryCard } from "../components/CategoryCard";
import { Nav } from "../components/Nav";
import { Orders } from "../components/Orders";
import { Link, useParams } from "react-router-dom";
import { Footer } from "../components/Footer";
import { useState, useEffect } from "react";

export function DashBody(props) {
  return (
    <div className="prof-body">
      <div className="main">
        <h1>Welcome back, {props.name}!</h1>
        <div className="category-cards">
          <div className="category-heading">
            <h2>Food Categories</h2>
          </div>
          <div className="cat-cards">
            <CategoryCard
              url="https://img.icons8.com/external-justicon-lineal-color-justicon/64/null/external-breakfast-hotel-essentials-justicon-lineal-color-justicon.png"
              name="breakfast"
            />
            <CategoryCard
              url="https://img.icons8.com/external-vitaliy-gorbachev-lineal-color-vitaly-gorbachev/60/null/external-lunch-back-to-school-vitaliy-gorbachev-lineal-color-vitaly-gorbachev.png"
              name="lunch/supper"
            />
            <CategoryCard
              url="https://img.icons8.com/color-glass/48/null/potato-chips.png"
              name="snacks"
            />
            <CategoryCard
              url="https://img.icons8.com/cotton/64/null/beach-cocktail--v2.png"
              name="drinks"
            />
            <CategoryCard
              url="https://img.icons8.com/cute-clipart/64/null/croissant.png"
              name="desserts"
            />
            <Link className="see-more-link" to={"/categories"}>
              See more
            </Link>
          </div>
        </div>
        <div className="prof-orders">
          <Orders />
        </div>
      </div>
      <div className="user-info">
        <h2>User Info</h2>
        <img
          src="https://img.icons8.com/cute-clipart/64/null/meal.png"
          alt=""
        />
        <div className="info">
          <p className="info-label">First Name: </p>
          <p className="info-value">Victoria</p>
        </div>
        <div className="info">
          <p className="info-label">Last Name: </p>
          <p className="info-value">Kabahita</p>
        </div>
        <div className="info">
          <p className="info-label">Email Address: </p>
          <p className="info-value">vicky33@server.com</p>
        </div>
        <div className="info">
          <p className="info-label"> Address: </p>
          <p className="info-value">kyambogo</p>
        </div>
        <Link to={"/profile"}>
          <button className="edit">Edit your info</button>
        </Link>
      </div>
    </div>
  );
}

export function UserDash() {
  const { id } = useParams(); // get single user based on id
  const [firstName, setFirstName] = useState("");

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
      });
  });

  return (
    <div className="Profile">
      <Nav />
      <DashBody name={firstName} />
      <Footer />
    </div>
  );
}
