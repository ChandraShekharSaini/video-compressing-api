import React from 'react'
import { Link } from 'react-router-dom'
import styles from './navbar.module.css'
import { FaList } from "react-icons/fa6";


const Navbar = () => {
    return (
        <div className={styles.MainNavigation}>
            <nav>

                <div className={styles.navbarLogo}>
                    <img src="https://play-lh.googleusercontent.com/-jFvYPoz5GmPoOHa5UyCBkyO8sG-XUk6NSI5fciodaPUFNCSUV1YSlJJoJFf7rMdCtU" />
                </div>

                <div className={styles.navbar}>
                    <Link to="/">
                        Home
                    </Link>

                    <Link to="/video-compress" >
                        Video Compression
                    </Link>

                    <Link to="/about" >
                        About US
                    </Link>

                </div>

                <div className={styles.auth}>


                    <Link to="/sign-in" className={styles.login}>
                        LogIn
                    </Link>

                    <Link to="/sign-up" className={styles.signBtn}>
                        Sign Up
                    </Link>

                    <Link to="/" className={styles.reactIcon}>

                        <FaList className={styles.iconStyle} />

                    </Link>

                </div>


            </nav >
        </div>


    )
}

export default Navbar