const express = require('express');
const router = express.Router();
const { gwnerateThumbnail, uploadToDrive } = require('../controllers/upload')
const Minio = require('minio')
const fs = require('fs')
const upload = require('../services/storage')
const {Video} = require('../models/Video')
const minioClient = new Minio.Client({
  endPoint: 'localhost',
  port: 9000,
  useSSL: false,
  accessKey: 'miniominio',
  secretKey: 'miniominio'
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
      
      
      await minioClient.fPutObject("videos" , file.filename,file.path,{})
      await minioClient.fPutObject("thumbnail" , metadata.fileName,metadata.url,{})

      const document = {
          title: "aaa",
          description: "aaaa",
          filePath: minioClient.protocol + '//' + minioClient.host + ':' + minioClient.port + '/' + 'videos' + '/' + file.filename,
          duration: metadata.fileDuration,
          thumbnail: minioClient.protocol + '//' + minioClient.host + ':' + minioClient.port + '/' + 'thumbnail' + '/' + metadata.fileName
      }
      let video = new Video(document);
      let doc = await video.save();
      console.log(doc);
      // let drive = await uploadToDrive(file.path , file.filename, file.mimetype);
      // console.log(drive)
      fs.unlinkSync(file.path);
      fs.unlinkSync(metadata.url);
      res.send({ status: 'success', doc }) 

    }catch(err){
      console.log(err)
        res.send({ status: 'error', err })
    }

});

module.exports = router;