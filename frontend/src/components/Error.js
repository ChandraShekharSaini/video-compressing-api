import React from 'react';
import styles from "../components/error.module.css"



const Error = () => {


  return (
    <div className={styles.container}>
      <div className={styles.images}>
        <img
          src="https://cdn.dribbble.com/users/381530/screenshots/3949858/media/aff8c4541abddf91b8f69206b2175381.gif"
          loop
          autoplay
          className={styles.annimation} 
          alt='404'
        />
      </div>

      <div className={styles.details}>

        <h4>PAGE NOT FOUND</h4>
        <p>Sorry, the page you're looking for doesn't exist.
         <br></br> If you think something is broken, report a problem.</p>
      </div>

      <div className={styles.errorBtns} >
        <button className={styles.goBtn}>Go Home</button>
        <button className={styles.contactBtn}>Contact Us</button>
      </div>
    </div>
  );
};

export default Error




