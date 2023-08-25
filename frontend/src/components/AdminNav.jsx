// Import necessary components from React Router DOM
import { NavLink, useParams, useNavigate } from "react-router-dom";

// Define Nav component
export function AdminNav() {
  // Extract id parameter from URL
  const { id } = useParams();
  // Create navigate function for programmatic navigation
  const navigate = useNavigate();

  // Remove access token from local storage
  const removeToken = () => {
    localStorage.removeItem("access_token");
  };

  // A function that logs the user out by sending a POST request to the logout endpoint and removing the access_token from localStorage
  function logMeOut() {
    fetch("http://localhost:5000/auth/logout", {
      method: "post", // Make a POST request
    })
      .then((res) => {
        // If successful, log the response, remove the access_token, and navigate to the home page
        console.log(res);
        removeToken();
        navigate("/");
      })
      .catch((err) => {
        // If there is an error, log the error response and its status and headers
        const errRes = err.response;
        console.log(errRes);
        console.log(errRes.status);
        console.log(errRes.headers);
      });
  }

  // This component renders the navigation bar of the user's profile page
  return (
    // The main navigation bar container
    <nav className="prof-nav">
      {/* The logo container */}
      <div className="logo" onClick={logMeOut}>
        {/* The logo icon */}
        <img
          src="https://img.icons8.com/stickers/100/null/hamburger.png"
          alt=""
        />
      </div>
      {/* The pages container */}
      <div className="nav-pages">
        {/* The link to the Dashboard page */}
        <NavLink
          to={`/dashboard/admin/${id}`}
          className={({ isActive }) => (isActive ? "active" : "pages")}
        >
          Dashboard
        </NavLink>
        {/* The link to the Orders page */}
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "pages")}
          to={`/users/admin/${id}`}
        >
          Users
        </NavLink>
        {/* The link to the Categories page */}
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "pages")}
          to={`/categories/admin/${id}`}
        >
          Categories
        </NavLink>
        {/* The link to the Profile page */}
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "pages")}
          to={`/profile/admin/${id}`}
        >
          Profile
        </NavLink>
      </div>
      {/* The logout button */}
      <button onClick={logMeOut} className="logout-btn">
        Logout
      </button>
      {/* The dropdown container */}
      <div className="nav-drpdwn">
        {/* The dropdown icon */}
        <img
          src="https://img.icons8.com/material-outlined/24/000000/menu--v1.png"
          className="dropbtn icon"
          alt=""
        />
        {/* The dropdown pages container */}
        <div className="nav-pages-drpdwn">
          {/* The link to the Dashboard page */}
          <NavLink
            to={`/dashboard/${id}`}
            className={({ isActive }) => (isActive ? "active" : "pages")}
          >
            Dashboard
          </NavLink>
          {/* The link to the Orders page */}
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "pages")}
            to={`/orders/${id}`}
          >
            Orders
          </NavLink>
          {/* The link to the Categories page */}
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "pages")}
            to={`/categories/${id}`}
          >
            Categories
          </NavLink>
          {/* The link to the Profile page */}
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "pages")}
            to={`/profile/${id}`}
          >
            Profile
          </NavLink>
          {/* The logout button inside the dropdown */}
          <button onClick={logMeOut} className="logout-btn logout-btn-drpdwn">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
