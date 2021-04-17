const env = process.env;

const config = {
    uploadPath: env.UPLOAD_PATH || `${__dirname}\\files`
};


module.exports = config;