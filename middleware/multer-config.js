//  Import of 'multer' package
const multer = require('multer')


//  Mime types
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
}


//  Save images files 
//      destination -> 'images' folder
//      filename -> get file name, replace spaces by underscores and add timestamp
//      use mime type to add proper extension to the file
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_')
        const extension = MIME_TYPES[file.mimetype]
        callback(null, name + Date.now() + '.' + extension)
    }
})


// Export the multer element with 'storage' const
module.exports = multer({storage: storage}).single('image')