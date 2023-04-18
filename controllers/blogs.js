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

router.get('/edit/:_id', global.isAuthenticated, (req, res) => {
    blog.findById(req.params._id, (err, blog) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render('blog/edit', {
                blog: blog,
                title: 'Edit Blog',
            });
        }         
    });
});

router.post('/edit/:_id', global.isAuthenticated, (req, res) => {
    blog.findByIdAndUpdate({ _id: req.params._id }, req.body, null, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/blog/index');
        }
    });
});


router.get('/delete/:_id',global.isAuthenticated, (req, res) => {
    blog.remove({ _id: req.params._id }, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/blog/index');
        }
    });
});


module.exports=router;