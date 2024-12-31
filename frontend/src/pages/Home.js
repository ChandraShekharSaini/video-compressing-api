import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar';
import styles from "../Styles/home.module.css"
import Footer from "../components/Footer"
import LogoCarousel from '../components/LogoCarousel';

const Home = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/video-compress")
  }

  return (
    <>
      <Navbar />
      <div className={styles.mainCrousel}>


        <section className={styles.crousel}>
          {/* <h1>Video Compressor</h1>
        <img src=" https://assets-static.invideo.io/images/large/Export_PNG_78c4e4b9ee.webp" /> */}

          <div className={styles.crouselHeading} >
            Video  <span className={styles.gradientText}>Compressor</span>
          </div>
          <div className={styles.crouselParagraph} >
            <div>Easily compress videos online without signing up. <span className={styles.halfHeading}>Upload your MP4, MOV, WebM, GIF, MPEG, and other formats, select your desired file size, and compress it. Achieve up to 80% file size compression quickly and easily.</span></div>
            <button className={styles.crouselButton} onClick={handleNavigate}>
              Compress a Video
            </button>
          </div>
          <div className={styles.crouselImage} >
            <img src="https://assets-static.invideo.io/images/large/Export_PNG_78c4e4b9ee.webp" alt='image' />
          </div>

        </section>
      </div>
      <LogoCarousel />
      <Footer />
    
    </>
  )
}

export default Home