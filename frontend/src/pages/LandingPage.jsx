import { Sample } from "../components/Sample";
import { LoginForm } from "../components/LoginForm";
import { AdminLoginForm } from "../components/AdminLoginForm";
import { SignUpForm } from "../components/SignUpForm";
import { Footer } from "../components/Footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../css/LandingPage.css'

export function LandingPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [data, setData] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();

    let loginDetails = {
      email: email,
      password: password,
    };
    console.log(loginDetails);

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

      setHasSubmitted(!hasSubmitted)
  };

  function openForm() {
    document.getElementById("myForm").style.display = "block";
  }

  function openForm2() {
    document.getElementById("myForm2").style.display = "block";
  }

  function openAdminForm() {
    document.getElementById("adminForm").style.display = "block";
  }

  return (
    <div className="">
      <div className="overlay-container">
        <div className="banner">
          <div className="overlay">
            <div className="nav">
              <img
                src="https://img.icons8.com/stickers/100/null/hamburger.png"
                alt=""
              />
              <div className="account">
                <a href="#signin" className="signin" onClick={openForm}>
                  Sign In
                </a>
                <button onClick={openForm2}>
                  <a href="#signup">Sign Up</a>
                </button>
              </div>
            </div>
            <h1>Restaurants, brought to your door...</h1>
            <p>Fast, convenient and affordable</p>
          </div>
        </div>
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
        <div className="form-popup" id="adminForm">
          <form
            action=""
            className="form-container"
            method="post"
            onSubmit={onSubmit}
          >
            <AdminLoginForm
              ChangeEmail={setEmail}
              ChangePassword={setPassword}
              email={email}
              password={password}
              hasSubmitted={hasSubmitted}
              data={data}
            />
          </form>
        </div>
        <div className="form-popup" id="myForm2">
          <form action="" className="form-container" method="post">
            <SignUpForm />
          </form>
        </div>
        <Sample
          image="/ikhsan-baihaqi-dXeBXaThv4U-unsplash.jpg"
          text="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati
        architecto explicabo eveniet officia fugiat dolor eos ratione
        distinctio, dolores modi corporis, similique ex temporibus, cupiditate
        consectetur rerum earum dolore. Magni."
          className="sample sample1"
        />
        <Sample
          image="/kristina-bratko-nP11TkjxJ7s-unsplash.jpg"
          text="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati
        architecto explicabo eveniet officia fugiat dolor eos ratione
        distinctio, dolores modi corporis, similique ex temporibus, cupiditate
        consectetur rerum earum dolore. Magni."
          className="sample sample2"
        />
        <Footer />
      </div>
    </div>
  );
}