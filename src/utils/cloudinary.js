import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const resolvedPath = path.resolve(localFilePath);
    console.log("Uploading file to Cloudinary:", resolvedPath);

    const response = await cloudinary.uploader.upload(resolvedPath, {
      resource_type: "auto",
    });

    console.log("File uploaded successfully:", response.url);
    fs.unlinkSync(localFilePath);
    return response;

  } catch (error) {
    console.error("Cloudinary upload error:", error);
    if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath);
    return null;
  }
};

export { uploadOnCloudinary };
