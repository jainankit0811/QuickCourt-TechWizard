
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs/promises';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'quickcourt',
      resource_type: 'image',
    });
    // Delete temporary file after upload
    await fs.unlink(filePath).catch((err) => console.error(`Failed to delete temp file ${filePath}:`, err));
    return result.secure_url;
  } catch (error) {
    // Delete file on error to avoid orphaned files
    await fs.unlink(filePath).catch((err) => console.error(`Failed to delete temp file ${filePath}:`, err));
    throw new Error(`Cloudinary upload failed: ${error.message}`);
  }
};

export { uploadImage };