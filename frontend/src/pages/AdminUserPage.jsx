import { AdminNav } from "../components/AdminNav";
import { useEffect, useState } from "react";
import "../css/AdminDashboardPage.css";

export function AdminUserPage() {
  const [usersArray, setUsersArray] = useState([]);

  const getToken = () =>
    localStorage.getItem("access_token")
      ? JSON.parse(localStorage.getItem("access_token"))
      : null;

  useEffect(() => {
    fetch("http://localhost:5000/users/", {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setUsersArray(data.data);
      });
  }, []);

  return (
    <>
      <AdminNav />
      <div className="all-users-list">
        <h3>
          <u>See all users</u>
        </h3>
        <table border="1px" className="user-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email Address</th>
              <th>Contact</th>
              <th>Controls</th>
            </tr>
          </thead>
          {usersArray.map((user) => {
            if (user.user_type === "customer") {
              return (
                <tbody key={user.id}>
                  <tr>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>{user.email}</td>
                    <td>{user.contact}</td>
                    <td>
                      <button className="delete-user-button">Delete</button>
                      <button className="see-user-orders-button">
                        See Orders
                      </button>
                    </td>
                  </tr>
                </tbody>
              );
            }
            return null;
          })}
        </table>
      </div>
    </>
  );
}
