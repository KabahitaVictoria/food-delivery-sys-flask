import { NavLink, useParams } from "react-router-dom";

const Categories = ({ categories, filterItems, activeCategory }) => {
  const { id } = useParams();

  return (
    <div className="btn-container">
      {categories.map((category, index) => {
        const categoryId = category;

        return (
          <NavLink
            className={`${
              activeCategory === category
                ? "filter-btn active-category"
                : "filter-btn"
            }`}
            id={`${category}`}
            key={index}
            onClick={() => filterItems(category)}
            to={`/categories/${id}/#${categoryId}`}
          >
            {category}
          </NavLink>
        );
      })}
    </div>
  );
};

export default Categories;