var express = require('express');
var router = express.Router();

//LOGIN PAGE
router.get('/login', ((req, res) => {
    res.render('login');
}))

//REGISTRATION
router.get('/register', ((req, res) => {
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
        res.send('Pass');
    }


    // let password = bcrip.hasSync(req.body.password, 8);

    
    // db.profile.create({username: username, password:password, email:email, name:name})
    // .then((result) => {
    //     // res.redirect('/login')
    //     console.log(`${username}, ${name}, ${email}`);
    // })
    // .catch((error) => {
    //     res.send(error)
    // })
    // res.send('register post afterwards')    
}))


module.exports = router;