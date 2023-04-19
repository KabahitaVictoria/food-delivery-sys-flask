import { useEffect, useState } from "react";
import { MenuCategory } from "../components/MenuCategory";

const Menu = () => {
  const [foodItemArray, setFoodItemArray] = useState([])

  const getToken = () =>
    localStorage.getItem("access_token")
      ? JSON.parse(localStorage.getItem("access_token"))
      : null;

  useEffect(()=> {
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
        localStorage.setItem("food_items", JSON.stringify(data.data));
        setFoodItemArray(JSON.parse(localStorage.getItem("food_items")));
      })
      .catch((error) => {
        console.error(error);
      });
  }, [])

  return (
    <div className="all">
      {foodItemArray.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <MenuCategory foodItemArray={foodItemArray} />
      )}
    </div>
  );
};

export default Menu;
