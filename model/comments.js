const {Schema , model} = require("mongoose");


const commentSchema = new Schema({
    content :{
        type:String,
        required:true,
    },
    messId :{
        type : Schema.Types.ObjectId,
        ref : "mess",
    },
    createdBy :{
        type : Schema.Types.ObjectId,
        ref : "user",
    }
    
})


const Comments = model("comment",commentSchema);

module.exports = {Comments};