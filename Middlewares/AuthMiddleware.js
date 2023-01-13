const jwt = require("jsonwebtoken");


const Authenticate = (req,res,next)=>{
    const token = req.headers.authorization; 
   if(token){
        const decode = jwt.verify(token,"channa");
        if(decode){
            const userID = decode.userID;
            req.body.userID = userID;
            next();
        }else{
            console.log("token missmatched")
            res.send("decode errr");
        }
   }else{
        console.log('erroin authmiddleware')
        res.send("Please Login");
   }
}


// {
//     "msg": "Login SuccessFull",
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb3Vyc2UiOiJiYWNrZW5kIiwiaWF0IjoxNjczNDU3Mjc3fQ.I-xvfEV9wiRH0smBA5K4VRayHlL3QaC0N2uUtBM3sV8"
//   }

module.exports = Authenticate;