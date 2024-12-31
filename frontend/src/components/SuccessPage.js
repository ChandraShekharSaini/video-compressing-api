import React, { useEffect } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import styles from "../components/signupsuccess.module.css"
import { useNavigate} from 'react-router-dom';

const SuccessPage = () => {

  const usenavigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
     usenavigate("/sign-in")
    },5000)
  }, [])


  return (
    <div className={styles.container}>
      <DotLottieReact
        src="https://lottie.host/b7603f74-0d04-444f-8eff-27be50f741c5/WLR5o4aPR2.lottie"
        loop
        autoplay
        className={styles.annimation}
      />
    </div>
  );
};

export default SuccessPage
