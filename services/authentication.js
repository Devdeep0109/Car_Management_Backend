require("dotenv").config();
const { config } = require("dotenv");
const jwt = require("jsonwebtoken");

const secret = process.env.secret;

//creating token
function createTokenForUser(user){

    // console.log("user",user);
    const payload = {
        _id : user._id,
        email : user.email,
        username : user.username,
        role : user.role 
    }
    const token = jwt.sign(payload ,secret);
    return token;
}

//validate token...
function validateToken(token){
    const payload = jwt.verify(token ,secret);
    return payload;
}

module.exports = {
    validateToken ,
    createTokenForUser
}