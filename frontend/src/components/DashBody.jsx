import { CategoryCard } from "./CategoryCard";
import { Orders } from "./Orders";
import { UserInfo } from "./UserInfo";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export function DashBody(props) {
  // State to hold the array of food categories
  const [categoryArray, setCategoryArray] = useState([]);

  // Function to get token from localStorage
  const getToken = () =>
    localStorage.getItem("access_token")
      ? JSON.parse(localStorage.getItem("access_token"))
      : null;

  // Fetch categories data from API and set categoryArray state
  useEffect(() => {
    fetch("http://127.0.0.1:5000/categories/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCategoryArray(data.data);
      });
  }, []);

  return (
    <div className="prof-body">
      <div className="main">
        <h1>Welcome back, {props.firstName}!</h1>
        <div className="category-cards">
          <div className="category-heading">
            <h2>Food Categories</h2>
          </div>
          <div className="cat-cards">
            {/* Map through categoryArray and render a CategoryCard component for each */}
            {categoryArray.map((category) => {
              return (
                <CategoryCard
                  key={category.id}
                  category={category.name}
                  url={category.image}
                  name={category.name}
                />
              );
            })}
            {/* Link to the category page */}
            <Link
              className="see-more-link link1"
              to={`/categories/${props.id}`}
            >
              See more
            </Link>
          </div>
        </div>
        {/* Render Orders component */}
        <div className="prof-orders">
          <Orders />
        </div>
        {/* Render UserInfo component */}
        <UserInfo
          firstName={props.firstName}
          lastName={props.lastName}
          email={props.email}
          id={props.id}
          secondary_classname="user-info-2"
        />
      </div>
      {/* Render another instance of UserInfo component */}
      <UserInfo
        firstName={props.firstName}
        lastName={props.lastName}
        email={props.email}
        id={props.id}
        secondary_classname="user-info-1"
      />
    </div>
  );
}
