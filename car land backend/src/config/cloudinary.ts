import cloudinary from 'cloudinary'



cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key:process.env.CLOUDINARY_APIKEY,
  api_secret:process.env.CLOUDINARY_APISECRET,
});

module.exports = cloudinary.v2;

