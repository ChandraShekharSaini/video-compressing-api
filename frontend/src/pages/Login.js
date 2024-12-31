import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "../Styles/signup.module.css";
import { IoLogIn } from 'react-icons/io5';

const Login = () => {
  const [error, setError] = useState({});
  const [message, setMessage] = useState({})

  const [formdata, setformdata] = useState({
    email: "",
    // number: "",
    password: "",
  });
  const usenavigate = useNavigate();

  const formValidation = () => {
    const newError = {};



    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formdata.email.trim()) {
      newError.email = "Email is required";
    } else if (!emailRegex.test(formdata.email)) {
      newError.email = "Invalid Email Format";
    }

    // const numberRegex = /^\d{10}$/;
    // if (!formdata.number.trim()) {
    //   newError.number = "Phone Number is required";
    // } else if (!numberRegex.test(formdata.number)) {
    //   newError.number = "Phone Number must be 10 digits long";
    // }

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
    console.log(formdata)
    ev.preventDefault();
    if (formValidation()) {
      try {
        const response = await fetch("http://localhost:3500/api/auth/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formdata),
        });

        const userData = await response.json();
        console.log(userData)

        if (response.ok) {
          console.log(userData);
          setError({})
          setMessage({ server: userData.message })

          setTimeout(() => {

            usenavigate("/");
          },2000)
        }
        else {
          console.error(userData);
          setMessage({})
          setError({ server: userData.message })

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

  const sussessMessage = {
    color: "green",
    fontSize: "15px",

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

            <p>Email Address</p>
            <input
              type="text"
              name="email"
              onChange={(ev) => handleformdata(ev.target.value, ev.target.name)}
              autocomplete="email"
            />
            {error.email && <p style={errorMessage}>{error.email}</p>}

            {/* <p>Phone Number</p>
            <input
              type="number"
              name="number"
              onChange={(ev) => handleformdata(ev.target.value, ev.target.name)}
            />
            {error.number && <p style={errorMessage}>{error.number}</p>} */}

            <p>Password</p>
            <input
              type="password"
              name="password"
              onChange={(ev) => handleformdata(ev.target.value, ev.target.name)}
              autocomplete="new-password"
            />
            {error.password && <p style={errorMessage}>{error.password}</p>}
          </div>
          {error.server && <p style={errorMessage}>{error.server}</p>}
          {message.server && <p style={sussessMessage}>{message.server}</p>}
          <button className={styles.submitform}>Submit</button>
        </div>
      </div>
    </form>
  );
};

export default Login;
