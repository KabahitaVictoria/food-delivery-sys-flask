import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../css/UpdateInfo.css";

export function UpdateInfo(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState(0);

  const [newFirstName, setChangeFirstName] = useState("");
  const [newLastName, setChangeLastName] = useState("");
  const [newEmail, setChangeEmail] = useState("");
  const [newContact, setChangeContact] = useState("");

  const getToken = () =>
    localStorage.getItem("access_token")
      ? JSON.parse(localStorage.getItem("access_token"))
      : null;

  useEffect(() => {
    // Send a GET request to fetch user data from the server
    fetch(`http://localhost:5000/users/user/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getToken()}`, // Set the token in the authorization header
      },
    })
      .then((res) => res.json()) // Parse the response as JSON
      .then((data) => {
        // Set the retrieved user data to corresponding state variables
        setFirstName(data.data.first_name);
        setLastName(data.data.last_name);
        setEmail(data.data.email);
        setContact(data.data.contact);
      });
  });

  // State variables for storing data and form submission status
  const [data, setData] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Extracting 'id' from the URL parameters
  const { id } = useParams();

  // Function to handle form submission
  const onSubmitClick = (e) => {
    e.preventDefault();

    // Creating an object with updated user details
    let updateDetails = {
      firstName: newFirstName,
      lastName: newLastName,
      email: newEmail,
      contact: newContact,
    };

    // Sending a PUT request to update user details
    fetch(`http://localhost:5000/users/user/update/${id}`, {
      method: "PUT",
      body: JSON.stringify(updateDetails),
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // Setting state with the response message
        if (data.message) {
          setData(data.message);
        }
      })
      .catch((err) => console.log(err));

    // Updating form submission status
    setHasSubmitted(!hasSubmitted);
  };

return (
  <div className="update-info">
    <>
      {/* Heading */}
      <h1>Update your info</h1>

      {/* Show success message if submitted */}
      {hasSubmitted ? (
        <p className="update-msg">{data}</p>
      ) : (
        <h4 className="update-msg">Please fill in all fields</h4>
      )}

      {/* First Name Label */}
      <label htmlFor="first-name" className="update-info-labels">
        <b>First name</b>
        {/* Show current first name */}
        <p>
          <b className="current">current:</b> {firstName}
        </p>
      </label>

      {/* First Name Input */}
      <input
        type="text"
        placeholder="Enter Your First Name"
        name="first-name"
        required
        value={props.firstName}
        onChange={(e) => setChangeFirstName(e.target.value)}
      ></input>

      {/* Last Name Label */}
      <label htmlFor="last-name" className="update-info-labels">
        <b>Last name</b>
        {/* Show current last name */}
        <p>
          <b className="current">current:</b> {lastName}
        </p>
      </label>

      {/* Last Name Input */}
      <input
        type="text"
        placeholder="Enter Your Last Name"
        name="last-name"
        required
        value={props.lastName}
        onChange={(e) => setChangeLastName(e.target.value)}
      ></input>

      {/* Email Label */}
      <label htmlFor="email" className="update-info-labels">
        <b>Email</b>
        {/* Show current email */}
        <p>
          <b className="current">current:</b> {email}
        </p>
      </label>

      {/* Email Input */}
      <input
        type="text"
        placeholder="Enter Your Email"
        name="email"
        required
        value={props.email}
        onChange={(e) => setChangeEmail(e.target.value)}
      ></input>

      {/* Contact Label */}
      <label htmlFor="contact" className="update-info-labels">
        <b>Contact</b>
        {/* Show current contact */}
        <p>
          <b className="current">current:</b> {contact}
        </p>
      </label>

      {/* Contact Input */}
      <input
        type="text"
        placeholder="Enter Your Contact"
        name="contact"
        required
        value={props.contact}
        onChange={(e) => setChangeContact(e.target.value)}
      ></input>

      {/* Submit button */}
      <button type="submit" className="btn" onClick={onSubmitClick}>
        Update
      </button>
    </>
  </div>
);

}
