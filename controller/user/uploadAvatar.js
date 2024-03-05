const multer = require('multer')
const User = require('../../model/userModel');
const uploader = require('../../cloudinary/upload');

const storage = multer.diskStorage({})

const upload = multer({ storage: storage })

const uploadAvatar = async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        return res.status(401).json({ msg: 'User not found' })
    }
    try {
        const result = await uploader(req.file.path)
        await User.findByIdAndUpdate( {_id: req.params.id}, {$set: { profile: result.secure_url }})
        res.status(200).json({ msg: "File Uploaded Successfully" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {uploadAvatar, upload}