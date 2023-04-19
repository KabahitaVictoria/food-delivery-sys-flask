// Import the Menu component from "../MenuComponents/menu"
import Menu from "../MenuComponents/menu";

// Import the Nav component from "../components/Nav"
import { Nav } from "../components/Nav";

// Import the Footer component from "../components/Footer"
import { Footer } from "../components/Footer";

// Import the CategoriesPage.css stylesheet from "../css/"
import "../css/CategoriesPage.css";

// Define the CategoriesPage functional component
export function CategoriesPage() {
  // Return a main section containing a navigation bar, a title, and a menu of categories
  return (
    <main>
      {/* Use the imported Nav component to display a navigation bar at the top of the page */}
      <Nav />

      {/* Define a section for the menu of categories using the CSS class "menu section" */}
      <section className="menu section">
        {/* Use a div with the CSS class "content-container" to center the menu on the page */}
        <div className="content-container">
          {/* Use a div with the CSS class "title" to display the title "Categories" */}
          <div className="title">
            {/* Use an h2 tag to format the title as a heading */}
            <h2>Categories</h2>
            {/* Use a div with the CSS class "underline" to add a horizontal line under the title */}
            <div className="underline"></div>
          </div>

          {/* Use the imported Menu component to display a list of categories */}
          <Menu />
        </div>

        {/* Use the imported Footer component to display a footer at the bottom of the page */}
        <Footer />
      </section>
    </main>
  );
}
