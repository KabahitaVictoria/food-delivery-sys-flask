import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../css/OrdersPage.css";

export function OrdersPage() {
  const [ordersArray, setOrdersArray] = useState([])
  const { id } = useParams();

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
      });
  }, [id])

  return (
    <div className="orders-page">
      <div className="content-container">
        <Nav />
        <div className="">
          <h2 className="active">Orders</h2>
          <h3 className="bold">All your purchases in one place</h3>
          <div>
            {ordersArray.length === 0 && (
              <>
                <p className="bold">You haven't ordered anything yet</p>
                <p>You will be able to see your previous orders in this page</p>
              </>
            )}
          </div>
          <div className="orders-cards">
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

// export function OrdersPage() {
//     return (
//       <div className="orders-page">
//         <div className="content-container">
//           <Nav />
//           <div className="orders-body">
//             <h2 className="active">Recent Orders</h2>
//             <p>Your recent purchases</p>
//             <div>
//               <p className="bold">You haven't ordered anything yet</p>
//               <p>You will be able to see your previous orders in this page</p>
//             </div>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
// }
