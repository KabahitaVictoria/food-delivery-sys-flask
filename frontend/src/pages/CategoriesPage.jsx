import { useState } from "react";
import Menu from "../MenuComponents/menu";
import Categories from "../MenuComponents/categories";
import items from "../MenuComponents/data";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import "../css/CategoriesPage.css";

const allCategories = ["all", ...new Set(items.map((item) => item.category))];

export function CategoriesPage() {
  const [menuItems, setMenuItems] = useState(items);
  const [activeCategory, setActiveCategory] = useState("");
  const [categories] = useState(allCategories);

  const filterItems = (category) => {
    setActiveCategory(category);
    if (category === "all") {
      setMenuItems(items);
      return;
    }
    const newItems = items.filter((item) => item.category === category);
    setMenuItems(newItems);
  };
  
  return (
    <main>
      <Nav />
      <section className="menu section">
        <div className="content-container">
          <div className="title">
            <h2>Categories</h2>
            <div className="underline"></div>
          </div>
          <Categories
            categories={categories}
            activeCategory={activeCategory}
            filterItems={filterItems}
          />
          <Menu items={menuItems} />
        </div>
        <Footer />
      </section>
    </main>
  );
};

