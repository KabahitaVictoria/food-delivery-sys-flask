export function AdminLoginForm(props) {
  function closeForm() {
    document.getElementById("adminForm").style.display = "none";
  }

  return (
    <>
      <h1>Enter Admin Details</h1>

      {props.hasSubmitted ? (
        <p>{props.data}</p>
      ) : (
        <p>Please provide the correct details</p>
      )}

      <label htmlFor="email">Email: </label>
      <input
        type="email"
        name="email"
        placeholder="Enter Email"
        value={props.email}
        onChange={props.ChangeEmail}
        required
      />

      <label htmlFor="password">Password: </label>
      <input
        type="password"
        name="password"
        placeholder="Enter Password"
        value={props.password}
        onChange={props.ChangePassword}
        required
      />

      <button type="submit" className="btn">
        Login
      </button>

      <button type="button" className="btn-cancel" onClick={closeForm}>
        Close
      </button>
    </>
  );
}
