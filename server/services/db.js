const mongoose = require('mongoose');

const db = mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true, useCreateIndex: true});
// let gfs;
mongoose.connection.on("connected", () => {
    console.log("connected")
})
mongoose.connection.on("disconnected", () => console.log("disconnected"))
mongoose.connection.on("error", () => console.log("error"))

module.exports ={
    db
}