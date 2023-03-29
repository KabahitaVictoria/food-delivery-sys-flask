import { Link, NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";

export function Nav() {

  const { id } = useParams()

  return (
    <nav className="prof-nav">
      <div className="logo">
        <Link to={"/"}>
          <img
            src="https://img.icons8.com/stickers/100/null/hamburger.png"
            alt=""
          />
        </Link>
      </div>
      <div className="nav-pages">
        <NavLink
          to={`/dashboard/${id}`}
          className={({ isActive }) => (isActive ? "active" : "pages")}
        >
          Dashboard
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "pages")}
          to={`/orders/${id}`}
        >
          Orders
        </NavLink>
        <Link className="pages">Categories</Link>
        <Link className="pages">Profile</Link>
      </div>
      <button>Logout</button>
    </nav>
  );
}
