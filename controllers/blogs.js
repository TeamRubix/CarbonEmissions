const express=require('express');
const router=express.Router();
const blog=require('../models/blog.js');

const global = require('../controllers/globalFunctions');

router.get('/index',(req,res)=>{
    blog.find().then((blog)=>{
        console.log(blog)
        res.render('blog/index',{
            title:"Blogs",
            blogs:blog,
            user: req.user
        }).sort('')
    }).catch((error)=>{
        console.log(error);
    })
    // res.render('blog/index',{title:"Blog"})
})

router.get('/create',global.isAuthenticated,(req,res)=>{
    res.render('blog/create',{title:"Create Blog",
    user: req.user})
})

router.post('/create',(req,res)=>{
    blog.create(req.body).then((data)=>{
        
        res.redirect('/blog/index');
    }).catch((error)=>{
        console.log(error)
    })
})

module.exports=router;