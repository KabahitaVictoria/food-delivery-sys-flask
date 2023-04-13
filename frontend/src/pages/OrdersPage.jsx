import { Nav } from "../components/Nav"
import { Footer } from "../components/Footer"
import '../css/OrdersPage.css'

export function OrdersPage() {
    return (
      <div className="orders-page">
        <div className="content-container">
          <Nav />
          <div className="orders-body">
            <h2 className="active">Recent Orders</h2>
            <p>Your recent purchases</p>
            <div>
              <p className="bold">You haven't ordered anything yet</p>
              <p>You will be able to see your previous orders in this page</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
}