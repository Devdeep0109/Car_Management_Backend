const {Schema ,model} = require("mongoose");

const carSchema = new Schema(
    {
        title:{
            type: String,
            required: true,
        },
        coverImage:{
            type : String,
        },
        price: {
            type:Number,
            required:true,
        },
        car_type:{
            type:String,
        },
        company:{
            type:String,

        },
        address:{
            type:String,
            required:true
        },
        additionalInfo:{
            type:String
        },
        createdBy:{
            type:Schema.Types.ObjectId,
            ref:"user",
        }
    },{timestamps:true}
)

const car = model("car",carSchema);

module.exports = car;