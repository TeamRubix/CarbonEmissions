var express = require('express');
var router = express.Router();

/* directory path */
//adding path module for reading file path
const path =require('path');

//set path for capturing static assets from the public directory
// app.use(express.static(path.join(__dirname,'public')));

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Green Guage' });
});

router.get('/index', function (req, res) {
  res.render('index', { title: 'Green Guage' });
});


router.get('/about',function(req,res){
  res.render('about', {title:'About'})
})

module.exports = router;
