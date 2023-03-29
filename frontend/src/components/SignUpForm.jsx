import { useState } from "react";

export function SignUpForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");

  const [data, setData] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const onSubmitClick = (e) => {
    e.preventDefault();

    let signUpDetails = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      contact: contact,
      password: password,
    };

    fetch("http://localhost:5000/auth/register", {
      method: "POST",
      body: JSON.stringify(signUpDetails),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.message) {
          setData(data.message)
        } else if(data.error) {
          setData(data.error)
        }
      })
      .catch((err) => console.log(err));

    setHasSubmitted(!hasSubmitted);
  };

  function closeForm2() {
    document.getElementById("myForm2").style.display = "none";
  }

  return (
    <>
      <h1>Sign Up</h1>
      {hasSubmitted ? <p>{data}</p> : <p></p>}
      <label htmlFor="first-name">
        <b>First name</b>
      </label>
      <input
        type="text"
        placeholder="Enter Your First Name"
        name="first-name"
        required
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      ></input>

      <label htmlFor="last-name">
        <b>Last name</b>
      </label>
      <input
        type="text"
        placeholder="Enter Your Last Name"
        name="last-name"
        required
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      ></input>

      <label htmlFor="email">
        <b>Email</b>
      </label>
      <input
        type="text"
        placeholder="Enter Your Email"
        name="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      ></input>

      <label htmlFor="contact">
        <b>Contact</b>
      </label>
      <input
        type="text"
        placeholder="Enter Your Contact"
        name="contact"
        required
        value={contact}
        onChange={(e) => setContact(e.target.value)}
      ></input>

      <label htmlFor="psw">
        <b>Password</b>
      </label>
      <input
        type="password"
        placeholder="Enter Password"
        name="psw"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      ></input>

      <button type="submit" className="btn" onClick={onSubmitClick}>
        Sign Up
      </button>
      <button type="button" className="btn-cancel" onClick={closeForm2}>
        Close
      </button>
    </>
  );
}
