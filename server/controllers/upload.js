const fs = require('fs');

const {createReadStream, createWriteStream} = require("fs");
const { Stream } = require('stream');


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
module.exports = {
    
    uploadFile
}