import express from 'express';
import { S3Client, ListBucketsCommand, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"; // for temporary download link
const router = express.Router();
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
// Setup uploads path: /uploads/services
const uploadsDir = path.join(process.cwd(), 'uploads', 'services');
// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `service-${uniqueSuffix}${ext}`);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB limit
  },
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|mp4|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only media files (JPEG, PNG, WebP, mp4) are allowed!'), false);
    }
  }
});

// AWS S3 Client setup
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

router.get("/:filename", async (req, res) => {
  try {
    const { filename } = req.params;

    // Generate a presigned URL (valid for 5 minutes)
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: 'newfile/Gemini_Generated_Image_4q5zuy4q5zuy4q5z.png',
    });

    const url = await getSignedUrl(s3, command, { expiresIn: 300 }); // 300 seconds = 5 minutes
console.log(url);
    res.status(200).json({
      message: "Temporary file URL generated successfully",
      fileUrl: url,
    });
  } catch (error) {
    console.error("Error getting file:", error);
    res.status(500).json({ message: "Error fetching file from S3" });
  }
});

router.post("/", upload.single('image'), async (req, res) => {
  try {
    console.log(req.body);
      console.log("req.file:", req.file);
  
    const file = req.file;
    // Prepare upload parameters
    const fileStream = fs.createReadStream(file.path);
    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `newfile/${Date.now()}_${file.originalname}`, // save in newfile/ folder
      Body: fileStream,
      ContentType: file.mimetype,
    };
    
    console.log(uploadParams);


    const command = new PutObjectCommand(uploadParams);
    await s3.send(command);

  // Remove file from local uploads
    fs.unlinkSync(file.path);

 // Send response with file URL
    const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadParams.Key}`;
    console.log(fileUrl);
    
    res.status(200).json({
      message: "✅ Image uploaded successfully!",
      fileUrl: fileUrl,
    });

  } catch (error) {
    console.error("Error creating upload URL:", error);
    res.status(500).json({ message: "Error generating upload URL" });
  }
});

export default router;