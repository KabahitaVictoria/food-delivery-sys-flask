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
        localStorage.setItem("ordersArray", JSON.stringify(ordersArray));
      });
  }, [id, ordersArray]);

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
            {ordersArray.map((order) => {
              const handleUpdateOrder = async (id, quantity, location) => {
                const res = await fetch(
                  `http://localhost:5000/orders/order/update/${id}`,
                  {
                    method: "PUT",
                    headers: {
                      Authorization: `Bearer ${getToken()}`,
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      quantity: window.prompt(
                        `Your quantity is ${quantity}. Enter the new quantity:`
                      ),
                      location: window.prompt(
                        `Your location is ${location}. Enter the new location:`
                      ),
                    }),
                  }
                );
                const data = await res.json();

                const updatedOrder = data.data;
                setOrdersArray((prevOrdersArray) => {
                  const index = prevOrdersArray.findIndex(
                    (order) => order.id === updatedOrder.id
                  );
                  const updatedOrdersArray = [...prevOrdersArray];
                  updatedOrdersArray[index] = updatedOrder;
                  return updatedOrdersArray;
                });

                alert(data.message);
              };

              const handleDeleteOrder = (id) => {
                fetch(`http://localhost:5000/orders/order/delete/${id}`, {
                  method: "DELETE",
                  headers: {
                    Authorization: `Bearer ${getToken()}`,
                    "Content-Type": "application/json",
                  },
                })
                  .then((response) => {
                    return response.json(); // Return the Promise that resolves to the parsed JSON data
                  })
                  .then((data) => {
                    alert(data.message); // Handle the parsed JSON data
                  })
                  .catch((error) => console.log(error));
              };

              return (
                <div key={order.id} className="order-card">
                  <img src={order.image} alt="" className="order-image" />
                  <p className="bold order-name">{order.name}</p>
                  <div className="order-info bold">
                    <p>
                      <span className="orange">Quantity:</span> {order.quantity}
                    </p>
                    <p>
                      <span className="orange">Location:</span> {order.location}
                    </p>
                  </div>
                  <div className="order-buttons">
                    <button
                      className="update-order-button bold order-button"
                      onClick={() =>
                        handleUpdateOrder(
                          order.id,
                          order.quantity,
                          order.location
                        )
                      }
                    >
                      Update Order
                    </button>
                    <button
                      className="delete-order-button bold order-button"
                      onClick={() => handleDeleteOrder(order.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
