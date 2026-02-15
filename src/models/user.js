const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Not a valid email");
            }
        }
    },
    password:{
        type:String,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Please enter a strong password");
            }
        }
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
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrfdmqDzvAz8CAbUYDtIYlQabxJru9fPjy0Q&shttps://geographyandyou.com/images/user-profile.png",
        // validate(value){
        //     if(!validator.isURL(value)){
        //         throw new Error("Not a valid photoURL");
        //     }
        // }
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


userSchema.methods.getJWT = async function(){
    //The "this" inside the method refers to the individual document instance of that model.
    const user =this;
    const token = await jwt.sign({_id:user._id},"DEV@Tinder#631!",{expiresIn:'7d'});
    return token;
}

userSchema.methods.comparePasswords = async function(passwordInputByUser){
    const user = this;
    const passwordHash = user.password;
    isValidPassword = await bcrypt.compare(passwordInputByUser,passwordHash);
    return isValidPassword;
}
 

// Creating a model (Model is a class that is used to create and read documents from the collection)
module.exports = mongoose.model("User",userSchema);
