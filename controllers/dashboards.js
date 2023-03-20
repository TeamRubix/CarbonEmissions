const express=require('express');
const router=express.Router();

router.get('/index',(req,res)=>{
    res.render('dashboard/index',{title:'Dashboard'})
})

module.exports= router