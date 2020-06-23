const multer = require('multer');
const path = require('path');

// Multer Config
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/avatar_uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

const fileFilter = function (req, file, cb) {
    const authorizedMimetypes = ['image/jpeg', 'image/jpg', 'image/png']
    if (!authorizedMimetypes.includes(file.mimetype)) {
        req.fileValidationError = 'please upload a valid file';
        return cb(null, false, new Error('please upload a valid file'));
    }else{
        return cb(null, true);
    }
}

module.exports = multer({storage: storage, fileFilter: fileFilter}).single('avatar');
