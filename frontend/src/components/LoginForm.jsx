import "../css/LandingPage.css";

export function LoginForm(props) {
  function closeForm() {
    document.getElementById("myForm").style.display = "none";
  }

  return (
    <>
      <h1>Login</h1>
      <a href="#adminsignin" className="signin" onClick={props.openAdminForm}>
        Sign In As Admin
      </a>

      {props.hasSubmitted ? (
        <p>{props.data}</p>
      ) : (
        <p>Please provide the correct details</p>
      )}

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

      <button type="submit" className="btn">
        Login
      </button>

      <button type="button" className="btn-cancel" onClick={closeForm}>
        Close
      </button>
    </>
  );
}
