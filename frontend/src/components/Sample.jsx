export function Sample(props) {
  return (
    <div className={props.className}>
      <img src={props.image} alt="" />
      <p>{props.text}</p>
    </div>
  );
}
