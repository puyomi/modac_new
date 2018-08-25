var express  = require('express');
var router   = express.Router();
var mongoose = require('mongoose');
var passport = require('../config/passport.js');
var Post     = require('../models/Post');
var User     = require('../models/User');

// Home 페이지 
// 나중에 posts로 redirect 시킬예정
router.get("/", function(req, res){
  res.render("home/welcome");
});


// About 페이지
router.get("/about", function(req, res){
  res.render("home/about");
});


// Login
router.get('/login', function (req,res) {
  res.render('login/login',{email:req.flash("email")[0], loginError:req.flash('loginError'), loginMessage:req.flash('loginMessage')});
});
router.post('/login', passport.authenticate('local-login', {
    successRedirect : '/posts',
    failureRedirect : '/login',
    failureFlash : true
  })
);

router.get('/logout', function(req, res) {
    req.logout();
    req.flash("postsMessage", "Good-bye, have a nice day!");
    res.redirect('/');
});

module.exports = router;
