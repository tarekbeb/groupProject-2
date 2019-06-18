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

router.post('/register', ((req, res) => {
    let username = req.body.username;
    let password = bcrip.hasSync(req.body.password, 8);
    let email = req.body.email;
    let name = req.body.name;
    
    db.profile.create({username: username, password:password, email:email, name:name})
    .then((result) => {
        // res.redirect('/login')
        console.log(`${username}, ${name}, ${email}`);
    })
    .catch((error) => {
        res.send(error)
    })
    res.send('register post afterwards')    
}))


module.exports = router;