const { validateToken } = require("../services/authentication");

function checkForAuthenticationCookie(cookieName){

    return(req,res,next) => {

        // const tokenCookieValue = req.cookies[cookieName];
        var tokenCookieValue = req.header("Authorization");
        console.log("TOKEN: " + tokenCookieValue)
        if(!tokenCookieValue){
            return next(); // Access Denied
            // res.status(400).json({success:false, error: "Access Denied"})
        }
        if (tokenCookieValue.startsWith("Bearer ")) {
            tokenCookieValue = tokenCookieValue.slice(7, tokenCookieValue.length).trimLeft();
          }

        try{
            const userPayload = validateToken(tokenCookieValue);
            console.log(userPayload);
            req.user = userPayload; //send userpayload to the caller
            return next();
        }
        catch(error){
            return next();
        }
    }
}

module.exports = {
    checkForAuthenticationCookie
}