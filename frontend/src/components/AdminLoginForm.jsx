import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function AdminLoginForm() {
  // Set state for admin login details
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  // Set state for form submission
  const [data, setData] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const navigate = useNavigate();

  // Function to handle admin login form submission
  const onAdminSubmit = (e) => {
    e.preventDefault();

    let adminLoginDetails = {
      email: adminEmail,
      password: adminPassword,
    };

    // Send admin login details to server for authentication
    fetch("http://localhost:5000/auth/admin_login", {
      method: "post",
      body: JSON.stringify(adminLoginDetails),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:5173",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.message);
        setHasSubmitted(true);
        if (data.tokens.access_token) {
          localStorage.setItem(
            "access_token",
            JSON.stringify(data.tokens.access_token)
          );
          navigate(`/dashboard/admin/${data.for.id}`);
        }
      });
  };

  function onBackHomeClick() {
    return navigate("/")
  }

  // Return a JSX element
  return (
    <form
      action=""
      className="admin-form"
      method="post"
      onSubmit={onAdminSubmit}
    >
      <h1>Enter Admin Details</h1>

      {/* Conditionally render a message based on whether the form has been submitted */}
      {hasSubmitted ? <p>{data}</p> : <p>Please provide the correct details</p>}

      {/* Render an input field for the email with a label and props */}
      <label htmlFor="email">Email: </label>
      <input
        type="email"
        name="email"
        placeholder="Enter Email"
        value={adminEmail}
        onChange={(e) => setAdminEmail(e.target.value)}
        required
      />

      {/* Render an input field for the password with a label and props */}
      <label htmlFor="password">Password: </label>
      <input
        type="password"
        name="password"
        placeholder="Enter Password"
        value={adminPassword}
        onChange={(e) => setAdminPassword(e.target.value)}
        required
      />

      {/* Render a button to submit the form with a label and props */}
      <button type="submit" className="btn bold">
        Login
      </button>

      <button type="submit" className="btn btn-home" onClick={onBackHomeClick}>
        Back to home
      </button>
    </form>
  );
}
