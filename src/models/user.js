const mongoose = require('mongoose');

// Creating a schema (Schema is definition of the structure of the document)
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:50,
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String,
        lowercase:true,
        required:true,
        unique:true, // Ensures that emailId is unique across the collection
        trim:true,
    },
    password:{
        type:String,
    },
    age:{
        type:Number,
        min:18
    },
    gender:{
        type:String,
        validate:{
            validator: function(value){
                if(!["male","female","other"].includes(value)){
                    throw new Error("Not a valid gender");
                }
            }
        }
    },
    photoURL:{
        type:String,
        default:"https://cdn.vectorstock.com/i/1000v/51/87/student-avatar-user-profile-icon-vector-47025187.jpg"
    },
    about:{
        type:String,
        default:"Hi! I am using DevTinder!"
    },
    skills:{
        type:[String],
    }
},{
    timestamps:true // Automatically adds createdAt and updatedAt fields
});

// Creating a model (Model is a class that is used to create and read documents from the collection)

module.exports = mongoose.model("User",userSchema);
