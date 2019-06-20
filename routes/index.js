var express = require('express');
var router = express.Router();
var { ensureAuthenticated } = require('../config/auth')

router.get('/', ((req, res) => {
    res.render('index');
}))

router.get('/ideas', ensureAuthenticated, ((req, res) => {
    res.render('ideas');
    //MAYBE SAY HI TO USER? PASS NAME TO EJS DASHBOARD
    // name: req.user.fname
}));


module.exports = router;