import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function Orders() {
  const [ordersArray, setOrdersArray] = useState([]);
  const { id } = useParams();

  // Define a function to get the user's access token from localStorage
  const getToken = () =>
    localStorage.getItem("access_token")
      ? JSON.parse(localStorage.getItem("access_token"))
      : null;

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setOrdersArray(data.data);
        localStorage.setItem("ordersArray", JSON.stringify(ordersArray));
      });
  }, [id, ordersArray]);

  const recentOrders = ordersArray.sort((a, b) => b.id - a.id).slice(0, 2);

  return (
    <div className="orders-dashboard">
      <h2>RECENT ORDERS</h2>
      <div className="orders-dashboard-content">
        {recentOrders.length === 0 ? (
          <p>No orders to see yet . . .</p>
        ) : (
          recentOrders.map((order) => (
            <div key={order.id} className="order-card-dashboard">
              <p className="bold">{order.name}</p>
              <p>
                <span className="orange">Quantity:</span> {order.quantity}
              </p>
              <p>
                <span className="orange">Location:</span> {order.location}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
