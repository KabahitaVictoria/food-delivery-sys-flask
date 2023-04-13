import { Link } from "react-router-dom";

export function UserInfo(props) {
    return (
      <div className={`user-info ${props.secondary_classname}`}>
        <h2>User Info</h2>
        <img
          src="https://img.icons8.com/cute-clipart/64/null/meal.png"
          alt=""
        />
        <div className="info">
          <p className="info-label">First Name: </p>
          <p className="info-value">{props.firstName}</p>
        </div>
        <div className="info">
          <p className="info-label">Last Name: </p>
          <p className="info-value">{props.lastName}</p>
        </div>
        <div className="info">
          <p className="info-label">Email Address: </p>
          <p className="info-value">{props.email}</p>
        </div>
        <div className="info">
          <p className="info-label"> Address: </p>
          <p className="info-value">No address set yet</p>
        </div>
        <Link to={`/profile/${props.id}`}>
          <button className="edit">Edit your info</button>
        </Link>
      </div>
    );
}