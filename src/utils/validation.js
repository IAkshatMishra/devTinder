const validator = require('validator');

const signUpValidation = (req)=>{

    const {firstName,lastName,emailId,password}=req.body;

    if(!firstName || !lastName){
        throw new Error("Enter both first and last name");
    }

    if(!validator.isEmail(emailId)){
        throw new Error ("Enter a valid email address");
    }

    if(!validator.isStrongPassword(password)){
        throw new Error("Enter a strong password!!!!!!");
    }

}

module.exports={signUpValidation};
