const Car = require("../model/CarDetails");



const carDetailsController = async(req,res) =>{

    // Check if req.body.data exists
    // if (!req.body.data) {
    //     return res.status(400).json({ success: false, error: "Data is missing" });
    // }

    const data = JSON.parse(JSON.stringify(req.body.data));
    // const data = req.body.data;
    
    try{
        

        const newCarDetails = await Car({
            title: data.title,
            coverImage:`uploads/${req.file.filename}`,
            price: data.price,
            car_type: data.car_type,
            company: data.company,
            address:data.address,
            additionalInfo:data.additionalInfo,
            createdBy:data.id,
        }
    )
        await newCarDetails.save()
       
        res.status(200).json(newCarDetails); 
    }
    catch(err){
        console.log(err)
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

    const data = JSON.parse(JSON.stringify(req.body.data));
    console.log("Log from car edit ",data);
    
    try {
        const carId = req.params.id;
        
        console.log(carId);
        console.log("before data");
        
        
        if(req.file != undefined){
            console.log("File " ,req.file);
            console.log("Filename ",req.file.filename);
            
            const newCarDetails = await Car.findByIdAndUpdate(carId, {
                title: data.title,
                coverImage:`uploads/${req.file.filename}`,
                price: data.price,
                car_type: data.car_type,
                company: data.company,
                address:data.address,
                additionalInfo:data.additionalInfo,
               
            }
        )
            await newCarDetails.save()
           
            res.status(200).json({success:true, data: newCarDetails});

        }
        else{
            console.log("No File ");
            const newCarDetails = await Car.findByIdAndUpdate(carId, {
                title: data.title,
                price: data.price,
                car_type: data.car_type,
                company: data.company,
                address:data.address,
                additionalInfo:data.additionalInfo,
               
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