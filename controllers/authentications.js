const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user')

router.get('/register', (req, res) => {
    res.render('auth/register', { title: 'Register' });
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
    passport.authenticate('local', {
    successRedirect: '/dashboard/index',
    failureRedirect: '/auth/login',
    failureMessage: 'Invalid Login'
}));




module.exports = router;