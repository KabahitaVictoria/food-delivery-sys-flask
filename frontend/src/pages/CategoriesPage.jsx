import Menu from "../MenuComponents/menu";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import "../css/CategoriesPage.css";

export function CategoriesPage() {  
  return (
    <main>
      <Nav />
      <section className="menu section">
        <div className="content-container">
          <div className="title">
            <h2>Categories</h2>
            <div className="underline"></div>
          </div>
          <Menu />
        </div>
        <Footer />
      </section>
    </main>
  );
};

