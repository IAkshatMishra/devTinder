const mongoose = require('mongoose');

// Creating a schema (Schema is definition of the structure of the document)
const userSchema = new mongoose.Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String
    },
    password:{
        type:String
    },
    age:{
        type:Number
    },
    gender:{
        type:String
    }
});

// Creating a model (Model is a class that is used to create and read documents from the collection)

module.exports = mongoose.model("User",userSchema);
