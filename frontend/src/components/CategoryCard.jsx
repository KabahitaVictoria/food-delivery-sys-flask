// Import the 'useParams' hook from 'react-router-dom' to access URL parameters
import { useParams } from "react-router-dom";

// Import the 'HashLink' component from 'react-router-hash-link' to create links that scroll to a specified element on the page
import { HashLink } from "react-router-hash-link";

// Import the CSS file for the component
import "../css/DashboardPage.css";

// Define the 'CategoryCard' component
export function CategoryCard(props) {
  // Access the URL parameters using the 'useParams' hook
  const { id } = useParams();

  // Render the component
  return (
    <div id={props.category}>
      {/* Create a link using the 'HashLink' component to scroll to the specified element on the page */}
      <HashLink
        className="cat-card-link"
        to={`/categories/${id}/#${props.category}`}
        smooth
      >
        {/* Render the category card */}
        <div className="category-card">
          <img src={props.url} alt="" width={60} />
          <p>{props.name}</p>
        </div>
      </HashLink>
    </div>
  );
}
