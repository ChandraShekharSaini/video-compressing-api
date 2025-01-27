import React, { useState, useEffect } from 'react';
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
    console.log(formdata);
    ev.preventDefault();
    if (formValidation()) {
      try {
        const response = await fetch("https://my-video-9ljf.onrender.com/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formdata),
        });

        const userData = await response.json();
        if (response.ok) {
          console.log("OK", userData);
          setTimeout(() => {
            usenavigate("/account-created");
          }, 2000)
        } else {
          console.error(userData);
          setError({ server: userData.message });
        }
      } catch (error) {
        console.error("Error:", error);
        setError({ server: "An error occurred. Please try again later." });
      }
    }
  };

  const handleGoogleSignIn = async () => {
    window.location.href = "https://my-video-9ljf.onrender.com/auth/google";

  };

  const handleRedditSignIn = async () => {
    window.location.href = "https://my-video-9ljf.onrender.com/auth/github";

  };





  const errorMessage = {
    color: "red",
    fontSize: "15px",
    marginTop: "10px",
    textAlign: "left"
  }

  return (


    //   <button
    //   onClick={handleGoogleSignIn}
    //   <img src="/google.svg" className={styles.svgLogo} alt="Google" />
    //   Google
    // </button>
    // <button onAbort={handleRedditSignIn}>
    //   <img src="/reddit.svg" className={styles.svgLogo} alt="Reddit" />
    //   Reddit
    // </button>


    //   <form onSubmit={handleSubmit}>
    //     <div className={styles.signupContainer}>
    //       <div className={styles.imageArea}></div>
    //       <div className={styles.signUpPage}>

    //         <div className={styles.signupSub}>
    //           <p>First Name</p>
    //           <input
    //             type="text"
    //             id="firstname"
    //             name="firstname"
    //             onChange={(ev) => handleformdata(ev.target.value, ev.target.name)}
    //           />
    //           {error.firstname && <p style={errorMessage}>{error.firstname}</p>}

    //           <p>Last Name</p>
    //           <input
    //             type="text"
    //             name="lastname"
    //             onChange={(ev) => handleformdata(ev.target.value, ev.target.name)}
    //           />
    //           {error.lastname && <p style={errorMessage}>{error.lastname}</p>}

    //           <p>Email Address</p>
    //           <input
    //             type="text"
    //             name="email"
    //             onChange={(ev) => handleformdata(ev.target.value, ev.target.name)}
    //             autocomplete="email"
    //           />
    //           {error.email && <p style={errorMessage}>{error.email}</p>}

    //           <p>Phone Number</p>
    //           <input
    //             type="number"
    //             name="number"
    //             onChange={(ev) => handleformdata(ev.target.value, ev.target.name)}
    //           />
    //           {error.number && <p style={errorMessage}>{error.number}</p>}

    //           <p>Password</p>
    //           <input
    //             type="password"
    //             name="password"
    //             onChange={(ev) => handleformdata(ev.target.value, ev.target.name)}
    //             autocomplete="new-password"
    //           />
    //           {error.password && <p style={errorMessage}>{error.password}</p>}
    //         </div>
    //         {error.server && <p style={errorMessage}>{error.server}</p>}
    //         <button className={styles.submitform}>Submit</button>

    //       </div>
    //     </div>
    //   </form>






    <div className={styles.signupContainer}>
      <div className={styles.imageArea}></div>

      <div className={styles.signUpPage}>
        <button onClick={handleGoogleSignIn}>
          <img src="/google.svg" className={styles.svgLogo} alt="Google" />
          Google
        </button>
        <button onClick={handleRedditSignIn}>
          <img src="/github.svg" className={styles.svgLogo} alt="Github" />
          GitHub
        </button>


        <div className={styles.signupSub}>
          <form onSubmit={handleSubmit}>
            <div>
              <p>First Name</p>
              <input
                type="text"
                id="firstname"
                name="firstname"
                onChange={(ev) => handleformdata(ev.target.value, ev.target.name)}
              />

              {error.firstname && <p style={errorMessage}>{error.firstname}</p>}
            </div>


            <div>
              <p>Last Name</p>
              <input
                type="text"
                name="lastname"
                onChange={(ev) => handleformdata(ev.target.value, ev.target.name)}
              />
              {error.lastname && <p style={errorMessage}>{error.lastname}</p>}
            </div>


            <div>
              <p>Email Address</p>
              <input
                type="text"
                name="email"
                onChange={(ev) => handleformdata(ev.target.value, ev.target.name)}
                autoComplete="email"
              />
              {error.email && <p style={errorMessage}>{error.email}</p>}
            </div>


            <div>
              <p>Phone Number</p>
              <input
                type="number"
                name="number"
                onChange={(ev) => handleformdata(ev.target.value, ev.target.name)}
              />
              {error.number && <p style={errorMessage}>{error.number}</p>}
            </div>


            <div>
              <p>Password</p>
              <input
                type="password"
                name="password"
                onChange={(ev) => handleformdata(ev.target.value, ev.target.name)}
                autoComplete="new-password"
              />
              {error.password && <p style={errorMessage}>{error.password}</p>}
            </div>

            {error.server && <p style={errorMessage}>{error.server}</p>}
            <button type="submit" className={styles.submitform}>
              Submit
            </button>
          </form>
        </div>



      </div>
    </div>




  );

};

export default SignUp;
