// Export a functional component named AdminLoginForm
export function AdminLoginForm(props) {
  // Define a function to close the form
  function closeForm() {
    document.getElementById("adminForm").style.display = "none";
  }

  // Return a JSX element
  return (
    <>
      <h1>Enter Admin Details</h1>

      {/* Conditionally render a message based on whether the form has been submitted */}
      {props.hasSubmitted ? (
        <p>{props.data}</p>
      ) : (
        <p>Please provide the correct details</p>
      )}

      {/* Render an input field for the email with a label and props */}
      <label htmlFor="email">Email: </label>
      <input
        type="email"
        name="email"
        placeholder="Enter Email"
        value={props.email}
        onChange={props.ChangeEmail}
        required
      />

      {/* Render an input field for the password with a label and props */}
      <label htmlFor="password">Password: </label>
      <input
        type="password"
        name="password"
        placeholder="Enter Password"
        value={props.password}
        onChange={props.ChangePassword}
        required
      />

      {/* Render a button to submit the form with a label and props */}
      <button type="submit" className="btn">
        Login
      </button>

      {/* Render a button to close the form with a label and an onClick event handler */}
      <button type="button" className="btn-cancel" onClick={closeForm}>
        Close
      </button>
    </>
  );
}