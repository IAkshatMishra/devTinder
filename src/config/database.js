const mongoose=require("mongoose");

const connectDB = async()=>{
    await mongoose.connect(
        "mongodb+srv://namastedev:rOnxOFSXhRPhhwvz@cluster0.2rkvmda.mongodb.net/devTinder"
    );
}  

module.exports = connectDB;
