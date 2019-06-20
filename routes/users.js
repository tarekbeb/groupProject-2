var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var passport = require('passport');
var db = require('../models');
let SequelizeStore = require('connect-session-sequelize')(session.Store);
var localStrategy = require('passport-local').Strategy



//LOADING USER MODELS/PROFILES
var User = require('../models/profile')
var forwardAuthenticated = require('../config/auth');

//LOGIN PAGE
router.get('/login', forwardAuthenticated((req, res) => {
    res.render('login');
}))

//REGISTRATION
router.get('/register', forwardAuthenticated((req, res) => {
    res.render('register');
}))

//REGISTER HANDLE
router.post('/register', ((req, res) => {
    // const {fname, lname, email, username, password, password2} = req.body;
    var fname = req.body.fname;
    var lname = req.body.lname;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;
    let errors = [];

    //CHECK REQUIRED FIELDS
    if(!fname || !lname || !email || !username || !password || !password2){
        errors.push({msg: 'Please fill in all fields'})
    }

    //CHECK PASSWORDS MATCH
    if(password != password2) {
        errors.push({msg: 'Passwords do not match'})
    }

    //CHECK PASS LENGTH
    if(password.length < 8){
        errors.push({msg: 'Password should at least be 8 characters long'})
    }

    //LENGTH OF ARRAY OF ERRORS WILL POP UP ON REGISTRATION
    if(errors.length > 0){
        res.render('register', {
            errors,
            fname,
            lname,
            username,
            email,
            password,
            password2
        });
    } else {
        User.findOne({email: email})
        .then(user =>{
            if (profile) {
                errors.push({msg: 'Email already exists'});
                res.render('register', {
                    errors,
                    fname,
                    lname,
                    username,
                    email,
                    password,
                    password2
                });
            } else {
                var newUser = new User({
                    fname, 
                    lname, 
                    username,
                    email,
                    password

                });
                //HASH PASSWORD, MUST USE BCRYPTJS
                //MUST GENERATE A SALT TO GET A HASH
                //EVERY SALT GENERATES A HASH--NESTED
                bcrypt.genSalt(10, (err, salt)=>{
                    bcrypt.hash(newUser.password, salt, (err, hash)=>{
                        if (err)
                        throw err;
                        newUser.password = hash; //SET THE NEW USER PASSWORD TO HASHED
                        newUser.save() //SAVES NEW USER
                            .then(user => { 
                                req.flash(
                                    'success_msg', 
                                    'You are now registed and can log in'//CREATES THE FLASH MESSAGE. BECAUSE REDIRECTING STORES THE MESSAGE IN THE SESSION
                                );
                                res.redirect('/login');
                            })
                            .catch(err => console.log(err));
                    });
                });
            }
        });
    }
    
    
    User.create({fname:fname, lname:lname, username:username, email:email, password:password})    
    .then((result) => {
        // res.redirect('/login')
        console.log(`${username}, ${fname}, ${lname} ${email}`);
    })
    .catch((error) => {
        res.send(error)
    })
    // res.send('register post afterwards')    
}));

//LOGIN
router.post('/login', (req, res, next) => {
    passport.authenticate('local', { //USING THE LOCAL STRATEGY
      successRedirect: '/dashboard', //ON SUCCESS REDIRECT TO /DASHBOARD
      failureRedirect: '/login', //ON FAILURE STAY OR GO TO LOGIN BASICALLY
      failureFlash: true //SHOW FLASH MESSAGE ON FAILURE
    })(req, res, next); //DOCUMENTATION
  });
  
  //LOGOUT
  router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/login');
  });



module.exports = router;