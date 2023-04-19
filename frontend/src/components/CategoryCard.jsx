import { useParams } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import "../css/DashboardPage.css";

export function CategoryCard(props) {
  const { id } = useParams();

  return (
    <div id={props.category}>
      <HashLink
        className="cat-card-link"
        to={`/categories/${id}/#${props.category}`}
        smooth
      >
        <div className="category-card">
          <img src={props.url} alt="" width={60} />
          <p>{props.name}</p>
        </div>
      </HashLink>
    </div>
  );
}
