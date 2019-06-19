var express = require('express');
var router = express.Router();
var bcrip = require('bcryptjs');
var passport = require('passport');
var flash = require('flash');

//LOADING USER MODELS/PROFILES
var User = require('../models/profile')
var forwardAuthenticated = require('../config/auth');

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
        errors.push({msg: 'Password should at least be 6 characters long'})
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
        users.findOne({email: email})
        .then(user =>{
            if (user) {
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
                var newUser = new user({
                    fname, 
                    lname, 
                    username,
                    email,
                    password

                });
                bcrip.genSalt(10, (err, salt)=>{
                    bcrip.hash(newUser.password, salt, (err, hash)=>{
                        if (err)
                        throw err;
                        newUser.password = hash;
                        newUser 
                            .save()
                            .then(user => {
                                req.flash(
                                    'success_msg',
                                    'You are now registed and can log in'
                                );
                                res.redirect('/login');
                            })
                            .catch(err => console.log(err));
                    });
                });
            }
        });
    }


    let password = bcrip.hasSync(req.body.password, 8);

    
    // db.profile.create({username: username, password:password, email:email, name:name})
    // .then((result) => {
    //     // res.redirect('/login')
    //     console.log(`${username}, ${name}, ${email}`);
    // })
    // .catch((error) => {
    //     res.send(error)
    // })
    // res.send('register post afterwards')    
}));



module.exports = router;