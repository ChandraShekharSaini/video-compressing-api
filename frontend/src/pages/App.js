import React, { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import Navbar from '../components/Navbar';

const VideoUpload = () => {
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
      const response = await axios.post('https://video-compressing-api-9a6m.onrender.com/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);
      setResponseMessage(response.data.message);
      setCompressedVideoUrl(response.data.compressedVideoUrl);
    } catch (error) {
      setResponseMessage('Failed to upload the video.');
    } finally {
      setUploading(false);
    }
  };

  return (
  <>
    <Navbar/>
    <div>
      <h2>Upload Video</h2>
      <form onSubmit={handleSubmit}>
        <div
          {...getRootProps()}
          style={{
            border: '2px dashed #007bff',
            padding: '20px',
            width: '300px',
            textAlign: 'center',
            marginBottom: '20px',
          }}
        >
          <input {...getInputProps()} />
          <p>Drag & drop a video file here, or click to select a file</p>
        </div>
        <button type="submit" disabled={uploading}>
          {uploading ? 'Uploading...' : 'Upload Video'}
        </button>
      </form>

      {responseMessage && <p>{responseMessage}</p>}

      {compressedVideoUrl && (
        <div>
          <h3>Compressed Video:</h3>
          <a href={compressedVideoUrl} target="_blank" rel="noopener noreferrer">
            Download/Preview
          </a>
        </div>
      )}
    </div>
    </>
  );
};

export default VideoUpload;
