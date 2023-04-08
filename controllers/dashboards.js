const express=require('express');
const router=express.Router();
const FoodEmission = require('../models/foodEmission');
const global = require('../controllers/globalFunctions');
// const totalRecords = require('../models/foodEmission');

exports.getTotalCount = async (req, res, next) => {
  try {
    // db.greenguage.countDocuments({})
    const totalCount = await FoodEmission.countDocuments();
    res.render('dashboard/index', { totalCount });
  } catch (err) {
    next(err);
  }
};


// csv file upload
const csv = require('csv-parser');
const multer = require('multer');
const fs = require('fs');

// csv upload - alisha
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });

  const upload = multer({ storage: storage });

  router.post('/upload', upload.single('csv'), function (req, res) {
    const results = [];
    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        // Process the CSV data here
        console.log(results);
        res.send('CSV file uploaded successfully');
      });
  });
  

// Climatiq API - alisha
const axios = require('axios');

router.get('/emissions', async (req, res) => {
  try {
    const response = await axios.get('https://www.climatiq.io/data', {
      params: {
        sector: 'Waste'
      }
    });
    const emissionsData = response.data;
    res.render('dashboard/emissions', { emissionsData });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving emissions data');
  }
});

// Ends here

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

module.exports= router;