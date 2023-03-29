import { Link, NavLink, useParams, useNavigate } from "react-router-dom";

export function Nav() {
  const { id } = useParams();
  const navigate = useNavigate();

  const removeToken = () => {
    localStorage.removeItem("access_token");
  };

  function logMeOut() {
    fetch("http://localhost:5000/auth/logout", {
      method: "post"
    }).then(res => {
      console.log(res);
      removeToken()
      navigate("/")
    }).catch(err => {
      const errRes = err.response
      console.log(errRes);
      console.log(errRes.status);
      console.log(errRes.headers);
    })
  }

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
      <button onClick={logMeOut}>Logout</button>
    </nav>
  );
}
