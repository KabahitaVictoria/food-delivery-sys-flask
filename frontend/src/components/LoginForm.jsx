// Importing the necessary styles for the LoginForm component
import "../css/LandingPage.css";

// Creating the LoginForm component with props as an argument
export function LoginForm(props) {
  // Defining the closeForm function to hide the form
  function closeForm() {
    document.getElementById("myForm").style.display = "none";
  }

  // Rendering the LoginForm component
  return (
    <>
      <h1>Login</h1>
      
      {/* Adding a link to sign in as an admin and invoking the openAdminForm
      function when clicked */}
      <a href="#adminsignin" className="signin" onClick={props.openAdminForm}>
        Sign In As Admin
      </a>

      {/* Conditional rendering to display feedback based on whether the user has
      submitted correct details */}
      {props.hasSubmitted ? (
        <p>{props.data}</p>
      ) : (
        <p>Please provide the correct details</p>
      )}

      {/* Creating input fields for email and password and binding their values
      to state through onChange events */}
      <label htmlFor="email">
        <b>Email</b>
      </label>
      <input
        type="text"
        placeholder="Enter Email"
        name="email"
        required
        onChange={(e) => props.setEmail(e.target.value)}
        value={props.email}
      ></input>

      <label htmlFor="psw">
        <b>Password</b>
      </label>
      <input
        type="password"
        placeholder="Enter Password"
        name="psw"
        required
        onChange={(e) => props.setPassword(e.target.value)}
        value={props.password}
      ></input>

      {/* Creating a button to submit the login form and a button to close the form */}
      <button type="submit" className="btn">
        Login
      </button>
      <button type="button" className="btn-cancel" onClick={closeForm}>
        Close
      </button>
    </>
  );
}
