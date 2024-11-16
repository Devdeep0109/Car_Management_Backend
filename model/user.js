const { randomBytes, createHmac } = require("crypto");
const {Schema , model} = require("mongoose");
const { createTokenForUser } = require("../services/authentication");

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    salt: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    role:{
        type:String,
        enum :["USER" ,"ADMIN"],
        default : "USER",
    }
},{timestamps:true}
);

//hashing the password..........
userSchema.pre("save" ,function(next){

    const user = this;
    if(!user.isModified("password")){
        return
    }
    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac("sha256" ,salt)
    .update(user.password)
    .digest("hex");

    this.salt = salt;
    this.password = hashedPassword;

    next();
})

userSchema.static("matchPasswordAndCreateToken" ,async function(email,password){
    //find email
    const user = await this.findOne({email})
    if(!user)
        return {success : false , error:"user not found"}
    const salt = user.salt;
    const hashedPassword = user.password;


    const userProvidedHash = createHmac("sha256" ,salt)
    .update(password)
    .digest("hex");

    if(hashedPassword !== userProvidedHash){
        return {success: false, error: "Wrong Password"};
    }
    const token = createTokenForUser(user);
    return token;
})



const User = model("user" , userSchema);

module.exports = User;