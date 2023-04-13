import { CategoryCard } from "./CategoryCard";
import { Orders } from "./Orders";
import { UserInfo } from "./UserInfo";
import { Link } from "react-router-dom";

export function DashBody(props) {
  return (
    <div className="prof-body">
      <div className="main">
        <h1>Welcome back, {props.firstName}!</h1>
        <div className="category-cards">
          <div className="category-heading">
            <h2>Food Categories</h2>
          </div>
          <div className="cat-cards">
            <CategoryCard
              url="https://img.icons8.com/external-justicon-lineal-color-justicon/64/null/external-breakfast-hotel-essentials-justicon-lineal-color-justicon.png"
              name="breakfast"
              category="breakfast"
            />
            <CategoryCard
              url="https://img.icons8.com/external-vitaliy-gorbachev-lineal-color-vitaly-gorbachev/60/null/external-lunch-back-to-school-vitaliy-gorbachev-lineal-color-vitaly-gorbachev.png"
              name="lunch/supper"
            />
            <CategoryCard
              url="https://img.icons8.com/color-glass/48/null/potato-chips.png"
              name="snacks"
            />
            <CategoryCard
              url="https://img.icons8.com/cotton/64/null/beach-cocktail--v2.png"
              name="drinks"
            />
            <CategoryCard
              url="https://img.icons8.com/cute-clipart/64/null/croissant.png"
              name="desserts"
            />
            <Link className="see-more-link link1" to={`/categories/${props.id}`}>
              See more
            </Link>
          </div>
        </div>
        <div className="prof-orders">
          <Orders />
        </div>
        <UserInfo
          firstName={props.firstName}
          lastName={props.lastName}
          email={props.email}
          id={props.id}
          secondary_classname="user-info-2"
        />
      </div>
      <UserInfo
        firstName={props.firstName}
        lastName={props.lastName}
        email={props.email}
        id={props.id}
        secondary_classname="user-info-1"
      />
    </div>
  );
}
