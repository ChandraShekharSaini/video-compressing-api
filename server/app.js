import multer from 'multer';
import streamifier from 'streamifier';
import ffmpeg from 'fluent-ffmpeg';
import { v2 as cloudinary } from 'cloudinary';
import express from 'express';
import fs from 'fs';
import path from 'path';
import os from 'os';

const app = express();
const PORT = 3500;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_CLIENT_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Initialize Multer and configure storage
const storage = multer.memoryStorage(); // Store files in memory as buffers
const upload = multer({ storage });

// Function to compress video using FFmpeg and temporary files
const compressVideoStream = (inputBuffer) => {
    return new Promise((resolve, reject) => {
        const tempInputPath = path.join(os.tmpdir(), `input_${Date.now()}.mp4`);
        const tempOutputPath = path.join(os.tmpdir(), `output_${Date.now()}.mp4`);

        // Write input buffer to a temporary file
        fs.writeFileSync(tempInputPath, inputBuffer);

        // Use FFmpeg to compress the video
        ffmpeg(tempInputPath)
            .videoCodec('libx264')
            .audioCodec('aac')
            .audioBitrate('64k')
            .videoBitrate('300k')
            .outputOptions('-movflags faststart') // Ensure MP4 headers are properly placed
            .output(tempOutputPath)
            .on('end', () => {
                const compressedBuffer = fs.readFileSync(tempOutputPath);
                fs.unlinkSync(tempInputPath); // Clean up temp files
                fs.unlinkSync(tempOutputPath);
                resolve(compressedBuffer);
            })
            .on('error', (err) => {
                fs.unlinkSync(tempInputPath); // Clean up temp files
                if (fs.existsSync(tempOutputPath)) fs.unlinkSync(tempOutputPath);
                reject(err);
            })
            .run();
    });
};

// Define the route for video upload and compression
app.post('/upload', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No video file uploaded.');
    }

    try {
        console.log('Compressing the video...');
        const compressedVideoBuffer = await compressVideoStream(req.file.buffer);

        console.log('Uploading compressed video to Cloudinary...');
        const compressedUploadResult = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { resource_type: 'video', folder: 'compressed_videos' }, // Cloudinary folder
                (error, result) => (error ? reject(error) : resolve(result))
            );
            streamifier.createReadStream(compressedVideoBuffer).pipe(uploadStream);
        });

        console.log('Compressed video uploaded:', compressedUploadResult.secure_url);

        res.status(200).json({
            message: 'Video compressed and uploaded successfully!',
            compressedVideoUrl: compressedUploadResult.secure_url,
        });
    } catch (error) {
        console.error('Error during video processing:', error);
        res.status(500).send('Error processing the video.');
    }
});


app.get("/a" , (req,res,next)=>{
    res.json("Hello")
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
