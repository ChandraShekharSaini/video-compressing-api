import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';
import cors from 'cors'
import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import axios from 'axios';
import User from "./module/auth.module.js"

const app = express();



import { spawn } from 'child_process';

const PORT = process.env.PORT || 3500;
// Load environment variables
dotenv.config();



app.use(cors({
    origin: 'https://my-video-9ljf.onrender.com',
    credentials: true,
}))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(process.env.PORT)
console.log(process.env.CLOUD_NAME),
    // Cloudinary Configuration
    cloudinary.config({



        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUDINARY_CLIENT_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Set up storage engine for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Store uploaded files in 'uploads' folder
    },
    filename: (req, file, cb) => {
        // Name the file with a timestamp
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        let extensionName = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + extensionName)
    }
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

const compressVideo = (inputPath, outputPath) => {
    return new Promise((resolve, reject) => {
      ffmpeg(inputPath)
        .output(outputPath)
        .videoCodec('libx264')  // Video codec
        .audioCodec('aac')      // Audio codec
        .audioBitrate('128k')   // Set audio bitrate
        .videoBitrate('500k')   // Set video bitrate (adjust based on desired quality/size)
      
        .on('start', (commandLine) => {
          console.log(`FFmpeg process started with command: ${commandLine}`);
        })
        .on('progress', (progress) => {
          console.log(`Processing: ${progress.percent}% done`);
        })
        .on('end', () => {
          console.log('Compression finished successfully');
          resolve(outputPath);
        })
        .on('error', (err) => {
          console.error('Error during video compression:', err);
          reject(err);
        })
        .run();
    });
  };

 


// Compress video function using ffmpeg
app.post('/upload', upload.single('video'), async (req, res) => {
    console.log("request received")
    if (!req.file) {
        return res.status(400).send('No video file uploaded.');
    }

    const rawFilePath = req.file.path; // Path to the raw uploaded file
    const compressedFilePath = path.join(__dirname, `compressed-${Date.now()}.mp4`); // Path for the compressed file

    try {
        // Step 1: Upload the raw file to the "raw_videos" folder in Cloudinary
        console.log('Uploading raw video to Cloudinary...');
        const rawUploadResult = await cloudinary.uploader.upload(rawFilePath, {
            resource_type: 'video',
            folder: 'raw_videos', // Folder for raw videos
        });

        console.log('Raw video uploaded to Cloudinary:', rawUploadResult.secure_url);

        // Step 2: Download the raw file from Cloudinary for compression
        const rawFileCloudinaryUrl = rawUploadResult.secure_url;

        console.log('Compressing the video...');
        const compressedVideoPath = await compressVideo(rawFilePath, compressedFilePath);

        // Step 3: Upload the compressed video to the "compressed_videos" folder in Cloudinary
        console.log('Uploading compressed video to Cloudinary...');
        const compressedUploadResult = await cloudinary.uploader.upload(compressedVideoPath, {
            resource_type: 'video',
            folder: 'compressed_videos', // Folder for compressed videos
        });

        console.log('Compressed video uploaded to Cloudinary:', compressedUploadResult.secure_url);

        // Step 4: Clean up local files
        console.log('Cleaning up local files...');
        fs.unlinkSync(rawFilePath); // Remove raw video file
        fs.unlinkSync(compressedFilePath); // Remove compressed video file

        // Optionally: Delete the raw file from Cloudinary
        console.log('Cleaning up raw video from Cloudinary...');
        await cloudinary.uploader.destroy(rawUploadResult.public_id, {
            resource_type: 'video',
        });

        // Send the response with the compressed video URL
        console.log("Sending response to user..")
        res.status(200).json({
            message: 'Video uploaded, compressed, and stored in Cloudinary successfully!',
            compressedVideoUrl: compressedUploadResult.secure_url,
        });

    } catch (error) {
        console.error('Error during video processing:', error);

        // Cleanup local files in case of error
        if (fs.existsSync(rawFilePath)) fs.unlinkSync(rawFilePath);
        if (fs.existsSync(compressedFilePath)) fs.unlinkSync(compressedFilePath);

        res.status(500).send('Error processing the video.');
    }
});

import authRouter from './routes/auth.route.js'

app.use("/api/auth", authRouter)

// app.use(
//     session({
//       secret: 'knkknknkknknk',
//       resave: false,
//       saveUninitialized: true,
//     })
//   );



import passportGoogleAuth from "./authentication/passportGoogleAuth.js"
app.use(passportGoogleAuth.initialize())
app.get('/auth/google',
    passportGoogleAuth.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
    passportGoogleAuth.authenticate('google', { failureRedirect: 'https://my-video-9ljf.onrender.com/sign-in', session: false }),
    function (req, res) {


        const userData = req.user

        const token = jwt.sign({ user: req.user }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).redirect(`https://my-video-9ljf.onrender.com`);

    });

import passportGithub from "./authentication/passportGithub.js"
app.use(passportGithub.initialize())
app.get('/auth/github',
    passportGithub.authenticate('github', { scope: ['user:email'] }));

app.get('/auth/github/callback',
    passportGithub.authenticate('github', { failureRedirect: 'https://my-video-9ljf.onrender.com/sign-in', session: false }),
    function (req, res) {


        const token = jwt.sign({ user: req.user }, process.env.JWT_SECRET, { expiresIn: '1hr' });

        res.redirect(`https://my-video-9ljf.onrender.com`);
    });


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});


// mongoose.connect('mongodb://127.0.0.1:27017/videocompress').then(() => {
//     console.log("Connected To DB")
// }).catch((error) => {
//     console.log(error.message)
// })



mongoose.connect(process.env.MONGODB_STRING).then(() => {
    console.log("Connected To DB")
}).catch((error) => {
    console.log(error)
})

const __dirname2 = path.resolve();
app.use(express.static(path.join(__dirname2, '/frontend/build')))
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname2, "frontend", "build", "index.html"))
})


app.listen(PORT, () => {

    console.log("http://localhost:", PORT)
})
