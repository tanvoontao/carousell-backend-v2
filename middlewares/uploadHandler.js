var multer = require("multer");
var multerGoogleStorage = require("multer-cloud-storage");

var storage = multerGoogleStorage.storageEngine({
    bucket: process.env.BUCKET_NAME,
    projectId: process.env.PROJECT_ID,
    keyFilename: process.env.KEY_FILENAME,
});

var uploadHandler = multer({
    storage: storage,
    limits: {
        fileSize: 20 * 1024 * 1024, // 20 MB
    },
    fileFilter: function (req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            cb(null, false);
            cb(new Error('Only image files are allowed!'));
        } else {
            cb(null, true);
        }
    },
    onError: function (error, next) {
        next(error);
    }
});

module.exports = { uploadHandler }