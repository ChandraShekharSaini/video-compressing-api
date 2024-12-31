import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../Styles/footer.module.css'
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { GrLinkedin } from "react-icons/gr";
import { ImYoutube } from "react-icons/im";
import { FaTelegram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={styles.mainFooter}>
      <div className={styles.footerBox1}>
        <img src="https://marketplace.canva.com/EAE9TG4QSLU/1/0/1600w/canva-black-illustration-ninja-esport-or-gaming-mascot-logo-QM1iGUuQHmM.jpg" />
        <p className={styles.footer1details}><MdEmail />support@video.com</p>
        <p className={styles.details}><FaPhoneAlt />+91 8445680548</p>
        <div className={styles.sociaLogo}>

          <a
            href="https://www.linkedin.com/in/chandra-shekhar-saini-772b53249/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GrLinkedin className={styles.linkedini} />
          </a>

          <a
            href="https://www.linkedin.com/in/chandra-shekhar-saini-772b53249/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ImYoutube className={styles.youtube} />
          </a>

          <a
            href="https://t.me/@HTMLjav"
            target="_blank"
            rel="noopener noreferrer"
          >

            < FaTelegram className={styles.telegram} />
          </a>


        </div>
      </div>
      <div className={styles.footerBox2}>
        <h3 className={styles.footer2Heading}>Company</h3>
        <hr></hr>
        <div className={styles.footer2details}><span>About us</span> <span>Contact us</span></div>
        <div className={styles.footer2details}><span>FAQ</span> <span>Assistance</span></div>
        <div className={styles.footer2details}><span>Privacy policy</span> <span>Terms and condition</span></div>
        <div className={styles.footer2details}><span>API</span> <span>Video</span></div>
      </div>


      <div className={styles.footerBox3}>
        <h3 className={styles.footer3Heading}>Products</h3>
        <hr></hr>

        <div className={styles.footer2details}><span>Video Compression</span> <span>Background Remover</span></div>
        <div className={styles.footer2details}><span>Blog</span> </div>
      </div>
    </footer>
  )
}

export default Footer














