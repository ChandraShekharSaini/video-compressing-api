import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "../Styles/signup.module.css";

const SignUp = () => {
  const [error, setError] = useState({});
  const [formdata, setformdata] = useState({
    firstname: "",
    lastname: "",
    email: "",
    number: "",
    password: "",
  });
  const usenavigate = useNavigate();

  const formValidation = () => {
    const newError = {};

    if (!formdata.firstname.trim()) {
      newError.firstname = "First Name is required";
    }

    if (!formdata.lastname.trim()) {
      newError.lastname = "Last Name is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formdata.email.trim()) {
      newError.email = "Email is required";
    } else if (!emailRegex.test(formdata.email)) {
      newError.email = "Invalid Email Format";
    }

    const numberRegex = /^\d{10}$/;
    if (!formdata.number.trim()) {
      newError.number = "Phone Number is required";
    } else if (!numberRegex.test(formdata.number)) {
      newError.number = "Phone Number must be 10 digits long";
    }

    if (!formdata.password.trim()) {
      newError.password = "Password is required";
    } else if (formdata.password.length < 4) {
      newError.password = "Password must be at least 8 characters long";
    }

    setError(newError);
    return Object.keys(newError).length === 0; // Return true if no errors
  };

  const handleformdata = (value, name) => {
    setformdata({ ...formdata, [name]: value });
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (formValidation()) {
      try {
        const response = await fetch("http://localhost:3500/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formdata),
        });

        const userData = await response.json();

        if (response.ok) {
          console.log(userData);
          setTimeout(() => {
            usenavigate("/account-created");
          },2000)
        } else {
          console.error(userData);
          setError({ server: "Signup failed. Please try again." });
        }
      } catch (error) {
        console.error("Error:", error);
        setError({ server: "An error occurred. Please try again later." });
      }
    }
  };

  const errorMessage = {
    color: "red",
    fontSize: "15px",
    marginTop: "10px"
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.signupContainer}>
        <div className={styles.imageArea}></div>
        <div className={styles.signUpPage}>
          <button>
            <img src="/google.svg" className={styles.svgLogo} alt="Google" />
            Google
          </button>
          <button>
            <img src="/reddit.svg" className={styles.svgLogo} alt="Reddit" />
            Reddit
          </button>
          <div className={styles.signupSub}>
            <p>First Name</p>
            <input
              type="text"
              id="firstname"
              name="firstname"
              onChange={(ev) => handleformdata(ev.target.value, ev.target.name)}
            />
            {error.firstname && <p style={errorMessage}>{error.firstname}</p>}

            <p>Last Name</p>
            <input
              type="text"
              name="lastname"
              onChange={(ev) => handleformdata(ev.target.value, ev.target.name)}
            />
            {error.lastname && <p style={errorMessage}>{error.lastname}</p>}

            <p>Email Address</p>
            <input
              type="text"
              name="email"
              onChange={(ev) => handleformdata(ev.target.value, ev.target.name)}
              autocomplete="email"
            />
            {error.email && <p style={errorMessage}>{error.email}</p>}

            <p>Phone Number</p>
            <input
              type="number"
              name="number"
              onChange={(ev) => handleformdata(ev.target.value, ev.target.name)}
            />
            {error.number && <p style={errorMessage}>{error.number}</p>}

            <p>Password</p>
            <input
              type="password"
              name="password"
              onChange={(ev) => handleformdata(ev.target.value, ev.target.name)}
              autocomplete="new-password"
            />
            {error.password && <p style={errorMessage}>{error.password}</p>}
          </div>
          <button className={styles.submitform}>Submit</button>
        </div>
      </div>
    </form>
  );
};

export default SignUp;
