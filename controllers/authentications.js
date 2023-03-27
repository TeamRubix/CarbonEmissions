const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');

router.get('/register', (req, res) => {
    res.render('auth/register', { title: 'Register', user: req.user });
})


//post method to register user

router.post('/register', (req, res) => {
    User.register(new User({
        username: req.body.username,
        userRole: req.body.userRole
    }),req.body.password,(err,user)=>{
        if(err){
            console.log(err)
        }
        else{

            res.redirect('/');

        }
    } )
})


router.get('/login', (req, res) => {
    res.render('auth/login', { title: 'Login', user: req.user });
})

// post method for user login
router.post('/login', 
// (res, req) => {
//    console.log(User.find(User.userRole));
    // User.find((err, user) =>{
        // if(err){
            
        //     console.log(err);
        //     console.log("user not found");
        // }
        // else{
        //     console.log("user found");
        //     // console.log(User.userRole);
            
        //     if(user.userRole == 'Educator'){
        //         console.log("user Educator");
                 passport.authenticate('local', {
                    successRedirect: '/dashboard',
                    failureRedirect: '/auth/login'
                })
            // }
        // }
    // })
);


router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            console.log(err);
        }
        res.redirect('/');
    });
});



router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}),(req, res) => {});

router.get('/google/callback', passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureMessage: 'Could not authenticate with Google'
}))


module.exports = router;