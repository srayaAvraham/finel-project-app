const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const crypto = require('crypto');
const path = require('path');
const Minio = require('minio')
const multerS3 = require('multer-minio-storage-engine');

const minioClient = new Minio.Client({
    endPoint: 'localhost',
    port: 9000,
    useSSL: false,
    accessKey: 'minioadmin',
    secretKey: 'minioadmin'
});

// create storage engine
const gridFsStorage = new GridFsStorage({
    url: 'mongodb://localhost:27017/myapp',
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                };
                console.log(fileInfo)
                resolve(fileInfo);
            });
        });
    }
});

const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname))
    }
  })


  const minioStorage = multerS3({
    minio: minioClient,
    bucketName: 'videos',
    metaData: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    objectName: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  })


module.exports = {
    gridFS: multer({ storage: gridFsStorage }),
    disk: multer({ storage: diskStorage }),
    minio: multer({ storage: minioStorage })
}
