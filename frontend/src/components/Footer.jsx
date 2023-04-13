import { useParams, Link } from "react-router-dom";

export function Footer() {
  const { id } = useParams();

  return (
    <div className="footer">
      <div className="burger-icon">
        <img
          src="https://img.icons8.com/pastel-glyph/64/null/beefburger.png"
          alt=""
        />
      </div>
      <div className="pages-footer">
        <h3>Pages</h3>
        <div className="pages-link">
          <ul>
            <li>
              <Link to={`/`} className="footer-link">
                Home
              </Link>
            </li>
            <li>
              <Link to={`/dashboard/${id}`} className="footer-link">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to={`/orders/${id}`} className="footer-link">
                Orders
              </Link>
            </li>
            <li>
              <Link to={`/categories/${id}`} className="footer-link">
                Categories
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="contact-footer">
        <h3>Contact Us</h3>
        <div className="contact-link">
          <ul>
            <li>
              <a href="#twitter" className="footer-link">
                Twitter
              </a>
            </li>
            <li>
              <a href="#facebook" className="footer-link">
                Facebook
              </a>
            </li>
            <li>
              <a href="#email" className="footer-link">
                Email
              </a>
            </li>
            <li>
              <a href="#phone" className="footer-link">
                Phone
              </a>
            </li>
          </ul>
        </div>
        <h3>About Us</h3>
      </div>
    </div>
  );
}
