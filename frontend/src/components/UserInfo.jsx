import { Link } from "react-router-dom";

// Define a function component called UserInfo that takes props as its parameter
export function UserInfo(props) {
  // Render the user info section
  return (
    <div className={`user-info ${props.secondary_classname}`}>
      <h2>User Info</h2>
      {/* Display a meal icon */}
      <img src="https://img.icons8.com/cute-clipart/64/null/meal.png" alt="" />

      {/* Display the user's first name */}
      <div className="info">
        <p className="info-label">First Name: </p>
        <p className="info-value">{props.firstName}</p>
      </div>

      {/* Display the user's last name */}
      <div className="info">
        <p className="info-label">Last Name: </p>
        <p className="info-value">{props.lastName}</p>
      </div>

      {/* Display the user's email address */}
      <div className="info">
        <p className="info-label">Email Address: </p>
        <p className="info-value">{props.email}</p>
      </div>

      {/* Display a message if no address is set */}
      <div className="info">
        <p className="info-label"> Address: </p>
        <p className="info-value">No address set yet</p>
      </div>

      {/* Add a button to edit user info */}
      <Link to={`/profile/${props.id}`}>
        <button className="edit">Edit your info</button>
      </Link>
    </div>
  );
}
