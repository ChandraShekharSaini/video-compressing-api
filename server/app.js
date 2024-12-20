import express from 'express';
import multer from 'multer';
import path from 'path';
import cors from 'cors'
import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
const PORT = process.env.PORT || 3500;
// Load environment variables
dotenv.config();

const app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(process.env.PORT)
console.log(process.env.CLOUD_NAME),
// Cloudinary Configuration
cloudinary.config({
  
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
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

// Compress video function using ffmpeg
const compressVideo = (inputPath, outputPath) => {
    return new Promise((resolve, reject) => {
        ffmpeg(inputPath)
            .output(outputPath)
            .withVideoCodec('libx264') // Use H.264 codec for video compression
            .withAudioCodec('aac')     // Use AAC codec for audio compression
            .withFps(30)
            .outputOptions([
                '-crf 23', // Balanced compression quality
                '-preset medium', // Default speed vs compression
                '-movflags +faststart', // Optimized for progressive streaming
            ])
            .on('progress', (progress) => {
                console.log(`Processing: ${Math.round(progress.percent)}%`);
            })
            .on('end', () => {
                console.log('Compression finished');
                resolve(outputPath);
            })
            .on('error', (err) => {
                console.error('Error during compression', err);
                reject(err);
            })
            .run();
    });
};

// API endpoint to handle video upload, compression, and Cloudinary upload
app.post('/upload', upload.single('video'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No video file uploaded.');
    }

    const inputPath = req.file.path;
    const outputPath = `uploads/compressed-${Date.now()}.mp4`;

    try {
        // Compress the video
        const compressedVideoPath = await compressVideo(inputPath, outputPath);

        // Upload the compressed video to Cloudinary
        cloudinary.uploader.upload(compressedVideoPath, { resource_type: 'video' }, (err, result) => {
            if (err) {
                console.error('Error uploading to Cloudinary', err);
                return res.status(500).send('Error uploading video to Cloudinary.');
            }


            console.log(result)

            // Send the URL of the uploaded video
            res.send({
                message: 'Video uploaded, compressed, and uploaded to Cloudinary successfully!',
                cloudinaryUrl: result.secure_url, // URL of the uploaded video
            });

            // Optionally, delete the original and compressed video files
            fs.unlinkSync(inputPath);
            fs.unlinkSync(compressedVideoPath);
        });

    } catch (error) {
        res.status(500).send('Error compressing the video.');
    }
});

app.listen(PORT,()=>{
   
    console.log("http://localhost:",PORT)
})
