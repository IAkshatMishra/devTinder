const isAdmin = (req, res, next) => {
    const token="abcd";
    const adminAuthorized = token==="abc";
    if(!adminAuthorized){
        res.status(401).send("You are not an admin!!!!");
    }
    else{
        next();
    }
}

const isUser= (req,res,next)=>{
    const token="xyz";
    const userAuthorized=token==="xyz";
    if(!userAuthorized){
        res.status(401).send("You are not a user!!!!");
    }
    else{
        next();
    }
}

module.exports ={isAdmin,isUser};