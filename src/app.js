//mongodb+srv://namastedev:rOnxOFSXhRPhhwvz@cluster0.2rkvmda.mongodb.net/
const express = require('express');
const connectDB = require("./config/database");
const app = express();
const cookieParser = require('cookie-parser');
const cors = require("cors");

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json()); // To parse JSON bodies
app.use(cookieParser()); // To parse cookies


const authRouter = require('./routes/auth.js');
const profileRouter = require('./routes/profile.js');
const requestRouter = require('./routes/request.js');
const userRouter = require('./routes/user');


app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requestRouter);
app.use('/', userRouter);


connectDB()
    .then(() => {
        console.log("Connection to Database is established!");
        app.listen((3000), () => {
            console.log("Server listening on port 3000")
        })
    })
    .catch((err) => {
        console.log("Error encountered while connecting to the database");
    })
