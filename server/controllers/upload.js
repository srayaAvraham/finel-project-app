const fs = require('fs');
var ffmpeg = require('fluent-ffmpeg');
// Take in the request & filepath, stream the file to the filePath
const uploadFile = (req, filePath) => {
    return new Promise((resolve, reject) => {
     const stream = fs.createWriteStream(filePath);
     // With the open - event, data will start being written
     // from the request to the stream's destination path
     stream.on('open', () => {
      console.log('Stream open ...  0.00%');
      req.pipe(stream);
     });
   
     // Drain is fired whenever a data chunk is written.
     // When that happens, print how much data has been written yet.
     stream.on('drain', () => {
      const written = parseInt(stream.bytesWritten);
      const total = parseInt(req.headers['content-length']);
      const pWritten = ((written / total) * 100).toFixed(2);
      console.log(`Processing  ...  ${pWritten}% done`);
     });
   
     // When the stream is finished, print a final message
     // Also, resolve the location of the file to calling function
     stream.on('close', () => {
      console.log('Processing  ...  100%');
      resolve(filePath);
     });
      // If something goes wrong, reject the primise
     stream.on('error', err => {
      console.error(err);
      reject(err);
     });
    });
   };

   const gwnerateThumbnail = (req, videoPath) => {
    let fileName = ""
    let fileDuration = ""
    let filePath= ""
    
    ffmpeg.ffprobe(videoPath, function(err, metadata) {
        console.log(err)
        console.dir(metadata); // all metadata
        console.log(metadata.format.duration);
        fileDuration = metadata.format.duration
    });
    return new Promise((resolve, reject) => {
    ffmpeg(videoPath)
        .on('filenames', function (filenames) {
            console.log('Will generate ' + filenames.join(', '))
            console.log(filenames)
            fileName = filenames[0]
            filePath = "uploads/thumbnails/" + filenames[0]
        })
        .on('end', function () {
            console.log('Screenshots taken');
            resolve({ url: filePath, fileName: fileName, fileDuration: fileDuration });
        })
        .on('error', function (err) {
            console.error(err);
            reject(err);
        })
        .screenshots({
            count: 1,
            folder: 'uploads/thumbnails',
            size: '320x240', 
            filename: 'thumbnail-%b.png'
        })
    })
   };
module.exports = {
    uploadFile,
    gwnerateThumbnail
}