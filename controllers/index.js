var express = require('express');
var router = express.Router();

/* directory path */
//adding path module for reading file path
const path =require('path');

//set path for capturing static assets from the public directory
// app.use(express.static(path.join(__dirname,'public')));

/* GET home page. */
<<<<<<< HEAD
router.get('/', function(req, res) {
  res.render('index', { title: 'Green Guage' });
=======
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Green Guage', user: req.user });
>>>>>>> 14870b3662196e44a0760cea542fc80e213bc493
});

router.get('/index', function (req, res) {
  res.render('index', { title: 'Green Guage', user: req.user });
});


router.get('/about',function(req,res){
  res.render('about', {title:'About', user: req.user})
})

module.exports = router;
