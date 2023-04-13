import React from "react";

const Menu = ({ items }) => {

  return (
    <div className="section-center">
      {items.map((item) => {
        const { id, title, img, desc, price } = item;

        function onAddButtonClick() {
          alert("Added order successfully!");
          console.log(item);
        }

        return (
          <article key={id} className="menu-item">
            <img src={img} alt={title} className="photo" title={`${title}`} />
            <div className="item-info">
              <header>
                <div className="item-header-info">
                  <h4>{title}</h4>
                  <h4 className="price">Shs.{price}</h4>
                </div>
                <button
                  className="add-button"
                  title="add to orders"
                  onClick={onAddButtonClick}
                >
                  +
                </button>
              </header>
              <p className="item-text">{desc}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default Menu;
