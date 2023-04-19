// Import the necessary components and hooks from the React and React Router DOM libraries
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Import the OrdersPage CSS file
import "../css/OrdersPage.css";

// Define the OrdersPage component
export function OrdersPage() {
  // Define state variables using the useState hook
  const [ordersArray, setOrdersArray] = useState([]);
  const { id } = useParams();

  // Define a function to get the user's access token from localStorage
  const getToken = () =>
    localStorage.getItem("access_token")
      ? JSON.parse(localStorage.getItem("access_token"))
      : null;

  // Use the useEffect hook to fetch the user's orders from the server and update the state variable
  useEffect(() => {
    fetch(`http://127.0.0.1:5000/orders/${id}`, {
      headers: {
        Authorization: ` Bearer ${getToken()}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setOrdersArray(data.data);
      });
  }, [id]);

  // Render the OrdersPage component
  return (
    <div className="orders-page">
      <div className="content-container">
        <Nav />
        <div className="">
          <h2 className="active">Orders</h2>
          <h3 className="bold">All your purchases in one place</h3>
          <div>
            {/* If the ordersArray is empty, display a message */}
            {ordersArray.length === 0 && (
              <>
                <p className="bold">You haven't ordered anything yet</p>
                <p>You will be able to see your previous orders in this page</p>
              </>
            )}
          </div>
          <div className="orders-cards">
            {/* Map over the ordersArray and display each order */}
            {ordersArray.map((order) => (
              <div key={order.id} className="order-card">
                <img src={order.image} alt="" />
                <p className="bold order-name">{order.name}</p>
                <div className="order-info bold">
                  <p>
                    <span className="orange">Quantity:</span> {order.quantity}
                  </p>
                  <p>
                    <span className="orange">Location:</span> {order.location}
                  </p>
                </div>
                <button className="order-button">See Item Info</button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
