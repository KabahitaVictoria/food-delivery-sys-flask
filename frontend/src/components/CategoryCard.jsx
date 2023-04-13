import { useParams, NavLink } from "react-router-dom";
import "../css/DashboardPage.css"

export function CategoryCard(props) {
  const { id } = useParams();

  return (
    <NavLink
      className="cat-card-link"
      to={`/categories/${id}/#${props.category}`}
      id={`${props.category}`}
    >
      <div
        className="category-card"
      >
        <img src={props.url} alt="" width={60} />
        <p>{props.name}</p>
      </div>
    </NavLink>
  );
}
