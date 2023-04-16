const express=require('express');
const router=express.Router();
const FoodEmission = require('../models/foodEmission');
const csvtojson = require('csvtojson');
const multer = require('multer');
const global = require('../controllers/globalFunctions');
router.get('/', (req,res)=>{
    FoodEmission.find((err,emission) => {
        if(err) {
            console.log(err);
        }
        else {
            res.render('dashboard/index',{
                title:'Dashboard',
                emission: emission, 
                user: req.user
            });
        }
    });
    
});

router.get('/create', global.isAuthenticated,(req,res)=>{
    res.render('dashboard/create', {
        title:'Dashboard - Food Emission Data',
        user: req.user
    });
    
    
});

router.post('/create', global.isAuthenticated,(req,res)=>{
    FoodEmission.create(req.body,(err, emission) => {    
        if(err){
            console.log(err);
        }
        else{
            res.redirect('/dashboard');
        }
    });
});




// we are using Multer storage to handle the file uploads. This storage will be used to access the uploaded file.
const fs = require('fs');
const excelStorage = multer.diskStorage({  
  destination:(req,file,cb)=>{ 
    const path = 'public/excelUploads';

    // Creates Directory to the path if it does not exist 
    if (!fs.existsSync(path)) { 
      fs.mkdirSync(path);
    }
    cb(null, path) // file added to the public folder of the root directory
      //  cb(null,'public/excelUploads');     
  },  
  filename:(req,file,cb)=>{  
       cb(null,file.originalname);  
  }  
});

const excelUploads = multer({storage:excelStorage}); 

// upload excel file and import in mongodb
router.post('/', excelUploads.single("csv"), (req, res) =>{  
     importFile('public' + '/excelUploads/' + req.file.filename);
          function importFile(filePath){
            //  Read Excel File to Json Data
              const arrayToInsert = [];
              csvtojson().fromFile(filePath).then(source => {
            // Fetching the all data from each row
              for (var i = 0; i < source.length; i++) {
                //   console.log(source[i]["foodName"])
                  const singleRow = {
                      foodName: source[i]["foodName"],
                      originPoint: source[i]["originPoint"],
                      transportDistance: source[i]["transportDistance"],
                      weight: source[i]["weight"],
                      unitsTotal: source[i]["unitsTotal"],
                      valueTTW: source[i]["valueTTW"],
                      valueWTW: source[i]["valueWTW"],
                      valuePerkg: source[i]["valuePerkg"],
                     
                  };
                  arrayToInsert.push(singleRow);
              }
           //inserting into the table student
           FoodEmission.insertMany(arrayToInsert, (err, result) => {
                  if (err) console.log(err);
                      if(result){
                          console.log("File imported successfully.");
                          res.redirect('/dashboard')
                      }
                  });
              });
         }
})
/**********************ENDS******************************************** */


module.exports= router;