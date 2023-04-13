import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../css/UpdateInfo.css";

export function UpdateInfo(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState(0)

  const [newFirstName, setChangeFirstName] = useState("");
  const [newLastName, setChangeLastName] = useState("");
  const [newEmail, setChangeEmail] = useState("");
  const [newContact, setChangeContact] = useState("");

  const getToken = () =>
    localStorage.getItem("access_token")
      ? JSON.parse(localStorage.getItem("access_token"))
      : null;

  useEffect(() => {
    fetch(`http://localhost:5000/users/user/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setFirstName(data.data.first_name);
        setLastName(data.data.last_name);
        setEmail(data.data.email);
        setContact(data.data.contact)
      });
  });

  const [data, setData] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const { id } = useParams();

  const onSubmitClick = (e) => {
    e.preventDefault();

    let updateDetails = {
      firstName: newFirstName,
      lastName: newLastName,
      email: newEmail,
      contact: newContact,
    };

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
        if (data.message) {
          setData(data.message);
        }
      })
      .catch((err) => console.log(err));

    setHasSubmitted(!hasSubmitted);
  };

  console.log(props);

  return (
    <div className="update-info">
      <>
        <h1>Update your info</h1>
        {hasSubmitted ? (
          <p className="update-msg">{data}</p>
        ) : (
          <h4 className="update-msg">Please fill in all fields</h4>
        )}
        <label htmlFor="first-name" className="update-info-labels">
          <b>First name</b>
          <p>
            <b className="current">current:</b> {firstName}
          </p>
        </label>
        <input
          type="text"
          placeholder="Enter Your First Name"
          name="first-name"
          required
          value={props.firstName}
          onChange={(e) => setChangeFirstName(e.target.value)}
        ></input>

        <label htmlFor="last-name" className="update-info-labels">
          <b>Last name</b>
          <p>
            <b className="current">current:</b> {lastName}
          </p>
        </label>
        <input
          type="text"
          placeholder="Enter Your Last Name"
          name="last-name"
          required
          value={props.lastName}
          onChange={(e) => setChangeLastName(e.target.value)}
        ></input>

        <label htmlFor="email" className="update-info-labels">
          <b>Email</b>
          <p>
            <b className="current">current:</b> {email}
          </p>
        </label>
        <input
          type="text"
          placeholder="Enter Your Email"
          name="email"
          required
          value={props.email}
          onChange={(e) => setChangeEmail(e.target.value)}
        ></input>

        <label htmlFor="contact" className="update-info-labels">
          <b>Contact</b>
          <p>
            <b className="current">current:</b> {contact}
          </p>
        </label>
        <input
          type="text"
          placeholder="Enter Your Contact"
          name="contact"
          required
          value={props.contact}
          onChange={(e) => setChangeContact(e.target.value)}
        ></input>

        <button type="submit" className="btn" onClick={onSubmitClick}>
          Update
        </button>
      </>
    </div>
  );
}
