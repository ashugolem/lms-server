const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: 'dabw08syd',
    api_key: '686119881262379',
    api_secret: 'uYHtwFoiM8NNk2emCaoQSE0EGus'
});

const uploader = async (filePath) => {
    try {
        let result = await cloudinary.uploader.upload(filePath);  
        console.log("Cloudinary URI : ", result)
        return result       
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = uploader;