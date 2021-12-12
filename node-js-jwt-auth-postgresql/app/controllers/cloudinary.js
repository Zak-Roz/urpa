const cloudinary = require('cloudinary');

//Include your cloudinary credentials
cloudinary.v2.config({
  cloud_name: 'dxzdbtucv',
  api_key: '413485732772559',
  api_secret: 'UU2iCZjAQAoSBaILnLqNUhNXAWA'
});

exports.uploads = async (file) =>{
  try {
    return await cloudinary.v2.uploader.upload(file,function(res,err){console.log(res,err);});
  } catch(err) {return {error: err};}
};