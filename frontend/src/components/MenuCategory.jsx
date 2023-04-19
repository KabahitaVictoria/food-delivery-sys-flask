import { useState, useEffect } from "react";
import { HashLink } from "react-router-hash-link";
// import { useParams } from "react-router-dom";

export function MenuCategory(props) {
  const [categoryDataArray, setCategoryDataArray] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  // const { id } = useParams();

  const getToken = () =>
    localStorage.getItem("access_token")
      ? JSON.parse(localStorage.getItem("access_token"))
      : null;

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("http://127.0.0.1:5000/categories/", {
          headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:5173",
          },
        });
        const data = await res.json();
        setCategoryDataArray(data.data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCategoryData();
  }, []);

  // Function to scroll to the linked div
  function scrollToDiv(category) {
    console.log("scrollToDiv called with category:", category);
    const linkedDiv = document.getElementById(`category-${category}`);
    console.log("linkedDiv:", linkedDiv);
    linkedDiv.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      {[...new Set(categoryDataArray.map((category) => category.name))].map(
        (category) => {
          return (
            <div key={category} className="category-section" id={category}>
              <HashLink
                to={`#category-${category}`}
                className="category-name"
                scroll={(event) => {
                  scrollToDiv(category);
                  event.preventDefault();
                }}
              >
                <h3>{category}</h3>
              </HashLink>
              <div className="section-center">
                {/* Filter the food item array to get the items in the current category */}
                {isLoading ? (
                  <p>Loading...</p>
                ) : (
                  props.foodItemArray
                    .filter((foodItem) => foodItem.category_name === category)
                    .map((foodItem) => {
                      function onAddButtonClick(foodItem) {
                        const token = getToken();
                        if (!token) {
                          alert("Please log in to place an order!");
                          return;
                        }
                        const quantity = window.prompt("Enter the quantity:");
                        const location = window.prompt("Enter the location:");
                        const orderData = {
                          quantity,
                          location,
                          food_item_id: foodItem.id,
                        };
                        fetch("http://127.0.0.1:5000/orders/create", {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                          },
                          body: JSON.stringify(orderData),
                        })
                          .then((response) => {
                            if (!response.ok) {
                              throw new Error("Network response was not ok");
                            }
                            alert("Added order successfully!");
                            console.log(foodItem);
                          })
                          .catch((error) => {
                            console.error(
                              "There was a problem adding the order to the backend:",
                              error
                            );
                            alert(
                              "There was a problem adding the order. Please try again later."
                            );
                          });
                      }


                      return (
                        <article key={foodItem.id} className="menu-item">
                          <img
                            src={foodItem.image}
                            alt={foodItem.name}
                            className="photo"
                            title={`${foodItem.name}`}
                          />
                          <div className="item-info">
                            <header>
                              <div className="item-header-info">
                                <h4>{foodItem.name}</h4>
                                <h4 className="price">Shs.{foodItem.price}</h4>
                              </div>
                              <button
                                className="add-button"
                                title="add to orders"
                                onClick={() => onAddButtonClick(foodItem)}
                              >
                                +
                              </button>
                            </header>
                            <p className="item-text">{foodItem.description}</p>
                          </div>
                        </article>
                      );
                    })
                )}
                {/* Render a message if there are no items in the current category */}
                {props.foodItemArray.filter(
                  (foodItem) => foodItem.category_name === category
                ).length === 0 && <>No items yet...</>}
              </div>
            </div>
          );
        }
      )}
    </>
  );
}
