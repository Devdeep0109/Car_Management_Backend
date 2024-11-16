const { Comments } = require("../model/comments");


const createComments = async(req,res) =>{

    const {content, messId, createdBy} = req.body.data;
    try{
        //add details to comment model
        const comments =await Comments.create({
            content,
            messId,
            createdBy
        })
        res.status(200).json({success:true, data:comments})
    }
    catch{
       res.status(400).json({success:false, message:"something went wrong"}); 
    }
}

const sendComments = async(req,res) =>{

    try{
        const id = req.params.id
        console.log("Mess Id",id);
        const comment =  await Comments.find({messId: id}).populate("createdBy", "username");
        if(!comment){
            return res.status(400).json({success:false, message:"data not found"})
        }
        console.log(comment);
        return res.status(200).json({success:true, data:comment})
    }
    catch(error){
        res.status(500).json({success:false, message:error})
    }
}

module.exports = {createComments , sendComments};