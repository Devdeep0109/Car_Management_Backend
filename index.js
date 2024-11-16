require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT=process.env.PORT;
const userRoute = require("./routes/userRoute");
const carRoute = require("./routes/carRoute");
const commentRoute = require("./routes/commentRoute");
const cors = require("cors");
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const { Comments } = require("./model/comments");


//connection establishment to mongoDB.....
mongoose.connect(process.env.MONGO_URL)
.then(async () =>{console.log("connected to MongoDB")
    // await Comments.deleteMany({})
}
        
    )

.catch(err=>console.log(err))



//configurations.........
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));


//middleware.....
app.use(express.json());
app.use(express.static('uploads')); // Serve static files from the "public" directory
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req,res) => {
    return res.status(200).json("Server Ready")
})

//routes....
app.use("/api" ,userRoute)
app.use("/car",carRoute)
app.use("/comment",commentRoute)


app.listen(PORT ,(req,res) =>{
    console.log(`Listening on port no. ${PORT}`);
})

