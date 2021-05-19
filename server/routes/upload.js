const express = require('express');
const router = express.Router();
const { gwnerateThumbnail } = require('../controllers/upload')
const Minio = require('minio')
const fs = require('fs')
const upload = require('../services/storage')
const {Video} = require('../models/Video')
const minioClient = new Minio.Client({
  endPoint: 'localhost',
  port: 9000,
  useSSL: false,
  accessKey: 'minioadmin',
  secretKey: 'minioadmin'
});
// function fileUpload(req, res, next) {
//   upload.gridFS.single('myFile')(req, res, next => {
//     console.log(req.file)
//   });
//   upload.disk.single('myFile')(req, res, next =>{
//     console.log(req.file)
//   });
 
//   next();
// }

router.post('/', upload.disk.single('myFile'), async function(req, res) {
    const { file } = req;
    console.log(file)
    let metadata = await gwnerateThumbnail(req, file.path)
    console.log(metadata)
    try{
      let  video_etag = await minioClient.fPutObject("videos" , file.filename,file.path,{})
      let  thumbnail_etag = await minioClient.fPutObject("thumbnail" , metadata.fileName,metadata.url,{})

      const document = {
          title: "aaa",
          description: "aaaa",
          filePath: video_etag,
          duration: metadata.fileDuration,
          thumbnail: thumbnail_etag
      }
      let video = new Video(document);
      video.save().then((doc, err) => {
        console.log(err);
        fs.unlinkSync(file.path);
        fs.unlinkSync(metadata.url);
        res.send({ status: 'success', doc }) 
      })

    }catch(err){
      console.log(err)
        res.send({ status: 'error', err })
    }

});

// router.get("/download", function(request, response) {
//   minioClient.("videos", request.query.filename, function(error, stream) {
//       if(error) {
//           return response.status(500).send(error);
//       }
//       stream.pipe(response);
//   });
// });

module.exports = router;