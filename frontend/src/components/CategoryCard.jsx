export function CategoryCard(props) {
  return (
    <div className="category-card">
      <img src={props.url} alt="" width={60} />
      <p>{props.name}</p>
    </div>
  );
}
