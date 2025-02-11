import React, { useState } from 'react'
import styles from "../Styles/download.module.css"
import { useLocation } from 'react-router-dom';

const DownloadFile = () => {

  const location = useLocation();
  const compressedVideoUrl = location.state?.compressedVideoUrl;
  console.log(compressedVideoUrl);


  const handleDownload = async () => {
    try {
      const response = await fetch(compressedVideoUrl, { mode: 'cors' });
      if (!response.ok) {
        throw new Error(`Failed to fetch video: ${response.statusText}`);
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      // Create a temporary anchor element
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = 'compressed_video.mp4'; // Set file name for the downloaded video
      document.body.appendChild(anchor);
      anchor.click(); // Programmatically trigger a click
      document.body.removeChild(anchor); // Clean up

      // Revoke the object URL after use
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading video:', error);
    }
  };

  return (


    <div className={styles.downloadArea}>
      <div className={styles.downloadHeading}>
        <h3 >Download Compressed Video</h3>
      </div>




      <div className={styles.downloadVideo}>

        <video
          controls
          loop
          autoPlay
          muted

        >
          <source
            src={compressedVideoUrl}
            type="video/mp4"
          />

          Your browser does not support the video tag.
        </video>



      </div>


      <div className={styles.buttons}>
        <button
          className={styles.downloadBtn}
          onClick={handleDownload}

        >
          Download Video
        </button>
      </div>
    </div>


  )
}

export default DownloadFile

