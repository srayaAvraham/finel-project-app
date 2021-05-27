const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const crypto = require('crypto');
const path = require('path');
const Minio = require('minio')
const multerS3 = require('multer-minio-storage-engine');
const { google } = require('googleapis');
const { uuid } = require('uuidv4');
// const GoogleStorage = require('google-drive-storage');
 
const cert = () => fs.readFile('./credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Drive API.
  const credentials = JSON.parse(content);
  return credentials;
});

const minioClient = new Minio.Client({
    endPoint: 'localhost',
    port: 9000,
    useSSL: false,
    accessKey: 'minioadmin',
    secretKey: 'minioadmin'
});

const auth = new google.auth.GoogleAuth({
    keyFile: './credentials.json',
    scopes: [
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/drive.appdata',
        'https://www.googleapis.com/auth/drive.readonly',
        'https://www.googleapis.com/auth/drive.metadata.readonly',
        'https://www.googleapis.com/auth/drive.metadata',
        'https://www.googleapis.com/auth/drive.photos.readonly'
    ],
});

// const oAuth2Client  = new google.auth.OAuth2( cert() )
const drive = google.drive({version: 'v3', auth });

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
      cb(null, file.fieldname + '-' + uuid() + path.extname(file.originalname))
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


  //  const googleStorage = GoogleStorage({
  //       drive: drive,
  //       driveId: '1iaudFygUYG_GKgkgKGJHGhjghjghjgtirtrduu',
  //       filename: function (req, file, callback) {
 
  //           const fileName = `${uuid()}-${file.originalname}`;
 
  //           callback(null, fileName);
  //       },
  //   })


module.exports = {
    gridFS: multer({ storage: gridFsStorage }),
    disk: multer({ storage: diskStorage }),
    minio: multer({ storage: minioStorage }),
    // drive: multer( { storage: googleStorage})
}
