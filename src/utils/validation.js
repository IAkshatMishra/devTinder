const validator = require('validator');

const signUpValidation = (req) => {

    const { firstName, lastName, emailId, password } = req.body;

    if (!firstName || !lastName) {
        throw new Error("Enter both first and last name");
    }

    if (!validator.isEmail(emailId)) {
        throw new Error("Enter a valid email address");
    }

    if (!validator.isStrongPassword(password)) {
        throw new Error("Enter a strong password!!!!!!");
    }

}

const validateEditProfileData = (req) => {
    const fieldsAllowedToEdit = ["firstName", "lastName", "age", "gender", "photoURL", "about", "skills"];
    if(!req.body || Object.keys(req.body).length === 0){
        throw new Error("Please provide data to edit profile");
    }

    if(req.body.photoURL && !validator.isURL(req.body.photoURL)){
        throw new Error("Please enter a valid URL");
    }

    const isEditAllowed = Object.keys(req.body).every((field)=>{return fieldsAllowedToEdit.includes(field)});
    return isEditAllowed;
}

module.exports = { signUpValidation, validateEditProfileData };
