const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type:String,
        maxlength: 50 
    },
    description: {
        type: String,
    },
    filePath : {
        type: String, 
    },
    duration: {
        type: String
    },
    thumbnail: {
        type: String
    },
    parent:{
        type: Schema.Types.ObjectId,
        ref: 'Video'
    },
    isPatient:{
        type: Boolean,
    }
},{timestamps:true})

const Video = mongoose.model('Video', videoSchema);

module.exports = { Video }