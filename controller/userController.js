const User = require("../model/user");

const signupController = async(req,res)=>{

    const {username, email, password} = req.body;
    // console.log(req.body);

    try{ 
        const newUser = await User.create({
            username,
            password,
            email
        })
        // console.log(newUser.username ,newUser.password);
        res.json(newUser);
    }
    catch{
        res.status(500).json("something went wrong!");
    }
}
const signinController = async(req, res)=>{

    try{
        const {email,password} = req.body;

        const token = await User.matchPasswordAndCreateToken(email,password);
        if(token.success == false){
            res.status(400).json(...token.error)
        }
        else{
            res.status(200).json(token);
        }
    }
    catch(err){
        res.status(500).send(err.message);
    }
}

const getUser = async (req,res) => {
   try{ const id = req.user._id;
    // console.log("User Id: ",id);
    const user = await User.findById(id);
    if(!user){
        return res.status(400).json({success: false, error: "User does not exist!"})
    }
    else{
        return res.status(200).json({success: true, data: user})

    }}
    catch(err){
        return res.status(400).json({success:false, error: "Server Error"})
    }
}

module.exports={signinController,signupController, getUser}