var express = require('express');
var router = express.Router();
var { ensureAuthenticated } = require('../config/auth')

router.get('/', ((req, res) => {
    res.render('home');
}))

router.get('/dashboard', ensureAuthenticated, ((req, res) => {
    res.render('dashboard');
    //MAYBE SAY HI TO USER? PASS NAME TO EJS DASHBOARD
    // name: req.user.fname
}))


module.exports = router;