const multer = require('multer');
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/image')
    },
    filename: function(req, file, cb) {
        var filename = `uploads_${Math.round(+new Date() / 1000)}_${file.originalname}`.replace(" ", "_")
        cb(null, filename)
    }
})
module.exports = multer({
    storage: storage,
    limits: { fileSize: 1000000000 }
})