require("dotenv").config();
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (fileString, format) => {
  try {
    const { uploader } = cloudinary;

    const res = await uploader.upload(
      `data:image/${format};base64,${fileString}`
    );

    return res;
  } catch (error) {
    console.log(error);
  }
};

const uploadFileToCloudinary = async (file) => {
  try {
    const { uploader } = cloudinary;

    const res = uploader.upload(file, { resource_type: "raw" });
    return res;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  uploadToCloudinary,
  uploadFileToCloudinary,
};
