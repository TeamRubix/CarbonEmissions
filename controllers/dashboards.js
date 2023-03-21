const express=require('express');
const router=express.Router();

const global = require('../controllers/globalFunctions');


router.get('/index', global.isAuthenticated,(req,res)=>{
    res.render('dashboard/index',{title:'Dashboard', user: req.user})
})

module.exports= router