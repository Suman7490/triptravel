import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

// Configure Cloudinary properly
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dwoqlfe4g",
    api_key: process.env.CLOUDINARY_API_KEY || "345195939318227",
    api_secret: process.env.CLOUDINARY_API_SECRET || "DHUpaJ-FTGQ_TiuT8TAfFN4dzwA",
});

// Define storage engine
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        return {
            folder: "triptravel_uploads",
            allowed_formats: ["jpg", "png", "jpeg"],
            transformation: [{ width: 800, height: 600, crop: "limit" }],
            public_id: file.originalname.split(".")[0] + "-" + Date.now(),
        };
    },
});

// Create multer upload instance
const upload = multer({ storage });

export default upload;
