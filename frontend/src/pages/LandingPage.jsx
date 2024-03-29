// Import necessary components and modules
import { Sample } from "../components/Sample";
import { LoginForm } from "../components/LoginForm";
// import { AdminLoginForm } from "../components/AdminLoginForm";
import { SignUpForm } from "../components/SignUpForm";
import { Footer } from "../components/Footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/LandingPage.css";

// Define the LandingPage component
export function LandingPage() {
  // Set state for user login details
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Set state for form submission
  const [data, setData] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Get navigation function for routing
  const navigate = useNavigate();

  // Function to handle user login form submission
  const onSubmit = (e) => {
    e.preventDefault();

    let loginDetails = {
      email: email,
      password: password,
    };

    // Send user login details to server for authentication
    fetch("http://localhost:5000/auth/login", {
      method: "post",
      body: JSON.stringify(loginDetails),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:5173",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // If user is authenticated, store access token in local storage and navigate to user dashboard
        setData(data.message);
        if (data.tokens.access_token) {
          localStorage.setItem(
            "access_token",
            JSON.stringify(data.tokens.access_token)
          );
          navigate(`/dashboard/${data.for.id}`);
        }
      })
      .catch((err) => console.log(err));

    // Toggle form submission state
    setHasSubmitted(!hasSubmitted);
  };

  // Function to display user login form
  function openForm() {
    document.getElementById("myForm").style.display = "block";
  }

  // Function to display sign up form
  function openForm2() {
    document.getElementById("myForm2").style.display = "block";
  }

  // Function to display admin login form
  function openAdminForm() {
    navigate("/admin/login_form");
  }

  // Start of main component's render method
  return (
    // Main container
    <div className="">
      {/* Banner */}
      <div className="overlay-container">
        <div className="banner">
          {/* Banner overlay */}
          <div className="overlay">
            {/* Navigation */}
            <div className="nav">
              {/* Hamburger icon */}
              <img
                src="https://img.icons8.com/stickers/100/null/hamburger.png"
                alt=""
              />
              {/* Sign In and Sign Up buttons */}
              <div className="account">
                <a href="#signin" className="signin" onClick={openForm}>
                  Sign In
                </a>
                <button onClick={openForm2}>
                  <a href="#signup">Sign Up</a>
                </button>
              </div>
            </div>
            {/* Banner text */}
            <h1>Restaurants, brought to your door...</h1>
            <p>Fast, convenient and affordable</p>
          </div>
        </div>
        {/* Sign In form */}
        <div className="form-popup" id="myForm">
          <form
            action=""
            className="form-container"
            method="post"
            onSubmit={onSubmit}
          >
            <LoginForm
              setEmail={setEmail}
              setPassword={setPassword}
              email={email}
              password={password}
              hasSubmitted={hasSubmitted}
              data={data}
              openAdminForm={openAdminForm}
            />
          </form>
        </div>
        {/* Sign Up form */}
        <div className="form-popup" id="myForm2">
          <form action="" className="form-container" method="post">
            <SignUpForm />
          </form>
        </div>
        {/* Sample section 1 */}
        <Sample
          image="/ikhsan-baihaqi-dXeBXaThv4U-unsplash.jpg"
          text="Burgers! Because no great story started with salad. As we like to say, you need to eat outside the box. 
          Something hot. Something tasty. 
          Good food. Good mood."
          className="sample sample1"
        />
        {/* Sample section 2 */}
        <Sample
          image="/kristina-bratko-nP11TkjxJ7s-unsplash.jpg"
          text="Fun. Fast. Tasty. Delicious. Food that makes you happy. Fast and yummy. Good for your tummy."
          className="sample sample2"
        />
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
  // End of main component's render method
}
