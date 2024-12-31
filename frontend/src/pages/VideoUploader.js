import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import DownloadFile from './DownloadFile';
import styles from "../Styles/vdeoUploader.module.css"
import { IoCloudUploadOutline } from "react-icons/io5";


const VideoUpload = () => {
  const navigate = useNavigate();
  const [videoFile, setVideoFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [compressedVideoUrl, setCompressedVideoUrl] = useState('');

  // Handle the drop of the file
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && file.type.startsWith('video/')) {
      setVideoFile(file);
    } else {
      alert('Please upload a valid video file.');
    }
  };

  // Initialize react-dropzone with configuration
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'video/*', // Accept video files only
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!videoFile) {
      alert('Please select a video to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('video', videoFile);

    setUploading(true);

    try {
      const response = await axios.post('http://localhost:3500/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          console.log(`Uploading: ${percentCompleted}%`);
          setResponseMessage(`Uploading: ${percentCompleted}%`);
        },
      });
      console.log(response);
      setResponseMessage(response.data.message);
      setCompressedVideoUrl(response.data.compressedVideoUrl);
      <DownloadFile compressedVideoUrl={compressedVideoUrl} />
      navigate("/download")

    } catch (error) {
      setResponseMessage('Failed to upload the video.');
    } finally {
      setUploading(false);
    }
  };


  return (
    <>

      <section className={styles.uploadArea}>
        <div className={styles.uploadHeading}>
          <h2>Compression Tool</h2>
        </div>

        <div className={styles.uploadParagraph}>
          Quickly and easily compress large video files for smoother streaming,<br></br>faster downloads, and storage
        </div>

        {/* Drag and drop featute start */}
        <form onSubmit={handleSubmit}>
          <div
            {...getRootProps()}
            className={styles.uploadVideoArea}

          >
            <div className={styles.uploudIcon} >
            <IoCloudUploadOutline />
            </div>
            <input {...getInputProps()} />

            <button
              className={styles.uploadBtn}

              type="button"
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the drop zone on click
                document.querySelector('input[type="file"]').click(); // Open file dialog
              }}

            >
              Upload File
            </button>
            <p>or drop your file here</p>
          </div>
          <button className={styles.submitBtn} type="submit" disabled={uploading}>
            {uploading ? 'Uploading...' : 'Upload Video'}
          </button>
        </form>

        {/* Drag and drop featute start */}

        {uploading && <p>{responseMessage}</p>}


      </section>


    </>
  );
};

export default VideoUpload;
