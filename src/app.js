const express = require('express');

const app =express();

// app.use("/",(req,res)=>{
//     res.send("Hi this is the main page!");
// })

// app.use("/user",(req,res)=>{
//     res.send("The .use doesn't let code go below!");
// });

//Order matters, if I use the above code, it will override the below routes



app.get("/user",(req,res)=>{
    res.send({firstname:"Raja",lastname:"Babu"});
})

app.post("/user",(req,res)=>{
    //logic for adding a new user
    res.send("User added successfully!");
})


app.delete("/user",(req,res)=>{
    //logic for deleting a user
    res.send("User deleted successfully!");
})

//Below is a request handler
app.use("/home",(req,res)=>{
    res.send("Welcome to home page man!");
})

app.use("/test",(req,res)=>{
    res.send("Hello World!");
})

app.listen(3000);