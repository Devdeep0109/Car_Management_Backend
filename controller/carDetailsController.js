
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

const Car = model("car",carSchema);




const carDetailsController = async(req,res) =>{

    // Check if req.body.data exists
    // if (!req.body.data) {
    //     return res.status(400).json({ success: false, error: "Data is missing" });
    // }
   

    const   { 
        title,
        price,
        car_type,
        company,
        address,
        additionalInfo,
        id,
        fileURL,} = req.body;
    
        console.log(title);
        
    // const data = req.body.data;
    
    try{
        

        const newCarDetails = await Car({
            title: title,
            coverImage:fileURL,
            price: price,
            car_type: car_type,
            company: company,
            address:address,
            additionalInfo:additionalInfo,
            createdBy:id,
        }
    )
        await newCarDetails.save()
       
        res.status(200).json(newCarDetails); 
    }
    catch(err){
      
        res.status(500).json(err);
    }
}

const allcar = async(req,res)=>{
    try{
        const data = await Car.find().populate("createdBy");

        if(!Car){
            return res.status(400).json({success:false ,error:"Car not found"})
        }
        return res.status(200).json({success:true ,data:data})
    }
    catch(err){
        res.json({success:false ,error:err});
    }
}

const fullCarDetail= async(req,res)=>{
    const id = req.params.id;
    const details = await Car.findById(id).populate("createdBy");
    console.log("Car Id " , id);
    
    if(!details){
        return res.status(400).json({success:false , error : "Car details not found"})
    }
    console.log(details);
    
    return res.status(200).json({success:true ,data:details});
}
const caredit= async(req,res) =>{

    const {  title,
        price,
        car_type,
        company,
        address,
        additionalInfo,
        id,
        fileURL} = req.body;

    
    try {
        const carId = req.params.id;
        
        console.log(carId);
        console.log("before data");
        
        
        if(fileURL != null){
            
            const newCarDetails = await Car.findByIdAndUpdate(carId, {
                title: title,
                coverImage:fileURL,
                price: price,
                car_type: car_type,
                company: company,
                address:address,
                additionalInfo:additionalInfo,
               
            }
        )
            await newCarDetails.save()
           
            res.status(200).json({success:true, data: newCarDetails});

        }
        else{
            console.log("No File ");
            const newCarDetails = await Car.findByIdAndUpdate(carId, {
                title: title,
                price: price,
                car_type: car_type,
                company: company,
                address:address,
                additionalInfo:additionalInfo,
               
            }
        )
            await newCarDetails.save()
           
            res.status(200).json({success:true, data: newCarDetails});
        }
    } catch (error) {
        res.status(500).json({success:false, error: error})
        
    }
}

const cardelete=async(req,res) =>{

    try{
        const carId = req.params.id;
        
        const deleteCar = await Car.findByIdAndDelete(carId);
        
        if(!deleteCar){
            res.status(400).json({success:false ,error:error})
        }
        else{
            res.status(200).json({success:true,message:"Car deleted Successfully"});
        }
    }
    catch(error){
        res.status(500).json({success:false, error: error})
    }
}


module.exports={carDetailsController ,fullCarDetail ,allcar,caredit,cardelete};