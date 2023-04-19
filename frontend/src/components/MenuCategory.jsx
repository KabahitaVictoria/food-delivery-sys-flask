// Import useState and useEffect from the react module
import { useState, useEffect } from "react";

// Import HashLink from the react-router-hash-link module
import { HashLink } from "react-router-hash-link";

// Define a function component called MenuCategory that takes in props
export function MenuCategory(props) {
  // Define two state variables using the useState hook: categoryDataArray and isLoading
  const [categoryDataArray, setCategoryDataArray] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Define a function called getToken to get the access token from local storage
  const getToken = () =>
    localStorage.getItem("access_token")
      ? JSON.parse(localStorage.getItem("access_token"))
      : null;

  // Use the useEffect hook to fetch the category data from the backend
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
      {/* Render each unique category name as a section */}
      {[...new Set(categoryDataArray.map((category) => category.name))].map(
        (category) => {
          return (
            <div key={category} className="category-section" id={category}>
              {/* Create a link to scroll to the current category */}
              <HashLink
                to={`#category-${category}`}
                className="category-name"
                scroll={(event) => {
                  // Scroll to the category section
                  scrollToDiv(category);
                  // Prevent the default link behavior
                  event.preventDefault();
                }}
              >
                <h3>{category}</h3>
              </HashLink>
              <div className="section-center">
                {/* Filter the food item array to get the items in the current category */}
                {isLoading ? (
                  // Show a loading message if data is still being fetched
                  <p>Loading...</p>
                ) : (
                  props.foodItemArray
                    .filter((foodItem) => foodItem.category_name === category)
                    .map((foodItem) => {
                      // Define the function to handle adding an item to the cart
                      function onAddButtonClick(foodItem) {
                        const token = getToken();
                        if (!token) {
                          // Show an alert if the user is not logged in
                          alert("Please log in to place an order!");
                          return;
                        }
                        // Prompt the user for the order quantity and location
                        const quantity = window.prompt("Enter the quantity:");
                        const location = window.prompt("Enter the location:");
                        const orderData = {
                          // Build the order object
                          quantity,
                          location,
                          food_item_id: foodItem.id,
                        };
                        // Send a POST request to create the order on the backend
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
                            // Show a success message if the order was added
                            alert("Added order successfully!");
                            console.log(foodItem);
                          })
                          .catch((error) => {
                            // Show an error message if the order could not be added
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
                        // Render each food item in the current category as an article
                        <article key={foodItem.id} className="menu-item">
                          <img
                            src={foodItem.image}
                            alt={foodItem.name}
                            className="photo"
                            title={`${foodItem.name}`}
                          />
                          <div className="item-info">
                            <header>
                              {/* Render the food item name and price */}
                              <div className="item-header-info">
                                <h4>{foodItem.name}</h4>
                                <h4 className="price">Shs.{foodItem.price}</h4>
                              </div>
                              {/* Render the "add to orders" button */}
                              <button
                                className="add-button"
                                title="add to orders"
                                onClick={() => onAddButtonClick(foodItem)}
                              >
                                +
                              </button>
                            </header>
                            {/* Render the food item description */}
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
