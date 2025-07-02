const express = require('express');

const app = express();

// app.use("/",(req,res)=>{
//     res.send("Hi this is the main page!");
// })

// app.use("/user",(req,res)=>{
//     res.send("The .use doesn't let code go below!");
// });

//Order matters, if I use the above code, it will override the below routes

// app.get(\^/user\/ab?c$/,(req,res)=>{
//     res.send({firstname:"Raja",lastname:"Babu"});
// })

// app.get("/user/:abcd", (req, res) => {
//     console.log(req.params);
//     res.send({ firstname: "Raja", lastname: "Babu" });
// });

// app.get("/user", (req, res) => {
//     console.log(req.query);
//     res.send("We have sent a response with query params");
// });

app.get("/user", (req, res, next) => {
    console.log("This is user 1");
    next();
}, (req, res, next) => {
    console.log("This is user 2");
    res.send("2nd Response!!")
});


app.listen(3000);