// import multer from 'multer';
// import path from 'path';
// import fs from 'fs';

// // Ensure upload directory exists
// const uploadPath = 'public/uploads';
// if (!fs.existsSync(uploadPath)) {
//     fs.mkdirSync(uploadPath, { recursive: true });
// }

// // Configure storage
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, uploadPath);
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//         const ext = path.extname(file.originalname);
//         cb(null, file.fieldname + '-' + uniqueSuffix + ext);
//     }
// });

// // File filter (optional)
// const fileFilter = (req, file, cb) => {
//     if (file.mimetype.startsWith('image/')) {
//         cb(null, true);
//     } else {
//         cb(new Error('Only image files are allowed!'), false);
//     }
// };

// const upload = multer({
//     storage,
//     fileFilter,
//     limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
// });

// export default upload;


import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

// 1. Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 2. Setup storage engine
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "triptravel_uploads", // all uploads go to this folder in Cloudinary
        allowed_formats: ["jpg", "png", "jpeg"],
        transformation: [{ width: 800, height: 600, crop: "limit" }], // optional resize
    },
});

// 3. Create multer upload instance
const upload = multer({ storage });

export default upload;
