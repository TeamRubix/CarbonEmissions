const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const csvtojson = require('csvtojson');
const multer = require('multer');



//Add Controllers Here
const indexRouter = require('./controllers/index');
const usersRouter = require('./controllers/users');
const authRouter = require('./controllers/authentications');
const dashboardRouter = require('./controllers/dashboards');

const blogRouter = require('./controllers/blogs');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, 'node_modules')));

//mongoDb connection starts

if (process.env.NODE_ENV != 'production') {
  require('dotenv').config();
}

const mongoose = require('mongoose');
const { hasSubscribers } = require('diagnostics_channel');

mongoose.connect(process.env.CONNECTION_STRING).then((res) => {
  console.log('Connected to mongoose');
}).catch(() => {
  console.log('Connection to mongoose failed');
}
)

//mongoose connection ends

//passport config starts
const passport = require('passport');
const session = require('express-session');

//initialize session 
app.use(session({
  secret: process.env.PASSPORT_SECRET,
  resave: true,
  saveUninitialized: false
}))


app.use(passport.initialize());
app.use(passport.session());

const User = require('./models/user');
const foodEmission = require('./models/foodEmission');
passport.use(User.createStrategy())

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


// GOOGLE auth  strategy for passport
const googleStrategy = require('passport-google-oauth20').Strategy;
passport.use(new googleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
}, (accessToken, refreshToken, profile, done) => {
  User.findOrCreate({oauthId: profile.id}, {
    username: profile.displayName,
    oauthProvider: 'Google'
  }, (err, user)=> {
    return done (err, user);
  })
}));

/*****************************FILE UPLOAD STARTS HERE************************** */

// we are using Multer storage to handle the file uploads. This storage will be used to access the uploaded file.
const excelStorage = multer.diskStorage({  
  destination:(req,file,cb)=>{  
       cb(null,'./public/excelUploads');      // file added to the public folder of the root directory
  },  
  filename:(req,file,cb)=>{  
       cb(null,file.originalname);  
  }  
});  
const excelUploads = multer({storage:excelStorage}); 
app.get('/',(req,res) => {
     res.render('dashboard/index');
})
// upload excel file and import in mongodb
app.post('dashboard/index', excelUploads.single("csv"), (req, res) =>{  
     importFile('./public' + '/excelUploads/' + req.file.filename);
          function importFile(filePath){
            //  Read Excel File to Json Data
              const arrayToInsert = [];
              csvtojson().fromFile(filePath).then(source => {
            // Fetching the all data from each row
              for (var i = 0; i < source.length; i++) {
                  console.log(source[i]["name"])
                  const singleRow = {
                      foodName: source[i]["Food"],
                      originPoint: source[i]["Point of Origin"],
                      transportDistance: source[i]["Transport Distance (km)"],
                      weight: source[i]["Weight (kg)"],
                      unitsTotal: source[i]["Units"],
                      valueTTW: source[i]["Emission Values kg (CO2e TTW)"],
                      valueWTW: source[i]["Emission Values kg (CO2e WTW)"],
                      valuePerkg: source[i]["CO2e per kg"],
                     
                  };
                  arrayToInsert.push(singleRow);
              }
           //inserting into the table student
           foodEmission.insertMany(arrayToInsert, (err, result) => {
                  if (err) console.log(err);
                      if(result){
                          console.log("File imported successfully.");
                          res.redirect('/')
                      }
                  });
              });
         }
})
/**********************ENDS******************************************** */

//passport config ends

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/dashboard', dashboardRouter);
app.use('/blog', blogRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
