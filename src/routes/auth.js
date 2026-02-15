const express = require('express');
const { signUpValidation } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const authRouter = express.Router();


//API - /signup API - to add a new user
authRouter.post('/signup', async (req, res) => {
    try {
        //Validation for req.body
        signUpValidation(req);

        const { firstName, lastName, emailId, password } = req.body

        // Encryting the password
        const passwordHash = await bcrypt.hash(password, 10);
        //console.log("Password Hash: ",passwordHash);

        // Adding a new user instance in the model
        const user = new User({ firstName, lastName, emailId, password: passwordHash });

        const savedUser = await user.save();
        //Create a jwt token
        const token = await savedUser.getJWT();
        //Use cookie to store token
        res.cookie("token", token, { expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) });

        res.json({ message: "User Added Successfully!", data: savedUser })
    }
    catch (err) {
        res.status(500).send("Some Error Occurred: " + err.message);
    }

});

// API to login an existing user
authRouter.post('/login', async (req, res) => {
    try {
        const { emailId, password } = req.body;

        //Checking if the emailId even exists in the collection or not
        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            //throw new Error("Invalid Credentials");
            return res.status(400).send("Invalid Credentials!!");
        }

        //Checking if the password is correct or not
        const isValidPassword = await user.comparePasswords(password);
        if (isValidPassword) {

            //Create a jwt token
            const token = await user.getJWT();
            //Use cookie to store token
            res.cookie("token", token, { expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) });
            res.send(user);
        }
        else {
            throw new Error("Invalid Credentials");
        }
    }
    catch (err) {
        res.status(500).send("Some Error Occurred: " + err.message);
    }
})

authRouter.post('/logout', async (req, res) => {
    res.cookie("token", null, { expires: new Date(0) });
    res.send("User is logged out succesfully!!")

})

module.exports = authRouter;