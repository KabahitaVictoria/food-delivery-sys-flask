
// Importing necessary dependencies
import { useEffect, useState } from "react";
import { MenuCategory } from "./MenuCategory";

// Creating a functional component called "Menu"
export const Menu = () => {
  // Declaring a state variable named "foodItemArray" and initializing it as an empty array
  const [foodItemArray, setFoodItemArray] = useState([]);

  // A function named "getToken" that gets the token from localStorage
  const getToken = () =>
    localStorage.getItem("access_token")
      ? JSON.parse(localStorage.getItem("access_token"))
      : null;

  // A useEffect hook that sends a GET request to the server to fetch the food items data
  useEffect(() => {
    fetch("http://localhost:5000/food_items/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:5173",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // Saving the fetched data to the localStorage
        localStorage.setItem("food_items", JSON.stringify(data.data));
        // Setting the "foodItemArray" state variable with the parsed localStorage data
        setFoodItemArray(JSON.parse(localStorage.getItem("food_items")));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Returning the rendered JSX
  return (
    <div className="all">
      {/* Checking if "foodItemArray" is empty and rendering a "Loading..." message if true */}
      {foodItemArray.length === 0 ? (
        <p>Loading...</p>
      ) : (
        // Rendering the "MenuCategory" component with the "foodItemArray" props
        <MenuCategory foodItemArray={foodItemArray} />
      )}
    </div>
  );
};

export default Menu;
