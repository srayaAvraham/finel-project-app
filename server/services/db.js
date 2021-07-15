const mongoose = require('mongoose');
// mongodb+srv://admin:Aa123456@practfix.p2zat.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
const db = mongoose.connect('mongodb+srv://admin:Aa123456@practfix.p2zat.mongodb.net/practfix?retryWrites=true&w=majority', {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
// let gfs;
mongoose.connection.on("connected", () => {
    console.log("connected to mongodb")
})
mongoose.connection.on("disconnected", () => console.log("disconnected"))
mongoose.connection.on("error", () => console.log("error"))

module.exports ={
    db
}