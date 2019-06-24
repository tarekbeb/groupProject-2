var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var passport = require('passport');
var db = require('../models');
require('../config/passport');





//LOADING USER MODELS/PROFILES
var User = require('../models/user')
var { forwardAuthenticated } = require('../config/auth');

//LOGIN PAGE
router.get('/login', forwardAuthenticated, ((req, res) => {
    res.render('login');
}))

//REGISTRATION
router.get('/register', forwardAuthenticated, ((req, res) => {
    res.render('register');
}))

//REGISTER HANDLE
router.post('/register', ((req, res) => {
    // const {fName, lName, email, username, password, password2} = req.body;
    var fName = req.body.fName;
    var lName = req.body.lName;
    var email = req.body.email;
    var username = req.body.username;
    let password = req.body.password;
    var password2 = req.body.password2;
    let errors = [];
    let success = [];

    //CHECK REQUIRED FIELDS
    if(!fName || !lName || !email || !username || !password || !password2){
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
            fName, 
            lName, 
            username,
            email,
            password,
            password2
        });
    } else {
        db.user.findOne({where: { email: email }})
        .then(person =>{
            if (person) {
                errors.push({msg: 'Email already exists'});
                res.render('register', {
                    errors,
                    fName, 
                    lName, 
                    username,
                    email,
                    password,
                    password2
                });
            } else {
                let password = bcrypt.hashSync(req.body.password, 8);
                db.user.create({fName:fName, lName:lName, username:username, email:email, password:password})    
                .then((user) => {
                    req.flash('success_msg', 'You are now registered and can log in');
                    res.redirect('/login')
                })
                .catch((error) => {
                    res.send(error)
                })
                // var newUser = new User({
                //     fName:fName, 
                //     lName:lName, 
                //     username:username,
                //     email:email,
                //     password:password
                // });
                // console.log(newUser);
                // //HASH PASSWORD, MUST USE BCRYPTJS
                // //MUST GENERATE A SALT TO GET A HASH
                // //EVERY SALT GENERATES A HASH--NESTED
                // bcrypt.genSalt(10, (err, salt)=>{
                //     bcrypt.hash(newUser.password, salt, (err, hash)=>{
                //         if (err) throw err;
                //         let password = bcrypt.hashSync(req.body.password, 8); //SET THE NEW USER PASSWORD TO HASHED
                //         db.user.create({newUser}) //SAVES NEW USER
                //             .then(user => {
                //                 console.log(`${username}, ${fName}, ${lName}`);
                //                 req.flash(
                //                     'success_msg', 
                //                     'You are now registed and can log in'//CREATES THE FLASH MESSAGE. BECAUSE REDIRECTING STORES THE MESSAGE IN THE SESSION
                //                 );
                //                 res.redirect('./login');
                //             })
                //             .catch(err => console.log(err));
                //     });
                // });
            }
        });
    }
}));

//LOGIN
router.post('/login',
    passport.authenticate('local', { //USING THE LOCAL STRATEGY
      successRedirect: '/ideas', //ON SUCCESS REDIRECT TO /DASHBOARD
      failureRedirect: '/login', //ON FAILURE STAY OR GO TO LOGIN BASICALLY
      failureFlash: true //SHOW FLASH MESSAGE ON FAILURE
    }) //DOCUMENTATION 
);
  

  //LOGOUT
  router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/login');
  });



module.exports = router;