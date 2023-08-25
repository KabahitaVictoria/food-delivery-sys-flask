import { AdminNav } from "../components/AdminNav";
import { useEffect, useState } from "react";
import "../css/AdminCategoriesPage.css"

export function AdminCategoriesPage() {
  const [categoryDataArray, setCategoryDataArray] = useState([]);

  // Define a function called getToken to get the access token from local storage
  const getToken = () =>
    localStorage.getItem("access_token")
      ? JSON.parse(localStorage.getItem("access_token"))
      : null;

  // Use the useEffect hook to fetch the category data from the backend
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5000/categories/", {
          headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:5173",
          },
        });
        const data = await res.json();
        setCategoryDataArray(data.data);
        console.log(data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCategoryData();
  }, []);

  return (
    <>
      <AdminNav />
      <h1>All categories</h1>
      <table border="1px" className="user-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Image</th>
            <th>Name</th>
            <th>Controls</th>
          </tr>
        </thead>
        {categoryDataArray.map((category) => {
          return (
            <tbody key={category.id}>
              <tr>
                <td>{category.id}</td>
                <td>
                  <img src={category.image} alt="" className="category-image" />
                </td>
                <td>{category.name}</td>
                <td>
                  <button className="delete-user-button">Delete</button>
                  <button className="see-user-orders-button">Update</button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </>
  );
}
