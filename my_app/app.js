var express  = require('express');
var app      = express();
var path     = require('path');
var mongoose = require('mongoose');
var session  = require('express-session');
var flash    = require('connect-flash');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

// database
mongoose.connect('mongodb://localhost:27017/'); //로컬
// mongoose.connect(process.env.MONGO_DB);  
var db = mongoose.connection;
db.once("open",function () {
  console.log("DB connected!");
});
db.on("error",function (err) {
  console.log("DB ERROR :", err);
});

// view engine
app.set("view engine", 'ejs');

// middlewares
app.use(express.static(path.join(__dirname, 'public')));  //public 폴더 생성
app.use(bodyParser.json());   //bodyparser
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(flash());  //flash message middleware
app.use(session({secret:'MySecret'}));

// passport
var passport = require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());

// Custom middleware (메인에서 로그인여부판별용 nav.ejs)
app.use(function(req,res,next){
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.currentUser = req.user;
  next();
})

// routes
app.use('/', require('./routes/home'));
app.use('/users', require('./routes/users'));
app.use('/posts', require('./routes/posts'));


// start server
var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log('Server On!');
});
