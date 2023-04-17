const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');
const user = require('../models/user');

router.get('/register', (req, res) => {
    let userRole = req.session.userRole?.userRole;
    req.session.userRole = [];
    res.render('auth/register', { title: 'Register', userRole: userRole, user: req.user });
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
            req.session.userRole = req.body.userRole;
            console.log(req.session.userRole);
            // console.log(userRole);
            res.redirect('/auth/login');

        }
    } )
})


router.get('/login', (req, res) => {
    let userRole = req.session.userRole;
    // console.log(req.session.userRole);
    // req.session.userRole = [];
    res.render('auth/login', { title: 'Login', userRole: userRole, user: req.user });
})

// post method for user login
router.post('/login', passport.authenticate('local', {
    successRedirect: '/auth/setRoles',
    failureRedirect: '/auth/login'
}));

router.get('/setRoles', (req, res) => {
    req.session.userRole = req.user.userRole;
    // console.log(req.session.userRole);
    
    if(req.session.userRole == 'Student')
    {
        console.log("This is a Student");
        res.redirect('/dashboard');
    }
    else if(req.session.userRole == 'Educator')
    {
        console.log("This is a Educator");
        res.redirect('/dashboard');
    }
    else if(req.session.userRole == 'HTRFaculty')
    {
        console.log("This is a HTR Faculty");
        res.redirect('/dashboard');
    }
    else if(req.session.userRole == 'CommunityMember')
    {
        console.log("This is a Community Member");
        res.redirect('/dashboard');
    }
});


router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            console.log(err);
        }
        req.session.userRole = [];
        res.redirect('/');
    });
});



router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}),(req, res) => {});

router.get('/google/callback', passport.authenticate('google', {
    successRedirect: '/dashboard/',
    failureRedirect: '/auth/login',
    failureMessage: 'Could not authenticate with Google'
}))


module.exports = router;