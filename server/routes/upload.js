const express = require('express');
const router = express.Router();
const upload = require('../controllers/upload');
const path = require('path')
const config = require('../config');

router.post('/', async function(req, res) {
    const filePath  = path.join(config.uploadPath, "test.avi");
    console.log(filePath)
    try{
      let videoPath = await upload.uploadFile(req, filePath)
      let metadata = await upload.gwnerateThumbnail(req, filePath)
      console.log(metadata)
      metadata.videoPath = videoPath
      res.send({ status: 'success', metadata })  
    }catch(err){
        res.send({ status: 'error', err })
    }

});

module.exports = router;