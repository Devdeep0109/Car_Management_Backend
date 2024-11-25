const express = require("express");
const router = express.Router();
const multer = require("multer")
const path = require('path') //for setup the path
const fs = require('fs');

const {carDetailsController, allcar, fullCarDetail} = require("../controller/carDetailsController");
const { checkForAuthenticationCookie } = require("../middleware/Authentication");
const { caredit } = require("../controller/carDetailsController");
const { cardelete } = require("../controller/carDetailsController");


//MAKING STORAGE.....
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      // Define the directory where files will be saved
      const dir = './public/uploads';

      // Check if the directory exists, if not, create it
      if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
      }
  
      cb(null, dir);
  },
  filename: (req, file, cb) => {
    console.log("Hello: ", file.originalname);
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
  const upload = multer({ storage })


//for getting details of car
router.post("/cardetails",checkForAuthenticationCookie() , carDetailsController);

//for updating details of car
router.post("/editcar/:id",checkForAuthenticationCookie(),caredit);  


//for deleeting all car details of a particular id
router.post("/deletecar/:id",checkForAuthenticationCookie(),cardelete);

//for providing all car details
router.get("/allcar",checkForAuthenticationCookie() ,allcar);

//for providing full detail of each mess
router.get("/single/:id",checkForAuthenticationCookie() ,fullCarDetail);

module.exports = router