export function Footer() {
    return (
      <div className="footer">
        <div className="burger-icon">
          <img src="https://img.icons8.com/ios-filled/50/null/hamburger.png" alt="" />
        </div>
        <div className="pages-footer">
          <h3>Pages</h3>
          <div className="pages-link">
            <ul>
              <li>Home</li>
              <li>Dashboard</li>
              <li>Orders</li>
              <li>Addresses</li>
              <li>Categories</li>
            </ul>
          </div>
        </div>
        <div className="contact-footer">
          <h3>Contact Us</h3>
          <div className="contact-link">
            <ul>
              <li>Twitter</li>
              <li>Facebook</li>
              <li>Email</li>
              <li>Phone</li>
            </ul>
          </div>
          <h3>About Us</h3>
        </div>
      </div>
    );
}